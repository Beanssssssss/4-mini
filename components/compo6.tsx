"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

type Stage = "loading" | "countdown" | "chimchim" | "result";

export default function Compo6() {
    const [winner, setWinner] = useState<number | null>(null);
    const [stage, setStage] = useState<Stage>("loading");
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const calculateWinner = async () => {
            const { data: votes } = await supabase.from("votes").select("team");
            if (votes && votes.length > 0) {
                const counts = [0, 0, 0, 0, 0];
                votes.forEach((v) => {
                    if (v.team >= 1 && v.team <= 5) counts[v.team - 1]++;
                });

                const max = Math.max(...counts);
                const bestTeamIndex = counts.indexOf(max);
                setWinner(bestTeamIndex + 1);
            }

            // 데이터 로드 후 1초 뒤 카운트다운 진입
            setTimeout(() => {
                setStage("countdown");
            }, 1000);
        };

        calculateWinner();
    }, []);

    // 단계별 전환 타이머
    useEffect(() => {
        if (stage === "countdown") {
            if (countdown > 0) {
                const timer = setTimeout(() => {
                    setCountdown(countdown - 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => {
                    setStage("chimchim");
                }, 0);
                return () => clearTimeout(timer);
            }
        } else if (stage === "chimchim") {
            const timer = setTimeout(() => {
                setStage("result");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [stage, countdown]);

    return (
        <section id="hackathon-winner" className="snap-start relative min-h-[100dvh] w-full flex items-center justify-center bg-zinc-950 border-t border-[#222] px-4 py-14 overflow-hidden text-white sm:px-6 sm:py-20">
            <div className="relative z-10 w-full max-w-3xl text-center flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    {stage === "loading" && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center gap-6"
                        >
                            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#333] border-t-white" />
                            <h2 className="text-xl font-bold tracking-tight text-zinc-400">집계 중입니다</h2>
                        </motion.div>
                    )}

                    {stage === "countdown" && (
                        <motion.div
                            key="countdown"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 2 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] font-bold leading-none tracking-tighter">
                                {countdown > 0 ? countdown : "!"}
                            </div>
                        </motion.div>
                    )}

                    {stage === "chimchim" && (
                        <motion.div
                            key="chimchim"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 rounded-3xl bg-white opacity-20 blur group-hover:opacity-40 transition duration-1000"></div>
                                <Image
                                    src="/chimchim.webp"
                                    alt="Chimchim Calm Down"
                                    width={400}
                                    height={400}
                                    className="relative h-auto w-[220px] rounded-3xl border border-white/10 shadow-2xl grayscale-[20%] sm:w-[300px] md:w-[360px]"
                                />
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                                침착하세요...
                            </h2>
                        </motion.div>
                    )}

                    {stage === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                damping: 15,
                                stiffness: 100
                            }}
                            className="flex flex-col items-center"
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mb-6 text-sm font-bold uppercase tracking-widest text-zinc-500"
                            >
                                Winner
                            </motion.span>

                            <h3 className="text-[3.2rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none tracking-tighter drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                Team {winner}
                            </h3>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="mt-10 sm:mt-16"
                            >
                                <div className="rounded-full bg-white px-7 py-3 text-base font-black text-black sm:px-10 sm:py-4 sm:text-lg">
                                    축하합니다!
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 배경 은은한 효과 */}
            <div className={`pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-[0.03] blur-[120px] transition-all duration-1000 ${stage === 'result' ? 'scale-150 opacity-[0.07]' : ''}`} />
        </section>
    );
}
