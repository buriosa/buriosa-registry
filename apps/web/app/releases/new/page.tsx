"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/dashboard/Header";
import { Step1Period } from "@/components/release/steps/Step1Period";
import { Step2Commits } from "@/components/release/steps/Step2Commits";
import { Step3Summary } from "@/components/release/steps/Step3Summary";
import { Step4Attachments } from "@/components/release/steps/Step4Attachments";

const STEPS = [
  { id: 1, title: "기간 선택", description: "릴리즈 기간과 레포를 선택하세요" },
  { id: 2, title: "커밋 선택", description: "포함할 커밋을 선택하세요" },
  { id: 3, title: "요약 작성", description: "릴리즈 요약을 작성하세요" },
  { id: 4, title: "첨부파일", description: "관련 파일을 첨부하세요" },
];

export interface ReleaseFormData {
  repoId: string;
  repoName: string;
  periodStart: string;
  periodEnd: string;
  selectedCommitIds: string[];
  title: string;
  version: string;
  summary: string;
  changelog: string;
  attachments: File[];
  isPublic: boolean;
}

const initialFormData: ReleaseFormData = {
  repoId: "",
  repoName: "",
  periodStart: "",
  periodEnd: "",
  selectedCommitIds: [],
  title: "",
  version: "",
  summary: "",
  changelog: "",
  attachments: [],
  isPublic: false,
};

export default function NewReleasePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReleaseFormData>(initialFormData);

  const updateFormData = (updates: Partial<ReleaseFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Create release
    console.log("Submit release:", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Period formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2Commits formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3Summary formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step4Attachments formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-6">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">📦 New Release</h1>
            <p className="mt-1 text-sm text-(--muted)">
              커밋을 정리해서 공유 가능한 산출물로 만드세요
            </p>
          </div>
          <Link
            href="/releases"
            className="text-sm text-(--muted) hover:text-white"
          >
            ← 목록으로
          </Link>
        </div>

        {/* Step Indicator */}
        <div className="mb-6 rounded-(--radius) border border-(--border) bg-(--panel) p-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex flex-1 items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${
                      currentStep === step.id
                        ? "bg-(--accent) text-white"
                        : currentStep > step.id
                          ? "bg-[rgba(46,160,67,0.15)] text-[#3fb950]"
                          : "bg-[rgba(240,246,252,0.08)] text-(--muted)"
                    }`}
                  >
                    {currentStep > step.id ? "✓" : step.id}
                  </div>
                  <span
                    className={`mt-1.5 text-xs font-semibold ${
                      currentStep === step.id ? "text-white" : "text-(--muted)"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Connector Line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      currentStep > step.id
                        ? "bg-[rgba(46,160,67,0.35)]"
                        : "bg-[rgba(240,246,252,0.08)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="rounded-(--radius) border border-(--border) bg-(--panel) p-5">
          {/* Step Title */}
          <div className="mb-4 border-b border-(--border) pb-4">
            <h2 className="text-base font-bold text-white">
              Step {currentStep}: {STEPS[currentStep - 1].title}
            </h2>
            <p className="mt-1 text-sm text-(--muted)">
              {STEPS[currentStep - 1].description}
            </p>
          </div>

          {/* Step Component */}
          <div className="min-h-50">{renderStep()}</div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="h-9 rounded-lg border border-(--border) bg-(--btn) px-4 text-sm font-semibold text-(--text) hover:bg-(--btn-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← 이전
          </button>

          <div className="flex items-center gap-2">
            {/* Save as Draft */}
            <button
              type="button"
              className="h-9 rounded-lg border border-(--border) bg-(--btn) px-4 text-sm font-semibold text-(--text) hover:bg-(--btn-hover)"
            >
              임시저장
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="h-9 rounded-lg border border-[rgba(46,160,67,0.45)] bg-(--accent) px-4 text-sm font-semibold text-white hover:bg-(--accent-hover)"
              >
                다음 →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="h-9 rounded-lg border border-[rgba(46,160,67,0.45)] bg-(--accent) px-4 text-sm font-semibold text-white hover:bg-(--accent-hover)"
              >
                릴리즈 생성
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
