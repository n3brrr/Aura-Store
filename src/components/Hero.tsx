import React from "react";

interface HeroProps {
  brandName: string;
}

const Hero: React.FC<HeroProps> = ({ brandName }) => {
  const [firstWord, secondWord] = brandName.split(" ");

  return (
    <section className="relative w-full h-svh overflow-hidden font-syne bg-[#f2f1ef]">
      {/* Border Box */}
      <div className="absolute inset-[10%] md:inset-[6%] border-2 border-black/60 rounded-2xl z-0 pointer-events-none" />

      {/* LAYER 1: Título partido izq/der */}
      <div className="absolute inset-0 flex items-center justify-between pb-[12%] lg:pb-[8%] pointer-events-none select-none z-0">
        <span className="font-black uppercase font-montserrat leading-none px-[10%] text-black text-[10vw] sm:text-[11vw]">
          {firstWord}
        </span>
        <span className="font-black uppercase font-montserrat leading-none px-[6%] lg:px-[8%] text-black text-[10vw] sm:text-[11vw] ">
          {secondWord}
        </span>
      </div>

      {/* LAYER 2: Avatar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[78vh] sm:h-[82vh] w-auto z-10 pointer-events-none select-none">
        <img
          src="/Hero-avatar.svg"
          alt="Aura Avatar"
          className="h-full w-auto object-contain object-bottom drop-shadow-2xl "
        />
      </div>

      {/* LAYER 3: Esquinas */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-[8%]">
        <div className="flex items-end justify-between w-full">
          {/* LEFT */}
          <div className="flex flex-col gap-3 sm:max-w-[200px] md:max-w-[320px] pb-[8%] px-[3%]">
            <span className="text-xl sm:text-2xl md:text-3xl leading-none">
              〄
            </span>
            <h2 className="font-extrabold uppercase leading-[0.88] tracking-tighter font-syne text-base sm:text-xl md:text-2xl lg:text-3xl">
              Clothes without
              <br />
              excess. Only style.
            </h2>
            <p className="uppercase font-bold tracking-[0.12em] leading-relaxed opacity-70 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] max-w-[180px]">
              Modern silhouettes, natural fabrics, <br /> and honest design. For
              hose who choose simplicity.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end gap-3 md:pb-[6%] px-[2%]">
            {/* Card */}
            <div className="border border-black/25 rounded-2xl p-1.5 sm:p-2 bg-[#eeecea]/60 backdrop-blur-sm w-28 sm:w-36 md:w-44 lg:w-[290px]">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/Hero-new-collection.webp"
                  className="w-full h-auto"
                  alt="New product"
                />
              </div>
            </div>

            {/* Button */}
            <button
              className="w-28 sm:w-36 md:w-44 lg:w-[290px] group border-2 border-black/25 rounded-full flex items-center justify-between gap-2 bg-transparent
             hover:bg-black hover:text-[#f2f1ef] transition-all duration-400 py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 max-h-[40px]"
            >
              <span className="font-black uppercase tracking-[0.15em] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px]">
                New Collection
              </span>
              <span className="text-lg md:text-xl font-light">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
