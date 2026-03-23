"use client";
import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";

// ─── Constants ────────────────────────────────────────────────────────────────
const TILT_MAX = 14;          // max degrees of tilt
const DEPTH_SHADOW = 40;      // px shadow layer offset multiplier
const DEPTH_SHINE = 0.28;     // shine layer opacity max
const SPRING_CONFIG = { stiffness: 180, damping: 28, mass: 0.6 };

// ─── Product3D ─────────────────────────────────────────────────────────────
/**
 * 3D parallax depth effect for a product SVG/image.
 *
 * Props:
 *   src        {string}  – image path
 *   alt        {string}  – alt text
 *   displayIdx {number}  – key to re‑trigger entry animation on product change
 *   className  {string}  – extra classes forwarded to the wrapper
 */
export default function Product3D({ src, alt, displayIdx, className = "" }) {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Normalised pointer position [-1, 1]
  const rawX = useRef(0);
  const rawY = useRef(0);

  // Sprung rotation values
  const springX = useSpring(0, SPRING_CONFIG);
  const springY = useSpring(0, SPRING_CONFIG);
  // Sprung parallax offset for shadow / highlight layers
  const springPX = useSpring(0, SPRING_CONFIG);
  const springPY = useSpring(0, SPRING_CONFIG);

  // Derived transforms
  const rotateY = useTransform(springX, (v) => v * TILT_MAX);
  const rotateX = useTransform(springY, (v) => -v * TILT_MAX);

  // Shadow layer drifts opposite to pointer
  const shadowX = useTransform(springPX, (v) => v * -DEPTH_SHADOW);
  const shadowY = useTransform(springPY, (v) => v * -DEPTH_SHADOW);

  // Shine layer tracks pointer for specular feel
  const shineX = useTransform(springPX, (v) => `${50 + v * 35}%`);
  const shineY = useTransform(springPY, (v) => `${50 + v * 35}%`);

  // Lift scale on hover
  const scale = useSpring(1, SPRING_CONFIG);

  const onMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;   // [-1, 1]
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.current = nx;
    rawY.current = ny;
    springX.set(nx);
    springY.set(ny);
    springPX.set(nx);
    springPY.set(ny);
  }, [springX, springY, springPX, springPY]);

  const onMouseEnter = useCallback(() => {
    setHovered(true);
    scale.set(1.035);
  }, [scale]);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    springX.set(0);
    springY.set(0);
    springPX.set(0);
    springPY.set(0);
    scale.set(1);
  }, [springX, springY, springPX, springPY, scale]);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute inset-0 flex items-center justify-center z-10 pt-10 ${className}`}
      style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}
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
          initial={{ opacity: 0, scale: 0.93, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(5px)" }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        >
          {/* ── Layer 1 – depth shadow (translateZ back) ────────── */}
          <motion.img
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute h-[88vh] w-auto object-contain mt-10 pointer-events-none select-none"
            style={{
              mixBlendMode: "multiply",
              filter: "blur(22px) brightness(0)",
              opacity: 0.13,
              translateX: shadowX,
              translateY: shadowY,
              translateZ: "-60px",
              scale: 0.97,
            }}
          />

          {/* ── Layer 2 – mid ghost (subtle depth doubling) ─────── */}
          <motion.img
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute h-[88vh] w-auto object-contain mt-10 pointer-events-none select-none"
            style={{
              mixBlendMode: "multiply",
              filter: "blur(6px) brightness(0.85)",
              opacity: 0.18,
              translateX: useTransform(shadowX, (v) => v * 0.45),
              translateY: useTransform(shadowY, (v) => v * 0.45),
              translateZ: "-28px",
              scale: 0.99,
            }}
          />

          {/* ── Layer 3 – main product image ────────────────────── */}
          <motion.img
            src={src}
            alt={alt}
            className="relative h-[88vh] w-auto object-contain mt-10 pointer-events-none select-none"
            style={{
              mixBlendMode: "multiply",
              translateZ: "0px",
            }}
          />

          {/* ── Layer 4 – specular shine ─────────────────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-sm"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              mixBlendMode: "screen",
              translateZ: "4px",
            }}
          />

          {/* ── Layer 5 – edge vignette when tilted ─────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s ease",
              translateZ: "2px",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}