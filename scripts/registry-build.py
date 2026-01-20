#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

import yaml


def project_root() -> Path:
    return Path(__file__).resolve().parent.parent


def find_metadata_files(root: Path) -> list[Path]:
    base = root / "src" / "components" / "registry"
    if not base.exists():
        return []
    return list(base.glob("*/metadata.yaml"))


def main() -> None:
    root = project_root()
    out_dir = root / "public" / "registry"
    out_dir.mkdir(parents=True, exist_ok=True)

    items: list[dict] = []
    for f in find_metadata_files(root):
        txt = f.read_text(encoding="utf-8")
        data = yaml.safe_load(txt) or {}

        # 최소 필드만 인덱스에 넣어도 되고(가벼움),
        # 나중에 확장 가능하도록 기본 구조 유지
        item = {
            "schemaVersion": str(data.get("schemaVersion", "")),
            "name": data.get("name"),
            "category": data.get("category"),
            "images": data.get("images", {}),
            "description": data.get("description", {}),
            "createdAt": data.get("createdAt"),
            "status": data.get("status"),
            "language": data.get("language"),
            "freeformKeywords": data.get("freeformKeywords", []),
            "fontFamily": data.get("fontFamily", []),
            "tags": data.get("tags", {}),
        }

        if item["name"]:
            items.append(item)

    items.sort(key=lambda x: (x.get("name") or ""))

    out_path = out_dir / "index.json"
    out_path.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Built {len(items)} items -> {out_path.relative_to(root)}")


if __name__ == "__main__":
    main()
