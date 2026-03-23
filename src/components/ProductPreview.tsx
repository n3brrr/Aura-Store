"use client";
import React, { useRef, useState, useCallback } from "react";
import { motion, useAnimate, animate } from "motion/react";

interface ProductPreviewProps {
  image: string;
  secondaryImage?: string;
  name: string;
  price: string;
  category: string;
  tag?: string;
}

export default function ProductPreview({
  image,
  secondaryImage,
  name,
  price,
  category,
  tag,
}: ProductPreviewProps) {
  const [scope, animateEl] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const inProgress = useRef(false);
  const activeAnim = useRef<ReturnType<typeof animate> | null>(null);

  // ── Hover IN: scan line sweeps top→bottom, reveals secondary ──────────────
  const handleMouseEnter = useCallback(async () => {
    if (!secondaryImage || inProgress.current) return;
    inProgress.current = true;
    setIsHovered(true);

    const scanLine = scope.current?.querySelector(
      ".scan-line",
    ) as HTMLElement | null;
    const secondary = scope.current?.querySelector(
      ".img-secondary",
    ) as HTMLElement | null;
    const primary = scope.current?.querySelector(
      ".img-primary",
    ) as HTMLElement | null;
    if (!scanLine || !secondary || !primary) {
      inProgress.current = false;
      return;
    }

    // Reset secondary clip to fully hidden
    secondary.style.clipPath = "inset(0 0 100% 0)";
    secondary.style.opacity = "1";

    // Bring scan line to top, make visible
    scanLine.style.top = "0%";
    scanLine.style.opacity = "1";

    // Animate scan line from 0% → 100% while clipping secondary image open
    activeAnim.current = animate(0, 1, {
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1],
      onUpdate(v) {
        const pct = v * 100;
        scanLine.style.top = `${pct}%`;
        secondary.style.clipPath = `inset(0 0 ${100 - pct}% 0)`;
        // Fade primary out in the top portion as scan passes
        primary.style.clipPath = `inset(${pct}% 0 0 0)`;
      },
      onComplete() {
        scanLine.style.opacity = "0";
        setShowSecondary(true);
        inProgress.current = false;
      },
    });
  }, [secondaryImage, scope]);

  // ── Hover OUT: scan line sweeps bottom→top, restores primary ─────────────
  const handleMouseLeave = useCallback(async () => {
    if (!secondaryImage) return;
    setIsHovered(false);

    activeAnim.current?.stop();

    const scanLine = scope.current?.querySelector(
      ".scan-line",
    ) as HTMLElement | null;
    const secondary = scope.current?.querySelector(
      ".img-secondary",
    ) as HTMLElement | null;
    const primary = scope.current?.querySelector(
      ".img-primary",
    ) as HTMLElement | null;
    if (!scanLine || !secondary || !primary) return;

    setShowSecondary(false);
    inProgress.current = true;

    // Start scan from current position or bottom
    const currentTop = parseFloat(scanLine.style.top) || 100;
    scanLine.style.opacity = "1";

    animate(currentTop / 100, 0, {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1],
      onUpdate(v) {
        const pct = v * 100;
        scanLine.style.top = `${pct}%`;
        secondary.style.clipPath = `inset(0 0 ${100 - pct}% 0)`;
        primary.style.clipPath = `inset(${pct}% 0 0 0)`;
      },
      onComplete() {
        scanLine.style.opacity = "0";
        primary.style.clipPath = "inset(0 0 0% 0)";
        secondary.style.clipPath = "inset(0 0 100% 0)";
        inProgress.current = false;
      },
    });
  }, [secondaryImage, scope]);

  return (
    <article
      className="group relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.location.assign("/ComingSoon")}
      ref={scope}
    >
      {/* ── Image Container ───────────────────────────────────── */}

      <div className="relative w-full aspect-square overflow-hidden mb-4 rounded-xl">
        {/* Primary Image */}
        <img
          src={image}
          alt={name}
          className="img-primary absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: "inset(0 0 0% 0)", willChange: "clip-path" }}
        />

        {/* Secondary Image */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${name} back view`}
            className="img-secondary absolute inset-0 w-full h-full object-contain"
            style={{
              clipPath: "inset(0 0 100% 0)",
              willChange: "clip-path",
            }}
          />
        )}

        {/* Scan Line */}
        {secondaryImage && (
          <div
            className="scan-line absolute left-0 right-0 pointer-events-none z-20"
            style={{
              top: "0%",
              height: "2px",
              opacity: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)",
              transform: "translateY(-50%)",
              willChange: "top, opacity",
            }}
          />
        )}

        {/* Subtle scan noise overlay — flickers only while scanning */}
        {secondaryImage && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px",
              mixBlendMode: "overlay",
            }}
            animate={{ opacity: isHovered ? 0.04 : 0 }}
            transition={{ duration: 0.1 }}
          />
        )}

        {/* Tag Badge */}
        {tag && (
          <div className="absolute top-4 right-4 z-30 bg-black text-white px-3 py-1 rounded-full border border-black/10 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {tag}
            </span>
          </div>
        )}
      </div>

      {/* ── Info ─────────────────────────────────────────────── */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-tight mb-1">
            {name}
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {category}
          </p>
        </div>
        <span className="text-lg font-bold">{price}</span>
      </div>
    </article>
  );
}
