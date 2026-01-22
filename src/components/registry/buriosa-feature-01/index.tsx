"use client";

// ============================================================================
// CUSTOMIZATION - Edit these values to customize the component
// ============================================================================

const COLORS = {
  light: {
    background: "#0A0A0A",
    cardBackground: "#1A1A1A",
    cardBackgroundHover: "#252525",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    accent: "#8B5CF6",
    accentSecondary: "#10B981",
    accentTertiary: "#F59E0B",
    border: "#2A2A2A",
    iconBackground: "#2A2A2A",
    iconBackgroundHover: "#3A3A3A",
  },
  dark: {
    background: "#0A0A0A",
    cardBackground: "#1A1A1A",
    cardBackgroundHover: "#252525",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    accent: "#8B5CF6",
    accentSecondary: "#10B981",
    accentTertiary: "#F59E0B",
    border: "#2A2A2A",
    iconBackground: "#2A2A2A",
    iconBackgroundHover: "#3A3A3A",
  },
} as const;

const FEATURES = [
  {
    title: "Log Commit",
    description:
      "매일의 작업을 기록하고 커밋하세요. GitHub 스타일의 직관적인 인터페이스로 하루의 성과를 쉽게 남길 수 있습니다.",
    icon: "PenLine",
    iconColor: "#8B5CF6",
    details: ["일일 작업 기록", "마크다운 지원", "태그 및 카테고리", "빠른 검색"],
  },
  {
    title: "Heatmap",
    description:
      "한눈에 보는 활동 패턴. 연간 히트맵으로 꾸준함을 시각화하고, 데이터 기반 인사이트를 얻으세요.",
    icon: "BarChart3",
    iconColor: "#10B981",
    details: [
      "연간 활동 히트맵",
      "통계 대시보드",
      "목표 달성률",
      "성과 추이 분석",
    ],
  },
  {
    title: "Weekly Review",
    description:
      "주간 회고를 통해 성장하세요. 이번 주의 하이라이트를 정리하고, 다음 주 목표를 설정할 수 있습니다.",
    icon: "Sparkles",
    iconColor: "#F59E0B",
    details: [
      "주간 요약 리포트",
      "자동 하이라이트 추출",
      "회고 템플릿",
      "목표 설정 및 추적",
    ],
  },
] as const;

// ============================================================================
// END CUSTOMIZATION
// ============================================================================

import { PenLine, BarChart3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ComponentProps {
  mode?: "light" | "dark";
}

const ICON_MAP = {
  PenLine,
  BarChart3,
  Sparkles,
} as const;

export default function BuriosaFeature01({ mode = "dark" }: ComponentProps) {
  const colors = COLORS[mode];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        padding: "5rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
            왜 Buriosa인가요?
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: colors.textSecondary,
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            기록, 시각화, 회고까지. 생산성을 높이는 세 가지 핵심 기능을
            경험하세요.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              colors={colors}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: (typeof FEATURES)[number];
  colors: typeof COLORS.light;
  index: number;
}

function FeatureCard({ feature, colors, index }: FeatureCardProps) {
  const IconComponent = ICON_MAP[feature.icon as keyof typeof ICON_MAP];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      style={{
        backgroundColor: colors.cardBackground,
        border: `1px solid ${colors.border}`,
        borderRadius: "1rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.cardBackgroundHover;
        e.currentTarget.style.borderColor = feature.iconColor;
        e.currentTarget.style.boxShadow = `0 8px 30px ${feature.iconColor}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.cardBackground;
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        style={{
          width: "64px",
          height: "64px",
          backgroundColor: colors.iconBackground,
          borderRadius: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${feature.iconColor}20`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.iconBackground;
        }}
      >
        <IconComponent
          size={32}
          style={{
            color: feature.iconColor,
            strokeWidth: 2,
          }}
        />
      </motion.div>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: colors.text,
          marginTop: "0.5rem",
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "1rem",
          color: colors.textSecondary,
          lineHeight: "1.7",
          flexGrow: 1,
        }}
      >
        {feature.description}
      </p>

      {/* Details List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {feature.details.map((detail, detailIndex) => (
          <motion.li
            key={detailIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + detailIndex * 0.05 }}
            style={{
              fontSize: "0.875rem",
              color: colors.textSecondary,
              paddingLeft: "1rem",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                width: "4px",
                height: "4px",
                backgroundColor: feature.iconColor,
                borderRadius: "50%",
              }}
            />
            {detail}
          </motion.li>
        ))}
      </ul>

      {/* Hover Gradient Line */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, ${feature.iconColor}, transparent)`,
          borderRadius: "1px",
          marginTop: "0.5rem",
        }}
      />
    </motion.div>
  );
}
