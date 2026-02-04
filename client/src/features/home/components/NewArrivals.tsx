import Loader from "@/common/components/Loader";
import { Button } from "@/components/ui/button";
import ProductCard from "@/features/home/components/ProductCard";
import type { ProductItemType } from "@/features/products/types/product-type";
import { useGetNewArrivalsQuery } from "@/store/api/productApi";
import type { Product } from "@/store/types/product";
import { motion } from "framer-motion";
import { Link } from "react-router";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

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
  const { data, isError, isLoading } = useGetNewArrivalsQuery(undefined);

  if (isLoading) return <Loader />;

  if (isError || !data) {
    return (
      <div>
        <h1 className="pb-5 text-center text-2xl font-semibold">
          New Arrivals
        </h1>
        <p className="text-center text-gray-500">Failed to load new arrivals</p>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-8">
      <h1 className="pb-5 text-center text-2xl font-semibold uppercase">
        New Arrivals
      </h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show" // Remove animate="show", only use whileInView
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5"
      >
        {data.products.slice(0, 10).map((item: Product) => (
          <motion.div key={item._id} variants={itemVariants}>
            <ProductCard item={item} isNewArrival={true} />
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-7 text-center">
        <Button asChild variant={"outline"} className="rounded-full px-8">
          <Link to={"/products"}>View All</Link>
        </Button>
      </div>
    </div>
  );
};

export default NewArrivals;
