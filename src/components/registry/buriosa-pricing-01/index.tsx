"use client";

// ============================================================================
// CUSTOMIZATION - Edit these values to customize the component
// ============================================================================

const COLORS = {
  light: {
    background: "#0A0A0A",
    cardBackground: "#1A1A1A",
    cardBackgroundHover: "#252525",
    popularBackground: "#2A1A35",
    popularBackgroundHover: "#352040",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    accent: "#8B5CF6",
    accentHover: "#7C3AED",
    border: "#2A2A2A",
    popularBorder: "#8B5CF6",
    checkmark: "#10B981",
  },
  dark: {
    background: "#0A0A0A",
    cardBackground: "#1A1A1A",
    cardBackgroundHover: "#252525",
    popularBackground: "#2A1A35",
    popularBackgroundHover: "#352040",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    accent: "#8B5CF6",
    accentHover: "#7C3AED",
    border: "#2A2A2A",
    popularBorder: "#8B5CF6",
    checkmark: "#10B981",
  },
} as const;

const PRICING_TIERS = [
  {
    name: "Free",
    price: "₩0",
    period: "/월",
    description: "개인 프로젝트를 시작하는 분들을 위한 무료 플랜",
    features: [
      "최대 3개 프로젝트",
      "1GB 스토리지",
      "커뮤니티 지원",
      "기본 분석",
      "월 1,000회 API 호출",
    ],
    cta: {
      text: "시작하기",
      href: "#free",
    },
    popular: false,
  },
  {
    name: "Pro",
    price: "₩29,000",
    period: "/월",
    description: "성장하는 팀과 비즈니스를 위한 전문가 플랜",
    features: [
      "무제한 프로젝트",
      "100GB 스토리지",
      "우선 지원 (24시간 이내)",
      "고급 분석 및 인사이트",
      "월 100,000회 API 호출",
      "커스텀 도메인",
      "팀 협업 도구",
      "자동 백업",
    ],
    cta: {
      text: "Pro 시작하기",
      href: "#pro",
    },
    popular: true,
  },
  {
    name: "Enterprise",
    price: "맞춤 견적",
    period: "",
    description: "대규모 조직을 위한 엔터프라이즈 솔루션",
    features: [
      "무제한 프로젝트 및 스토리지",
      "전담 계정 관리자",
      "24/7 프리미엄 지원",
      "맞춤형 솔루션",
      "무제한 API 호출",
      "SSO 및 고급 보안",
      "SLA 보장",
      "온프레미스 옵션",
    ],
    cta: {
      text: "영업팀 문의",
      href: "#enterprise",
    },
    popular: false,
  },
] as const;

// ============================================================================
// END CUSTOMIZATION
// ============================================================================

import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface ComponentProps {
  mode?: "light" | "dark";
}

export default function BuriosaPricing01({ mode = "dark" }: ComponentProps) {
  const colors = COLORS[mode];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        padding: "4rem 1rem",
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
            요금제 선택
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: colors.textSecondary,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            프로젝트 규모에 맞는 최적의 플랜을 선택하세요
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {PRICING_TIERS.map((tier, index) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              colors={colors}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  tier: (typeof PRICING_TIERS)[number];
  colors: typeof COLORS.light;
  index: number;
}

function PricingCard({ tier, colors, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      style={{
        position: "relative",
        backgroundColor: tier.popular
          ? colors.popularBackground
          : colors.cardBackground,
        border: `2px solid ${tier.popular ? colors.popularBorder : colors.border}`,
        borderRadius: "1rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        boxShadow: tier.popular
          ? `0 0 40px ${colors.accent}40`
          : "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: colors.accent,
            color: colors.text,
            padding: "0.5rem 1.5rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: "600",
            boxShadow: `0 4px 12px ${colors.accent}60`,
          }}
        >
          인기
        </motion.div>
      )}

      {/* Tier Name */}
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: colors.text,
          marginBottom: "0.5rem",
          marginTop: tier.popular ? "1rem" : "0",
        }}
      >
        {tier.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "0.875rem",
          color: colors.textSecondary,
          marginBottom: "1.5rem",
          minHeight: "2.5rem",
        }}
      >
        {tier.description}
      </p>

      {/* Price */}
      <div style={{ marginBottom: "2rem" }}>
        <span
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            color: colors.text,
            lineHeight: "1",
          }}
        >
          {tier.price}
        </span>
        {tier.period && (
          <span
            style={{
              fontSize: "1rem",
              color: colors.textSecondary,
              marginLeft: "0.25rem",
            }}
          >
            {tier.period}
          </span>
        )}
      </div>

      {/* CTA Button */}
      <motion.a
        href={tier.cta.href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: "block",
          width: "100%",
          padding: "1rem",
          backgroundColor: tier.popular ? colors.accent : "transparent",
          border: `2px solid ${colors.accent}`,
          color: colors.text,
          textAlign: "center",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          fontWeight: "600",
          textDecoration: "none",
          marginBottom: "2rem",
          transition: "all 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          if (!tier.popular) {
            e.currentTarget.style.backgroundColor = colors.accent;
          } else {
            e.currentTarget.style.backgroundColor = colors.accentHover;
          }
        }}
        onMouseLeave={(e) => {
          if (!tier.popular) {
            e.currentTarget.style.backgroundColor = "transparent";
          } else {
            e.currentTarget.style.backgroundColor = colors.accent;
          }
        }}
      >
        {tier.cta.text}
      </motion.a>

      {/* Features List */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, flexGrow: 1 }}>
        {tier.features.map((feature, featureIndex) => (
          <motion.li
            key={featureIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + featureIndex * 0.05 }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <Check
              size={20}
              style={{
                color: colors.checkmark,
                flexShrink: 0,
                marginTop: "0.125rem",
              }}
            />
            <span
              style={{
                fontSize: "0.9375rem",
                color: colors.text,
                lineHeight: "1.5",
              }}
            >
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
