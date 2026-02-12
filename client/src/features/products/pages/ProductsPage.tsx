import Loader from "@/common/components/Loader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useFilterPersistence } from "@/hooks/useFIlterPersistence";
import {
  useGetProductsMetaQuery,
  useGetProductsQuery,
} from "@/store/api/productApi";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { FilterSidebar } from "../components/FilterSidebar";
import { Pagination } from "../components/Pagination";
import { ProductGrid } from "../components/ProductGrid";

export default function ProductsPage() {
  const { data: meta } = useGetProductsMetaQuery();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const defaultPriceRange: [number, number] | null = meta
    ? [meta.minPrice, meta.maxPrice]
    : null;

  const {
    selectedCategories,
    setSelectedCategories,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    page,
    setPage,
    clearFilters,
  } = useFilterPersistence(defaultPriceRange);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { data, isLoading, isError } = useGetProductsQuery({
    category: selectedCategories.join(","),
    sizes: selectedSizes,
    colors: selectedColors,
    priceMin: priceRange?.[0] ?? 0,
    priceMax: priceRange?.[1] ?? 100,
    search: searchQuery,
    sort: sortBy || "default",
    page,
    limit: 8,
  });

  if (!meta) return null;

  const activeFilterCount =
    selectedCategories.length +
    selectedSizes.length +
    selectedColors.length +
    (priceRange &&
    (priceRange[0] > meta.minPrice || priceRange[1] < meta.maxPrice)
      ? 1
      : 0);

  return (
    <main className="flex-1 py-8">
      <div className="mx-auto max-w-[110rem] px-3 sm:px-6 lg:px-8">
        {/* Mobile Filter Button */}
        <div className="mb-6 lg:hidden">
          <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-primary-foreground ml-auto rounded-full px-2 py-0.5 text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full p-0 sm:max-w-md">
              <FilterSidebar
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onClearFilters={clearFilters}
                isMobile
                allProducts={data?.result?.products || []}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Layout */}
        <div className="flex gap-8">
          <div className="hidden lg:block">
            <FilterSidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onClearFilters={clearFilters}
              allProducts={data?.result?.products || []}
            />
          </div>

          <div className="flex flex-1 flex-col">
            <div>
              {isLoading ? (
                <Loader />
              ) : isError || !data ? (
                <div className="text-center text-gray-500">
                  Error loading products
                </div>
              ) : (
                <ProductGrid
                  products={data.result.products}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              )}
            </div>
            <div className="mt-auto">
              {data && (
                <Pagination
                  currentPage={data.result.currentPage}
                  totalPages={data.result.totalPages}
                  onPageChange={setPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
