import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useAnimate, animate } from "motion/react";
import GlichLetters from "./ui/GlichLetters";

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
  const primaryRef = useRef<HTMLImageElement>(null);
  const secondaryRef = useRef<HTMLImageElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const inProgress = useRef(false);
  const activeAnim = useRef<ReturnType<typeof animate> | null>(null);
  const touchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      activeAnim.current?.stop();
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, []);

  const revealSecondary = useCallback(() => {
    if (!secondaryImage || inProgress.current) return;
    inProgress.current = true;
    setIsHovered(true);

    const scanLine = scanLineRef.current;
    const secondary = secondaryRef.current;
    const primary = primaryRef.current;
    if (!scanLine || !secondary || !primary) {
      inProgress.current = false;
      return;
    }

    secondary.style.clipPath = "inset(0 0 100% 0)";
    secondary.style.opacity = "1";
    scanLine.style.top = "0%";
    scanLine.style.opacity = "1";

    activeAnim.current = animate(0, 1, {
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1],
      onUpdate(v) {
        const pct = v * 100;
        scanLine.style.top = `${pct}%`;
        secondary.style.clipPath = `inset(0 0 ${100 - pct}% 0)`;
        primary.style.clipPath = `inset(${pct}% 0 0 0)`;
      },
      onComplete() {
        scanLine.style.opacity = "0";
        setShowSecondary(true);
        inProgress.current = false;
      },
    });
  }, [secondaryImage]);

  const hideSecondary = useCallback(() => {
    if (!secondaryImage) return;
    setIsHovered(false);

    activeAnim.current?.stop();

    const scanLine = scanLineRef.current;
    const secondary = secondaryRef.current;
    const primary = primaryRef.current;
    if (!scanLine || !secondary || !primary) return;

    setShowSecondary(false);
    inProgress.current = true;

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
  }, [secondaryImage]);

  const handleMouseEnter = useCallback(() => revealSecondary(), [revealSecondary]);
  const handleMouseLeave = useCallback(() => hideSecondary(), [hideSecondary]);

  const handleTouchStart = useCallback(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    if (showSecondary) {
      hideSecondary();
    } else {
      revealSecondary();
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = window.setTimeout(() => hideSecondary(), 1400);
    }
  }, [showSecondary, revealSecondary, hideSecondary]);

  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsGlitching(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.assign("/ComingSoon");
      }
    },
    [],
  );

  return (
    <article
      className="group relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={() => window.location.assign("/ComingSoon")}
      onKeyDown={handleKeyDown}
      ref={scope}
      role="button"
      tabIndex={0}
      aria-label={`${name} — ${category} — ${price}`}
    >
      <div className="relative w-full aspect-square overflow-hidden mb-4 rounded-xl">
        <img
          ref={primaryRef}
          src={image}
          alt={name}
          className="img-primary absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: "inset(0 0 0% 0)", willChange: isHovered ? "clip-path" : "auto" }}
          loading="lazy"
          decoding="async"
          width={600}
          height={600}
        />

        {secondaryImage && (
          <img
            ref={secondaryRef}
            src={secondaryImage}
            alt={`${name} back view`}
            className="img-secondary absolute inset-0 w-full h-full object-contain"
            style={{
              clipPath: "inset(0 0 100% 0)",
              willChange: isHovered ? "clip-path" : "auto",
            }}
            loading="lazy"
            decoding="async"
            width={600}
            height={600}
          />
        )}

        {secondaryImage && (
          <div
            ref={scanLineRef}
            className="scan-line absolute left-0 right-0 pointer-events-none z-20"
            style={{
              top: "0%",
              height: "2px",
              opacity: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)",
              transform: "translateY(-50%)",
              willChange: isHovered ? "top, opacity" : "auto",
            }}
            aria-hidden="true"
          />
        )}

        {secondaryImage && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px",
              mixBlendMode: "overlay",
            }}
            animate={{ opacity: isHovered ? 0.04 : 0 }}
            transition={{ duration: 0.15 }}
            aria-hidden="true"
          />
        )}

        {tag && (
          <div className="absolute top-4 right-4 z-30 bg-black text-white px-3 py-1 rounded-full border border-black/10 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {tag}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-md font-bold uppercase tracking-tight mb-1 ml-2">
            <GlichLetters text={name} active={isGlitching} />
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider ml-2">
            <GlichLetters text={category} active={isGlitching} />
          </p>
        </div>
        <span className="text-md font-bold opacity-90">{price}</span>
      </div>
    </article>
  );
}
