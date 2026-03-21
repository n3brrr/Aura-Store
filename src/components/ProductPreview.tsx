import React from "react";

interface ProductPreviewProps {
  image: string;
  name: string;
  price: string;
  category: string;
  tag?: string;
}

export default function ProductPreview({
  image,
  name,
  price,
  category,
  tag,
}: ProductPreviewProps) {
  return (
    <article className="group relative ">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden mb-4 rounded-xl">
        {/* Placeholder Image */}
        <div className="absolute bg-gray-100 flex items-center justify-center"></div>
        {/* Actual Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain z-10 transition-transform duration-520 group-hover:scale-105"
        />

        {/* Tag Badge */}
        {tag && (
          <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full border border-black/10 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {tag}
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-tight mb-1">
            {name}
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {category}
          </p>
        </div>
        <span className="text-lg font-bold">{price}</span>
      </div>
    </article>
  );
}
