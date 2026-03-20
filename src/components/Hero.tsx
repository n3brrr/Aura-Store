import React from "react";

interface HeroProps {
  brandName: string;
}

const Hero: React.FC<HeroProps> = ({ brandName }) => {
  return (
    <section className="relative max-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 pt-20 overflow-hidden">
      {/* Background Text Layer */}
      <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none select-none">
        <h1 className="text-[5rem] font-black uppercase tracking-tighter text-black/[0.3] leading-none flex w-full justify-between tracking-tighter">
          <span>{brandName.split(" ")[0]}</span>
          <span>{brandName.split(" ")[1]}</span>
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-12 gap-4 items-center">
        {/* Left Side: Statement */}
        <div className="col-span-12 md:col-span-3 self-end mb-20 order-2 md:order-1">
          <span className="text-4xl block mb-6">〄</span>
          <h2 className="text-2xl font-extrabold uppercase leading-[0.9] mb-4">
            Clothes without
            <br />
            excess. Only style.
          </h2>
          <p className="text-[10px] uppercase font-medium tracking-widest leading-relaxed opacity-60 max-w-[200px]">
            Modern silhouettes, natural fabrics, and honest design.
          </p>
        </div>

        {/* Center: Main Image */}
        <div className="col-span-12 md:col-span-6 flex justify-center order-1 md:order-2">
          <div className="w-full overflow-hidden relative group">
            <img
              src="public/Hero-avatar.svg"
              alt="Main Collection"
              className="w-full h-full object-cover"
            />
            {/* Overlay para cuando animemos el reveal */}
          </div>
        </div>

        {/* Right Side: Product Card */}
        <div className="col-span-12 md:col-span-3 self-end mb-20 flex flex-col items-end order-3">
          <div className="w-48 p-4 border border-black/10 rounded-xl mb-4">
            <img
              src="public/Hero-new-collection.webp"
              className="w-full h-full object-cover"
            />
          </div>

          <button className="w-48 group relative px-6 border border-black rounded-full overflow-hidden transition-colors hover:bg-black hover:text-white">
            <div className="flex justify-between items-center relative z-10">
              <span className="text-[10px] font-black lowercase tracking-[0.2em]">
                New Collection
              </span>
              <span className="text-md">↗</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
