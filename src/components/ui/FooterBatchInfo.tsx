import { useState, useEffect } from "react";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$_-=";
const CURRENT_YEAR = new Date().getFullYear();
const BATCH_TEXT = `LOT-${CURRENT_YEAR}-AURA-001`;

function useScrambleHover(text: string) {
  const [out, setOut] = useState(text);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) {
      setOut(text);
      return;
    }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      if (frame > 8) {
        setOut(text);
        clearInterval(id);
        return;
      }
      const arr = text.split("");
      const n = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < n; i++) {
        arr[Math.floor(Math.random() * arr.length)] =
          GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      setOut(arr.join(""));
    }, 55);
    return () => clearInterval(id);
  }, [active, text]);

  return { out, setActive };
}

// Care icon row — unicode symbols styled as washing symbols
const CARE_SYMBOLS = [
  { symbol: "○", label: "30°C" },
  { symbol: "▽", label: "DRY" },
  { symbol: "⊠", label: "NO BLEACH" },
  { symbol: "↯", label: "IRON LOW" },
  { symbol: "♻", label: "RECYCLE" },
];

export default function FooterBatchInfo() {
  const { out: batchOut, setActive } = useScrambleHover(BATCH_TEXT);

  return (
    <div className="flex flex-col gap-4 items-end">
      {/* Meta rows */}
      <div className="flex flex-col gap-[3px] items-end">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-100 font-syne">
            BATCH
          </span>
          <span
            className="text-[9px] font-bold tracking-widest cursor-default select-none transition-all font-montserrat tabular-nums"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          >
            {batchOut}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-100 font-syne">
            MADE IN
          </span>
          <span className="text-[12px] font-bold tracking-widest font-montserrat">
            INTERNET — SINCE MMXXV
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-100 font-syne">
            ORIGIN
          </span>
          <span className="text-[12px] font-bold tracking-widest font-montserrat">
            NET — 000.000.000.000
          </span>
        </div>
      </div>

      {/* QC Stamp + Care symbols */}
      <div className="flex items-center gap-5">
        {/* Care symbols */}
        <div className="flex gap-4">
          {CARE_SYMBOLS.map(({ symbol, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-[2px] group cursor-default"
            >
              <span className="text-[20px] leading-none transition-transform group-hover:scale-125 font-syne">
                {symbol}
              </span>
              <span className="text-[7.5px] tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity font-syne">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* QC PASSED stamp */}
        <div
          className="relative flex items-center justify-center border-2 border-black px-2 py-1"
          style={{ transform: "rotate(-5deg)" }}
        >
          <div className="flex flex-col items-center">
            <span className="text-[9px] tracking-[0.4em] uppercase font-black font-syne">
              QC
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase font-black font-syne">
              PASSED
            </span>
          </div>
          {/* Corner marks */}
          <span className="absolute -top-[3px] -left-[3px] w-[5px] h-[5px] border-t-2 border-l-2 border-black" />
          <span className="absolute -top-[3px] -right-[3px] w-[5px] h-[5px] border-t-2 border-r-2 border-black" />
          <span className="absolute -bottom-[3px] -left-[3px] w-[5px] h-[5px] border-b-2 border-l-2 border-black" />
          <span className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] border-b-2 border-r-2 border-black" />
        </div>
      </div>
    </div>
  );
}
