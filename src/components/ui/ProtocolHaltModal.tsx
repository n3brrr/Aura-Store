import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProtocolHaltModalProps {
  onClose: () => void;
}

const TERMINAL_LINES = [
  "> DISCONNECTION ATTEMPT DETECTED",
  "> SCANNING ACCOUNT ID: 000.666",
  "> LOYALTY INDEX: CRITICAL LOW",
  "> INITIATING RETENTION PROTOCOL...",
  "> ANALYZING REASON FOR DEPARTURE...",
  "> RESULT: INCONCLUSIVE — HUMAN REQUIRED",
];

import GlichLetters from "./GlichLetters";
function useTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const step = () => {
      setLines((prev) => [
        ...prev.slice(-4),
        TERMINAL_LINES[i % TERMINAL_LINES.length]!,
      ]);
      i++;
    };
    step();
    const id = setInterval(step, 900);
    return () => clearInterval(id);
  }, []);
  return lines;
}

export default function ProtocolHaltModal({ onClose }: ProtocolHaltModalProps) {
  const [reason, setReason] = useState("");
  const termLines = useTerminal();

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="halt-overlay"
        className="fixed inset-0 z-9000 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      >
        {/* Scanlines on overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
          }}
        />

        {/* Modal box */}
        <motion.div
          key="halt-box"
          className="relative border-2 border-white overflow-hidden"
          style={{
            backgroundColor: "#0a0a0a",
            width: "min(640px, 94vw)",
            fontFamily: "Syne, sans-serif",
          }}
          initial={{ scale: 0.88, opacity: 0, rotate: -1 }}
          animate={{
            scale: [0.88, 1.02, 0.99, 1],
            opacity: 1,
            rotate: [-1, 1, -0.5, 0],
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* ── Top bar ───────────────────────────── */}
          <div className="flex items-center justify-between border-b border-white/20 px-5 py-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 opacity-100" />
              <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-100" />
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">
              AURA OS — RETENTION MODULE v2.5
            </span>
          </div>

          {/* ── Glitch headline ───────────────────── */}
          <div className="px-6 pt-6 pb-2">
            <div className="mb-1">
              <span
                className="text-[12px] tracking-[0.5em] uppercase text-red-400 flex items-center gap-1"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                ⚠
                <GlichLetters text="PROTOCOL: DISCONNECTION" active={true} />
              </span>
            </div>
            {/* Wrapper ensures minimum height so it doesn't collapse/expand if it wraps during glitch */}
            <div className="min-h-[38px] flex items-center">
              <GlichLetters
                text="HALT — ERROR CODE: CUT-90"
                active={true}
                className="text-[44px] font-black leading-none tracking-[-0.03em] text-white whitespace-nowrap"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              />
            </div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mt-3 leading-relaxed">
              The cut line has reached the maximum allowed limit of 90%.
              <br />
              The system cannot authorize a complete disconnection.
            </p>
          </div>

          {/* ── Terminal block ─────────────────────── */}
          <div className="mx-6 my-3 border border-white/10 bg-white/5 px-4 py-3 flex flex-col gap-[3px]">
            <span className="text-[9px] tracking-[0.35em] uppercase text-white/25 mb-1">
              SYSTEM LOG
            </span>
            {termLines.map((line, i) => (
              <motion.div
                key={`${line}-${i}`}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="text-[10px] tracking-[0.08em] text-green-400/70 py-[2px]"
                style={{ fontFamily: "Montserrat, monospace" }}
              >
                {line}
                {i === termLines.length - 1 && (
                  <span
                    style={{ animation: "cursorblink 1s step-end infinite" }}
                  >
                    █
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Question + Input ───────────────────── */}
          <div className="px-6 pb-4">
            <label
              htmlFor="cut-reason"
              className="block text-[10px] tracking-[0.35em] text-white/50 mb-3 mt-1 uppercase"
            >
              Why do you want to cut with Aura Store?
            </label>
            <input
              id="cut-reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="your reason here... (no valid reason)"
              className="w-full border border-white/20 bg-transparent px-4 py-3 text-[12px] tracking-widest text-white/70 placeholder:text-white/20 outline-none focus:border-white/50 transition-colors"
              style={{ fontFamily: "Montserrat, monospace" }}
            />
          </div>

          {/* ── CTA buttons ───────────────────────── */}
          <div className="flex border-t border-white/15">
            <motion.button
              onClick={onClose}
              className="flex-1 px-5 py-4 text-[11px] tracking-[0.45em] uppercase font-bold text-black bg-white transition-colors hover:bg-white/90"
              whileTap={{ scale: 0.97 }}
            >
              ABORT — STAY WITH US
            </motion.button>
            <motion.button
              onClick={onClose}
              className="px-6 py-4 text-[11px] tracking-[0.35em] uppercase text-white/30 border-l border-white/15 hover:text-white/60 transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              OVERRIDE ✗
            </motion.button>
          </div>

          {/* Noise overlay on modal */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.04,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "150px 150px",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
