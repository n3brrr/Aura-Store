import { useState } from "react";

interface FooterLink {
  label: string;
  href: string;
  col: number;
}

const LINKS: FooterLink[] = [
  { label: "Shop", href: "/#shop", col: 0 },
  { label: "About", href: "/ComingSoon", col: 1 },
  { label: "Custom", href: "/#custom", col: 0 },
  { label: "Contact", href: "/ComingSoon", col: 1 },
  { label: "Lookbook", href: "/ComingSoon", col: 0 },
  { label: "Press", href: "/ComingSoon", col: 1 },
];

const LEFT_LINKS = LINKS.filter((l) => l.col === 0);
const RIGHT_LINKS = LINKS.filter((l) => l.col === 1);

export default function FooterLinkGrid() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (label: string) =>
    setChecked((prev) => ({ ...prev, [label]: !prev[label] }));

  const renderRow = (link: FooterLink) => (
    <div
      key={link.label}
      className="flex items-center gap-4 group py-[8px] px-3 -mx-3 transition-colors hover:bg-black hover:text-[#e5e5e5]"
    >
      <label className="flex items-center gap-3 cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={!!checked[link.label]}
          onChange={() => toggle(link.label)}
          className="appearance-none w-[14px] h-[14px] border border-black group-hover:border-[#e5e5e5] shrink-0
                   checked:bg-black checked:border-black relative cursor-pointer 
                   after:content-['✓'] after:absolute after:text-[#e5e5e5] after:text-[10px] after:left-[1.5px] after:top-[-1.5px]"
          style={{ accentColor: "black" }}
          aria-label={`Select ${link.label}`}
        />
      </label>
      <a
        href={link.href}
        className="text-[14px] tracking-[0.35em] uppercase font-bold flex-1 transition-colors group-hover:text-[#e5e5e5] font-syne"
      >
        {link.label}
      </a>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-black pb-2 mb-2 gap-4">
        <span className="text-[12px] tracking-[0.45em] uppercase opacity-100 font-syne">
          COMPOSITION / LINKS
        </span>
        <span className="text-[12px] tracking-[0.45em] uppercase opacity-100 font-syne hidden sm:inline">
          REF. AS-NAV-001
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12">
        <div className="col-span-1 md:col-span-2">{LEFT_LINKS.map(renderRow)}</div>
        <div className="col-span-1 md:col-span-2">{RIGHT_LINKS.map(renderRow)}</div>
      </div>
    </div>
  );
}
