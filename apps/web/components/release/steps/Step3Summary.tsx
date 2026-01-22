"use client";

import type { ReleaseFormData } from "@/app/releases/new/page";

interface Step3SummaryProps {
  formData: ReleaseFormData;
  updateFormData: (updates: Partial<ReleaseFormData>) => void;
}

export function Step3Summary({ formData, updateFormData }: Step3SummaryProps) {
  void formData;
  void updateFormData;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-4xl">📝</div>
      <h3 className="mt-3 text-base font-bold text-white">요약 작성</h3>
      <p className="mt-1 text-sm text-(--muted)">
        릴리즈 제목과 요약을 작성하세요
      </p>
      <p className="mt-4 rounded-lg bg-[rgba(240,246,252,0.08)] px-3 py-1.5 text-xs text-(--muted)">
        구현 예정
      </p>
    </div>
  );
}
