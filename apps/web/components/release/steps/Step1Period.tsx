"use client";

import type { ReleaseFormData } from "@/app/releases/new/page";
import { StepPeriodSelect } from "@/components/release/StepPeriodSelect";

interface Step1PeriodProps {
  formData: ReleaseFormData;
  updateFormData: (updates: Partial<ReleaseFormData>) => void;
}

export function Step1Period({ formData, updateFormData }: Step1PeriodProps) {
  return <StepPeriodSelect formData={formData} updateFormData={updateFormData} />;
}
