#!/usr/bin/env python3
"""Recompress site art: lossless photo WebPs → quality 85, large PNGs → WebP."""

from __future__ import annotations

import os
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "static" / "art"
SRC = ROOT / "src"
QUALITY = "85"
UI_LOSSLESS_STEMS = {
    "windrunner-logo",
    "frame-big",
    "frame",
    "icon-alliance",
    "icon-horde",
}
RESIZE_MAX = {
    "icon-alliance.png": 256,
    "icon-horde.png": 256,
}


def is_skipped_png(path: Path) -> bool:
    rel = path.relative_to(ART).as_posix()
    if rel.startswith(("talents/", "classes/", "class-race/")):
        return True
    name = path.name
    return name.endswith("-icon.png") or name.startswith("trait-") or name == "nav-bottom.png"


def webp_is_lossless(path: Path) -> bool:
    out = subprocess.check_output(["webpinfo", str(path)], text=True, stderr=subprocess.DEVNULL)
    return "Lossless" in out


def run(cmd: list[str]) -> None:
    subprocess.check_call(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def encode_webp(src_png: Path, dest: Path, lossless: bool, resize: int | None) -> None:
    cmd = ["cwebp", "-quiet", "-mt"]
    if resize:
        cmd += ["-resize", str(resize), str(resize)]
    if lossless:
        cmd += ["-lossless"]
    else:
        cmd += ["-q", QUALITY, "-m", "6", "-alpha_q", "100"]
    cmd += [str(src_png), "-o", str(dest)]
    run(cmd)


def optimize_webp(path: Path) -> tuple[str, int, int] | None:
    try:
        lossless = webp_is_lossless(path)
    except subprocess.CalledProcessError:
        return None
    if path.stem in UI_LOSSLESS_STEMS:
        return None
    if not lossless and path.name != "banner.webp":
        return None
    original = path.stat().st_size
    with tempfile.TemporaryDirectory() as tmp:
        png = Path(tmp) / "src.png"
        out = Path(tmp) / "out.webp"
        run(["dwebp", str(path), "-o", str(png)])
        encode_webp(png, out, lossless=False, resize=None)
        new_size = out.stat().st_size
        if new_size >= original * 0.92:
            return None
        os.replace(out, path)
    return (str(path.relative_to(ROOT)), original, path.stat().st_size)


def optimize_png(path: Path) -> tuple[str, int, int, str] | None:
    if is_skipped_png(path):
        return None
    original = path.stat().st_size
    if original < 80 * 1024:
        return None
    lossless = path.stem in UI_LOSSLESS_STEMS
    resize = RESIZE_MAX.get(path.name)
    dest = path.with_suffix(".webp")
    with tempfile.TemporaryDirectory() as tmp:
        out = Path(tmp) / "out.webp"
        encode_webp(path, out, lossless=lossless, resize=resize)
        new_size = out.stat().st_size
        if new_size >= original * 0.92:
            return None
        os.replace(out, dest)
    path.unlink()
    return (str(path.relative_to(ROOT)), original, dest.stat().st_size, str(dest.relative_to(ROOT)))


def rewrite_png_refs(renames: list[tuple[str, str]]) -> int:
    replacements = []
    for old_rel, new_rel in renames:
        old_url = "/" + old_rel.removeprefix("static/")
        new_url = "/" + new_rel.removeprefix("static/")
        replacements.append((old_url, new_url))
    changed_files = 0
    for folder in (SRC, ROOT / "scripts"):
        if not folder.exists():
            continue
        for file in folder.rglob("*"):
            if not file.is_file() or file.suffix.lower() not in {".svelte", ".ts", ".js", ".css", ".html", ".md"}:
                continue
            text = file.read_text(encoding="utf-8")
            updated = text
            for old, new in replacements:
                updated = updated.replace(old, new)
            if updated != text:
                file.write_text(updated, encoding="utf-8")
                changed_files += 1
    return changed_files


def collect_jobs() -> tuple[list[Path], list[Path]]:
    webps: list[Path] = []
    pngs: list[Path] = []
    for path in ART.rglob("*"):
        if not path.is_file():
            continue
        suffix = path.suffix.lower()
        if suffix == ".webp":
            if "static/art/" in path.relative_to(ART).as_posix():
                continue
            webps.append(path)
        elif suffix == ".png":
            pngs.append(path)
    return webps, pngs


def main() -> int:
    webps, pngs = collect_jobs()
    saved = 0
    webp_done = 0
    png_renames: list[tuple[str, str]] = []

    workers = min(8, os.cpu_count() or 4)
    print(f"Optimizing {len(webps)} WebP files and {len(pngs)} PNGs with {workers} workers…")

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(optimize_webp, path) for path in webps]
        for future in as_completed(futures):
            result = future.result()
            if not result:
                continue
            rel, old, new = result
            webp_done += 1
            saved += old - new
            print(f"  webp {rel}: {old/1024:.0f}KB → {new/1024:.0f}KB")

    png_results = []
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(optimize_png, path) for path in pngs]
        for future in as_completed(futures):
            result = future.result()
            if not result:
                continue
            png_results.append(result)

    for old_rel, old, new, new_rel in sorted(png_results):
        png_renames.append((old_rel, new_rel))
        saved += old - new
        print(f"  png  {old_rel} → {new_rel}: {old/1024:.0f}KB → {new/1024:.0f}KB")

    files_updated = rewrite_png_refs(png_renames) if png_renames else 0
    print(f"Updated {files_updated} source files.")
    print(f"Recompressed {webp_done} WebPs, converted {len(png_renames)} PNGs.")
    print(f"Saved {saved/1024/1024:.1f} MB on disk.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
