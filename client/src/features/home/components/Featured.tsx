import ProductCard from "@/common/components/ProductCard";
import { Button } from "@/components/ui/button";

import Loader from "@/common/components/Loader";
import { useGetFeaturedQuery } from "@/store/api/productApi";
import type { Product } from "@/store/types/product";
import { Link } from "react-router";

const Featured = () => {
  const { data, isLoading, isError } = useGetFeaturedQuery(undefined);

  if (isLoading) return <Loader />;

  if (isError || !data) {
    return (
      <div>
        <h1 className="pb-9 text-center text-2xl font-semibold">
          New Arrivals
        </h1>
        <p className="text-center text-gray-500">Failed to load new arrivals</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="pb-9 text-center text-2xl font-semibold uppercase">
        Featured
      </h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {data.products.slice(0, 10).map((item: Product) => (
          <ProductCard item={item} key={item._id} />
        ))}
      </div>
      <div className="mt-7 text-center">
        <Button asChild variant={"outline"} className="rounded-full px-8">
          <Link to={"/products"}>View All</Link>
        </Button>
      </div>
    </div>
  );
};

export default Featured;
