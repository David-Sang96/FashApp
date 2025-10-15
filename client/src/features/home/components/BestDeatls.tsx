import { Button } from "@/components/ui/button";
import ProductCard from "@/features/common/components/ProductCard";

import { Link } from "react-router";
import { productItems } from "./NewArrivals";

const BestDeatls = () => {
  return (
    <div>
      <h1 className="pb-9 text-center text-2xl font-semibold">Best Deals</h1>
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

export default BestDeatls;
