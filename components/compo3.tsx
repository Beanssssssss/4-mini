"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const TARGET_DATE = new Date("2026-04-09T20:30:00+09:00");
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
export default function Compo3() {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        setMounted(true);

        const calculateTimeLeft = () => {
            const difference = TARGET_DATE.getTime() - Date.now();
            return Math.max(0, Math.floor(difference / 1000));
        };

        setTimeLeft(calculateTimeLeft());

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const getStatus = () => {
        if (timeLeft <= 10 * 60) return "emergency";
        if (timeLeft <= 20 * 60) return "critical";
        if (timeLeft <= 30 * 60) return "warning";
        return "normal";
    };

    const status = getStatus();

    const theme = {
        normal: {
            bg: "bg-white",
            text: "text-slate-900",
            accent: "bg-slate-100",
            label: "TIMER",
        },
        warning: {
            bg: "bg-amber-50",
            text: "text-amber-900",
            accent: "bg-amber-100",
            label: "30 MIN LEFT",
        },
        critical: {
            bg: "bg-orange-50",
            text: "text-orange-900",
            accent: "bg-orange-100",
            label: "20 MIN LEFT",
        },
        emergency: {
            bg: "bg-red-50",
            text: "text-red-900",
            accent: "bg-red-100",
            label: "CRITICAL: < 10 MIN",
        },
    }[status];

    return (
        <section
            className={`snap-start relative h-[100dvh] w-full overflow-hidden transition-colors duration-1000 ${theme.bg}`}
        >
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="absolute left-4 top-6 z-20 flex items-center gap-2 sm:left-6 sm:top-8 lg:left-8 lg:top-10"
            >
                <PopcornLogo className="h-5 w-5" />
                <span className="text-base font-bold text-[#1a1a1a]">Hateslop 4th</span>
            </motion.header>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 py-8 sm:px-6"
            >
                {/* Status Label */}
                <motion.div
                    key={status}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`mb-5 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] sm:text-xs sm:tracking-widest ${theme.accent} ${theme.text} border border-black/5 shadow-sm`}
                >
                    {theme.label}
                </motion.div>

                {/* Timer Display */}
                <div className="relative">
                    {status === "emergency" && (
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full"
                        />
                    )}
                    <motion.h2
                        className={`text-center font-mono text-5xl font-black tracking-tighter sm:text-7xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] ${theme.text} drop-shadow-2xl`}
                        animate={status === "emergency" ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        {mounted ? formatTime(timeLeft) : "00:00:00"}
                    </motion.h2>
                </div>

                {/* Target Date Info */}
                <div className="mt-7 flex flex-col items-center opacity-50">
                    <span className="text-[11px] font-medium tracking-[0.18em] uppercase sm:text-sm sm:tracking-widest">Target Time</span>
                    <span className="text-base font-bold sm:text-lg">2026. 04. 09. 20:30 (KST)</span>
                </div>
            </motion.div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100">
                <motion.div
                    className={`h-full ${status === "emergency" ? "bg-red-500" : "bg-slate-900"}`}
                    initial={{ width: "100%" }}
                    animate={{ width: "100%" }} // Not a relative progress anymore as target is fixed
                    transition={{ duration: 1 }}
                />
            </div>
        </section>
    );
}
