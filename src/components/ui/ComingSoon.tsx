import { useState, useEffect } from "react";
import { motion } from "motion/react";

// ─── Config ──────────────────────────────────────────────────────────────────
const GLITCH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*_-+=<>?/|\\█▓▒░";
const TICKER_MSG =
  "AURA STORE — SIGNAL PENDING — STAND BY — DO NOT ADJUST YOUR SCREEN — TRANSMISSION INCOMING — NEW COLLECTION LOADING — ";
const TERMINAL_LINES = [
  "> INITIALIZING SECURE CHANNEL...",
  "> AUTHENTICATING SIGNAL [TX-2025-AURA-009]",
  "> COMPRESSING COLLECTION DATA...",
  "> ENCRYPTING TRANSMISSION PAYLOAD...",
  "> ROUTING VIA NODE_44 → NODE_87 → DEST",
  "> SIGNAL INTEGRITY: 98.3%",
  "> AWAITING LAUNCH WINDOW...",
  "> STANDBY MODE ACTIVE",
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScramble(text: string, interval = 70) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeouts = new Set<number>();
    const id = window.setInterval(() => {
      if (Math.random() > 0.72) {
        const arr = text.split("");
        const n = Math.random() > 0.5 ? 2 : 1;
        for (let i = 0; i < n; i++) {
          (arr as string[])[Math.floor(Math.random() * arr.length)] =
            GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]!;
        }
        setOut(arr.join(""));
        const tid = window.setTimeout(() => setOut(text), 75);
        timeouts.add(tid);
      }
    }, interval);
    return () => {
      clearInterval(id);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [text, interval]);
  return out;
}

function useClock() {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const update = () =>
      setClock(
        new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC",
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return clock;
}

function useTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const step = () => {
      setLines((prev) => {
        const newLines = [
          ...prev.slice(-5),
          TERMINAL_LINES[i % TERMINAL_LINES.length]!,
        ];
        return newLines;
      });
      i++;
    };
    step();
    const id = setInterval(step, 1800);
    return () => clearInterval(id);
  }, []);
  return lines;
}

// ─── GlitchedWord ─────────────────────────────────────────────────────────────
// The hero text with continuous RGB chromatic split on random slices
function GlitchedWord({
  text,
  size,
  style: extraStyle = {},
}: {
  text: string;
  size: string;
  style?: React.CSSProperties;
}) {
  const [sliceR, setSliceR] = useState("inset(0 0 100% 0)");
  const [sliceC, setSliceC] = useState("inset(0 0 100% 0)");
  const [dxR, setDxR] = useState(0);
  const [dxC, setDxC] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeouts = new Set<number>();
    const fire = () => {
      if (Math.random() > 0.42) {
        const y1 = Math.floor(Math.random() * 75);
        const h = Math.floor(5 + Math.random() * 28);
        const y2 = Math.min(100, y1 + h);
        const r = (Math.random() - 0.4) * 22;
        const c = (Math.random() - 0.6) * 22;
        setSliceR(`inset(${y1}% 0 ${100 - y2}% 0)`);
        setSliceC(
          `inset(${Math.max(0, y1 - 6)}% 0 ${100 - Math.min(100, y2 + 6)}% 0)`,
        );
        setDxR(r);
        setDxC(c);
        const tid = window.setTimeout(
          () => {
            setSliceR("inset(0 0 100% 0)");
            setSliceC("inset(0 0 100% 0)");
          },
          55 + Math.random() * 90,
        );
        timeouts.add(tid);
      }
    };
    const id = window.setInterval(fire, 100 + Math.random() * 160);
    return () => {
      clearInterval(id);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  const base = {
    fontSize: size,
    fontWeight: 900,
    lineHeight: 0.85,
    letterSpacing: "-0.03em",
    fontFamily: "montserrat, sans-serif",
    textTransform: "uppercase",
    userSelect: "none" as const,
    ...extraStyle,
  };

  return (
    <div className="relative" style={{ display: "inline-block" }}>
      {/* Red layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          ...base,
          color: "rgba(0,0,0,0.6)",
          clipPath: sliceR,
          transform: `translateX(${dxR}px)`,
        }}
      >
        {text}
      </div>
      {/* Cyan layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          ...base,
          color: "rgba(255,255,255,0.6)",
          clipPath: sliceC,
          transform: `translateX(${dxC}px)`,
        }}
      >
        {text}
      </div>
      {/* Base */}
      <div
        style={{
          ...base,
          color: "#000",
          position: "relative",
        }}
      >
        {text}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ComingSoon() {
  const clock = useClock();
  const txId = useScramble("TX-2025-AURA-009", 85);
  const termLines = useTerminal();

  return (
    <div
      className="relative w-full min-h-[100dvh] h-[100dvh] overflow-hidden select-none"
      style={{ backgroundColor: "#E8E7E3", fontFamily: "montserrat" }}
    >
      {/* ── CSS keyframes ──────────────────────────────────────── */}
      <style>{`
        @keyframes scanbeam {
          0%   { transform: translateY(-120px); }
          100% { transform: translateY(110vh); }
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes flicker {
          0%,96%,100% { opacity:1; }
          97%          { opacity:0.55; }
          98%          { opacity:1; }
          99%          { opacity:0.7; }
        }
        @keyframes noiseDrift {
          0%  { background-position: 0 0; }
          20% { background-position: -3px 2px; }
          40% { background-position: 2px -2px; }
          60% { background-position: -1px 3px; }
          80% { background-position: 3px -1px; }
          100%{ background-position: 0 0; }
        }
        @keyframes cursorblink {
          0%,49% { opacity:1; }
          50%,100%{ opacity:0; }
        }
      `}</style>

      {/* ── Grain / noise ────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          opacity: 0.045,
          mixBlendMode: "multiply",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          animation: "noiseDrift 0.12s steps(1) infinite",
        }}
      />

      {/* ── Scanlines ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.022) 2px, rgba(0,0,0,0.022) 4px)",
        }}
      />

      {/* ── Moving scan beam ──────────────────────────────────── */}
      <div
        className="absolute left-0 right-0 h-28 pointer-events-none z-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.038) 50%, transparent)",
          animation: "scanbeam 4s linear infinite",
        }}
      />

      {/* ── Watermark ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-between px-5 pointer-events-none z-0 overflow-hidden m-5"
        style={{ animation: "flicker 9s linear infinite" }}
      >
        <span
          className="font-black uppercase"
          style={{
            fontSize: "14vw",
            color: "rgba(0,0,0,0.045)",
            letterSpacing: "-0.04em",
          }}
        >
          AURA
        </span>
        <span
          className="font-black uppercase"
          style={{
            fontSize: "12vw",
            color: "rgba(0,0,0,0.045)",
            letterSpacing: "-0.04em",
          }}
        >
          STORE
        </span>
      </div>

      <div className="absolute top-12 sm:top-15 left-0 right-0 flex items-start justify-between px-4 sm:px-10 pt-4 sm:pt-7 z-20 gap-2">
        <div className="flex flex-col gap-[3px]">
          <span className="text-[7px] tracking-[0.35em] text-black/28 uppercase">
            SYS : ONLINE — UPLINK ESTABLISHED
          </span>
          <span className="text-[10px] tracking-[0.18em] text-black/55 font-bold uppercase">
            {txId}
          </span>
          <span className="text-[7px] tracking-[0.25em] text-black/28 uppercase">
            CHANNEL 44 → 87 → DEST // ENCRYPTED
          </span>
        </div>
        <div className="flex flex-col items-end gap-[3px]">
          <span className="text-[7px] tracking-[0.35em] text-black/28 uppercase">
            TIMESTAMP / UTC
          </span>
          <span
            className="text-[10px] tracking-[0.12em] text-black/60 font-bold"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {clock}
          </span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-black/40" />
            <span className="text-[7px] tracking-[0.3em] text-black/35 uppercase">
              SIGNAL LOCKED
            </span>
          </div>
        </div>
      </div>

      <div className="absolute left-2 sm:left-5 top-0 bottom-0 z-20 hidden sm:flex items-center pointer-events-none">
        <span
          className="text-[7px] tracking-[0.45em] text-black/50 uppercase whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          DO NOT ADJUST YOUR SCREEN — SIGNAL PROCESSING — DO NOT ADJUST
        </span>
      </div>

      <div className="absolute right-2 sm:right-5 top-0 bottom-0 z-20 hidden sm:flex items-center pointer-events-none">
        <span
          className="text-[7px] tracking-[0.45em] text-black/50 uppercase whitespace-nowrap"
          style={{ writingMode: "vertical-rl" }}
        >
          STAND BY — STAND BY — STAND BY — STAND BY — STAND BY
        </span>
      </div>

      <div
        className="absolute inset-0 flex flex-col justify-center z-10 px-[6%] sm:px-[10%]"
        style={{ animation: "flicker 11s linear infinite" }}
      >
        <div style={{ marginLeft: 0 }}>
          <GlitchedWord text="COMING" size="clamp(3rem,18vw,10rem)" />
        </div>
        <div style={{ marginLeft: "3vw", marginTop: "-1.5vw" }}>
          <GlitchedWord text="SOON" size="clamp(3.5rem,22vw,12rem)" />
        </div>
      </div>

      <div
        className="absolute bottom-16 left-4 sm:left-16 z-20 flex flex-col gap-[2px] max-w-[90vw] sm:max-w-[38vw]"
      >
        <span className="text-[7px] tracking-[0.3em] text-black/50 uppercase mb-1">
          SYSTEM LOG
        </span>
        {termLines.map((line, i) => (
          <motion.div
            key={`${line}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="text-[9px] tracking-[0.08em] text-black/50 font-syne"
          >
            {line}
            {i === termLines.length - 1 && (
              <span style={{ animation: "cursorblink 1s step-end infinite" }}>
                █
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* ── Bottom ticker ─────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-10 border-t border-black/10 z-20 flex items-center overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "ticker 28s linear infinite" }}
        >
          <span className="text-[7.5px] tracking-[0.32em] text-black/65 uppercase">
            {TICKER_MSG.repeat(5)}
          </span>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white/90 to-transparent z-10 pointer-events-none" />
      </div>
      <div className="absolute bottom-20 left-0 right-0 z-20 flex items-center overflow-hidden justify-center">
        <motion.button
          onClick={() => window.location.assign("/")}
          className="text-[7.5px] tracking-[0.32em] text-white uppercase bg-black rounded-full px-4 py-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Return to home
        </motion.button>
      </div>
    </div>
  );
}
