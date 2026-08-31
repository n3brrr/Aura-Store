import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";

const TILT_MAX = 12;
const DEPTH_SHADOW = 30;
const SPRING_CONFIG = { stiffness: 200, damping: 30, mass: 0.5 };

interface Product3DProps {
  src: string;
  alt: string;
  displayIdx: number;
  className?: string;
}

export default function Product3D({
  src,
  alt,
  displayIdx,
  className = "",
}: Product3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const springX = useSpring(0, SPRING_CONFIG);
  const springY = useSpring(0, SPRING_CONFIG);

  const rotateY = useTransform(springX, (v) => v * TILT_MAX);
  const rotateX = useTransform(springY, (v) => -v * TILT_MAX);

  const shadowX = useTransform(springX, (v) => v * -DEPTH_SHADOW);
  const shadowY = useTransform(springY, (v) => v * -DEPTH_SHADOW);

  const scale = useSpring(1, SPRING_CONFIG);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      const isTouch = e.pointerType === "touch";
      const mult = isTouch ? 0.6 : 1;
      springX.set(nx * mult);
      springY.set(ny * mult);
    },
    [springX, springY],
  );

  const onPointerEnter = useCallback(() => {
    setHovered(true);
    scale.set(1.03);
  }, [scale]);

  const onPointerLeave = useCallback(() => {
    setHovered(false);
    springX.set(0);
    springY.set(0);
    scale.set(1);
  }, [springX, springY, scale]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`absolute inset-0 flex items-center justify-center z-10 pt-10 touch-pan-y md:touch-none ${className}`}
      style={{ perspective: "1000px" }}
      role="img"
      aria-label={alt}
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
            willChange: hovered ? "transform" : "auto",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.img
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute h-[50vh] sm:h-[60vh] lg:h-[88vh] max-h-[520px] lg:max-h-none w-auto object-contain mb-10 pointer-events-none select-none"
            style={{
              filter: "blur(12px) brightness(0)",
              opacity: 0.15,
              x: shadowX,
              y: shadowY,
              translateZ: "-40px",
              willChange: hovered ? "transform" : "auto",
            }}
            loading="eager"
            decoding="async"
          />

          <motion.img
            src={src}
            alt={alt}
            className="relative h-[50vh] sm:h-[60vh] lg:h-[88vh] max-h-[520px] lg:max-h-none w-auto object-contain mb-10 pointer-events-none select-none drop-shadow-2xl"
            style={{ translateZ: "10px" }}
            loading="eager"
            decoding="async"
            width={800}
            height={800}
          />

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
