const CURRENT_YEAR = new Date().getFullYear();
// Deterministic pseudo-barcode — no external lib needed
const BARS = [
  3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 4, 1, 1, 2, 3, 1, 1, 2, 1, 4,
  2, 1, 3, 1, 2, 1, 1, 4, 1, 2, 1, 3, 2, 1, 1, 2, 4, 1, 1, 3, 2, 1,
];

const BAR_UNIT = 2.2; // px per unit width
const BAR_HEIGHT = 52;
const TOTAL_WIDTH = BARS.reduce((a, b) => a + b, 0) * BAR_UNIT;

export default function FooterBarcode() {
  let x = 0;
  const rects: { x: number; w: number; isBar: boolean }[] = [];

  BARS.forEach((val, i) => {
    const w = val * BAR_UNIT;
    rects.push({ x, w, isBar: i % 2 === 0 });
    x += w;
  });

  return (
    <div className="flex flex-col items-center lg:items-start gap-2 w-full max-w-full">
      <span className="text-[10px] tracking-[0.4em] uppercase font-syne opacity-100">
        ITEM REF
      </span>

      <svg
        width="100%"
        height={BAR_HEIGHT}
        viewBox={`0 0 ${TOTAL_WIDTH} ${BAR_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Product barcode"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxWidth: TOTAL_WIDTH }}
      >
        {rects.map((r) =>
          r.isBar ? (
            <rect
              key={r.x}
              x={r.x}
              y={0}
              width={r.w}
              height={BAR_HEIGHT}
              fill="#0a0a0a"
            />
          ) : null,
        )}
      </svg>

      {/* Human-readable number */}
      <span className="text-[11px] tracking-[0.25em] font-bold font-montserrat tabular-nums">
        4001 {CURRENT_YEAR} AURA 0001
      </span>
    </div>
  );
}
