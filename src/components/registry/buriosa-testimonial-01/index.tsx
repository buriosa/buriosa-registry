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
    border: "#2A2A2A",
    starFilled: "#F59E0B",
    starEmpty: "#3A3A3A",
    quote: "#8B5CF6",
  },
  dark: {
    background: "#0A0A0A",
    cardBackground: "#1A1A1A",
    cardBackgroundHover: "#252525",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    accent: "#8B5CF6",
    border: "#2A2A2A",
    starFilled: "#F59E0B",
    starEmpty: "#3A3A3A",
    quote: "#8B5CF6",
  },
} as const;

const TESTIMONIALS = [
  {
    name: "김민수",
    title: "프론트엔드 개발자",
    company: "테크스타트업",
    avatar: "https://i.pravatar.cc/150?img=33",
    quote:
      "Buriosa를 사용한 후 매일의 작업을 체계적으로 기록하게 되었어요. 히트맵으로 꾸준함을 확인할 수 있어서 동기부여가 정말 크게 됩니다.",
    rating: 5,
  },
  {
    name: "이서연",
    title: "프로덕트 디자이너",
    company: "디자인랩",
    avatar: "https://i.pravatar.cc/150?img=45",
    quote:
      "주간 회고 기능이 특히 마음에 들어요. 지난 주를 돌아보고 다음 주를 계획하는 루틴이 자연스럽게 생겼습니다. UI도 아름답고 직관적이에요.",
    rating: 5,
  },
  {
    name: "박준혁",
    title: "백엔드 개발자",
    company: "AI 스타트업",
    avatar: "https://i.pravatar.cc/150?img=12",
    quote:
      "GitHub 스타일의 인터페이스가 익숙해서 바로 적응할 수 있었어요. API도 잘 되어있어서 자동화 스크립트 만들기 좋았습니다.",
    rating: 4,
  },
  {
    name: "정수진",
    title: "프리랜서 작가",
    company: "독립 크리에이터",
    avatar: "https://i.pravatar.cc/150?img=26",
    quote:
      "글쓰기 진행 상황을 추적하는데 완벽해요. 매일 얼마나 썼는지 한눈에 보이고, 통계로도 확인할 수 있어서 목표 달성에 도움이 됩니다.",
    rating: 5,
  },
  {
    name: "최동현",
    title: "스타트업 대표",
    company: "에듀테크",
    avatar: "https://i.pravatar.cc/150?img=52",
    quote:
      "팀원들과 함께 사용하고 있습니다. 각자의 진행 상황을 공유하고, 함께 성장하는 문화를 만드는데 큰 역할을 하고 있어요.",
    rating: 5,
  },
  {
    name: "한지우",
    title: "UX 리서처",
    company: "글로벌 IT 기업",
    avatar: "https://i.pravatar.cc/150?img=38",
    quote:
      "리서치 인사이트를 정리하고 패턴을 발견하는데 유용해요. 마크다운 지원 덕분에 깔끔하게 문서화할 수 있습니다.",
    rating: 4,
  },
] as const;

// ============================================================================
// END CUSTOMIZATION
// ============================================================================

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface ComponentProps {
  mode?: "light" | "dark";
}

export default function BuriosaTestimonial01({ mode = "dark" }: ComponentProps) {
  const colors = COLORS[mode];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        padding: "5rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
            사용자들의 이야기
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
            Buriosa와 함께 성장하고 있는 사용자들의 생생한 후기를 확인해보세요
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              colors={colors}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: (typeof TESTIMONIALS)[number];
  colors: typeof COLORS.light;
  index: number;
}

function TestimonialCard({ testimonial, colors, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
        position: "relative",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.cardBackgroundHover;
        e.currentTarget.style.borderColor = colors.accent;
        e.currentTarget.style.boxShadow = `0 8px 30px ${colors.accent}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.cardBackground;
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Quote Icon */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          opacity: 0.1,
        }}
      >
        <Quote size={48} style={{ color: colors.quote }} />
      </div>

      {/* Rating */}
      <div style={{ display: "flex", gap: "0.25rem" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            style={{
              color:
                star <= testimonial.rating
                  ? colors.starFilled
                  : colors.starEmpty,
              fill:
                star <= testimonial.rating
                  ? colors.starFilled
                  : colors.starEmpty,
            }}
          />
        ))}
      </div>

      {/* Quote Text */}
      <p
        style={{
          fontSize: "1rem",
          color: colors.text,
          lineHeight: "1.7",
          flexGrow: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        "{testimonial.quote}"
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: `linear-gradient(90deg, ${colors.accent}60, transparent)`,
        }}
      />

      {/* Author Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            overflow: "hidden",
            border: `2px solid ${colors.border}`,
            flexShrink: 0,
          }}
        >
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </motion.div>

        {/* Name & Title */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: colors.text,
              marginBottom: "0.25rem",
            }}
          >
            {testimonial.name}
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: colors.textSecondary,
            }}
          >
            {testimonial.title}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: colors.accent,
              marginTop: "0.125rem",
            }}
          >
            {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
