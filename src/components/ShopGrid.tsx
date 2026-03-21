import React from "react";
import ProductPreview from "./ProductPreview";

const PRODUCTS = [
  {
    id: 1,
    name: "Minimal Sculpture Tee",
    price: "€85.00",
    category: "Upper body",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop",
    tag: "NEW",
  },
  {
    id: 2,
    name: "Structured Oversize Blazer",
    price: "€320.00",
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Wide Leg Trousers",
    price: "€145.00",
    category: "Lower body",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2000&auto=format&fit=crop",
    tag: "LIMITED",
  },
  {
    id: 4,
    name: "Canvas Tote Bag",
    price: "€55.00",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function ShopGrid() {
  return (
    <section className="px-6 md:px-12 py-32 bg-white h-screen border-b border-black/80">
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
    </section>
  );
}
