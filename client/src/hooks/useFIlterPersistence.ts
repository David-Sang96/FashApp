/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

const STORAGE_KEY = "productFilters";

export function useFilterPersistence(
  defaultPriceRange: [number, number] | null,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasUserInteractedRef = useRef(false);
  const clearingRef = useRef(false);

  // Initialize from URL params OR localStorage on mount
  useEffect(() => {
    if (!defaultPriceRange) return;

    // First, try to get from URL params
    const categories =
      searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const sizes = searchParams.get("sizes")?.split(",").filter(Boolean) || [];
    const colors = searchParams.get("colors")?.split(",").filter(Boolean) || [];
    const urlPriceMin = searchParams.get("priceMin");
    const urlPriceMax = searchParams.get("priceMax");
    const sort = searchParams.get("sort");
    const pageParam = searchParams.get("page");
    const pageNumber = pageParam ? parseInt(pageParam) : undefined;

    let loadedFromStorage = false;

    // If URL has no params, try localStorage
    if (
      !categories.length &&
      !sizes.length &&
      !colors.length &&
      !urlPriceMin &&
      !urlPriceMax &&
      !sort &&
      pageNumber === undefined
    ) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedCategories(parsed.selectedCategories || []);
        setSelectedSizes(parsed.selectedSizes || []);
        setSelectedColors(parsed.selectedColors || []);
        setPriceRange(parsed.priceRange || defaultPriceRange);
        setSortBy(parsed.sortBy || "default");
        setPage(parsed.page || 1);
        loadedFromStorage = true;
      }
    }

    // Only set from URL/default if NOT loaded from storage
    if (!loadedFromStorage) {
      const priceMin = urlPriceMin
        ? parseFloat(urlPriceMin)
        : defaultPriceRange[0];
      const priceMax = urlPriceMax
        ? parseFloat(urlPriceMax)
        : defaultPriceRange[1];

      setSelectedCategories(categories);
      setSelectedSizes(sizes);
      setSelectedColors(colors);
      setPriceRange([priceMin, priceMax]);
      setSortBy(sort || "default");
      setPage(pageParam ? parseInt(pageParam) : 1);
    }
    setIsInitialized(true);
  }, [defaultPriceRange?.[0], defaultPriceRange?.[1]]);

  // Persist to URL params whenever filters change
  useEffect(() => {
    if (!isInitialized || !priceRange || clearingRef.current) return;

    const params = new URLSearchParams(searchParams);
    if (selectedCategories.length)
      params.set("categories", selectedCategories.join(","));
    if (selectedSizes.length) params.set("sizes", selectedSizes.join(","));
    if (selectedColors.length) params.set("colors", selectedColors.join(","));
    params.set("priceMin", priceRange[0].toFixed(2));
    params.set("priceMax", priceRange[1].toFixed(2));
    if (page && page > 0) params.set("page", String(page));
    if (sortBy) params.set("sort", sortBy);

    setSearchParams(params);

    // Also save to localStorage as backup
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedCategories,
        selectedSizes,
        selectedColors,
        priceRange,
        sortBy,
        page,
      }),
    );
  }, [
    selectedCategories,
    selectedSizes,
    selectedColors,
    priceRange,
    sortBy,
    isInitialized,
    setSearchParams,
    page,
  ]);

  // Whenever filters change, reset page
  useEffect(() => {
    if (!isInitialized) return;
    if (hasUserInteractedRef.current) setPage(1);
    hasUserInteractedRef.current = true;
  }, [selectedCategories, selectedSizes, selectedColors, priceRange, sortBy]);

  const clearFilters = () => {
    clearingRef.current = true;

    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(defaultPriceRange);
    setSortBy("default");
    setPage(1);

    // Clear URL
    setSearchParams({}); // react-router will now remove all query params

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);

    // Reset the "initialized" flag so the useEffect doesn't override URL immediately
    // optional depending on your behavior
    hasUserInteractedRef.current = false;

    // Stop clearing after next tick
    setTimeout(() => {
      clearingRef.current = false;
    });
  };

  return {
    selectedCategories,
    setSelectedCategories,
    page,
    setPage,
    selectedSizes,
    setSelectedSizes,
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
