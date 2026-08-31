import React, { useState, useEffect } from "react";

const GLITCH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=<>?/|\\█▓▒░";

interface GlichLettersProps {
  text: string;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlichLetters({
  text,
  active = true,
  className = "",
  style,
}: GlichLettersProps) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!active || !text) {
      setOut(text);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }

    const timeouts = new Set<number>();
    const id = window.setInterval(() => {
      if (Math.random() > 0.45) {
        const arr = text.split("");
        const n = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < n; i++) {
          const randomIndex = Math.floor(Math.random() * arr.length);
          if (arr[randomIndex] !== " ") {
            arr[randomIndex] =
              GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]!;
          }
        }
        setOut(arr.join(""));
        const tid = window.setTimeout(
          () => setOut(text),
          150 + Math.random() * 100,
        );
        timeouts.add(tid);
      }
    }, 180);

    return () => {
      clearInterval(id);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [text, active]);

  return (
    <span className={className} style={style}>
      {out}
    </span>
  );
}

// Alias with correct spelling
export const GlitchLetters = GlichLetters;
