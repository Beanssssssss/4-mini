export default function Compo0() {
  return (
    <section className="snap-start relative min-h-[100dvh] w-full overflow-hidden border-t border-[#222] bg-[#111] px-4 py-10 text-white sm:px-6 lg:h-[100dvh] lg:px-12">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10">
          <h2 className="text-[clamp(2rem,5.2vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-zinc-100">
            자유 주제
          </h2>
          <p className="mt-4 text-[clamp(0.95rem,1.7vw,1.125rem)] leading-relaxed tracking-[0.01em] text-zinc-300">
            각자 구현하고 싶은 AI 에이전트를 자유롭게 기획 및 구현합니다. 간단한 아이디어
            수준이어도 충분하며, 완성도보다 아이디어와 구현 과정에 집중해 주세요.
          </p>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-[#171717]/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:p-7">
            <h3 className="text-[clamp(1.05rem,2.2vw,1.25rem)] font-semibold tracking-[-0.01em]">구현 방식 안내</h3>
            <ul className="mt-4 space-y-2.5 text-[clamp(0.92rem,1.4vw,1rem)] leading-relaxed tracking-[0.01em] text-zinc-300">
              <li>사용자 입력 → LLM/API 활용 → 결과 생성 구조를 권장합니다.</li>
              <li>구현 방식에는 제한이 없습니다.</li>
              <li>로컬 실행, 웹 페이지, 파일 생성 등 어떤 형태의 결과물도 가능합니다.</li>
              <li>간단한 프로토타입 수준으로 구현해도 무방합니다.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#171717]/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:p-7">
            <h3 className="text-[clamp(1.05rem,2.2vw,1.25rem)] font-semibold tracking-[-0.01em]">발표 안내</h3>
            <ul className="mt-4 space-y-2.5 text-[clamp(0.92rem,1.4vw,1rem)] leading-relaxed tracking-[0.01em] text-zinc-300">
              <li>별도의 발표 자료(PPT 등)는 필요하지 않습니다.</li>
              <li>구현한 결과를 직접 시연하며 아래 내용을 중심으로 설명합니다.</li>
              <li>- 어떤 아이디어로 만들었는지</li>
              <li>- 어떻게 구현했는지</li>
              <li>- 실제 실행 결과</li>
            </ul>
          </article>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#171717]/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:p-7">
          <p className="text-sm font-semibold text-zinc-200 sm:text-base">예시 프로젝트 링크</p>
          <a
            href="https://github.com/softee220/Agent_nutritionist"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block break-all text-sm text-blue-300 underline underline-offset-4 hover:text-blue-200 sm:text-base"
          >
            https://github.com/hub2vu/Agent_nutritionist
          </a>
        </div>
      </div>
    </section>
  );
}
