import React from "react";
import ProductPreview from "./ProductPreview";

const PRODUCTS = [
  {
    id: 1,
    name: "Skeleton Puffer",
    price: "€185.00",
    category: "Upper body",
    image: "/thumbs/puffer.svg",
    tag: "NEW",
  },
  {
    id: 2,
    name: "Black Hoodie",
    price: "€320.00",
    category: "Upper body",
    image: "/thumbs/tribalism.svg",
  },
  {
    id: 3,
    name: "Brutalism Hoodie",
    price: "€145.00",
    category: "Upper body",
    image: "/thumbs/brutalism.svg",
    tag: "LIMITED",
  },
  {
    id: 4,
    name: "Goth Girl Hoodie",
    price: "€55.00",
    category: "Upper body",
    image: "/thumbs/goth-girl.svg",
  },
];

export default function ShopGrid() {
  return (
    <section className="px-6 md:px-12 py-32 bg-white h-screen" id="shop">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">
            Seasonal Selections
          </h4>
          <h2 className="text-5xl font-black uppercase tracking-tighter max-w-xl leading-none">
            Curated pieces for a timeless wardrobe
          </h2>
        </div>
        <button className="text-xs font-black uppercase tracking-widest pb-1 border-b-2 border-black hover:opacity-50 transition-opacity">
          View All Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-x-8 md:gap-y-16">
        {PRODUCTS.map((product) => (
          <ProductPreview key={product.id} {...product} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-[#f4f4f4] to-transparent z-10" />
    </section>
  );
}
