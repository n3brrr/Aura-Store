import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Product3d from "./ui/Product3d";

interface ProductSpec {
  label: string;
  value: string;
}
interface Product {
  id: string;
  name: string;
  svg: string;
  specs: ProductSpec[];
}

const PRODUCTS: Product[] = [
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

interface GlitchOverlayProps {
  active: boolean;
}
function GlitchOverlay({ active }: GlitchOverlayProps) {
  const slices = useMemo(
    () =>
      [...Array(6)].map((_, i) => ({
        height: `${3 + Math.random() * 12}%`,
        top: `${Math.random() * 90}%`,
        background:
          i % 2 === 0 ? `rgba(0,0,0,0.08)` : `rgba(255,255,255,0.12)`,
        tx: (Math.random() - 0.5) * 20,
      })),
    [active],
  );

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
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
            }}
            animate={{ backgroundPositionY: ["0px", "100px"] }}
            transition={{ duration: 0.15, repeat: 2, ease: "linear" }}
          />
          {slices.map((s, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0"
              style={{
                height: s.height,
                top: s.top,
                background: s.background,
                transform: `translateX(${s.tx}px)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.08, delay: i * 0.03, repeat: 2 }}
            />
          ))}
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

interface ScannerRevealProps {
  items: ProductSpec[];
  trigger: number;
}
function ScannerReveal({ items, trigger }: ScannerRevealProps) {
  return (
    <div className="flex flex-col gap-[2px] mt-3">
      {items.map((item, i) => (
        <AnimatePresence key={`${trigger}-${i}`} mode="wait">
          <motion.div
            key={`${trigger}-${i}`}
            className="flex items-baseline gap-2 sm:gap-3 overflow-hidden relative"
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
              className="absolute left-0 right-0 h-px bg-black/40"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 0.2, delay: 0.35 + i * 0.08 }}
            />
            <span
              className="text-[9px] tracking-[0.2em] text-black/80 font-syne uppercase shrink-0"
              style={{ minWidth: "60px" }}
            >
              {item.label}
            </span>
            <span className="w-full h-px bg-black/20 hidden sm:block" />
            <span className="text-[11px] sm:text-[12px] tracking-[0.15em] sm:tracking-[0.18em] text-black/80 font-syne uppercase break-words text-right flex-1 leading-tight">
              {item.value}
            </span>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}

export default function AuraStoreHero() {
  const [active, setActive] = useState<number>(0);
  const [glitching, setGlitching] = useState<boolean>(false);
  const [displayIdx, setDisplayIdx] = useState<number>(0);
  const [specTrigger, setSpecTrigger] = useState<number>(0);
  const pendingRef = useRef<number | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  function handleSelect(idx: number): void {
    if (idx === active || glitching) return;
    pendingRef.current = idx;

    setGlitching(true);

    const t1 = window.setTimeout(() => {
      if (pendingRef.current !== null) {
        setDisplayIdx(pendingRef.current);
        setActive(pendingRef.current);
      }
    }, 180);

    const t2 = window.setTimeout(() => {
      setGlitching(false);
      setSpecTrigger((t) => t + 1);
    }, 380);

    timeoutsRef.current.push(t1, t2);
  }

  const product = PRODUCTS[displayIdx]!;

  return (
    <div
      className="relative w-full min-h-[100dvh] lg:h-screen lg:overflow-hidden overflow-hidden select-none flex flex-col lg:block py-8 lg:py-0"
      style={{ backgroundColor: "#E8E7E3", fontFamily: "montserrat" }}
      id="custom"
    >
      <GlitchOverlay active={glitching} />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-5 pointer-events-none z-0 overflow-hidden m-2 sm:m-5">
        <span
          className="font-black uppercase tracking-tighter text-[clamp(3rem,14vw,10rem)]"
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
          className="font-black uppercase leading-none tracking-tighter text-[clamp(2.5rem,12vw,8rem)]"
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

      {/* Product image — on mobile takes flex space, on desktop absolute centered */}
      <div className="relative lg:absolute lg:inset-0 flex items-center justify-center z-10 flex-1 lg:flex-none min-h-[42vh] sm:min-h-[50vh] lg:min-h-0">
        <Product3d src={product.svg} alt={product.name} displayIdx={displayIdx} className="!relative lg:!absolute" />
      </div>

      {/* Specs panel */}
      <div className="relative lg:absolute order-3 lg:order-none bottom-auto lg:bottom-14 left-auto lg:left-22 z-20 w-full lg:max-w-md px-4 sm:px-6 lg:px-0 mt-4 lg:mt-0">
        <AnimatePresence mode="wait">
          <motion.p
            key={`num-${displayIdx}`}
            className="text-[11px] tracking-[0.25em] text-black/80 font-bold uppercase mb-1"
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
            className="text-[18px] sm:text-[22px] font-bold uppercase tracking-[0.05em] leading-none mb-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, delay: 0.32 }}
          >
            {product.name}
          </motion.h2>
        </AnimatePresence>

        <div className="border-t border-black/10 pt-2">
          <p className="text-[12px] sm:text-[14px] tracking-[0.3em] text-black/60 font-syne uppercase mb-1">
            SPECIFICATIONS
          </p>
          <ScannerReveal items={product.specs} trigger={specTrigger} />
        </div>

        <motion.button
          type="button"
          className="mt-5 w-full bg-black text-white text-[10px] tracking-[0.25em] rounded-xl uppercase py-3 font-bold hover:bg-black/80 active:scale-[0.98] transition-all cursor-pointer"
          whileHover={{ letterSpacing: "0.32em" }}
          transition={{ duration: 0.15 }}
          onClick={() => window.location.assign("/ComingSoon")}
          aria-label={`View details for ${product.name}`}
        >
          VIEW DETAILS
        </motion.button>
      </div>

      {/* Thumbnails */}
      <div className="relative lg:absolute order-2 lg:order-none right-auto lg:right-15 bottom-auto lg:bottom-14 z-20 flex flex-row lg:flex-col gap-3 justify-center lg:justify-start px-4 sm:px-6 lg:px-0 mt-6 lg:mt-0 overflow-x-auto lg:overflow-visible scrollbar-hidden">
        {PRODUCTS.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => handleSelect(i)}
            className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 overflow-hidden transition-all duration-350 relative cursor-pointer shrink-0 snap-start ${
              active === i
                ? "border-[1.5px] border-black"
                : "border border-black/20 opacity-60 hover:opacity-100"
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Select ${p.name}`}
            aria-pressed={active === i}
          >
            <img
              src={p.svg}
              alt={p.name}
              className="w-full h-full object-cover"
              style={{ mixBlendMode: "multiply", backgroundColor: "#ddd" }}
              loading="lazy"
              decoding="async"
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

      <AnimatePresence>
        {glitching && (
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-black z-40 w-full"
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
