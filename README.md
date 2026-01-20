# buriosa-registry

> 이 레포는 Monet Registry 운영 방식에서 영감을 받아 설계되었습니다.
> 참고: https://github.com/monet-design/monet-registry

BURIOSA Registry는 UI 섹션/컴포넌트(React + Tailwind)를 “검색 가능한 자산”으로 모으는 레지스트리입니다.

## Architecture
- Factory (루트): 컴포넌트/메타데이터 생성 → 검증 → 인덱스(index.json) 생성
- Showroom (`apps/web`): 생성된 인덱스를 읽어 목록/상세 UI로 보여줌

## Folder Structure
- `src/components/registry/[name]/`
  - `index.tsx` : 실제 컴포넌트
  - `metadata.yaml` : 검색/필터/프리뷰 메타데이터
- `scripts/`
  - `create-registry-component.py` : 컴포넌트 스캐폴딩 생성
  - `validate-metadata.py` : metadata.yaml 검증
  - `registry-build.py` : `public/registry/index.json` 생성
  - `registry-sync.ps1` : index + components를 `apps/web`로 배송
- `apps/web/`
  - Next.js 쇼룸(목록/상세)

## Quick Start

### First-time setup (처음 1회)
```bash
pip install -r requirements.txt
pnpm -C apps/web install
