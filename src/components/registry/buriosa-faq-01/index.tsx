"use client";

// ============================================================================
// CUSTOMIZATION - Edit these values to customize the component
// ============================================================================

const COLORS = {
  light: {
    background: "#0A0A0A",
    cardBackground: "#1A1A1A",
    cardBackgroundHover: "#252525",
    cardBackgroundOpen: "#1F1F1F",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    accent: "#8B5CF6",
    border: "#2A2A2A",
    borderHover: "#3A3A3A",
    iconBackground: "#2A2A2A",
  },
  dark: {
    background: "#0A0A0A",
    cardBackground: "#1A1A1A",
    cardBackgroundHover: "#252525",
    cardBackgroundOpen: "#1F1F1F",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    accent: "#8B5CF6",
    border: "#2A2A2A",
    borderHover: "#3A3A3A",
    iconBackground: "#2A2A2A",
  },
} as const;

const FAQ_ITEMS = [
  {
    question: "Buriosa는 무료로 사용할 수 있나요?",
    answer:
      "네, 기본 기능은 완전 무료로 사용할 수 있습니다. 무료 플랜에서는 최대 3개의 프로젝트와 1GB 스토리지를 제공합니다. 더 많은 기능이 필요하시면 Pro 또는 Enterprise 플랜을 확인해보세요.",
  },
  {
    question: "데이터는 어떻게 저장되나요?",
    answer:
      "모든 데이터는 AWS 서울 리전에 암호화되어 안전하게 저장됩니다. 우리는 AES-256 암호화를 사용하며, 매일 자동 백업이 수행됩니다. 또한 GDPR 및 개인정보보호법을 준수합니다.",
  },
  {
    question: "팀원들과 함께 사용할 수 있나요?",
    answer:
      "물론입니다! Pro 플랜부터 팀 협업 기능을 지원합니다. 팀원을 초대하고, 함께 프로젝트를 관리하고, 각자의 진행 상황을 공유할 수 있습니다. Enterprise 플랜에서는 무제한 팀원 초대가 가능합니다.",
  },
  {
    question: "모바일에서도 사용할 수 있나요?",
    answer:
      "네, Buriosa는 반응형 웹으로 제작되어 모바일 브라우저에서도 완벽하게 작동합니다. iOS와 Android 네이티브 앱도 현재 개발 중이며, 2024년 상반기 출시 예정입니다.",
  },
  {
    question: "API를 통해 연동할 수 있나요?",
    answer:
      "예, RESTful API와 Webhook을 제공합니다. Pro 플랜에서는 월 100,000회, Enterprise 플랜에서는 무제한 API 호출이 가능합니다. 상세한 API 문서는 개발자 포털에서 확인하실 수 있습니다.",
  },
  {
    question: "구독을 취소하면 데이터는 어떻게 되나요?",
    answer:
      "구독 취소 후에도 30일간 모든 데이터가 유지됩니다. 이 기간 내에 언제든 다시 구독하시면 기존 데이터를 그대로 사용할 수 있습니다. 30일이 지나면 데이터가 삭제되며, 삭제 전에 이메일로 안내해 드립니다.",
  },
] as const;

// ============================================================================
// END CUSTOMIZATION
// ============================================================================

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ComponentProps {
  mode?: "light" | "dark";
}

export default function BuriosaFaq01({ mode = "dark" }: ComponentProps) {
  const colors = COLORS[mode];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        padding: "5rem 1rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            자주 묻는 질문
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: colors.textSecondary,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Buriosa에 대해 궁금한 점이 있으신가요? 자주 묻는 질문들을 확인해보세요.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleItem(index)}
              colors={colors}
              index={index}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: "3rem",
            padding: "2rem",
            backgroundColor: colors.cardBackground,
            border: `1px solid ${colors.border}`,
            borderRadius: "1rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: colors.textSecondary, marginBottom: "1rem" }}>
            원하는 답변을 찾지 못하셨나요?
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: colors.accent,
              color: colors.text,
              fontSize: "0.875rem",
              fontWeight: "600",
              borderRadius: "0.5rem",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            문의하기
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  colors: typeof COLORS.light;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, colors, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{
        backgroundColor: isOpen ? colors.cardBackgroundOpen : colors.cardBackground,
        border: `1px solid ${isOpen ? colors.accent : colors.border}`,
        borderRadius: "0.75rem",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (!isOpen) {
          e.currentTarget.style.borderColor = colors.borderHover;
          e.currentTarget.style.backgroundColor = colors.cardBackgroundHover;
        }
      }}
      onMouseLeave={(e) => {
        if (!isOpen) {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.backgroundColor = colors.cardBackground;
        }
      }}
    >
      {/* Question Button */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.25rem 1.5rem",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: isOpen ? colors.accent : colors.text,
            lineHeight: "1.5",
            transition: "color 0.2s ease",
          }}
        >
          {question}
        </span>

        {/* Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            backgroundColor: isOpen ? colors.accent : colors.iconBackground,
            borderRadius: "0.5rem",
            flexShrink: 0,
            transition: "background-color 0.2s ease",
          }}
        >
          {isOpen ? (
            <Minus size={18} style={{ color: colors.text }} />
          ) : (
            <Plus size={18} style={{ color: colors.textSecondary }} />
          )}
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 1.5rem 1.5rem 1.5rem",
              }}
            >
              <div
                style={{
                  paddingTop: "0.5rem",
                  borderTop: `1px solid ${colors.border}`,
                }}
              >
                <p
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.9375rem",
                    color: colors.textSecondary,
                    lineHeight: "1.7",
                  }}
                >
                  {answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
