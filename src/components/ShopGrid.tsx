import ProductPreview from "./ProductPreview";

const PRODUCTS = [
  {
    id: 1,
    name: "Skeleton Puffer",
    price: "€185.00",
    category: "Outerwear",
    image: "/thumbs/puffer.svg",
    secondaryImage: "/thumbs/puffer-inverted.svg",
    tag: "NEW",
  },
  {
    id: 2,
    name: "Black Hoodie",
    price: "€320.00",
    category: "Essentials",
    image: "/thumbs/tribalism.svg",
    secondaryImage: "/thumbs/tribalism-inverted.svg",
  },
  {
    id: 3,
    name: "Brutalism Hoodie",
    price: "€145.00",
    category: "Essentials",
    image: "/thumbs/brutalism.svg",
    secondaryImage: "/thumbs/brutalism-inverted.svg",
    tag: "LIMITED",
  },
  {
    id: 4,
    name: "Goth Girl Hoodie",
    price: "€55.00",
    category: "Essentials",
    image: "/thumbs/goth-girl.svg",
    secondaryImage: "/thumbs/goth-girl-inverted.svg",
  },
];

export default function ShopGrid() {
  return (
    <section
      className="px-6 md:px-12 py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden"
      id="shop"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-8">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
            Seasonal Selections / 2026
          </h4>
          <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black uppercase tracking-tighter max-w-2xl leading-[0.85] font-syne">
            Best pieces <br /> of the season
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-16">
        {PRODUCTS.map((product) => (
          <ProductPreview key={product.id} {...product} />
        ))}
      </div>
      {/* Gradient to mix with the bottom section */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-[#E8E7E3] to-transparent z-30 pointer-events-none" />
    </section>
  );
}
