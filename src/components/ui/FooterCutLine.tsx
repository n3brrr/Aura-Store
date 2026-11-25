import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

interface FooterCutLineProps {
  onHalt: () => void;
}

const HALT_THRESHOLD = 0.9; // 90 %

export default function FooterCutLine({ onHalt }: FooterCutLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isHalted, setIsHalted] = useState(false);
  const [progress, setProgress] = useState(0);

  // How wide is the dashed line (90 % of the container)
  const getMaxX = useCallback(() => {
    if (!containerRef.current) return 300;
    return containerRef.current.clientWidth * HALT_THRESHOLD;
  }, []);

  // Drag limit handed to motion. Motion reads drag constraints when a drag
  // starts, so a value computed during the first render (before the container
  // exists) would stick for the whole drag. Measure after mount and on resize.
  const [dragLimit, setDragLimit] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setDragLimit(el.clientWidth * HALT_THRESHOLD);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleDrag = useCallback(() => {
    const maxX = getMaxX();
    const currentX = x.get();
    const p = Math.min(currentX / maxX, 1);
    setProgress(p);

    if (p >= 1 && !isHalted) {
      setIsHalted(true);
      animate(x, maxX, { duration: 0 });
      onHalt();
    }
  }, [x, getMaxX, isHalted, onHalt]);

  // Width of the "already cut" portion (left of scissors)
  const cutWidth = useTransform(x, (v) => {
    const maxX = getMaxX();
    return `${Math.min((v / maxX) * 100, 100) * HALT_THRESHOLD}%`;
  });

  // Start the uncut dashed line right after the scissors
  const uncutLeft = useTransform(x, (v) => v + 32);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center w-full select-none h-32"
      aria-label="Drag to cut the label"
    >
      {/* ── Dashed line with cut effect ─────────────── */}
      {/* Left segment (already "cut") — simple offset tear trace */}
      <motion.div
        className="absolute left-8 h-px pointer-events-none"
        style={{
          top: "calc(50% + 5px)", // slightly lower to look separated
          width: cutWidth,
          borderTop: "1px dashed rgba(10,10,10,0.4)",
        }}
      />
      <motion.div
        className="absolute left-8 h-px pointer-events-none"
        style={{
          top: "calc(50% - 5px)", // slightly lower to look separated
          width: cutWidth,
          borderTop: "1px dashed rgba(10,10,10,0.4)",
        }}
      />

      {/* Right segment (still to be cut) — clear dashed line */}
      <motion.div
        className="absolute top-1/2 right-0 pointer-events-none"
        style={{
          left: uncutLeft,
          height: 1,
          transform: "translateY(-50%)",
          backgroundImage:
            "repeating-linear-gradient(90deg, #0a0a0a 0px, #0a0a0a 8px, transparent 8px, transparent 14px)",
          backgroundSize: "14px 1px",
        }}
      />
      {/* ── Draggable ✂ ─────────────────────────────── */}
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: dragLimit }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        style={{ x, cursor: isHalted ? "not-allowed" : "grab", touchAction: "pan-y" }}
        whileDrag={{ cursor: "grabbing", scale: 1.15 }}
        className="relative z-10 flex items-center justify-center w-11 h-11 md:w-8 md:h-8 shrink-0 before:absolute before:-inset-3 before:content-['']"
        title="Drag to cut the label"
        role="slider"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Drag to cut"
        tabIndex={0}
      >
        {/* Scissors icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isHalted ? "#888" : "#0a0a0a"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none"
        >
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      </motion.div>
      {/* ── Tip label ────────────────────────────────── */}
      {progress === 0 && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute left-12 md:left-10 top-1/2 -translate-y-1/2 pointer-events-none pb-10 font-syne text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-100 hidden sm:block"
        >
          DRAG TO CUT →
        </motion.span>
      )}
      {progress > 0 && progress < 1 && (
        <motion.span className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none pb-10 font-syne text-[10px] tracking-[0.4em] uppercase opacity-100">
          {Math.round(progress * 100)}%
        </motion.span>
      )}
    </div>
  );
}
