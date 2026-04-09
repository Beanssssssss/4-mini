"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "motion/react";
import Compo6 from "./compo6";

const TOTAL_PARTICIPANTS = 27;

export default function Compo5() {
    const [votedUsers, setVotedUsers] = useState(0);

    const isFinished = votedUsers >= TOTAL_PARTICIPANTS;

    useEffect(() => {
        const fetchResults = async () => {
            const { count: voted } = await supabase
                .from("users")
                .select("*", { count: "exact", head: true })
                .eq("voted", true);

            setVotedUsers(voted || 0);
        };

        fetchResults();

        const interval = setInterval(fetchResults, 3000);
        return () => clearInterval(interval);
    }, []);

    const turnoutPercentage = Math.min(
        100,
        Math.round((votedUsers / TOTAL_PARTICIPANTS) * 100)
    );

    useEffect(() => {
        if (isFinished) {
            setTimeout(() => {
                document.getElementById("hackathon-winner")?.scrollIntoView({ behavior: "smooth" });
            }, 800);
        }
    }, [isFinished]);

    return (
        <>
            <section id="hackathon-turnout" className="snap-start relative h-[100dvh] w-full flex flex-col items-center justify-center bg-[#111] border-t border-[#222] px-4 py-8 sm:px-6">
                <div className="relative z-10 text-center max-w-6xl w-full">
                    <div className="mx-auto w-full max-w-lg flex flex-col items-center justify-center rounded-3xl bg-[#1a1a1a] p-7 border border-[#333] sm:p-10 md:p-12">
                        <span className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400 sm:text-xs sm:tracking-[0.3em]">
                            Turnout
                        </span>
                        <div className="mb-7 flex items-baseline justify-center gap-1 sm:mb-8">
                            <span className="text-[4rem] font-bold leading-none text-white tracking-tighter sm:text-[5rem] md:text-[6rem]">{turnoutPercentage}</span>
                            <span className="text-2xl font-bold text-zinc-600 sm:text-3xl md:text-4xl">%</span>
                        </div>

                        <div className="h-3 w-full overflow-hidden rounded-full bg-[#0a0a0a] border border-[#222]">
                            <motion.div
                                className="h-full rounded-full bg-white"
                                initial={{ width: 0 }}
                                animate={{ width: `${turnoutPercentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>

                        <div className="mt-8 flex w-full items-center justify-between text-xs font-bold tracking-widest text-zinc-500 uppercase">
                            <span>{votedUsers} Voted</span>
                            <span>{TOTAL_PARTICIPANTS} Total</span>
                        </div>

                        <div className="mt-8 text-xs font-mono text-zinc-600 flex justify-center items-center gap-2 sm:mt-12">
                            <span className="h-2 w-2 rounded-full bg-white opacity-80" />
                            Live Sync
                        </div>
                    </div>
                </div>
            </section>

            {isFinished && <Compo6 />}
        </>
    );
}
