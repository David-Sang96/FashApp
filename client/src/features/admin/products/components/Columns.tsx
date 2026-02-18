import { formatPrice } from "@/common/libs";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Product } from "@/store/types/product";
import { type ColumnDef } from "@tanstack/react-table";
import DOMPurify from "dompurify";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router";

export function useProductColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}): ColumnDef<Product>[] {
  const navigate = useNavigate();
  return [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //       className="border border-black dark:border-white"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       className="border border-black dark:border-white"
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <AvatarGroup>
            {product.images.slice(0, 3).map((img) => (
              <Avatar key={img.public_id}>
                <AvatarImage
                  src={img.image_url}
                  alt={img.public_id}
                  className="aspect-auto size-10"
                />
                <AvatarFallback>
                  {product.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {product.images.length > 3 && (
              <AvatarGroupCount>+{product.images.length - 3}</AvatarGroupCount>
            )}
          </AvatarGroup>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div>
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Product
              <ArrowUpDown className="size-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        //If you want just plain text without HTML formatting, extract the text content instead:
        const plainText = DOMPurify.sanitize(row.original.description, {
          ALLOWED_TAGS: [],
        });
        return (
          <div className="flex flex-col">
            <span className="font-medium">{row.original.name}</span>
            <span className="line-clamp-2 max-w-60 text-sm text-white/80">
              {plainText.slice(0, 30)}...
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <div className="text-start">
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Category
              <ArrowUpDown className="size-4" />
            </Button>
          </div>
        );
      },
      cell: ({ getValue }) => (
        <span className="text-muted-foreground ps-4">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <div>
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Price
              <ArrowUpDown className="size-4" />
            </Button>
          </div>
        );
      },
      cell: ({ getValue }) => {
        return (
          <div className="ps-4 font-medium">
            {formatPrice(getValue<number>(), "USD")}
          </div>
        );
      },
    },
    {
      accessorKey: "instock_count",
      header: ({ column }) => {
        return (
          <div>
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Stock
              <ArrowUpDown className="size-4" />
            </Button>
          </div>
        );
      },
      cell: ({ getValue }) => {
        const stock = getValue<number>();
        return (
          <Badge
            className={`ms-6 font-semibold ${stock < 11 && stock > 5 && "bg-yellow-500 text-black"}`}
            variant={stock === 0 ? "destructive" : "default"}
          >
            {stock}
          </Badge>
        );
      },
    },
    {
      accessorKey: "sizes",
      header: "Sizes",
      cell: ({ getValue }) => {
        const sizes = getValue<string[]>();
        return (
          <div className="flex w-40 flex-wrap gap-1">
            {sizes.map((size) => (
              <div
                key={size}
                className="rounded-full border px-2 py-0.5 text-xs"
              >
                {size}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "colors",
      header: "Colors",
      cell: ({ getValue }) => {
        const colors = getValue<{ hex: string }[]>();

        return (
          <div className="flex gap-1">
            {colors.map((color, i) => (
              <span
                key={i}
                className="size-4 rounded-full border"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        );
      },
    },
    {
      id: "flags",
      accessorFn: (row) => {
        const flags: string[] = [];
        if (row.is_newArrival) flags.push("New");
        if (row.is_feature) flags.push("Featured");
        return flags;
      },
      filterFn: (row, id, value: string[]) => {
        //  VERY IMPORTANT (see problem 2)
        if (!value || value.length === 0) return true;

        const flags = row.getValue<string[]>(id);
        return value.some((v) => flags.includes(v));
      },
      header: () => <div className="text-center">Flags</div>,
      cell: ({ row }) => (
        <div className="flex justify-center gap-1">
          {row.original.is_newArrival && (
            <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
              New
            </span>
          )}
          {row.original.is_feature && (
            <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
              Featured
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <div className="text-center">
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Date
              <ArrowUpDown className="size-4" />
            </Button>
          </div>
        );
      },
      cell: ({ getValue }) => {
        const date = new Date(getValue<string>());
        return <div className="text-center">{date.toLocaleDateString()}</div>;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex justify-end pr-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <Eye className="mr-2 size-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(product)}>
                  <Pencil className="mr-2 size-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-700"
                  onClick={() => onDelete(product)}
                >
                  <Trash className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
