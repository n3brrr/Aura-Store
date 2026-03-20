import React from "react";
import { ShoppingBag, Search, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference text-white">
      <div className="flex gap-8 items-center">
        <button className="hover:opacity-50 transition-opacity">
          <Menu size={20} strokeWidth={1.5} />
        </button>
        <button className="hidden md:block hover:opacity-50 transition-opacity uppercase text-[10px] tracking-widest font-bold">
          Search
        </button>
      </div>

      <a href="/" className="text-xl font-black uppercase tracking-tighter">
        Aura
      </a>

      <div className="flex gap-8 items-center">
        <button className="hidden md:block hover:opacity-50 transition-opacity uppercase text-[10px] tracking-widest font-bold">
          Account
        </button>
        <button className="flex items-center gap-2 hover:opacity-50 transition-opacity">
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span className="text-[10px] font-bold">(0)</span>
        </button>
      </div>
    </nav>
  );
}
