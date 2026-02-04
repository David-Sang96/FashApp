"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/store/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  sortBy: string;
  setSortBy: (value: string) => void;
}

export function ProductGrid({ products, sortBy, setSortBy }: ProductGridProps) {
  return (
    <div className="flex-1">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">default</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="mb-2 text-lg font-medium">No products found</p>
          <p className="text-muted-foreground text-sm">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
