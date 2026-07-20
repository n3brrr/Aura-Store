import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";

// ─── Constants ────────────────────────────────────────────────────────────────
const TILT_MAX = 12;
const DEPTH_SHADOW = 30;
const SPRING_CONFIG = { stiffness: 200, damping: 30, mass: 0.5 };

export default function Product3D({ src, alt, displayIdx, className = "" }) {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Normalised pointer position [-1, 1]
  const springX = useSpring(0, SPRING_CONFIG);
  const springY = useSpring(0, SPRING_CONFIG);

  // Derived transforms for 3D rotation
  const rotateY = useTransform(springX, (v) => v * TILT_MAX);
  const rotateX = useTransform(springY, (v) => -v * TILT_MAX);

  // Shadow layer drifts opposite to pointer
  const shadowX = useTransform(springX, (v) => v * -DEPTH_SHADOW);
  const shadowY = useTransform(springY, (v) => v * -DEPTH_SHADOW);

  // Lift scale on hover
  const scale = useSpring(1, SPRING_CONFIG);

  const onMouseMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      springX.set(nx);
      springY.set(ny);
    },
    [springX, springY],
  );

  const onMouseEnter = useCallback(() => {
    setHovered(true);
    scale.set(1.03);
  }, [scale]);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    springX.set(0);
    springY.set(0);
    scale.set(1);
  }, [springX, springY, scale]);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute inset-0 flex items-center justify-center z-10 pt-10 ${className}`}
      style={{ perspective: "1000px" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={displayIdx}
          className="relative flex items-center justify-center"
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* ── Layer 1 – Depth Shadow (Optimized) ────────── */}
          <motion.img
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute h-[88vh] w-auto object-contain mb-10 pointer-events-none select-none"
            style={{
              filter: "blur(12px) brightness(0)",
              opacity: 0.15,
              x: shadowX,
              y: shadowY,
              translateZ: "-40px",
              willChange: "transform",
            }}
          />

          {/* ── Layer 2 – Main Product Image ────────────────────── */}
          <motion.img
            src={src}
            alt={alt}
            className="relative h-[88vh] w-auto object-contain mb-10 pointer-events-none select-none drop-shadow-2xl"
            style={{ translateZ: "10px" }}
          />

          {/* ── Layer 3 – Edge Highlight (Optional, very light) ────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl border-[1.5px] border-white/20"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              translateZ: "30px",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
