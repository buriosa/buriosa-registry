import Link from "next/link";
import { REGISTRY_COMPONENTS } from "./registry-components";

export default function RegistryPage() {
  const componentNames = Object.keys(REGISTRY_COMPONENTS);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Component Registry</h1>
        <p className="text-(--muted) mb-8">
          {componentNames.length}개의 컴포넌트
        </p>

        <div className="grid gap-4">
          {componentNames.map((name) => (
            <Link
              key={name}
              href={`/registry/${name}`}
              className="block p-4 border border-(--border) rounded-lg hover:border-(--accent) transition-colors"
            >
              <span className="font-mono">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
