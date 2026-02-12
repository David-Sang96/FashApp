/* eslint-disable @typescript-eslint/no-explicit-any */
export const buildProductFormData = (data: any, images: File[]) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("instock_count", String(data.instock_count));
  formData.append("category", data.category);
  formData.append("rating_count", String(data.rating_count));
  formData.append("is_newArrival", String(data.is_newArrival));
  formData.append("is_feature", String(data.is_feature));

  formData.append("sizes", JSON.stringify(data.sizes));
  formData.append("colors", JSON.stringify(data.colors));

  images.forEach((file) => {
    formData.append("images", file);
  });

  return formData;
};
