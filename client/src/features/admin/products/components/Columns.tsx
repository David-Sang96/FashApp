import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Product } from "@/store/types/product";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product
            <ArrowUpDown className="size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.name}</span>
        <span className="text-muted-foreground max-w-55 truncate text-sm">
          {row.original.description}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div className="text-start">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue<number>("price");

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="ps-4 font-medium">{formatted}</div>;
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
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
        <div className={stock === 0 ? "ps-6 text-red-500" : "ps-6"}>
          {stock}
        </div>
      );
    },
  },
  {
    accessorKey: "sizes",
    header: () => <div className="text-center">Sizes</div>,
    cell: ({ getValue }) => {
      const sizes = getValue<string[]>();

      return (
        <div className="flex justify-center gap-1">
          {sizes.map((size) => (
            <div key={size} className="rounded-full border px-2 py-0.5 text-xs">
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
      // 👇 VERY IMPORTANT (see problem 2)
      if (!value || value.length === 0) return true;

      const flags = row.getValue<string[]>(id);
      return value.some((v) => flags.includes(v));
    },
    header: () => <div className="text-center">Flags</div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-1">
        {row.original.is_newArrival && (
          <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs">
            New
          </span>
        )}
        {row.original.is_feature && (
          <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs">
            Featured
          </span>
        )}
      </div>
    ),
  },

  {
    id: "actions",
    header: "",
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
              <DropdownMenuItem
                onClick={() => {
                  console.log("Edit", product._id);
                }}
              >
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600 focus:text-red-700"
                onClick={() => {
                  console.log("Delete", product._id);
                }}
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
