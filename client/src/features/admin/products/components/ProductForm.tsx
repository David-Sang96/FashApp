/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createProductSchema,
  updateProductSchema,
} from "@/common/types/schema/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Switch } from "@/components/ui/switch";
import { useDeleteProductImageMutation } from "@/store/api/adminApi";
import type { Image, Product } from "@/store/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import ImageUploadAndPreview from "./ImageUploadAndPreview";
import { buildProductFormData } from "./ProductFormData";
import Tiptap from "./TipTap";

type ProductFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<Product>;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ProductForm = ({
  mode,
  initialValues,
  onSubmit,
  isLoading,
  open,
  onOpenChange,
}: ProductFormProps) => {
  const schema = mode === "create" ? createProductSchema : updateProductSchema;
  type FormValues = z.infer<typeof schema>;
  const [images, setImages] = useState<File[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<Image[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      colors: [{ name: "Black", hex: "#000000" }],
      description: "",
      instock_count: 0,
      is_feature: false,
      is_newArrival: false,
      name: "",
      price: "",
      rating_count: 0,
      sizes: [],
    },
  });
  const [deleteImage] = useDeleteProductImageMutation();

  useEffect(() => {
    if (!open) {
      form.reset();
      setImages([]);
    }
  }, [open, form]);

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      form.reset({
        ...initialValues,
        price: initialValues.price?.toString() ?? "",
        instock_count: initialValues.instock_count ?? 0,
        rating_count: initialValues.rating_count ?? 0,
        sizes: initialValues.sizes ?? [],
        colors: initialValues.colors ?? [],
      });
      setExistingImages(initialValues.images ?? []);
    }
  }, [initialValues, mode, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "colors",
  });

  const handleDeleteImage = async (publicId: string) => {
    try {
      setDeletingId(publicId);
      if (!initialValues?._id) return;
      const { message } = await deleteImage({
        productId: initialValues._id,
        publicId,
      }).unwrap();
      toast.success(message);
      setExistingImages((prev) =>
        prev.filter((img) => img.public_id !== publicId),
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Image must have at least one image ");
    } finally {
      setDeletingId(null);
    }
  };

  console.log(existingImages);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader className="pb-3">
          <DialogTitle>
            {mode === "create" ? "Add Product" : "Update Product"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              if (images.length === 0 && existingImages.length === 0) {
                toast.error("Please upload at least one image");
                return;
              }

              const formData = buildProductFormData(data, images);
              onSubmit(formData);
            })}
            className="space-y-5"
          >
            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product name"
                      {...field}
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Description</FormLabel>
                  <FormControl>
                    <Tiptap value={field.value!} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PRICE & STOCK */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pb-1">Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        {...field}
                        className="rounded-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instock_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pb-1">Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="rounded-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* CATEGORY & RATING */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pb-1">Category</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-full"
                        placeholder="Category name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pb-1">Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={5}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="rounded-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* SIZES */}
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => {
                const rawValue = Array.isArray(field.value)
                  ? field.value.join(", ")
                  : "";

                return (
                  <FormItem>
                    <FormLabel>Available Sizes</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="S, M, L, XL, 2XL, 3XL"
                        defaultValue={rawValue}
                        onChange={(e) => {
                          e.target.value = e.target.value
                            .replace(/[^a-zA-Z0-9, ]/g, "") // allow letters + numbers + comma
                            .toUpperCase();
                        }}
                        onBlur={(e) => {
                          const allowed = /^(S|M|L|XL|2XL|3XL)$/;
                          const values = Array.from(
                            new Set(
                              e.target.value
                                .split(",")
                                .map((s) => s.trim().toUpperCase())
                                .filter((s) => allowed.test(s)),
                            ),
                          );

                          field.onChange(values);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* COLORS */}
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Colors</FormLabel>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => append({ name: "", hex: "#000000" })}
                  className="cursor-pointer rounded-xl"
                >
                  <Plus className="mr-1 size-3" />
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`colors.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Color name"
                              {...field}
                              className="rounded-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`colors.${index}.hex`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="color"
                              className="h-9 w-20 rounded-xl p-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(index)}
                        className="cursor-pointer"
                      >
                        <X className="size-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </FormItem>

            {/* FLAGS */}
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="is_newArrival"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>New Arrival</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_feature"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Featured</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* IMAGES */}
            <ImageUploadAndPreview
              deletingId={deletingId}
              existingImages={existingImages}
              handleDeleteImage={handleDeleteImage}
              images={images}
              setImages={setImages}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                  setImages([]);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="cursor-pointer rounded-xl"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex cursor-pointer items-center gap-1 rounded-xl"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="size-4 animate-spin" />}
                {isLoading
                  ? "Saving..."
                  : mode === "create"
                    ? "Add Product"
                    : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
