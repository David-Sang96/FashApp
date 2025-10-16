import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { IoTrashBinOutline } from "react-icons/io5";
import type { ProductItemType } from "../../../product-detail/components/product-type";

interface CartItemProps {
  product: ProductItemType;
  deleteCartItem: (val: number) => void;
}

const CartItem = ({ product, deleteCartItem }: CartItemProps) => {
  const [count, setCount] = useState(1);

  return (
    <div className="flex justify-between border-b pb-3">
      <div className="flex items-center gap-3">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-24 rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <span className="font-bold">{product.name}</span>
          <span className="text-muted-foreground text-xs">
            size - {product.size}
          </span>
          <span className="text-muted-foreground text-xs">
            color - {product.colors[0]}
          </span>
          <span className="pt-1 font-bold">${product.price}</span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <IoTrashBinOutline
          className="text-destructive size-5 cursor-pointer"
          onClick={() => deleteCartItem(product.id)}
        />
        <div className="space-x-3">
          <Button
            size={"sm"}
            onClick={() => {
              if (count > 1) {
                setCount((prev) => prev - 1);
              }
            }}
            className="cursor-pointer rounded-full"
          >
            <FiMinus className="size-3" />
          </Button>
          <span>{count}</span>
          <Button
            size={"sm"}
            onClick={() => setCount((prev) => prev + 1)}
            className="cursor-pointer rounded-full"
          >
            <FaPlus className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
