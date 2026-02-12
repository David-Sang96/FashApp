/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { Loader2, MoreHorizontal, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/store/api/adminApi";
import type { Product } from "@/store/types/product";
import { toast } from "sonner";
import { columns } from "./Columns";
import { FacetedFilter } from "./FacetedFilter";
import ProductForm from "./ProductForm";

/* -------------------------------------------
   Mobile Card (reuses TanStack row)
-------------------------------------------- */
function ProductMobileCard({
  row,
  onEdit,
  onDelete,
}: {
  row: any;
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
}) {
  const product = row.original;

  return (
    <div className="space-y-3 rounded-xl border p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-muted-foreground text-sm">{product.category}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(product)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(product)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <span>${product.price}</span>
        <span>Stock: {product.instock_count}</span>
      </div>

      <div className="flex gap-2">
        {product.is_newArrival && (
          <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
            New
          </span>
        )}
        {product.is_feature && (
          <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
            Featured
          </span>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------
   DataTable
-------------------------------------------- */
interface DataTableProps {
  data?: Product[];
}

export function DataTable({ data = [] }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const table = useReactTable({
    data,
    columns: columns({
      onEdit: handleEdit,
      onDelete: handleDelete,
    }),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function handleEdit(product: Product) {
    setMode("edit");
    setSelectedProduct(product);
    setOpen(true);
  }

  function handleDelete(product: Product) {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  }

  async function handleDeleteProduct() {
    try {
      const { message } = await deleteProduct(selectedProduct._id).unwrap();
      toast.success(message);
      setOpenDeleteDialog(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-medium">Products</h2>
          <p className="text-muted-foreground pt-1 text-sm">
            {data.length} total products
          </p>
        </div>
        <Button
          onClick={() => {
            setMode("create");
            setSelectedProduct(null);
            setOpen(true);
          }}
          className="cursor-pointer rounded-full"
        >
          Add Product
        </Button>
        {/* Product create / update */}
        {/* 
            Always key modal forms when:
            Same form used for create/edit
            Different data sources
            Complex internal state
            File uploads involved
        */}
        <ProductForm
          key={mode === "create" ? "create" : selectedProduct?._id}
          open={open}
          onOpenChange={(value) => {
            setOpen(value);
            if (!value) {
              setSelectedProduct(null);
              setMode("create");
            }
          }}
          mode={mode}
          initialValues={selectedProduct}
          isLoading={updateLoading || createLoading}
          onSubmit={async (formData) => {
            try {
              if (mode === "create") {
                const { message } = await createProduct(formData).unwrap();
                toast.success(message);
              } else {
                const { message } = await updateProduct({
                  id: selectedProduct._id,
                  data: formData,
                }).unwrap();
                toast.success(message);
              }

              setOpen(false);
              setSelectedProduct(null);
            } catch (err: any) {
              toast.error(err?.data?.message || "Operation failed");
            }
          }}
        />
      </div>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure that you want to delete this product permanently?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={deleteLoading}
                className="cursor-pointer rounded-2xl"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={deleteLoading}
              variant={"destructive"}
              onClick={handleDeleteProduct}
              className="cursor-pointer rounded-2xl"
            >
              {deleteLoading && <Loader2 className="size-4 animate-spin" />}
              {deleteLoading ? "Deleting" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          placeholder="Product name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm rounded-full"
        />

        <FacetedFilter
          title="Flags"
          column={table.getColumn("flags")}
          options={[
            { label: "New Arrival", value: "New" },
            { label: "Featured", value: "Featured" },
          ]}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto gap-2 rounded-lg">
              <SlidersHorizontal className="size-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(!!v)}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-md border md:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-3 md:hidden">
        {table.getRowModel().rows.length ? (
          table
            .getRowModel()
            .rows.map((row) => (
              <ProductMobileCard
                key={row.id}
                row={row}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
        ) : (
          <p className="text-muted-foreground py-10 text-center">No results.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 pe-4 md:flex-row md:items-center md:justify-between">
        <p className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} selected
        </p>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Rows per page</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger className="w-18 rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="cursor-pointer rounded-xl"
            >
              <FaChevronLeft className="size-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="cursor-pointer rounded-xl"
            >
              <FaChevronRight className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
