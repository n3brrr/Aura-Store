## Refactor: remove dead code in ComingSoon

| File                               | Change                                         |
| ---------------------------------- | ---------------------------------------------- |
| `src/components/ui/ComingSoon.tsx` | Removed unused `LAUNCH_DATE` constant          |
| `src/components/ui/ComingSoon.tsx` | Removed unused `useRef`, `useCallback` imports |

## Refactor: optimize FooterTicker

Reduced redundant string repetition from 4× to 2× (CSS animation needs exactly 2 copies for a seamless `translateX(-50%)` loop).

| File                                 | Change                                                         |
| ------------------------------------ | -------------------------------------------------------------- |
| `src/components/ui/FooterTicker.tsx` | `(TICKER_MSG + TICKER_MSG).repeat(2)` → `TICKER_MSG.repeat(2)` |

## Refactor: use stable keys in FooterBarcode

Replaced array index as React key with deterministic `r.x` value.

| File                                  | Change                               |
| ------------------------------------- | ------------------------------------ |
| `src/components/ui/FooterBarcode.tsx` | `key={i}` → `key={r.x}` in SVG rects |
