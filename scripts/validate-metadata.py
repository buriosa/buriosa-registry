import os
import sys
import glob
import yaml

REQUIRED_TOP_LEVEL = ["name", "title", "description", "category", "tags"]
REQUIRED_DESCRIPTION = ["short"]

def fail(msg: str):
    print(f"ERROR: {msg}")
    sys.exit(1)

def is_nonempty_str(x):
    return isinstance(x, str) and x.strip() != ""

def validate_item(path: str, data: dict):
    # 1) 필수 키
    for k in REQUIRED_TOP_LEVEL:
        if k not in data:
            fail(f"{path}: missing required field '{k}'")

    if not is_nonempty_str(data.get("name")):
        fail(f"{path}: 'name' must be a non-empty string")

    if not is_nonempty_str(data.get("title")):
        fail(f"{path}: 'title' must be a non-empty string")

    # 2) description
    desc = data.get("description")
    if not isinstance(desc, dict):
        fail(f"{path}: 'description' must be an object")
    for k in REQUIRED_DESCRIPTION:
        if not is_nonempty_str(desc.get(k)):
            fail(f"{path}: 'description.{k}' must be a non-empty string")

    # 3) category
    if not is_nonempty_str(data.get("category")):
        fail(f"{path}: 'category' must be a non-empty string")

    # 4) tags
    tags = data.get("tags")
    if not isinstance(tags, list) or len(tags) == 0:
        fail(f"{path}: 'tags' must be a non-empty array")
    for t in tags:
        if not is_nonempty_str(t):
            fail(f"{path}: each tag must be a non-empty string")

    # 5) status (선택)
    status = data.get("status", "draft")
    if status not in ["draft", "stable", "deprecated"]:
        fail(f"{path}: 'status' must be one of draft/stable/deprecated")

    # 6) images.preview (선택)
    images = data.get("images")
    if images is not None and not isinstance(images, dict):
        fail(f"{path}: 'images' must be an object if provided")

    if images and "preview" in images and images["preview"] is not None:
        if not is_nonempty_str(images["preview"]):
            fail(f"{path}: 'images.preview' must be a non-empty string if provided")
        # 파일 존재까지 강제하고 싶으면 아래 주석 해제
        # preview_path = images["preview"].replace("/", os.sep).replace("\\", os.sep)
        # if preview_path.startswith("public" + os.sep):
        #     if not os.path.exists(preview_path):
        #         fail(f"{path}: preview image not found: {preview_path}")

def main():
    metas = glob.glob("src/components/registry/**/metadata.yaml", recursive=True)
    if not metas:
        fail("No metadata.yaml files found under src/components/registry")

    count = 0
    for mp in metas:
        with open(mp, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f) or {}
        if not isinstance(data, dict):
            fail(f"{mp}: metadata must be a YAML object")
        validate_item(mp, data)
        count += 1

    print(f"OK: validated {count} metadata files.")

if __name__ == "__main__":
    main()
