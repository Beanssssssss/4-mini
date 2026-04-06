const teams = [
    ["김민수", "이서진"],
    ["김리나", "최가영"],
    ["김효주", "임소현"],
    ["김상진", "유지오"],
    ["박소린", "이재경"],
];

export default function Compo1() {
    return (
        <section className="snap-start relative min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[#111] px-4 py-12 sm:px-6 lg:px-12 border-t border-[#222]">
            <div className="relative z-10 w-full max-w-6xl">
                <div className="mb-10 text-center sm:mb-12">
                    <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500 sm:text-sm sm:tracking-[0.3em]">
                        Hackathon Lineup
                    </h2>
                    <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Teams
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {teams.map((members, idx) => {
                        const teamId = `Team${String(idx + 1)}`;

                        return (
                            <div
                                key={idx}
                                className="relative flex flex-col justify-between rounded-2xl border border-[#333] bg-[#1a1a1a] p-5 min-h-[160px] overflow-hidden transition-all hover:border-zinc-500 hover:bg-[#222] sm:rounded-3xl sm:p-8 sm:min-h-[180px]"
                            >
                                <div className="flex items-center justify-between mb-6 z-10 sm:mb-8">
                                    <span className="rounded-md bg-[#2a2a2a] px-3 py-1 text-xs font-mono font-medium text-zinc-300">
                                        {teamId}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 z-10 flex-wrap">
                                    <h4 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                        {members[0]}
                                    </h4>
                                    <div className="h-6 w-[1px] bg-zinc-700 hidden sm:block" />
                                    <h4 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                        {members[1]}
                                    </h4>
                                </div>

                                <div className="absolute bottom-1 right-3 text-[5rem] font-black text-white/[0.03] pointer-events-none select-none leading-none sm:bottom-2 sm:right-4 sm:text-[8rem]">
                                    {idx + 1}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
