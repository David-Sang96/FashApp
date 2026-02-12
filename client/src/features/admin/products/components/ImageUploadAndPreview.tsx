import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Image } from "@/store/types/product";
import { Loader2, X } from "lucide-react";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";

interface ImageUploadAndPreviewProps {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  existingImages: Image[];
  deletingId: string | null;
  handleDeleteImage: (publicId: string) => Promise<void>;
}

const ImageUploadAndPreview = ({
  deletingId,
  existingImages,
  images,
  setImages,
  handleDeleteImage,
}: ImageUploadAndPreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <FormItem>
        <div className="mb-2 flex items-center gap-2">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => document.getElementById("image-upload")?.click()}
            className="w-44 cursor-pointer rounded-full"
          >
            Add Images
          </Button>
          <FormLabel>Images (max 6)</FormLabel>
        </div>
        <FormControl>
          <Input
            ref={fileInputRef}
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden rounded-full"
            multiple
            onChange={(e) => {
              const input = e.target;
              const newFiles = Array.from(input.files ?? []);
              const total =
                images.length + newFiles.length + existingImages.length;
              if (total > 6) toast.error("Maximum 6 images allowed");
              setImages((prev) => [...prev, ...newFiles]);
              //   input.value = "";
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      {!!images.length && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {images.map((file, index) => {
            const previewUrl = URL.createObjectURL(file);

            return (
              <div key={index} className="relative">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="h-24 w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(previewUrl);
                    setImages((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-1 right-1 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black"
                >
                  <X className="size-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!!existingImages.length && (
        <div>
          <p className="my-2 text-sm">Existing Images</p>
          <div className="grid grid-cols-3 gap-2">
            {existingImages.map((image) => {
              const isDeleting = deletingId === image.public_id;
              return (
                <div key={image.public_id} className="relative">
                  <img
                    src={image.image_url}
                    alt="preview"
                    className={`h-24 w-full rounded-md object-cover transition-all duration-200 ${
                      isDeleting ? "opacity-60 blur-sm" : ""
                    }`}
                  />

                  {/* LOADER OVERLAY */}
                  {isDeleting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="size-5 animate-spin text-white" />
                    </div>
                  )}

                  {!isDeleting && (
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image.public_id)}
                      className={cn(
                        "absolute top-1 right-1 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black",
                        isDeleting && "cursor-not-allowed",
                      )}
                      disabled={isDeleting}
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadAndPreview;
