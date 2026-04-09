"use client";

import { motion } from "motion/react";
import Image from "next/image";

const COLORS = {
  light: {
    background: "#F7F7F7",
  },
} as const;

function PopcornLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="6" height="6" rx="1" fill="#1a1a1a" />
      <rect x="14" y="4" width="6" height="6" rx="1" fill="#1a1a1a" />
      <rect x="4" y="14" width="6" height="6" rx="1" fill="#1a1a1a" />
      <rect x="14" y="14" width="6" height="6" rx="1" fill="#1a1a1a" />
    </svg>
  );
}

/** `hero.tsx`와 동일한 비주얼 시스템 + 1등 상품 이미지 */
export default function Compo1() {
  const colors = COLORS.light;

  return (
    <section
      className="snap-start relative min-h-[100dvh] w-full overflow-hidden border-t border-black/5"
      style={{ backgroundColor: colors.background }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between py-5"
        >
          <div className="flex items-center gap-2">
            <PopcornLogo className="h-5 w-5" />
            <span className="text-base font-bold text-[#1a1a1a]">Hateslop 4th</span>
          </div>
        </motion.header>

        <div className="flex flex-col items-center pb-16 pt-8 text-center sm:pb-20 sm:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span
              className="inline-block rounded-full px-5 py-2 text-sm font-bold tracking-wide text-white"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              Prize
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl font-extrabold leading-[1.2] tracking-tight text-[#1a1a1a] sm:text-6xl lg:text-7xl"
          >
            1등 상품
          </motion.h2>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 w-full max-w-lg overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-6"
          >
            <Image
              src="/stb.jpg"
              alt="1등 상품"
              width={900}
              height={900}
              className="h-auto w-full rounded-xl object-contain"
              sizes="(max-width: 768px) 100vw, 32rem"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
