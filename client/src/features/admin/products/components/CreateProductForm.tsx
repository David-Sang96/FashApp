import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateProductForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button
          variant={"outline"}
          className="flex cursor-pointer items-center rounded-2xl px-10 text-sm"
        >
          <Plus className="size-4" />
          <span> Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {/* {editingProduct ? "Edit Product" : "Add Product"} */}
            Add Product
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input placeholder="Product name" />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea placeholder="Product description" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input type="number" step="0.01" min="0" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label>Stock Count</Label>
              <Input type="number" min="0" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Input placeholder="Category" />
            </div>
            <div className="grid gap-2">
              <Label>Rating (0-5)</Label>
              <Input type="number" min="0" max="5" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Sizes (comma-separated)</Label>
            <Input placeholder="S, M, L, XL" />
          </div>
          {/* Colors */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Colors</Label>
              <Button type="button" variant="outline" size="sm">
                <Plus className="mr-1 h-3 w-3" /> Add
              </Button>
            </div>
            {/* {form.colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input value={color.name} onChange={(e) => updateColor(i, "name", e.target.value)} placeholder="Color name" className="flex-1" />
                    <Input type="color" value={color.hex} onChange={(e) => updateColor(i, "hex", e.target.value)} className="w-12 h-9 p-1 cursor-pointer" />
                    {form.colors.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => removeColor(i)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))} */}
          </div>
          {/* Flags */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch />
              <Label>New Arrival</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch />
              <Label>Featured</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductForm;
