const CURRENT_YEAR = new Date().getFullYear();

export default function FooterLegalLine() {
  return (
    <div className="w-full items-center grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0 text-center">
      <div className="text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.35em] uppercase font-syne md:text-left leading-tight">
        AURA STORE — ALL WRONGS RESERVED
      </div>
      <div className="text-[11px] md:text-[12px] tracking-[0.2em] md:tracking-[0.25em] uppercase font-syne text-center leading-tight">
        Designed by
        <a
          href="https://rubentorres.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-bold p-1 md:p-2 inline-block"
        >
          Ruben Torres
        </a>
        © {CURRENT_YEAR}
      </div>
      <div className="text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.35em] uppercase font-syne md:text-right leading-tight">
        REF. AS-FOOTER-001 — v0.0.1
      </div>
    </div>
  );
}
