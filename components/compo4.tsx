"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Compo5 from "./compo5";

type HackathonUser = {
    id: string;
    name: string;
    code: string;
    team: number | string;
    voted: boolean;
};

export default function Compo4() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [user, setUser] = useState<HackathonUser | null>(null);
    const [votedTeam, setVotedTeam] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showCompo3, setShowCompo3] = useState(false);

    // 컴포넌트 마운트 시 로컬스토리지 세션 복구 자동 로그인
    useEffect(() => {
        const checkSession = async () => {
            const sessionData = localStorage.getItem("hackathon_session");
            if (!sessionData) return;

            try {
                const { savedName, savedCode } = JSON.parse(sessionData);
                if (!savedName || !savedCode) return;

                setName(savedName);
                setCode(savedCode);
                setLoading(true);

                const { data: foundUser, error: searchError } = await supabase
                    .from("users")
                    .select("*")
                    .eq("name", savedName)
                    .eq("code", savedCode)
                    .single();

                if (searchError || !foundUser) {
                    localStorage.removeItem("hackathon_session");
                    setLoading(false);
                    return;
                }

                if (foundUser.voted) {
                    const { data: voteData } = await supabase
                        .from("votes")
                        .select("team")
                        .eq("user_id", foundUser.id)
                        .order("created_at", { ascending: false })
                        .limit(1)
                        .maybeSingle();

                    if (voteData) {
                        setVotedTeam(voteData.team);
                    }
                }

                setUser(foundUser);
            } catch (err) {
                console.error("세션 복원 중 오류 발생", err);
                localStorage.removeItem("hackathon_session");
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const handleExit = () => {
        setShowCompo3(true);
        setTimeout(() => {
            document.getElementById("hackathon-turnout")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setUser(null);
        setVotedTeam(null);
        setLoading(true);

        const { data: foundUser, error: searchError } = await supabase
            .from("users")
            .select("*")
            .eq("name", name)
            .eq("code", code)
            .single();

        if (searchError || !foundUser) {
            setError("이름과 코드가 일치하는 사용자를 찾을 수 없습니다.");
            setLoading(false);
            return;
        }

        if (foundUser.voted) {
            const { data: voteData } = await supabase
                .from("votes")
                .select("team")
                .eq("user_id", foundUser.id)
                .order("created_at", { ascending: false })
                .limit(1)
                .maybeSingle();

            if (voteData) {
                setVotedTeam(voteData.team);
            }
        }

        // 로그인 성공 시 세션(이름, 코드)을 기록해둔다
        localStorage.setItem("hackathon_session", JSON.stringify({ savedName: name, savedCode: code }));

        setUser(foundUser);
        setLoading(false);
    };

    const handleVote = async (teamNum: number) => {
        if (!user) return;
        if (user.voted) {
            setError("이미 투표를 확정하여 변경할 수 없습니다.");
            return;
        }
        if (Number(user.team) === teamNum) {
            setError("본인 팀에는 투표할 수 없습니다.");
            return;
        }
        if (votedTeam === teamNum) {
            setError("이미 해당 팀에 투표하셨습니다.");
            return;
        }

        const previousTeam = votedTeam;
        setVotedTeam(teamNum);
        setLoading(true);
        setError("");

        // DB 테이블에 Unique 제약조건이 명시되지 않았으므로
        // 안전하게 기존 투표를 깔끔하게 모두 지우고 새로 Insert 처리하여 완벽한 Upsert(수정) 효과를 냅니다.
        const { error: deleteError } = await supabase
            .from("votes")
            .delete()
            .eq("user_id", user.id);

        const { error: voteError } = await supabase
            .from("votes")
            .insert([{ user_id: user.id, team: teamNum }]);

        if (voteError || deleteError) {
            setVotedTeam(previousTeam);
            setError("투표 처리 중 오류가 발생했습니다.");
            setLoading(false);
            return;
        }

        if (!user.voted) {
            const { error: updateError } = await supabase
                .from("users")
                .update({ voted: true })
                .eq("id", user.id);

            if (!updateError) {
                setUser({ ...user, voted: true });
            }
        }

        setLoading(false);

        setTimeout(() => {
            handleExit();
        }, 1200);
    };

    return (
        <>
            <section className="snap-start relative h-[100dvh] w-full flex items-center justify-center bg-[#111] px-4 py-8 border-t border-[#222] overflow-hidden sm:px-6">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-24 relative z-10">

                    {/* 좌측: 투표 기능 */}
                    <div className="w-full max-w-lg flex flex-col text-center lg:text-left mx-auto lg:mx-0">
                        <h2 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Votes
                        </h2>
                        <p className="mb-9 text-base text-zinc-500 font-medium sm:mb-12 sm:text-lg">
                            가장 마음에 드는 팀에게 투표하세요.
                        </p>

                        {!user ? (
                            <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:gap-4 w-full max-w-sm mx-auto lg:mx-0">
                                <input
                                    type="text"
                                    placeholder="이름"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-2xl border border-[#333] bg-[#1a1a1a] px-4 py-3.5 text-base text-white placeholder-zinc-600 transition-colors focus:border-zinc-400 focus:outline-none sm:px-5 sm:py-4 sm:text-lg"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="비밀 코드"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full rounded-2xl border border-[#333] bg-[#1a1a1a] px-4 py-3.5 text-base text-white placeholder-zinc-600 transition-colors focus:border-zinc-400 focus:outline-none sm:px-5 sm:py-4 sm:text-lg"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 w-full rounded-2xl bg-white text-black py-3.5 text-base font-bold transition-transform hover:scale-[0.98] active:scale-[0.95] disabled:opacity-50 disabled:hover:scale-100 sm:py-4 sm:text-lg"
                                >
                                    {loading ? "확인 중..." : "들어가기"}
                                </button>
                                {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
                            </form>
                        ) : (
                            <div className="flex flex-col gap-8 w-full max-w-lg mx-auto lg:mx-0">
                                <div className="flex items-center justify-between rounded-2xl border border-[#333] bg-[#1a1a1a] p-5 text-left">
                                    <div>
                                        <p className="text-zinc-400 text-sm">
                                            안녕하세요, <strong className="text-white text-base">{user.name}</strong> 님
                                        </p>
                                    </div>
                                </div>

                                {user.voted && (
                                    <div className="mb-3 flex flex-col items-center gap-3">
                                        <button
                                            onClick={handleExit}
                                            className="rounded-full bg-white px-8 py-2.5 text-sm font-bold text-black transition-colors hover:bg-zinc-200"
                                        >
                                            실시간 투표 현황 보러가기
                                        </button>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3">
                                    {[1, 2, 3, 4, 5].map((t) => {
                                        const isUserTeam = Number(user.team) === t;
                                        const isVotedTeam = t === votedTeam;

                                        return (
                                            <button
                                                key={t}
                                                onClick={() => handleVote(t)}
                                                disabled={isUserTeam || loading || user.voted}
                                                className={`relative rounded-2xl border p-4 text-lg font-bold transition-all sm:p-6 sm:text-xl ${isVotedTeam
                                                    ? "border-white bg-white text-black cursor-not-allowed scale-[0.98]"
                                                    : isUserTeam
                                                        ? "cursor-not-allowed border-[#1a1a1a] bg-[#111] text-[#333]"
                                                        : user.voted
                                                            ? "cursor-not-allowed border-[#222] bg-[#111] text-zinc-600 opacity-60"
                                                            : "border-[#333] bg-[#1a1a1a] text-white hover:bg-[#222] hover:border-[#555]"
                                                    }`}
                                            >
                                                {t} 팀
                                                {isUserTeam && (
                                                    <span className="absolute right-4 top-4 text-[10px] font-medium text-zinc-600 uppercase">
                                                        Me
                                                    </span>
                                                )}
                                                {isVotedTeam && (
                                                    <span className="absolute right-4 top-4 text-[10px] font-black text-black tracking-widest uppercase">
                                                        VOTED
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {error && <p className="text-sm font-medium text-red-500">{error}</p>}
                            </div>
                        )}
                    </div>

                    {/* 우측 여백: 투표 일러스트 & 말풍선 */}
                    <div className="flex w-full max-w-sm items-center justify-center pointer-events-none select-none lg:w-1/2 lg:max-w-none">
                        <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[500px]">
                            {/* 툴팁/말풍선 */}
                            <div className="absolute left-2 top-2 z-20 max-w-[290px] rounded-2xl bg-white px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] xl:-left-12 xl:-top-6 xl:px-5 xl:py-3.5">
                                <span className="flex items-center gap-2 text-xs font-black tracking-tight text-black xl:text-sm">
                                    비밀 코드는 전화번호 뒷 4자리입니다.
                                </span>
                                {/* 말풍선 꼬리 */}
                                <div className="absolute -bottom-2 right-8 h-3.5 w-3.5 rotate-45 bg-white xl:right-12 xl:h-4 xl:w-4" />
                            </div>

                            <Image
                                src="/vote.png"
                                alt="Vote Decor Icon"
                                width={500}
                                height={500}
                                className="h-auto w-full opacity-95 drop-shadow-2xl grayscale-[20%]"
                                style={{ width: "100%", height: "auto" }}
                                priority
                            />
                        </div>
                    </div>

                </div>
            </section>

            {showCompo3 && <Compo5 />}
        </>
    );
}
