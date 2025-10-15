import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { productItems } from "@/features/home/components/NewArrivals";
import { useState } from "react";
import type { ProductItemType } from "../../types/product-type";
import CartItem from "./CartItem";

const CartSheet = () => {
  const [products, setProducts] = useState<ProductItemType[]>(productItems);

  const handleDeleleCartItem = (id: number) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-xl">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="space-y-6 overflow-auto p-4">
        {products.map((item) => (
          <CartItem
            product={item}
            key={item.id}
            deleteCartItem={handleDeleleCartItem}
          />
        ))}
      </div>
      <SheetFooter>
        <Button className="cursor-pointer">CheckOut</Button>
        <SheetClose asChild>
          <Button className="cursor-pointer" variant="outline">
            Close
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default CartSheet;
