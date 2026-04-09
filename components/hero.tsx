"use client";

// ============================================================================
// CUSTOMIZATION - 이 섹션의 값들을 수정하여 프로젝트에 맞게 조정하세요
// ============================================================================

const COLORS = {
  light: {
    background: "#F7F7F7",
    buttonPrimary: "#4d4d4d",
    buttonPrimaryHover: "#333",
    tagBg: "#ECECEA",
  },
} as const;

const IMAGES = {
  phoneClouds: {
    path: "/registry/popcorn-manifesto-hero/phone-clouds.png",
    alt: "Smartphone floating in clouds",
    prompt: `Smartphone floating in ethereal clouds.
Style: Dreamlike, conceptual product photography
Layout: Phone centered, surrounded by soft clouds
Composition: Surreal, floating aesthetic
Color palette: Soft pastels, dreamy atmosphere
Mood: Innovative, aspirational, cloud-based
Technical: High quality, artistic composition`,
  },
} as const;

// ============================================================================
// END CUSTOMIZATION
// ============================================================================

import { motion } from "motion/react";
import Image from "next/image";

interface PopcornManifestoHeroProps {
  mode?: "light";
  logoText?: string;
  navItems?: { label: string; isActive?: boolean }[];
  signUpText?: string;
  tagText?: string;
  headingLine1?: string;
  headingLine2?: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  onSignUpClick?: () => void;
  onNavItemClick?: (label: string) => void;
}

// Popcorn Logo Icon
function PopcornLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="6" height="6" rx="1" fill="#1a1a1a" />
      <rect x="14" y="4" width="6" height="6" rx="1" fill="#1a1a1a" />
      <rect x="4" y="14" width="6" height="6" rx="1" fill="#1a1a1a" />
      <rect x="14" y="14" width="6" height="6" rx="1" fill="#1a1a1a" />
    </svg>
  );
}

// Navigation Component
function Navigation({
  logoText,
  navItems,
  signUpText,
  onSignUpClick,
  onNavItemClick,
  colors,
}: {
  logoText: string;
  navItems: { label: string; isActive?: boolean }[];
  signUpText: string;
  onSignUpClick?: () => void;
  onNavItemClick?: (label: string) => void;
  colors: typeof COLORS.light;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-5"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <PopcornLogo className="h-5 w-5" />
        <span className="text-base font-bold text-[#1a1a1a]">{logoText}</span>
      </div>
    </motion.header>
  );
}

// Main Component
export default function PopcornManifestoHero({
  mode = "light",
  logoText = "Hateslop 4th",
  navItems = [
    { label: "Home" },
    { label: "Manifesto", isActive: true },
    { label: "Research" },
    { label: "Careers" },
  ],
  signUpText = "Sign up",
  tagText = "Our promise",
  headingLine1 = "Tomorrow's",
  headingLine2 = "Telecom",
  descriptionLine1 = "Our mission is to provide exceptional global",
  descriptionLine2 = "connectivity, to enhance humanity's potential.",
  heroImageSrc = "/registry/popcorn-manifesto-hero/phone-clouds.png",
  heroImageAlt = "Smartphone floating in clouds",
  onSignUpClick,
  onNavItemClick,
}: PopcornManifestoHeroProps) {
  const colors = COLORS[mode];

  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-hidden lg:h-[100dvh]"
      style={{ backgroundColor: colors.background }}
    >
      {/* Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <Navigation
          logoText={logoText}
          navItems={navItems}
          signUpText={signUpText}
          onSignUpClick={onSignUpClick}
          onNavItemClick={onNavItemClick}
          colors={colors}
        />

        {/* Hero Content */}
        <div className="flex flex-col items-center pt-20 text-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span
              className="inline-block rounded-full px-5 py-2 text-sm font-bold tracking-wide text-[#fff]"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              Timeline
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl font-extrabold leading-[1.2] tracking-tight text-[#1a1a1a] sm:text-6xl lg:text-7xl"
          >
            HateSlop 4th
            <br />
            Mini Hackathon
          </motion.h1>

          {/* Timeline Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex w-full max-w-lg flex-col gap-4 text-left"
          >
            <div className="flex items-center justify-between gap-6 overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="flex flex-col">
                <strong className="mt-1 text-xl font-bold text-gray-900">에이전트 구현</strong>
              </div>
              <div className="rounded-full bg-gray-100 px-4 py-2 font-mono text-sm font-semibold text-gray-600">
                19:00 - 20:30
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="flex flex-col">
                <strong className="mt-1 text-xl font-bold text-gray-900">발표</strong>
              </div>
              <div className="rounded-full bg-gray-100 px-4 py-2 font-mono text-sm font-semibold text-gray-600">
                20:30 - 21:00
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
