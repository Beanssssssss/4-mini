import PopcornManifestoHero from "@/components/hero";
import Compo0 from "@/components/compo0";
import Compo1 from "@/components/compo1";
import Compo2 from "@/components/compo2";
import Compo3 from "@/components/compo3";
import Compo4 from "@/components/compo4";


export default function Home() {
  return (
    <main className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black">

      {/* 첫 번째 페이지: Hero Section */}
      <section className="snap-start relative h-[100dvh] w-full overflow-hidden">
        <PopcornManifestoHero />
      </section>

      {/* 두 번째 페이지 */}
      <Compo0 />

      {/* 세 번째 페이지 — hero 톤 */}
      <Compo1 />

      {/* 네 번째 페이지 */}
      <Compo2 />

      {/* 다섯 번째 페이지 */}
      <Compo3 />

      {/* 여섯 번째 페이지 */}
      <Compo4 />
    </main>
  );
}
