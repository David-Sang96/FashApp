/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const STORAGE_KEY = "productFilters";

export function useFilterPersistence(
  defaultPriceRange: [number, number] | null,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from URL params OR localStorage on mount
  useEffect(() => {
    if (!defaultPriceRange) return;

    // First, try to get from URL params
    const categories =
      searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const colors = searchParams.get("colors")?.split(",").filter(Boolean) || [];
    const urlPriceMin = searchParams.get("priceMin");
    const urlPriceMax = searchParams.get("priceMax");
    const sort = searchParams.get("sort");

    // If URL has no params, try localStorage
    if (
      !categories.length &&
      !colors.length &&
      !urlPriceMin &&
      !urlPriceMax &&
      !sort
    ) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedCategories(parsed.selectedCategories || []);
        setSelectedColors(parsed.selectedColors || []);
        setPriceRange(parsed.priceRange || defaultPriceRange);
        setSortBy(parsed.sortBy || "featured");
        setIsInitialized(true);
      }
    }

    // Use URL params or defaults
    const priceMin = urlPriceMin
      ? parseFloat(urlPriceMin)
      : defaultPriceRange[0];
    const priceMax = urlPriceMax
      ? parseFloat(urlPriceMax)
      : defaultPriceRange[1];

    setSelectedCategories(categories);
    setSelectedColors(colors);
    setPriceRange([priceMin, priceMax]);
    setSortBy(sort || "featured");
    setIsInitialized(true);
  }, [defaultPriceRange?.[0], defaultPriceRange?.[1]]);

  // Persist to URL params whenever filters change
  useEffect(() => {
    if (!isInitialized || !priceRange) return;

    const params = new URLSearchParams(searchParams);
    if (selectedCategories.length)
      params.set("categories", selectedCategories.join(","));
    if (selectedColors.length) params.set("colors", selectedColors.join(","));
    params.set("priceMin", priceRange[0].toFixed(2));
    params.set("priceMax", priceRange[1].toFixed(2));
    if (sortBy !== "featured") params.set("sort", sortBy);
    else params.delete("sort");

    setSearchParams(params);

    // Also save to localStorage as backup
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedCategories,
        selectedColors,
        priceRange,
        sortBy,
      }),
    );
  }, [
    selectedCategories,
    selectedColors,
    priceRange,
    sortBy,
    isInitialized,
    setSearchParams,
  ]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange(defaultPriceRange);
    setSortBy("featured");
    setSearchParams(new URLSearchParams());
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    selectedCategories,
    setSelectedCategories,
    selectedColors,
    setSelectedColors,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    clearFilters,
    isInitialized,
  };
}
