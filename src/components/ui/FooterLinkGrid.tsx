import { useState } from "react";

interface FooterLink {
  label: string;
  href: string;
  col: number; // 0 = left col, 1 = right col
}

const LINKS: FooterLink[] = [
  { label: "Shop",     href: "/#shop",       col: 0 },
  { label: "About",    href: "/ComingSoon",   col: 1 },
  { label: "Custom",   href: "/#custom",      col: 0 },
  { label: "Contact",  href: "/ComingSoon",   col: 1 },
  { label: "Lookbook", href: "/ComingSoon",   col: 0 },
  { label: "Press",    href: "/ComingSoon",   col: 1 },
];

const LEFT_LINKS  = LINKS.filter((l) => l.col === 0);
const RIGHT_LINKS = LINKS.filter((l) => l.col === 1);

export default function FooterLinkGrid() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (label: string) =>
    setChecked((prev) => ({ ...prev, [label]: !prev[label] }));

  const renderRow = (link: FooterLink) => (
    <label
      key={link.label}
      className="flex items-center gap-4 group cursor-pointer py-[8px] px-3 -mx-3 transition-colors hover:bg-black hover:text-[#e5e5e5]"
    >
      <input
        type="checkbox"
        checked={!!checked[link.label]}
        onChange={() => toggle(link.label)}
        className="appearance-none w-[14px] h-[14px] border border-black group-hover:border-[#e5e5e5] shrink-0
                   checked:bg-black checked:border-black relative cursor-pointer
                   after:content-['✓'] after:absolute after:text-[#e5e5e5] after:text-[10px] after:left-[1.5px] after:top-[-1.5px]"
        style={{ accentColor: "black" }}
        onClick={(e) => {
          e.stopPropagation();
          // Navigate when clicking the label area
        }}
      />
      <a
        href={link.href}
        onClick={(e) => e.stopPropagation()}
        className="text-[14px] tracking-[0.35em] uppercase font-bold flex-1 transition-colors group-hover:text-[#e5e5e5]"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {link.label}
      </a>
    </label>
  );

  return (
    <div className="w-full">
      {/* Table header */}
      <div className="flex items-center justify-between border-b border-black pb-2 mb-2">
        <span
          className="text-[8px] tracking-[0.45em] uppercase opacity-40"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          COMPOSITION / LINKS
        </span>
        <span
          className="text-[8px] tracking-[0.45em] uppercase opacity-40"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          REF. AS-NAV-001
        </span>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col">{LEFT_LINKS.map(renderRow)}</div>
        <div className="flex flex-col">{RIGHT_LINKS.map(renderRow)}</div>
      </div>
    </div>
  );
}
