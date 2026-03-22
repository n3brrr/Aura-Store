"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimate } from "motion/react";

// ─── Product Data ────────────────────────────────────────────────────────────
// SVGs assumed to be in /public: /piece-1.svg, /piece-2.svg, /piece-3.svg
const PRODUCTS = [
  {
    id: "001",
    name: "SKELETON PUFFER",
    svg: "/thumbs/hoodie.svg",
    specs: [
      { label: "CHEST", value: "58 CM" },
      { label: "LENGTH", value: "72 CM" },
      { label: "SLEEVE", value: "64 CM" },
      { label: "PANTONE", value: "000 C  /  COOL GRAY 11 C" },
      { label: "FILL", value: "600 FILL POWER DOWN" },
      { label: "SHELL", value: "320 GSM RIPSTOP NYLON" },
    ],
  },
  {
    id: "002",
    name: "CROSS HOODIE",
    svg: "/thumbs/puffer.webp",
    specs: [
      { label: "CHEST", value: "62 CM" },
      { label: "LENGTH", value: "74 CM" },
      { label: "SLEEVE", value: "66 CM" },
      { label: "PANTONE", value: "000 C  /  PANTONE 425 C" },
      { label: "FABRIC", value: "HEAVYWEIGHT COTTON BLEND" },
      { label: "WEIGHT", value: "480 GSM FLEECE" },
    ],
  },
  {
    id: "003",
    name: "SPIDER JACKET",
    svg: "/thumbs/hoodie.svg",
    specs: [
      { label: "CHEST", value: "60 CM" },
      { label: "LENGTH", value: "70 CM" },
      { label: "SLEEVE", value: "65 CM" },
      { label: "PANTONE", value: "WARM GRAY 1  /  COOL GRAY 5" },
      { label: "FABRIC", value: "TECHNICAL WOVEN SHELL" },
      { label: "WEIGHT", value: "280 GSM" },
    ],
  },
];

// ─── Glitch Overlay ──────────────────────────────────────────────────────────
function GlitchOverlay({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05 }}
        >
          {/* Scanline pass */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
            }}
            animate={{ backgroundPositionY: ["0px", "100px"] }}
            transition={{ duration: 0.15, repeat: 2, ease: "linear" }}
          />
          {/* RGB shift slices */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0"
              style={{
                height: `${3 + Math.random() * 12}%`,
                top: `${Math.random() * 90}%`,
                background:
                  i % 2 === 0 ? `rgba(0,0,0,0.08)` : `rgba(255,255,255,0.12)`,
                transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 0.08,
                delay: i * 0.03,
                repeat: 2,
              }}
            />
          ))}
          {/* White flash pulse */}
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{ opacity: [0.25, 0, 0.15, 0] }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Scanner Line (the "printer" that draws specs) ───────────────────────────
function ScannerReveal({ items, trigger }) {
  return (
    <div className="flex flex-col gap-[2px] mt-3">
      {items.map((item, i) => (
        <AnimatePresence key={`${trigger}-${i}`} mode="wait">
          <motion.div
            key={`${trigger}-${i}`}
            className="flex items-baseline gap-3 overflow-hidden"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            transition={{
              clipPath: {
                duration: 0.18,
                delay: 0.35 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              },
              opacity: { duration: 0.05, delay: 0.35 + i * 0.08 },
            }}
          >
            {/* Scan line flash effect per row */}
            <motion.div
              className="absolute left-0 right-0 h-1px bg-black/20"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 0.2, delay: 0.35 + i * 0.08 }}
            />
            <span
              className="text-[9px] tracking-[0.2em] text-black/40 font-mono uppercase shrink-0"
              style={{ minWidth: "72px" }}
            >
              {item.label}
            </span>
            <span className="w-full h-1px bg-black/10" />
            <span className="text-[9px] tracking-[0.15em] text-black/70 font-mono uppercase whitespace-nowrap">
              {item.value}
            </span>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AuraStoreHero() {
  const [active, setActive] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [specTrigger, setSpecTrigger] = useState(0);
  const pendingRef = useRef(null);

  function handleSelect(idx) {
    if (idx === active || glitching) return;
    pendingRef.current = idx;

    // 1 — Glitch flash
    setGlitching(true);

    // 2 — Mid-glitch: swap image
    setTimeout(() => {
      setDisplayIdx(pendingRef.current);
      setActive(pendingRef.current);
    }, 180);

    // 3 — Clear glitch, trigger spec scanner
    setTimeout(() => {
      setGlitching(false);
      setSpecTrigger((t) => t + 1);
    }, 380);
  }

  const product = PRODUCTS[displayIdx];

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{
        backgroundColor: "#E8E7E3",
        fontFamily: "montserrat",
      }}
    >
      {/* ── Noise texture overlay ────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* ── Glitch Overlay ───────────────────────────────────── */}
      <GlitchOverlay active={glitching} />

      {/* ── WATERMARK TEXT ───────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-between px-0 pointer-events-none z-0 overflow-hidden">
        <span
          className="text-[12vw] font-black uppercase leading-none tracking-tighter"
          style={{
            color: "rgba(0,0,0,0.055)",
            fontStretch: "condensed",
            letterSpacing: "-0.04em",
            marginLeft: "-1vw",
          }}
        >
          AURA
        </span>
        <span
          className="text-[12vw] font-black uppercase leading-none tracking-tighter"
          style={{
            color: "rgba(0,0,0,0.055)",
            fontStretch: "condensed",
            letterSpacing: "-0.04em",
            marginRight: "-1vw",
          }}
        >
          STORE
        </span>
      </div>

      {/* ── CENTRAL PRODUCT IMAGE ────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={displayIdx}
            src={product.svg}
            alt={product.name}
            className="h-[72vh] w-auto object-contain"
            initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            style={{ mixBlendMode: "multiply" }}
          />
        </AnimatePresence>
      </div>

      {/* ── BOTTOM LEFT: Product Info + Specs ────────────────── */}
      <div className="absolute bottom-8 left-8 z-20 max-w-xs">
        {/* Item number */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`num-${displayIdx}`}
            className="text-[9px] tracking-[0.25em] text-black/40 font-mono uppercase mb-1"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            ITEM NO. {product.id}
          </motion.p>
        </AnimatePresence>

        {/* Product name */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={`name-${displayIdx}`}
            className="text-[22px] font-black uppercase tracking-[0.05em] leading-none mb-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, delay: 0.32 }}
          >
            {product.name}
          </motion.h2>
        </AnimatePresence>

        {/* ── Technical Spec Sheet (Scanner reveal) ── */}
        <div className="border-t border-black/10 pt-2">
          <p className="text-[8px] tracking-[0.3em] text-black/30 font-mono uppercase mb-1">
            FICHA TÉCNICA
          </p>
          <ScannerReveal items={product.specs} trigger={specTrigger} />
        </div>

        {/* View Details button */}
        <motion.button
          className="mt-5 w-52 bg-black text-white text-[10px] tracking-[0.25em] uppercase py-3 font-bold hover:bg-black/80 active:scale-[0.98] transition-all"
          whileHover={{ letterSpacing: "0.32em" }}
          transition={{ duration: 0.15 }}
        >
          VIEW DETAILS
        </motion.button>
      </div>

      {/* ── RIGHT: Piece Selector ─────────────────────────────── */}
      <div className="absolute right-5 bottom-8 z-20 flex flex-col gap-3">
        <p className="text-[8px] tracking-[0.28em] text-black/40 font-mono uppercase text-center mb-1">
          SELECT PIECE
        </p>
        {PRODUCTS.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => handleSelect(i)}
            className={`w-16 h-16 overflow-hidden transition-all duration-200 relative ${
              active === i
                ? "border-[1.5px] border-black shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                : "border border-black/20 opacity-60 hover:opacity-100"
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <img
              src={p.svg}
              alt={p.name}
              className="w-full h-full object-cover"
              style={{ mixBlendMode: "multiply", backgroundColor: "#ddd" }}
            />
            {/* Active indicator dot */}
            {active === i && (
              <motion.div
                className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-black rounded-full"
                layoutId="activeDot"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* ── Scanner progress bar (bottom) ────────────────────── */}
      <AnimatePresence>
        {glitching && (
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-black z-40"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "linear" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
