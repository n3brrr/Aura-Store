import React from "react";

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Main", href: "#", isActive: true },
  { label: "Shop", href: "#shop", isActive: false },
  { label: "Custom", href: "#custom", isActive: false },
  { label: "About", href: "#about", isActive: false },
  { label: "Contact", href: "#contact", isActive: false },
];

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-24 z-100 px-6 py-8 md:px-12 flex justify-between items-start font-syne pointer-events-none backdrop-blur-xl">
      {/* Logo & Brand - Pointer events enable para clicks */}
      <div className="pointer-events-auto">
        <a href="#" className="group">
          <h1 className="text-2xl font-black uppercase leading-[0.8] tracking-tighter">
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

      {/* Navigation Links - Centered desktop, hidden/burger mobile opcional */}
      <div className="hidden text-md md:flex items-center gap-10 pointer-events-auto mt-2">
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

      {/* Account Info - Aspecto técnico/industrial */}
      <div className="text-right pointer-events-auto mt-5">
        <p className="text-[12px] font-bold uppercase tracking-widest leading-none">
          Account ID — <span className="font-black text-xs">000.666</span>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
