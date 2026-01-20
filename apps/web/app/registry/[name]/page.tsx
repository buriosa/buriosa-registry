import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { loadRegistryItem } from "../../../lib/registry";
import { REGISTRY_COMPONENTS } from "../registry-components";

function toPublicUrl(maybePublicPath?: string) {
  if (!maybePublicPath) return null;

  const cleaned = maybePublicPath
    .replace(/^public[\\/]/, "")
    .replaceAll("\\", "/");

  return `/${cleaned}`;
}

export default async function RegistryDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  // ✅ Next 16.1.4에서 params가 Promise로 들어오는 경우 대응
  const { name } = await params;

  const item = await loadRegistryItem(name);
  if (!item) return notFound();

  const PreviewComponent = (REGISTRY_COMPONENTS as any)[name] as
    | React.ComponentType<any>
    | undefined;

  const previewSrc = toPublicUrl(item.images?.preview);

  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white hover:underline"
          >
            ← Back
          </Link>

          <div className="text-xs text-white/50">
            category: {item.category} · status: {item.status} · {item.createdAt}
          </div>
        </div>

        <h1 className="text-2xl font-semibold">{item.name}</h1>

        <p className="mt-3 text-white/70">
          {item.description?.short ?? "No short description yet."}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-white/80">Live Preview</h2>
              <span className="text-xs text-white/50">
                pnpm factory 실행 시 자동 반영
              </span>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#0b0f14] p-4">
              {PreviewComponent ? (
                <PreviewComponent />
              ) : (
                <p className="text-sm text-white/60">
                  아직 매핑이 없습니다. factory 실행 후 생성되는
                  <code className="mx-1 text-white/70">
                    registry-components.ts
                  </code>
                  를 확인하세요.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-white/80">Preview Image</h2>
              <span className="text-xs text-white/50">없어도 OK</span>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0f14]">
              {previewSrc ? (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={previewSrc}
                    alt={`${item.name} preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center text-sm text-white/60">
                  preview 이미지 없음
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
