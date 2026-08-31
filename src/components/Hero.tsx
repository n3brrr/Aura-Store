import React from "react";

interface HeroProps {
  brandName: string;
}

const Hero: React.FC<HeroProps> = ({ brandName }) => {
  const [firstWord, secondWord] = brandName.split(" ");

  return (
    <section
      className="relative w-full h-[100dvh] min-h-[100dvh] sm:h-svh overflow-hidden font-syne"
      id="hero"
    >
      <div className="absolute inset-[5%] sm:inset-[6%] md:inset-x-12 md:inset-y-[7%] border-2 border-black/60 rounded-xl sm:rounded-2xl z-0 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-between pb-[18%] sm:pb-[12%] lg:pb-[8%] pointer-events-none select-none z-0">
        <span className="font-black uppercase font-montserrat leading-none px-[6%] text-black text-[clamp(2rem,10vw,7rem)]">
          {firstWord}
        </span>
        <span className="font-black uppercase font-montserrat leading-none px-[4%] lg:px-[3%] text-black text-[clamp(2rem,10vw,7rem)]">
          {secondWord}
        </span>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[55vh] sm:h-[65vh] md:h-[78vh] max-h-[420px] sm:max-h-none w-auto z-10 pointer-events-none select-none">
        <img
          src="/Hero-avatar.svg"
          alt="Aura Avatar"
          className="h-full w-auto object-contain object-bottom"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-end px-[4%] sm:px-[8%]">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between w-full gap-6 sm:gap-0">
          <div className="flex flex-col gap-2 sm:gap-3 text-center sm:text-left sm:max-w-[200px] md:max-w-[320px] pb-2 sm:pb-[8%] px-[3%] order-2 sm:order-1">
            <span className="text-xl sm:text-2xl md:text-3xl leading-none hidden sm:block">
              〄
            </span>
            <h2 className="font-extrabold uppercase leading-[0.88] tracking-tighter font-syne text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Clothes without
              <br />
              excess. Only style.
            </h2>
            <p className="uppercase font-bold tracking-[0.12em] leading-relaxed opacity-70 text-[10px] sm:text-[9px] md:text-[10px] lg:text-[11px] max-w-[260px] sm:max-w-[180px] mx-auto sm:mx-0">
              Modern silhouettes, natural fabrics, <br /> and honest design. For
              those who choose simplicity.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-3 sm:pb-[7%] px-[2%] order-1 sm:order-2 w-full sm:w-auto">
            <div className="border border-black/25 rounded-2xl p-1.5 sm:p-2 backdrop-blur-sm w-full max-w-[280px] sm:w-36 md:w-44 lg:w-[290px]">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/Hero-new-collection.webp"
                  className="w-full h-auto"
                  alt="New collection preview"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.location.assign("/ComingSoon")}
              className="w-full max-w-[280px] sm:w-36 md:w-44 lg:w-[290px] group border-2 border-black/25 rounded-full flex items-center justify-between gap-2 bg-transparent
             hover:bg-black hover:text-[#f2f1ef] transition-all duration-400 py-3 sm:py-2.5 md:py-3 px-5 sm:px-4 md:px-5 cursor-pointer"
            >
              <span className="font-black uppercase tracking-[0.15em] text-[12px] sm:text-[11px] md:text-[12px] lg:text-[13px]">
                New Collection
              </span>
              <span className="text-xl font-light">↗</span>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-white to-transparent z-30 pointer-events-none" />
    </section>
  );
};

export default Hero;
