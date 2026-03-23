"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Product3d from "./ui/Product3d";

// ─── Product Data ────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "001",
    name: "SKELETON PUFFER",
    svg: "/Item001.svg",
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
    svg: "/Item002.svg",
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
    svg: "/Item003.svg",
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
              transition={{ duration: 0.08, delay: i * 0.03, repeat: 2 }}
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

// ─── Scanner Reveal ───────────────────────────────────────────────────────────
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
            <motion.div
              className="absolute left-0 right-0 h-1px bg-black/40"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 0.2, delay: 0.35 + i * 0.08 }}
            />
            <span
              className="text-[9px] tracking-[0.2em] text-black/80 font-syne uppercase shrink-0"
              style={{ minWidth: "72px" }}
            >
              {item.label}
            </span>
            <span className="w-full h-3px bg-black/20" />
            <span className="text-[12px] tracking-[0.18em] text-black/80 font-syne uppercase whitespace-nowrap">
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

    setGlitching(true);

    setTimeout(() => {
      setDisplayIdx(pendingRef.current);
      setActive(pendingRef.current);
    }, 180);

    setTimeout(() => {
      setGlitching(false);
      setSpecTrigger((t) => t + 1);
    }, 380);
  }

  const product = PRODUCTS[displayIdx];

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ backgroundColor: "#E8E7E3", fontFamily: "montserrat" }}
      id="custom"
    >
      {/* ── Glitch Overlay ─────────────────────────────────── */}
      <GlitchOverlay active={glitching} />

      {/* ── Watermark ──────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-between px-5 pointer-events-none z-0 overflow-hidden m-5">
        <span
          className="text-[14vw] font-black uppercase tracking-tighter"
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
          className="text-[12vw] font-black gap-2 uppercase leading-none tracking-tighter"
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

      {/* ── CENTRAL PRODUCT IMAGE — ahora con efecto 2.5D ──── */}
      <Product3d src={product.svg} alt={product.name} displayIdx={displayIdx} />

      {/* ── Bottom Left: Product Info + Specs ──────────────── */}
      <div className="absolute bottom-14 left-22 z-20 max-w-md">
        <AnimatePresence mode="wait">
          <motion.p
            key={`num-${displayIdx}`}
            className="text-[11px] tracking-[0.25em] text-black/40 font-bold uppercase mb-1"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            ITEM NO. {product.id}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.h2
            key={`name-${displayIdx}`}
            className="text-[22px] font-bold uppercase tracking-[0.05em] leading-none mb-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, delay: 0.32 }}
          >
            {product.name}
          </motion.h2>
        </AnimatePresence>

        <div className="border-t border-black/10 pt-2">
          <p className="text-[14px] tracking-[0.3em] text-black/30 font-syne uppercase mb-1">
            FICHA TÉCNICA
          </p>
          <ScannerReveal items={product.specs} trigger={specTrigger} />
        </div>

        <motion.button
          className="mt-5 w-full bg-black text-white text-[10px] tracking-[0.25em] rounded-xl uppercase py-3 font-bold hover:bg-black/80 active:scale-[0.98] transition-all"
          whileHover={{ letterSpacing: "0.32em" }}
          transition={{ duration: 0.15 }}
          onClick={() => window.location.assign("/ComingSoon")}
        >
          VIEW DETAILS
        </motion.button>
      </div>

      {/* ── Right: Piece Selector ───────────────────────────── */}
      <div className="absolute right-15 bottom-14 z-20 flex flex-col gap-3">
        {PRODUCTS.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => handleSelect(i)}
            className={`w-32 h-32 overflow-hidden transition-all duration-350 relative ${
              active === i
                ? "border-[1.5px] border-black"
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

      {/* ── Scanner progress bar ────────────────────────────── */}
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
