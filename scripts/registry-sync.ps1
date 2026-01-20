$ErrorActionPreference = "Stop"

# 1) index.json -> apps/web public로 배송
New-Item -ItemType Directory -Force ".\apps\web\public\registry" | Out-Null
Copy-Item -Force ".\public\registry\index.json" ".\apps\web\public\registry\index.json"

# 2) components -> apps/web components로 배송 (TS import/프리뷰 안정화)
New-Item -ItemType Directory -Force ".\apps\web\components\registry" | Out-Null
Copy-Item -Recurse -Force ".\src\components\registry\*" ".\apps\web\components\registry\"
