#!/usr/bin/env python3
"""Parse saved RavenCraft class HTML into local talent JSON."""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

SRC = Path("/tmp")
OUT = Path("/Users/jonas/Developer/Windrunner Website/src/lib/data/talents")

CLASSES = [
    "warrior",
    "paladin",
    "hunter",
    "rogue",
    "priest",
    "shaman",
    "mage",
    "warlock",
    "druid",
]

TREE_TITLES = {
    "Arms",
    "Fury",
    "Protection",
    "Holy",
    "Retribution",
    "Beast Mastery",
    "Marksmanship",
    "Survival",
    "Assassination",
    "Combat",
    "Subtlety",
    "Discipline",
    "Shadow",
    "Elemental",
    "Enhancement",
    "Restoration",
    "Arcane",
    "Fire",
    "Frost",
    "Affliction",
    "Demonology",
    "Destruction",
    "Balance",
    "Feral Combat",
}

META_RE = re.compile(
    r'\\"i\\":(\d+),\\"index\\":(\d+),\\"icon\\":\\"([^\\"]+)\\",\\"ranks\\":(\d+),'
    r'\\"requires\\":(.*?),\\"reqRanks\\":(.*?),\\"reqBy\\":'
)

SLOT_RE = re.compile(r'<div></div>|<img alt="(?!hover)([^"]+)"')

RANK_RE = re.compile(r"0/<!-- -->(\d+)")

TREE_RE = re.compile(
    r'<img alt="([^"]+)"[^>]*src="/icons/\1\.png".{0,400}?'
    r'<span class="h4 grow truncate" title="([^"]+)">\2</span>'
    r'<span class="h4 text-blue-gray shrink-0">0<!-- --> / <!-- -->(\d+)</span>',
    re.DOTALL,
)


def strip_tags(text: str) -> str:
    text = re.sub(r"<!--.*?-->", "", text)
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = text.replace("\r\n", "\n").replace("\xa0", " ")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def parse_description(raw_html: str) -> tuple[str, list[list[str]]]:
    text = strip_tags(raw_html)
    values: list[list[str]] = []

    def repl(match: re.Match[str]) -> str:
        parts = [p.strip() for p in match.group(1).split("/")]
        if len(parts) < 2:
            return match.group(0)
        values.append(parts)
        return "{" + str(len(values) - 1) + "}"

    description = re.sub(r"\[([^\[\]]+)\]", repl, text)
    return description.strip(), values


def parse_requires(raw: str) -> int | None:
    raw = raw.replace("\\", "").replace('"', "")
    if "unde" in raw:
        return None
    if raw.isdigit():
        return int(raw)
    return None


def parse_class(slug: str) -> dict:
    html_text = (SRC / f"rc-{slug}.html").read_text()

    req_by_icon: dict[str, tuple[int | None, int | None]] = {}
    seen: set[tuple[int, int]] = set()
    for i, index, icon, _ranks, requires, req_ranks in META_RE.findall(html_text):
        key = (int(index), int(i))
        if key in seen:
            continue
        seen.add(key)
        req_by_icon[icon] = (parse_requires(requires), parse_requires(req_ranks))

    trees_meta = []
    seen_trees: set[str] = set()
    for icon, name, total in TREE_RE.findall(html_text):
        if name in seen_trees or name not in TREE_TITLES:
            continue
        seen_trees.add(name)
        trees_meta.append({"name": name, "icon": icon, "maxPoints": int(total)})
        if len(trees_meta) == 3:
            break

    def extract_talent(chunk: str, icon: str, cursor: int) -> tuple[dict, int]:
        img = chunk.find(f'<img alt="{icon}"', cursor)
        h4 = chunk.find('<h4 class="tw-color">', img)
        name_end = chunk.find("</h4>", h4)
        desc_start = chunk.find('<p class="whitespace-pre-wrap">', name_end)
        desc_end = chunk.find("</p>", desc_start)
        rank_match = RANK_RE.search(chunk[img:h4])
        if img < 0 or h4 < 0 or desc_start < 0 or not rank_match:
            raise ValueError(f"Could not parse talent {icon} in {slug}")
        description, values = parse_description(
            chunk[desc_start + len('<p class="whitespace-pre-wrap">') : desc_end]
        )
        requires, req_ranks = req_by_icon.get(icon, (None, None))
        talent = {
            "i": 0,
            "icon": icon,
            "name": strip_tags(chunk[h4 + len('<h4 class="tw-color">') : name_end]),
            "ranks": int(rank_match.group(1)),
            "requires": requires,
            "reqRanks": req_ranks,
            "description": description,
            "values": values,
        }
        return talent, desc_end

    grids = html_text.split("grid-cols-[repeat(4,max-content)]")[1:4]
    trees = []
    for idx, grid in enumerate(grids):
        chunk = grid.split("Clear points")[0]
        talents = []
        cursor = 0
        for slot, icon in enumerate(SLOT_RE.findall(chunk)[:28]):
            if not icon:
                continue
            talent, cursor = extract_talent(chunk, icon, cursor)
            talent["i"] = slot
            talents.append(talent)
        meta = trees_meta[idx] if idx < len(trees_meta) else {"name": f"Tree {idx + 1}", "icon": talents[0]["icon"] if talents else "", "maxPoints": 0}
        trees.append({**meta, "talents": talents})

    return {
        "slug": slug,
        "name": slug.replace("-", " ").title(),
        "trees": trees,
    }


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    icons: set[str] = set()
    for slug in CLASSES:
        data = parse_class(slug)
        path = OUT / f"{slug}.json"
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
        counts = [len(tree["talents"]) for tree in data["trees"]]
        names = [tree["name"] for tree in data["trees"]]
        empties = [t["name"] for tree in data["trees"] for t in tree["talents"] if not t["description"]]
        print(f"{slug:10} talents={counts} trees={names} empty_desc={empties}")
        for tree in data["trees"]:
            icons.add(tree["icon"])
            for talent in tree["talents"]:
                icons.add(talent["icon"])
    (OUT / "icons.json").write_text(json.dumps(sorted(icons), indent=2) + "\n")
    print(f"unique icons: {len(icons)}")


if __name__ == "__main__":
    main()
