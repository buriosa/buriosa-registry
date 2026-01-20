# Contributing to BURIOSA Registry

BURIOSA Registry는 UI 섹션/컴포넌트(React + Tailwind)를 “검색 가능한 자산”으로 모으는 레지스트리입니다.  
컴포넌트는 폴더 단위로 관리되며, 각 컴포넌트는 `index.tsx`(코드) + `metadata.yaml`(검색/필터 데이터)로 구성됩니다.  
Monet 방식(컴포넌트 폴더 단위 + metadata.yaml + 생성/검증/빌드 커맨드)을 참고합니다.  
[Source](https://raw.githubusercontent.com/monet-design/monet-registry/main/CONTRIBUTING.md)

---

## Repository Model (중요)

### Factory (루트)
- `src/components/registry/[name]/`
  - `index.tsx`
  - `metadata.yaml`
- `scripts/`
  - `create-registry-component.py`
  - `validate-metadata.py`
  - `registry-build.py`
- output: `public/registry/index.json`

### Showroom (apps/web)
- Next.js 뷰어(UI)
- `apps/web/public/registry/index.json` (Factory에서 sync로 배송됨)
- 서버는 `apps/web/lib/registry.ts`로 `index.json`을 fs로 읽음(상대 URL fetch 문제 방지)  
  [Source](https://raw.githubusercontent.com/buriosa/buriosa-registry/main/apps/web/lib/registry.ts)

---

## Quick Commands (항상 이 순서)

### (A) 매번 가장 추천: 한 줄로 전부
```bash
pnpm dev