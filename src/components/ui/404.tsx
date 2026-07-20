import { useState, useEffect } from "react";
import { motion } from "motion/react";

const GLITCH_CHARS = "0123456789X_/";

// Hook de encriptado ligero para el texto 404
function useEncryptedText(text: string) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.8) {
        const scrambled = text
          .split("")
          .map(
            () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
          )
          .join("");
        setDisplay(scrambled);
        setTimeout(() => setDisplay(text), 50);
      }
    }, 700);
    return () => clearInterval(id);
  }, [text]);

  return display;
}

export default function NotFound() {
  const display404 = useEncryptedText("404");

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden font-syne select-none">
      {/* ── Ruido sutil de fondo ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" />

      {/* ── Top Status Line ── */}
      <div className="absolute top-10 w-full px-12 flex justify-between items-start text-[8px] font-black uppercase tracking-[0.4em] opacity-40">
        <span>Status: Error_Not_Found</span>
        <span>Aura_OS // Terminal_0.4</span>
      </div>

      {/* ── Center Content ── */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* El 404 Encriptado */}
          <h1 className="text-[25vw] font-black font-montserrat leading-none tracking-tighter text-black flex justify-center items-baseline">
            <span>{display404}</span>
          </h1>

          <div className="mt-[-2vw] space-y-6">
            <h2 className="text-xl font-extrabold uppercase tracking-tighter">
              Page link has been <span className="italic">hacked</span>
            </h2>
            <p className="max-w-xs mx-auto text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed opacity-50">
              The requested resource is no longer accessible via this node.
            </p>
          </div>
        </motion.div>

        {/* ── CTA Button ── */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/"
            className="group relative inline-flex items-center gap-4 px-10 py-4 border-[1.5px] border-black rounded-full overflow-hidden hover:bg-black hover:text-white transition-all duration-400"
          >
            <span className="text-[12px] font-black uppercase tracking-[0.3em] relative z-10">
              Restore Session
            </span>
            <span className="text-sm transition-transform group-hover:translate-x-1 relative z-10">
              →
            </span>
          </a>
        </motion.div>
      </div>

      {/* ── Bottom Info ── */}
      <div className="absolute bottom-10 w-full text-center text-[10px] font-black uppercase tracking-[0.5em] opacity-20">
        Signal Lost — Waiting Re-routing
      </div>
    </div>
  );
}
