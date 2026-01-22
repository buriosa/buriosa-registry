"use client";

import type { ReleaseFormData } from "@/app/releases/new/page";

interface Step2CommitsProps {
  formData: ReleaseFormData;
  updateFormData: (updates: Partial<ReleaseFormData>) => void;
}

export function Step2Commits({ formData, updateFormData }: Step2CommitsProps) {
  void formData;
  void updateFormData;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-4xl">✅</div>
      <h3 className="mt-3 text-base font-bold text-white">커밋 선택</h3>
      <p className="mt-1 text-sm text-(--muted)">
        릴리즈에 포함할 커밋을 선택하세요
      </p>
      <p className="mt-4 rounded-lg bg-[rgba(240,246,252,0.08)] px-3 py-1.5 text-xs text-(--muted)">
        구현 예정
      </p>
    </div>
  );
}
