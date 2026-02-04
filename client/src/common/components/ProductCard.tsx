import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/store/types/product";
import { Link } from "react-router";

interface ProductCardProps {
  item: Product;
  isNewArrival?: boolean;
}

const ProductCard = ({ item, isNewArrival = false }: ProductCardProps) => {
  const {
    _id,
    name,
    price,
    images,
    is_newArrival,
    is_feature,
    instock_count,
    colors,
  } = item;

  return (
    <Link to={`product/${_id}`}>
      <Card className="bg-primary/10 p-2 transition-shadow hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
            <img
              src={images[0].image_url}
              alt={name}
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-center"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              {isNewArrival && is_newArrival && (
                <Badge className="bg-green-500">New</Badge>
              )}
              {!isNewArrival && is_feature && (
                <Badge className="bg-orange-500">Featured</Badge>
              )}
              {instock_count === 0 && (
                <Badge className="bg-red-500">Out of Stock</Badge>
              )}
              {instock_count > 0 && instock_count < 5 && (
                <Badge className="bg-yellow-500">Low Stock</Badge>
              )}
            </div>
          </div>

          <p className="my-4 line-clamp-2 px-2 font-semibold max-md:text-sm">
            {name}{" "}
          </p>

          {/* Color swatches */}
          {colors && colors.length > 0 && (
            <div className="mb-2.5 flex gap-1 px-2">
              {colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="size-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {colors.length > 4 && (
                <span className="text-xs text-gray-500">
                  +{colors.length - 4}
                </span>
              )}
            </div>
          )}

          <p className="px-2 font-semibold">${price}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
