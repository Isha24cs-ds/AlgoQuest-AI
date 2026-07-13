import HeroBackground from "./HeroBackground";
import HeroTitle from "./HeroTitle";
import HeroSubtitle from "./HeroSubtitle";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <HeroTitle />
        <HeroSubtitle />
        <HeroButtons />
        <HeroStats />
      </div>
    </section>
  );
}

export default Hero;