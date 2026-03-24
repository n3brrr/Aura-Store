import { useState, useCallback } from "react";

import FooterBarcode from "./ui/FooterBarcode";
import FooterBatchInfo from "./ui/FooterBatchInfo";
import FooterLinkGrid from "./ui/FooterLinkGrid";
import FooterTicker from "./ui/FooterTicker";
import FooterLegalLine from "./ui/FooterLegalLine";
import FooterCutLine from "./ui/FooterCutLine";
import ProtocolHaltModal from "./ui/ProtocolHaltModal";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cutLineKey, setCutLineKey] = useState(0);

  const handleHalt = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
    setCutLineKey((k) => k + 1); // Resets the cut line component entirely
  }, []);

  return (
    <div className="pt-16 flex flex-col relative w-full">
      <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-[#E8E7E3] to-transparent z-10 pointer-events-none" />
      {/* ── The Care Label: cut-line separator lives OUTSIDE the box ── */}
      <div className="mx-8">
        <FooterCutLine key={cutLineKey} onHalt={handleHalt} />
      </div>

      {/* ── The actual care label container ──────────────────────────── */}
      <footer className="mx-8 mb-8 border-2 border-t-0 border-black bg-[#e5e5e5] overflow-hidden font-syne">
        {/* ── Row 1: Barcode ++ Brand stamp ++ Batch/QC ──────────────── */}

        <div className="grid grid-cols-3 items-center justify-between px-12 py-10 border-b-2 border-black">
          <FooterBarcode />

          {/* Center: Brand stamp */}
          <div className="flex flex-col items-center gap-1 select-none mt-5">
            <span className="text-[50px]  font-black uppercase leading-none tracking-[0.02em] font-montserrat">
              AURA
            </span>
            <span className="text-[20px] tracking-[0.4em] uppercase font-bold font-syne">
              STORE
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase opacity-80 mt-1 font-syne">
              CARE LABEL — REF. 001
            </span>
          </div>

          <FooterBatchInfo />
        </div>

        {/* ── Row 2: Link Grid ────────────────────────────────────────── */}
        <div className="px-12 py-8 border-b-2 border-black">
          <FooterLinkGrid />
        </div>

        {/* ── Row 3: Ticker ───────────────────────────────────────────── */}
        <div className="px-0 py-3 border-b-2 border-black">
          <FooterTicker />
        </div>

        {/* ── Row 4: Legal line ───────────────────────────────────────── */}
        <div className="px-12 py-5">
          <FooterLegalLine />
        </div>
      </footer>

      {/* ── Protocol Halt Modal ───────────────────────────────────────── */}
      {modalOpen && <ProtocolHaltModal onClose={handleClose} />}

      <style>{`
        @keyframes cursorblink {
          0%,49% { opacity:1; }
          50%,100%{ opacity:0; }
        }
      `}</style>
    </div>
  );
}
