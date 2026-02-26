import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart";
import type { Product } from "@/store/types/product";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishListed, setIsWishListed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        color: product.colors[0].hex,
        image: product.images[0].image_url,
        name: product.name,
        price: String(product.price),
        quantity: 1,
        size: product.sizes[0],
      }),
    );
  };

  return (
    <div className="border-primary/50 rounded-lg border">
      <article
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="bg-muted relative mb-3 aspect-square overflow-hidden rounded-tl-lg rounded-tr-lg">
          <img
            src={product.images[0].image_url || "/placeholder.svg"}
            alt={product.name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_newArrival && (
              <Badge className="bg-green-500">New</Badge>
            )}
            {product.is_feature && (
              <Badge className="bg-orange-500">Featured</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`bg-background/80 hover:bg-background absolute top-3 right-3 cursor-pointer backdrop-blur-sm transition-opacity ${
              isHovered || isWishListed ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsWishListed(!isWishListed)}
          >
            <Heart
              className={`h-4 w-4 ${
                isWishListed ? "fill-current text-red-500" : ""
              }`}
            />
            <span className="sr-only">Add to wishlist</span>
          </Button>

          {/* Quick Add Button */}
          <div
            className={`absolute right-3 bottom-3 left-3 transition-all duration-300 ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
          >
            <Button
              className="w-full cursor-pointer"
              size="sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </article>
      {/* Product Info */}

      <Link
        to={`/product/${product._id}`}
        className="flex flex-col gap-1 px-3 pb-2"
      >
        <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
          {product.category}
        </span>
        <h3 className="line-clamp-2 text-sm leading-tight font-medium text-balance">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">${product.price}</span>
          {/* {product.originalPrice && (
            <span className="text-muted-foreground text-sm line-through">
              ${product.originalPrice}
            </span>
          )} */}
        </div>
      </Link>
    </div>
  );
}
