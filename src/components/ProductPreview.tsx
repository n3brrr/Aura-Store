import React from "react";

interface ProductPreviewProps {
  image: string;
  name: string;
  price: string;
  category: string;
  tag?: string;
}

export default function ProductPreview({ image, name, price, category, tag }: ProductPreviewProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {tag && (
          <div className="absolute top-4 left-4 bg-black text-white text-[9px] font-black uppercase px-2 py-1 tracking-widest">
            {tag}
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-tight">{name}</h3>
          <p className="text-[10px] uppercase opacity-50 font-medium tracking-wider mt-1">
            {category}
          </p>
        </div>
        <p className="text-xs font-bold">{price}</p>
      </div>
    </div>
  );
}
