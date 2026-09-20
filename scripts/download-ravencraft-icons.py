#!/usr/bin/env python3
"""Download talent spell icons from talents.ravencraft.io."""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ICONS = json.loads((ROOT / "src/lib/data/talents/icons.json").read_text())
OUT = ROOT / "static/art/talents"
BASE = "https://talents.ravencraft.io/icons"
UA = "WindrunnerWebsite/1.0 (talent calculator; local icon mirror)"


def fetch(name: str) -> tuple[str, str]:
    dest = OUT / f"{name}.png"
    if dest.exists() and dest.stat().st_size > 50:
        return name, "ok"
    req = urllib.request.Request(
        f"{BASE}/{name}.png",
        headers={"User-Agent": UA, "Referer": "https://talents.ravencraft.io/"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
            ctype = resp.headers.get("Content-Type", "")
    except urllib.error.HTTPError as err:
        return name, f"http {err.code}"
    except Exception as err:
        return name, str(err)

    if "png" not in ctype.lower() or len(data) < 50:
        return name, f"bad response ({ctype}, {len(data)} bytes)"

    dest.write_bytes(data)
    return name, "ok"


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    failures: list[str] = []
    with ThreadPoolExecutor(max_workers=12) as pool:
        futures = [pool.submit(fetch, name) for name in ICONS]
        for i, future in enumerate(as_completed(futures), 1):
            name, status = future.result()
            if status != "ok":
                failures.append(f"{name}: {status}")
            if i % 50 == 0 or i == len(ICONS):
                print(f"{i}/{len(ICONS)}")

    print(f"saved {len(ICONS) - len(failures)} icons to {OUT}")
    if failures:
        print("failures:")
        print("\n".join(failures))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
