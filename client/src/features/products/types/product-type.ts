export type ProductItemType = {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
  size: string[];
  colors: string[];
  images: { url: string }[];
};
