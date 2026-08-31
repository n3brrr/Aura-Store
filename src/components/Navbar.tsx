import { useState, useCallback } from "react";

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Main", href: "/", isActive: true },
  { label: "Shop", href: "/#shop", isActive: false },
  { label: "Custom", href: "/#custom", isActive: false },
  { label: "About", href: "/ComingSoon", isActive: false },
  { label: "Contact", href: "/ComingSoon", isActive: false },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 sm:h-24 z-[100] px-[max(1.5rem,env(safe-area-inset-left))] sm:px-6 md:px-12 py-6 sm:py-8 flex justify-between items-start font-syne pointer-events-none backdrop-blur-xl">
        <div className="pointer-events-auto">
          <a href="#" className="group" aria-label="Aura Store home">
            <h1 className="text-xl sm:text-2xl font-black uppercase leading-[0.8] tracking-tighter">
              Aura
              <br />
              <span className="flex items-center gap-1">
                Store{" "}
                <span className="text-sm opacity-40 group-hover:opacity-100 transition-opacity mb-2">
                  ✦✦
                  <br />
                  ✦✦
                </span>
              </span>
            </h1>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-10 pointer-events-auto mt-2">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-[20px] font-extrabold lowercase tracking-[0.2em] transition-all duration-300 relative group
                    ${link.isActive ? "opacity-100 underline underline-offset-4" : "opacity-60 hover:opacity-100 "}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto mt-2 sm:mt-5">
          <div className="hidden sm:block text-right">
            <p className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest leading-none">
              Account ID — <span className="font-black text-xs">000.666</span>
            </p>
          </div>

          <button
            type="button"
            onClick={toggle}
            className="md:hidden flex items-center justify-center w-11 h-11 border-2 border-black bg-[#f0eee9] text-[12px] font-black tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {open ? "✕" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-20 sm:top-24 z-[90] bg-[#f0eee9] border-y-2 border-black flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col divide-y divide-black/15 flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={close}
                className={`px-6 py-5 text-[18px] font-black tracking-[0.2em] lowercase hover:bg-black hover:text-white transition-colors flex items-center justify-between
                  ${link.isActive ? "bg-black text-white" : "text-black"}`}
              >
                {link.label}
                <span className="text-sm opacity-40">→</span>
              </a>
            ))}
          </div>
          <div className="border-t-2 border-black px-6 py-4 flex items-center justify-between bg-white/50">
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold opacity-60">
              Account ID — 000.666
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">
              AURA STORE
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
