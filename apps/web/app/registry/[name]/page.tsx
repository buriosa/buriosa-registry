"use client";

import { use } from "react";
import Link from "next/link";
import {
  REGISTRY_COMPONENTS,
  type RegistryComponentName,
} from "../registry-components";

interface Props {
  params: Promise<{ name: string }>;
}

export default function ComponentPage({ params }: Props) {
  const { name } = use(params);
  const Component =
    REGISTRY_COMPONENTS[name as RegistryComponentName];

  if (!Component) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Component not found</h1>
          <Link href="/registry" className="text-(--accent)">
            Back to registry
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="p-4 border-b border-(--border) flex items-center gap-4">
        <Link href="/registry" className="text-(--muted) hover:text-(--text)">
          &larr; Back
        </Link>
        <span className="font-mono font-bold">{name}</span>
      </div>
      <div className="w-full">
        <Component />
      </div>
    </main>
  );
}
