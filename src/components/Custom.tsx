import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Custom = () => {
  // 1. Definimos las variantes de prendas
  const products = [
    {
      id: 1,
      name: "Skeleton Puffer",
      video: "/videos/puffer-loop.mp4",
      thumb: "/thumbs/puffer.webp",
    },
    {
      id: 2,
      name: "Black Hoodie",
      video: "/videos/hoodie-loop.mp4",
      thumb: "/thumbs/hoodie.webp",
    },
    {
      id: 3,
      name: "Brutalism Hoodie",
      video: "/videos/brutalism-loop.mp4",
      thumb: "/thumbs/brutalism.webp",
    },
  ];

  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <section className="relative w-full h-svh bg-[#ececec] overflow-hidden font-syne">
      {/* TÍTULO DE FONDO (Fijo) */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-0 opacity-20">
        <span className="font-black text-[8vw] px-[5%] text-black">AURA</span>
        <span className="font-black text-[8vw] px-[5%] text-black">STORE</span>
      </div>

      {/* VISOR DE VIDEO PRINCIPAL */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.video
            key={activeProduct.id} // Re-renderiza al cambiar de ID
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={activeProduct.thumb}
            autoPlay
            loop
            muted
            playsInline
            className="h-[80vh] w-auto object-contain drop-shadow-2xl"
          />
        </AnimatePresence>
      </div>

      {/* SELECTOR DE PRENDAS (Lado Derecho) */}
      <div className="absolute right-[5%] bottom-[10%] z-30 flex flex-col gap-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-right mb-2">
          Select Piece
        </p>

        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => setActiveProduct(product)}
            className={`group relative w-20 h-20 sm:w-24 sm:h-24 border-2 transition-all duration-300 overflow-hidden rounded-xl
              ${activeProduct.id === product.id ? "border-black scale-110" : "border-transparent opacity-60 hover:opacity-100"}
            `}
          >
            <img
              src={product.thumb}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </button>
        ))}
      </div>

      {/* INFO DE LA PRENDA SELECCIONADA (Lado Izquierdo) */}
      <div className="absolute left-[5%] bottom-[10%] z-30">
        <motion.div
          key={activeProduct.name}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col gap-1"
        >
          <span className="text-[12px] font-mono uppercase">
            Item No. 00{activeProduct.id}
          </span>
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            {activeProduct.name}
          </h2>
          <button className="mt-4 bg-black text-white text-[12px] font-bold py-3 px-6 rounded-full hover:scale-105 hover:text-[16px] transition-all duration-300 uppercase">
            View Details
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Custom;

//https://es.pinterest.com/pin/913175261960934898/
//https://es.pinterest.com/pin/7318418141423621/
