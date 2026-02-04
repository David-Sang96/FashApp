import {
  parseAsArrayOf,
  parseAsFloat,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useEffect, useState } from "react";

const STORAGE_KEY = "productFilters";

export function useFilterPersistence(
  defaultPriceRange: [number, number] | null,
) {
  const [isInitialized, setIsInitialized] = useState(false);

  const [filters, setFilters] = useQueryStates(
    {
      categories: parseAsArrayOf(parseAsString).withDefault([]),
      sizes: parseAsArrayOf(parseAsString).withDefault([]),
      colors: parseAsArrayOf(parseAsString).withDefault([]),
      priceMin: parseAsFloat.withDefault(defaultPriceRange?.[0] ?? 0),
      priceMax: parseAsFloat.withDefault(defaultPriceRange?.[1] ?? 100),
      sort: parseAsString.withDefault("default"),
    },
    {
      history: "replace",
      clearOnDefault: false, // ← Important: don't clear params when they match defaults
    },
  );

  // Initialize from localStorage ONLY if URL has no params
  useEffect(() => {
    if (!defaultPriceRange || isInitialized) return;

    // Check if URL actually has filter params
    const urlParams = new URLSearchParams(window.location.search);
    const hasUrlFilters =
      urlParams.has("categories") ||
      urlParams.has("sizes") ||
      urlParams.has("colors") ||
      urlParams.has("priceMin") ||
      urlParams.has("priceMax") ||
      urlParams.has("sort");

    if (!hasUrlFilters) {
      // No URL params - restore from localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setFilters({
            categories: parsed.categories || [],
            sizes: parsed.sizes || [],
            colors: parsed.colors || [],
            priceMin: parsed.priceMin ?? defaultPriceRange[0],
            priceMax: parsed.priceMax ?? defaultPriceRange[1],
            sort: parsed.sort || "default",
          });
        } catch (e) {
          console.error("Failed to restore filters:", e);
        }
      }
    }

    setIsInitialized(true);
  }, [defaultPriceRange?.[0], defaultPriceRange?.[1]]);

  // Save to localStorage whenever filters change
  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        categories: filters.categories,
        sizes: filters.sizes,
        colors: filters.colors,
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
        sort: filters.sort,
      }),
    );
  }, [filters, isInitialized]);

  const clearFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      priceMin: defaultPriceRange?.[0] ?? 0,
      priceMax: defaultPriceRange?.[1] ?? 100,
      sort: "default",
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    selectedCategories: filters.categories,
    setSelectedCategories: (val: string[]) => setFilters({ categories: val }),
    selectedSizes: filters.sizes,
    setSelectedSizes: (val: string[]) => setFilters({ sizes: val }),
    selectedColors: filters.colors,
    setSelectedColors: (val: string[]) => setFilters({ colors: val }),
    priceRange: [filters.priceMin, filters.priceMax] as [number, number],
    setPriceRange: ([min, max]: [number, number]) =>
      setFilters({ priceMin: min, priceMax: max }),
    sortBy: filters.sort,
    setSortBy: (val: string) => setFilters({ sort: val }),
    clearFilters,
    isInitialized,
  };
}
