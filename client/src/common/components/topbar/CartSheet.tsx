import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slices/cart";
import CartItemCard from "./CardItemCard";
import EmptyCart from "./EmptyCart";

const CartSheet = () => {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  return (
    <SheetContent className="w-full">
      <SheetHeader>
        <SheetTitle className="text-xl">Your Cart</SheetTitle>
      </SheetHeader>
      {items.length > 2 && (
        <SheetClose asChild>
          <Button
            variant={"link"}
            className="flex cursor-pointer justify-end"
            onClick={() => dispatch(clearCart())}
          >
            clear all
          </Button>
        </SheetClose>
      )}
      <div className="space-y-6 overflow-auto p-4">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          items.map((item) => <CartItemCard item={item} key={item.key} />)
        )}
      </div>
      <SheetFooter>
        {items.length > 0 && (
          <Button className="cursor-pointer rounded-full">CheckOut</Button>
        )}
        <SheetClose asChild>
          <Button className="cursor-pointer rounded-full" variant="outline">
            Close
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default CartSheet;
