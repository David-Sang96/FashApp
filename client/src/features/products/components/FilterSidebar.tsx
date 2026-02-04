import Loader from "@/common/components/Loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useGetProductsMetaQuery } from "@/store/api/productApi";
import type { Product } from "@/store/types/product";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { GrFormCheckmark } from "react-icons/gr";

interface FilterSidebarProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  priceRange: [number, number] | null;
  setPriceRange: (range: [number, number]) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
  allProducts?: Product[];
}

export function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  onClearFilters,
  isMobile = false,
  allProducts = [],
}: FilterSidebarProps) {
  const { data, isLoading, isError } = useGetProductsMetaQuery();
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    sizes: true,
    colors: true,
    price: true,
  });

  // Filter colors based on current category and price range
  const availableColors = useMemo(() => {
    if (!allProducts.length || !priceRange) return data?.colors || [];

    let filtered = allProducts;

    // Filter by selected category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category),
      );
    }

    // Filter by selected size
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) => selectedSizes.includes(p.sizes[0]));
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Extract unique colors
    const colorMap = new Map();
    filtered.forEach((product) => {
      product.colors.forEach((color) => {
        const key = color.hex;
        if (!colorMap.has(key)) {
          colorMap.set(key, color);
        }
      });
    });

    return Array.from(colorMap.values());
  }, [allProducts, selectedCategories, priceRange, data?.colors]);

  if (isLoading || !priceRange) return <Loader />;

  if (isError || !data) {
    return <p className="text-center text-gray-500">Error loading products</p>;
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
  };

  const toggleSize = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((c) => c !== size)
      : [...selectedSizes, size];

    setSelectedSizes(newSizes);
  };

  const toggleColor = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    setSelectedColors(newColors);
  };

  const isLightColor = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] > data.minPrice ||
    priceRange[1] < data.maxPrice;

  return (
    <aside className={`${isMobile ? "p-4" : "w-xs pr-8"} flex-shrink-0`}>
      {isMobile && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium">Filters</h2>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className={`${isMobile ? "hidden" : ""} text-lg font-medium`}>
          Filter
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground cursor-pointer text-sm"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="border-border mb-4 border-b pb-4">
        <button
          onClick={() => toggleSection("categories")}
          className="mb-3 flex w-full items-center justify-between text-left"
        >
          <span className="text-sm font-medium">Categories</span>
          {expandedSections.categories ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>
        {expandedSections.categories && (
          <div className="flex flex-col gap-3">
            {data.categories.map((category) => (
              <label
                key={category}
                className="group flex cursor-pointer items-center gap-3"
              >
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                  className="h-4 w-4 rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600"
                />
                <span className="text-muted-foreground group-hover:text-foreground flex-1 text-sm transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="border-border mb-4 border-b pb-4">
        <button
          onClick={() => toggleSection("sizes")}
          className="mb-3 flex w-full items-center justify-between text-left"
        >
          <span className="text-sm font-medium">Sizes</span>
          {expandedSections.sizes ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>
        {expandedSections.sizes && (
          <div className="flex flex-col gap-3">
            {data.sizes.map((size) => (
              <label
                key={size}
                className="group flex cursor-pointer items-center gap-3"
              >
                <Checkbox
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() => toggleSize(size)}
                  className="h-4 w-4 rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600"
                />
                <span className="text-muted-foreground group-hover:text-foreground flex-1 text-sm transition-colors">
                  {size}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-border mb-4 border-b pb-4">
        <button
          onClick={() => toggleSection("colors")}
          className="mb-3 flex w-full items-center justify-between text-left"
        >
          <span className="text-sm font-medium">Colors</span>
          {expandedSections.colors ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>
        {expandedSections.colors && (
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => {
              const selected = selectedColors.includes(color.name);
              const light = isLightColor(color.hex);
              return (
                <button
                  key={color.hex}
                  onClick={() => toggleColor(color.name)}
                  className={`flex size-6 scale-100 items-center justify-center rounded-full border-2 transition-all ${
                    selected ? "scale-110" : ""
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    borderColor: selected
                      ? light
                        ? "#000"
                        : "#fff"
                      : "transparent",
                  }}
                  title={color.name}
                >
                  {selected && (
                    <GrFormCheckmark
                      className={`size-5 ${
                        isLightColor(color.hex) ? "text-black" : "text-white"
                      }`}
                    />
                  )}
                  <span className="sr-only">{color.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="pb-4">
        <button
          onClick={() => toggleSection("price")}
          className="mb-3 flex w-full items-center justify-between text-left"
        >
          <span className="text-sm font-medium">Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.price && (
          <div className="px-1">
            <Slider
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
              min={data.minPrice}
              max={data.maxPrice}
              step={10}
              className="mb-3"
            />
            <div className="text-muted-foreground flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
