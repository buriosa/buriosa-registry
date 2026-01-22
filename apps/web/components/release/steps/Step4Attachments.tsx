"use client";

import type { ReleaseFormData } from "@/app/releases/new/page";

interface Step4AttachmentsProps {
  formData: ReleaseFormData;
  updateFormData: (updates: Partial<ReleaseFormData>) => void;
}

export function Step4Attachments({ formData, updateFormData }: Step4AttachmentsProps) {
  void formData;
  void updateFormData;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-4xl">📎</div>
      <h3 className="mt-3 text-base font-bold text-white">첨부파일</h3>
      <p className="mt-1 text-sm text-(--muted)">
        관련 파일을 첨부하세요 (선택)
      </p>
      <p className="mt-4 rounded-lg bg-[rgba(240,246,252,0.08)] px-3 py-1.5 text-xs text-(--muted)">
        구현 예정
      </p>
    </div>
  );
}
