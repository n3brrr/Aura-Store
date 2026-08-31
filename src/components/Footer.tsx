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
    setCutLineKey((k) => k + 1);
  }, []);

  return (
    <div className="pt-8 md:pt-16 flex flex-col relative w-full overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-[#E8E7E3] to-transparent z-10 pointer-events-none" />
      <div className="mx-4 sm:mx-6 md:mx-8">
        <FooterCutLine key={cutLineKey} onHalt={handleHalt} />
      </div>

      <footer className="mx-4 sm:mx-6 md:mx-8 mb-8 border-2 border-t-0 border-black bg-[#e5e5e5] overflow-hidden font-syne">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 items-center justify-between px-6 md:px-12 py-8 md:py-10 border-b-2 border-black">
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <FooterBarcode />
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center gap-1 select-none">
            <span className="text-[40px] sm:text-[50px] font-black uppercase leading-none tracking-[0.02em] font-montserrat">
              AURA
            </span>
            <span className="text-[16px] sm:text-[20px] tracking-[0.4em] uppercase font-bold font-syne">
              STORE
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase opacity-80 mt-1 font-syne">
              CARE LABEL — REF. 001
            </span>
          </div>

          <div className="order-3 flex justify-center lg:justify-end">
            <FooterBatchInfo />
          </div>
        </div>

        <div className="px-6 md:px-12 py-8 border-b-2 border-black">
          <FooterLinkGrid />
        </div>

        <div className="px-0 py-3 border-b-2 border-black">
          <FooterTicker />
        </div>

        <div className="px-6 md:px-12 py-5">
          <FooterLegalLine />
        </div>
      </footer>

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
