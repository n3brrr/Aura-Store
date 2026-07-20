const CURRENT_YEAR = new Date().getFullYear();

export default function FooterLegalLine() {
  return (
    <div className="w-full items-center grid grid-cols-3">
      <div className="text-[11px] tracking-[0.35em] uppercase font-syne text-left">
        AURA STORE — ALL WRONGS RESERVED
      </div>
      <div className="text-[12px] tracking-[0.25em] uppercase font-syne text-center">
        Designed by
        <a
          href="https://rubentorres.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:cursor-not-allowed font-bold hover:scale-110 transition-all duration-300 ease-in-out p-2"
        >
          Ruben Torres
        </a>
        ©         {CURRENT_YEAR}
      </div>
      <div className="text-[11px] tracking-[0.35em] uppercase font-syne text-right">
        REF. AS-FOOTER-001 — v0.0.1
      </div>
    </div>
  );
}
