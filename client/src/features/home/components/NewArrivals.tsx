import { Button } from "@/components/ui/button";
import ProductCard from "@/features/common/components/ProductCard";
import type { ProductItemType } from "@/features/common/types/product-type";
import { Link } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const productItems: ProductItemType[] = [
  {
    id: 1,
    name: "T-shirt with Grape",
    price: 100,
    category: "T-shirt",
    rating: 5,
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
      },
    ],
  },
  {
    id: 2,
    name: "Black Hoodie",
    price: 300,
    category: "Hoodie",
    rating: 5,
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
      },
      {
        url: "https://picsum.photos/500/500?random=4",
      },
    ],
  },
  {
    id: 3,
    name: "Taiwan Jeans",
    price: 220,
    category: "Jeans",
    rating: 2,
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
      },
      {
        url: "https://picsum.photos/500/500?random=6",
      },
    ],
  },
  {
    id: 4,
    name: "Shorts",
    price: 100,
    category: "Shorts",
    rating: 4,
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
      },
      {
        url: "https://picsum.photos/500/500?random=8",
      },
    ],
  },
  {
    id: 5,
    name: "Black T-shirt ",
    price: 100,
    category: "T-shirt",
    rating: 3,
    size: ["S", "M", "L"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=9",
      },
      {
        url: "https://picsum.photos/500/500?random=10",
      },
    ],
  },
];

const NewArrivals = () => {
  return (
    <div>
      <h1 className="pb-9 text-center text-2xl font-semibold">New Arrivals</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {productItems.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
      <div className="mt-7 text-center">
        <Button asChild variant={"outline"} className="rounded-full px-8">
          <Link to={"all"}>View All</Link>
        </Button>
      </div>
    </div>
  );
};

export default NewArrivals;
