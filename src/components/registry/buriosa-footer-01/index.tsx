"use client";

// ============================================================================
// CUSTOMIZATION - Edit these values to customize the component
// ============================================================================

const COLORS = {
  light: {
    background: "#0A0A0A",
    backgroundSecondary: "#111111",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    textMuted: "#6B6B6B",
    accent: "#8B5CF6",
    accentHover: "#7C3AED",
    border: "#2A2A2A",
    inputBackground: "#1A1A1A",
  },
  dark: {
    background: "#0A0A0A",
    backgroundSecondary: "#111111",
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    textMuted: "#6B6B6B",
    accent: "#8B5CF6",
    accentHover: "#7C3AED",
    border: "#2A2A2A",
    inputBackground: "#1A1A1A",
  },
} as const;

const BRAND = {
  name: "Buriosa",
  tagline: "매일의 기록이 성장이 되는 곳",
  logo: null, // Set to image URL if available
} as const;

const FOOTER_LINKS = {
  product: {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "API Docs", href: "#api" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Press Kit", href: "#press" },
      { label: "Contact", href: "#contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "GDPR", href: "#gdpr" },
    ],
  },
} as const;

const SOCIAL_LINKS = [
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { name: "GitHub", href: "https://github.com", icon: "github" },
  { name: "Discord", href: "https://discord.com", icon: "discord" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
] as const;

// ============================================================================
// END CUSTOMIZATION
// ============================================================================

import { useState } from "react";
import { motion } from "framer-motion";

interface ComponentProps {
  mode?: "light" | "dark";
}

export default function BuriosaFooter01({ mode = "dark" }: ComponentProps) {
  const colors = COLORS[mode];
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: colors.background,
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: "span 1" }}>
            {/* Logo */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: colors.text,
                  letterSpacing: "-0.02em",
                }}
              >
                {BRAND.name}
              </span>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontSize: "0.875rem",
                color: colors.textSecondary,
                lineHeight: "1.6",
                marginBottom: "1.5rem",
              }}
            >
              {BRAND.tagline}
            </p>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    backgroundColor: colors.inputBackground,
                    borderRadius: "0.5rem",
                    color: colors.textSecondary,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.accent;
                    e.currentTarget.style.color = colors.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.inputBackground;
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                  aria-label={social.name}
                >
                  <SocialIcon name={social.icon} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <FooterLinkColumn
            title={FOOTER_LINKS.product.title}
            links={FOOTER_LINKS.product.links}
            colors={colors}
          />

          {/* Company Links */}
          <FooterLinkColumn
            title={FOOTER_LINKS.company.title}
            links={FOOTER_LINKS.company.links}
            colors={colors}
          />

          {/* Legal Links */}
          <FooterLinkColumn
            title={FOOTER_LINKS.legal.title}
            links={FOOTER_LINKS.legal.links}
            colors={colors}
          />

          {/* Newsletter Column */}
          <div>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: colors.text,
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Newsletter
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: colors.textSecondary,
                lineHeight: "1.6",
                marginBottom: "1rem",
              }}
            >
              최신 업데이트와 소식을 받아보세요.
            </p>

            <form onSubmit={handleSubscribe}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소"
                  required
                  style={{
                    padding: "0.75rem 1rem",
                    backgroundColor: colors.inputBackground,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "0.5rem",
                    color: colors.text,
                    fontSize: "0.875rem",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "0.75rem 1rem",
                    backgroundColor: isSubscribed ? "#10B981" : colors.accent,
                    color: colors.text,
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubscribed) {
                      e.currentTarget.style.backgroundColor = colors.accentHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubscribed) {
                      e.currentTarget.style.backgroundColor = colors.accent;
                    }
                  }}
                >
                  {isSubscribed ? "구독 완료!" : "구독하기"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          backgroundColor: colors.backgroundSecondary,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: colors.textMuted,
            }}
          >
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: colors.textMuted,
              }}
            >
              Made with ♥ in Korea
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkColumnProps {
  title: string;
  links: readonly { label: string; href: string }[];
  colors: typeof COLORS.light;
}

function FooterLinkColumn({ title, links, colors }: FooterLinkColumnProps) {
  return (
    <div>
      <h3
        style={{
          fontSize: "0.875rem",
          fontWeight: "600",
          color: colors.text,
          marginBottom: "1.25rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {links.map((link) => (
          <li key={link.label} style={{ marginBottom: "0.75rem" }}>
            <a
              href={link.href}
              style={{
                fontSize: "0.875rem",
                color: colors.textSecondary,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textSecondary;
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SocialIconProps {
  name: string;
}

function SocialIcon({ name }: SocialIconProps) {
  const size = 18;

  switch (name) {
    case "twitter":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "discord":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return null;
  }
}
