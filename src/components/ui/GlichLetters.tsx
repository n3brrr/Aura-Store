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

    const id = setInterval(() => {
      if (Math.random() > 0.45) {
        const arr = text.split("");
        const n = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < n; i++) {
          const randomIndex = Math.floor(Math.random() * arr.length);
          // Don't replace spaces
          if (arr[randomIndex] !== " ") {
            arr[randomIndex] =
              GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }
        setOut(arr.join(""));
        setTimeout(() => setOut(text), 150 + Math.random() * 100);
      }
    }, 180);

    return () => clearInterval(id);
  }, [text, active]);

  return (
    <span className={className} style={style}>
      {out}
    </span>
  );
}
