const TICKER_MSG =
  "AURA STORE — CARE LABEL REF. 001 — DO NOT BLEACH — TUMBLE DRY LOW — IRON ON REVERSE — MADE IN THE INTERNET — DO NOT COPY — WASH WITH INTENTION — HANDLE WITH CARE — ";

export default function FooterTicker() {
  return (
    <div className="w-full overflow-hidden relative">
      <style>{`
        @keyframes footer-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="flex whitespace-nowrap"
        style={{ animation: "footer-ticker 32s linear infinite" }}
      >
        <span className="text-[12px] tracking-[0.32em] uppercase opacity-100 font-syne">
          {(TICKER_MSG + TICKER_MSG).repeat(2)}
        </span>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-[#e5e5e5] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-[#e5e5e5] to-transparent pointer-events-none z-10" />
    </div>
  );
}
