#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import sys
from datetime import datetime, timezone
from pathlib import Path


def validate_kebab_case(name: str) -> bool:
    return bool(re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", name))


def parse_csv(s: str) -> list[str]:
    return [x.strip() for x in s.split(",") if x.strip()]


def now_utc_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def project_root() -> Path:
    return Path(__file__).resolve().parent.parent


def generate_metadata_yaml(name: str, category: str, image_path: str, keywords: list[str], font_family: list[str]) -> str:
    kw_lines = "\n".join(f"  - {kw}" for kw in keywords)
    ff_lines = "\n".join(f"  - {ff}" for ff in font_family)
    created = now_utc_iso()

    return f'''schemaVersion: "2.0"
name: {name}
category: {category}

images:
  preview: {image_path}

description:
  short: "TODO: short description (150 chars max)"

tags:
  functional: []
  style: []
  layout: []
  industry: []

freeformKeywords:
{kw_lines}

fontFamily:
{ff_lines}

createdAt: "{created}"
status: draft
language: en
'''


def generate_index_tsx(name: str) -> str:
    return f'''"use client";

export default function Component() {{
  return (
    <section className="w-full bg-white text-gray-900">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <p className="mt-2 text-gray-600">TODO: Implement this component.</p>
      </div>
    </section>
  );
}}
'''


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a registry component (Monet-style)")
    parser.add_argument("--name", "-n", required=True)
    parser.add_argument("--category", "-c", required=True)
    parser.add_argument("--image-path", "-i", required=True)
    parser.add_argument("--keywords", "-k", required=True)
    parser.add_argument("--font-family", "-f", default="Inter")
    parser.add_argument("--force", action="store_true")

    args = parser.parse_args()

    if not validate_kebab_case(args.name):
        print(f"Error: '{args.name}' is not valid kebab-case.", file=sys.stderr)
        sys.exit(1)

    keywords = parse_csv(args.keywords)
    if not keywords:
        print("Error: --keywords is required.", file=sys.stderr)
        sys.exit(1)

    fonts = parse_csv(args.font_family)

    root = project_root()
    component_dir = root / "src" / "components" / "registry" / args.name
    component_dir.mkdir(parents=True, exist_ok=True)

    if any(component_dir.iterdir()) and not args.force:
        print(f"Error: folder already exists and not empty: {component_dir}", file=sys.stderr)
        print("Use --force to overwrite.", file=sys.stderr)
        sys.exit(1)

    (component_dir / "metadata.yaml").write_text(
        generate_metadata_yaml(args.name, args.category, args.image_path, keywords, fonts),
        encoding="utf-8",
    )
    (component_dir / "index.tsx").write_text(generate_index_tsx(args.name), encoding="utf-8")

    print(f"[SUCCESS] Created: {component_dir.relative_to(root)}")


if __name__ == "__main__":
    main()