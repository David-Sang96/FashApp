import { Button } from "@/components/ui/button";
import RatingConverter from "@/features/common/components/RatingConverter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { GrFormCheckmark } from "react-icons/gr";
import { useParams } from "react-router";

const product = {
  id: 5,
  name: "Black T-shirt ",
  price: 100,
  category: "T-shirt",
  rating: 3,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sapiente ad quis explicabo asperiores. Esse molestiae eos nihil, ullam dolor perferendis dolores impedit laudantium voluptate nulla vitae fugit, vero aspernatur.",
  sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  colors: ["#1e72b3", "#1eb3a2", "#04020a", "#32c21f"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=9",
    },
    {
      url: "https://picsum.photos/500/500?random=10",
    },
    {
      url: "https://picsum.photos/500/500?random=11",
    },
    {
      url: "https://picsum.photos/500/500?random=12",
    },
    {
      url: "https://picsum.photos/500/500?random=13",
    },
    {
      url: "https://picsum.photos/500/500?random=14",
    },
    {
      url: "https://picsum.photos/500/500?random=15",
    },
  ],
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (
      product.images.length &&
      product.sizes.length &&
      product.colors.length
    ) {
      setSelectedImage(product.images[0].url);
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, []);

  return (
    <section className="grid gap-8 xl:grid-cols-2">
      <div className="flex flex-col gap-2 md:flex-row xl:h-[60%]">
        <div className="scrollbar-hide flex gap-2 overflow-auto md:flex-col">
          {product.images.map((item, i) => (
            <div className="shrink-0" key={i}>
              <img
                src={item.url}
                alt={`image ${i}`}
                className={cn(
                  "aspect-square size-20 cursor-pointer rounded-md object-cover md:size-30 lg:size-24",
                  selectedImage === item.url && "border-primary border-[3px]",
                )}
                onClick={() => setSelectedImage(item.url)}
              />
            </div>
          ))}
        </div>
        <img
          src={selectedImage}
          alt={product.name}
          className="aspect-square flex-1 rounded-md object-fill"
        />
      </div>
      <div className="lg:pt-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <div className="flex items-center gap-2">
          <RatingConverter rating={product.rating} />
          <span className="text-sm text-black/40">{product.rating}/5</span>
        </div>
        <div className="py-3 text-xl font-semibold">${product.price}</div>
        <div className="border-b-2 pb-3 text-sm">{product.description}</div>
        <div className="border-b-2 py-3">
          <div className="text-sm">Colors</div>
          <div className="flex items-center gap-2 pt-2">
            {product.colors.map((item, i) => (
              <div
                className="flex size-5 cursor-pointer items-center justify-center rounded-full"
                style={{ backgroundColor: item }}
                key={i}
                onClick={() => setSelectedColor(item)}
              >
                {selectedColor === item && (
                  <GrFormCheckmark className="size-4 text-white" />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Sizes */}
        <div className="border-b-2 py-3">
          <div className="text-sm">Sizes</div>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {product.sizes.map((item, i) => (
              <div
                className={cn(
                  "bg-primary/40 cursor-pointer rounded-full px-6 py-1 text-xs md:px-10 md:py-1.5 md:text-sm",
                  selectedSize === item && "bg-primary text-white",
                )}
                key={i}
                onClick={() => setSelectedSize(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-4 py-3">
          <div className="space-x-3">
            <Button
              size={"sm"}
              onClick={() => {
                if (count > 1) {
                  setCount((prev) => prev - 1);
                }
              }}
              className="cursor-pointer rounded-full"
            >
              <FiMinus className="size-3" />
            </Button>
            <span>{count}</span>
            <Button
              size={"sm"}
              onClick={() => setCount((prev) => prev + 1)}
              className="cursor-pointer rounded-full"
            >
              <FaPlus className="size-3" />
            </Button>
          </div>
          <Button className="flex-1 cursor-pointer rounded-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
