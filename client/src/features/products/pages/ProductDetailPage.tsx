import Loader from "@/common/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useGetOneProductQuery } from "@/store/api/productApi";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { GrFormCheckmark } from "react-icons/gr";
import { useNavigate, useParams } from "react-router";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetOneProductQuery(id || "", {
    skip: !id,
  });
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  const product = data?.product;
  const isOutOfStock = product?.instock_count === 0;
  const stockPercentage = product
    ? (product.instock_count / (product.instock_count + 10)) * 100
    : 0;

  useEffect(() => {
    if (!carouselApi) return;

    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  useEffect(() => {
    if (
      product?.images.length &&
      product?.sizes.length &&
      product?.colors.length
    ) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  if (isError || !product) {
    return (
      <div>
        <p className="text-center text-gray-500">
          Failed to load product details
        </p>
      </div>
    );
  }

  return (
    <div className="lg:px-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-3 pt-4 md:px-4">
          <button
            onClick={() => navigate(-1)}
            className="hover:text-primary mb-4 flex cursor-pointer items-center gap-2 text-sm transition-colors md:text-base"
          >
            <ArrowLeft className="size-5" />
            Back
          </button>

          <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10">
            {/* ================= LEFT: IMAGES ================= */}

            {/* Mobile: shadcn carousel */}
            <div className="relative w-full overflow-hidden lg:hidden">
              <Carousel className="w-full" setApi={setCarouselApi}>
                <CarouselContent className="ml-0 w-full">
                  {product.images.map((item, i) => (
                    <CarouselItem key={i} className="w-full pl-0">
                      <img
                        src={item.image_url}
                        alt={`image ${i}`}
                        className="aspect-square w-full rounded-md object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-background left-2 z-10 backdrop-blur disabled:pointer-events-none disabled:opacity-0" />
                <CarouselNext className="bg-background right-2 z-10 backdrop-blur disabled:pointer-events-none disabled:opacity-0" />
                {/* Image count */}
                <div className="absolute right-2 bottom-2 z-10 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                  {current} / {product.images.length}
                </div>
              </Carousel>
            </div>

            {/* Desktop: 2 images per row */}
            <div className="hidden grid-cols-2 gap-4 lg:grid">
              {product.images.map((item, i) => (
                <img
                  key={i}
                  src={item.image_url}
                  alt={`image ${i}`}
                  className="aspect-square w-full cursor-pointer rounded-md object-cover"
                />
              ))}
            </div>

            {/* ================= RIGHT: PRODUCT INFO ================= */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="lg:pt-3">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                {/* <div className="flex items-center gap-2">
            <RatingConverter rating={product.rating_count} />
            <span className="text-sm text-black/40">
              {product.rating_count}/5
            </span>
          </div> */}
                <div className="py-3 text-xl font-semibold">
                  ${product.price}
                </div>
                <div className="border-b-2 pb-3 text-sm">
                  {product.description}
                </div>

                {/* Colors */}
                <div className="border-b-2 py-3">
                  <div className="text-sm">Colors</div>
                  <div className="flex items-center gap-2 pt-2">
                    {product.colors.map((item, i) => {
                      const isLightColor = (color: string) => {
                        const hex = color.replace("#", "");
                        const r = parseInt(hex.slice(0, 2), 16);
                        const g = parseInt(hex.slice(2, 4), 16);
                        const b = parseInt(hex.slice(4, 6), 16);

                        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                        return brightness > 155;
                      };
                      return (
                        <div
                          aria-label={`Select color ${item.name}`}
                          className="flex size-5 cursor-pointer items-center justify-center rounded-full"
                          style={{ backgroundColor: item.hex }}
                          key={i}
                          onClick={() => setSelectedColor(item.name)}
                          title={item.name}
                        >
                          {selectedColor === item.name && (
                            <GrFormCheckmark
                              className={cn(
                                "size-4",
                                isLightColor(item.hex)
                                  ? "text-black"
                                  : "text-white",
                              )}
                            />
                          )}
                        </div>
                      );
                    })}
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

                {/* Stock Indicator */}
                <div className="border-b-2 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Availability
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                        isOutOfStock
                          ? "bg-red-100 text-red-700"
                          : product.instock_count <= 5
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700",
                      )}
                    >
                      {isOutOfStock
                        ? "Out of Stock"
                        : product.instock_count <= 5
                          ? `Only ${product.instock_count} left`
                          : "In Stock"}
                    </span>
                  </div>

                  {!isOutOfStock && (
                    <div className="space-y-2">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-300",
                            product.instock_count <= 5
                              ? "bg-orange-500"
                              : "bg-green-500",
                          )}
                          style={{
                            width: `${Math.min(stockPercentage, 100)}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {product.instock_count} items available
                      </p>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 py-3">
                  <div className="space-x-3">
                    <Button
                      disabled={isOutOfStock}
                      size={"sm"}
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity((prev) => prev - 1);
                        }
                      }}
                      className="cursor-pointer rounded-full"
                    >
                      <FiMinus className="size-3" />
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      disabled={isOutOfStock}
                      size={"sm"}
                      onClick={() =>
                        setQuantity((prev) =>
                          prev < product.instock_count ? prev + 1 : prev,
                        )
                      }
                      className="cursor-pointer rounded-full"
                    >
                      <FaPlus className="size-3" />
                    </Button>
                  </div>
                  <Button
                    disabled={isOutOfStock}
                    className="flex-1 cursor-pointer rounded-full"
                  >
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
