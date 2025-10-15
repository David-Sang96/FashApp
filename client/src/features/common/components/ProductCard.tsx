import { Card, CardContent } from "@/components/ui/card";

import { Link } from "react-router";
import type { ProductItemType } from "../types/product-type";
import RatingConverter from "./RatingConverter";

interface ProductCardProps {
  item: ProductItemType;
}

const ProductCard = ({ item }: ProductCardProps) => {
  const { id, name, price, images, rating } = item;
  return (
    <Link to={`${id}`}>
      <Card className="bg-primary/10 p-2">
        <CardContent className="p-0">
          <img
            src={images[0].url}
            alt={name}
            loading="lazy"
            decoding="async"
            className="rounded-md"
          />
          <p className="my-2 font-semibold">{name}</p>
          <RatingConverter rating={rating} />
          <p className="font-semibold">${price}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
