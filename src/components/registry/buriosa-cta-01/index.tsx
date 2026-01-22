"use client";

// ============================================================================
// CUSTOMIZATION - Edit these values to customize the component
// ============================================================================

const COLORS = {
  light: {
    background: "#0A0A0A",
    gradientFrom: "#8B5CF6",
    gradientVia: "#6D28D9",
    gradientTo: "#4C1D95",
    text: "#FFFFFF",
    textSecondary: "#E0E0E0",
    primaryButton: "#8B5CF6",
    primaryButtonHover: "#7C3AED",
    primaryButtonText: "#FFFFFF",
    secondaryButton: "transparent",
    secondaryButtonBorder: "#8B5CF6",
    secondaryButtonHover: "#8B5CF610",
    secondaryButtonText: "#8B5CF6",
    glowColor: "#8B5CF6",
  },
  dark: {
    background: "#0A0A0A",
    gradientFrom: "#8B5CF6",
    gradientVia: "#6D28D9",
    gradientTo: "#4C1D95",
    text: "#FFFFFF",
    textSecondary: "#E0E0E0",
    primaryButton: "#8B5CF6",
    primaryButtonHover: "#7C3AED",
    primaryButtonText: "#FFFFFF",
    secondaryButton: "transparent",
    secondaryButtonBorder: "#8B5CF6",
    secondaryButtonHover: "#8B5CF610",
    secondaryButtonText: "#8B5CF6",
    glowColor: "#8B5CF6",
  },
} as const;

const CONTENT = {
  badge: "✨ 지금 시작하세요",
  headline: "생산성을 높이는 가장 쉬운 방법",
  subtext:
    "Buriosa와 함께 매일의 기록을 시각화하고, 꾸준한 성장을 경험하세요. 무료로 시작해보세요.",
  primaryCta: {
    text: "무료로 시작하기",
    href: "#signup",
  },
  secondaryCta: {
    text: "데모 보기",
    href: "#demo",
  },
  stats: [
    { label: "활성 사용자", value: "10,000+" },
    { label: "일일 커밋", value: "50,000+" },
    { label: "만족도", value: "98%" },
  ],
} as const;

// ============================================================================
// END CUSTOMIZATION
// ============================================================================

import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

interface ComponentProps {
  mode?: "light" | "dark";
}

export default function BuriosaCta01({ mode = "dark" }: ComponentProps) {
  const colors = COLORS[mode];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        padding: "6rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Gradient Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: `radial-gradient(circle, ${colors.glowColor}20 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "300px",
          height: "300px",
          background: `radial-gradient(circle, ${colors.gradientFrom}40 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, ${colors.gradientTo}30 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Content Container */}
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1.5rem",
              backgroundColor: `${colors.primaryButton}20`,
              border: `1px solid ${colors.primaryButton}40`,
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: colors.text,
              backdropFilter: "blur(10px)",
            }}
          >
            {CONTENT.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: "800",
            color: colors.text,
            textAlign: "center",
            marginBottom: "1.5rem",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.textSecondary} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {CONTENT.headline}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "1.25rem",
            color: colors.textSecondary,
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 3rem",
            lineHeight: "1.7",
          }}
        >
          {CONTENT.subtext}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "4rem",
          }}
        >
          {/* Primary Button */}
          <motion.a
            href={CONTENT.primaryCta.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 2.5rem",
              backgroundColor: colors.primaryButton,
              color: colors.primaryButtonText,
              fontSize: "1.125rem",
              fontWeight: "600",
              borderRadius: "0.75rem",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: `0 8px 30px ${colors.glowColor}60`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryButtonHover;
              e.currentTarget.style.boxShadow = `0 12px 40px ${colors.glowColor}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryButton;
              e.currentTarget.style.boxShadow = `0 8px 30px ${colors.glowColor}60`;
            }}
          >
            {CONTENT.primaryCta.text}
            <ArrowRight size={20} />
          </motion.a>

          {/* Secondary Button */}
          <motion.a
            href={CONTENT.secondaryCta.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 2.5rem",
              backgroundColor: colors.secondaryButton,
              border: `2px solid ${colors.secondaryButtonBorder}`,
              color: colors.secondaryButtonText,
              fontSize: "1.125rem",
              fontWeight: "600",
              borderRadius: "0.75rem",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                colors.secondaryButtonHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.secondaryButton;
            }}
          >
            <Play size={20} fill="currentColor" />
            {CONTENT.secondaryCta.text}
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "3rem",
            padding: "2rem",
            borderTop: `1px solid ${colors.primaryButton}20`,
          }}
        >
          {CONTENT.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: colors.text,
                  marginBottom: "0.5rem",
                  background: `linear-gradient(135deg, ${colors.primaryButton} 0%, ${colors.gradientVia} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
