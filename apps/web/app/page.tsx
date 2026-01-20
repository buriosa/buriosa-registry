import { loadRegistryIndex } from "../lib/registry";

export default async function Page() {
  const items = await loadRegistryIndex();

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
        BURIOSA Registry
      </h1>
      <p style={{ opacity: 0.8, marginBottom: 20 }}>
        “공장”이 만든 index.json을 “쇼룸”에서 읽어 목록을 보여줍니다.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {items.map((item) => (
          <a
            key={item.name}
            href={`/registry/${item.name}`}
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 12,
              padding: 16,
              textDecoration: "none",
              color: "inherit",
              background: "white",
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>
              {item.category} · {item.status}
            </div>
            <div style={{ fontSize: 18, fontWeight: 650, marginBottom: 8 }}>
              {item.name}
            </div>
            <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.4 }}>
              {item.description?.short ?? "No description yet."}
            </div>
            <div style={{ fontSize: 12, opacity: 0.65, marginTop: 12 }}>
              createdAt: {item.createdAt}
            </div>
          </a>
        ))}
      </div>

      {items.length === 0 && (
        <p style={{ marginTop: 18, opacity: 0.7 }}>
          items가 0개입니다. (registry-build.py 출력 구조 확인 필요)
        </p>
      )}
    </main>
  );
}
