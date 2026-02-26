import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  type CartItem,
} from "@/store/slices/cart";

import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { IoTrashBinOutline } from "react-icons/io5";

interface CartItemProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveCartItem = () => {
    dispatch(removeFromCart({ key: item.key! }));
  };

  return (
    <div className="flex justify-between border-b pb-3">
      <div className="flex w-[70%] items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold">{item.name}</span>
          <span className="text-muted-foreground text-sm">
            size - {item.size}
          </span>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span>color -</span>
            <span
              className="flex size-4 cursor-pointer items-center justify-center rounded-full"
              style={{ backgroundColor: item.color }}
            />
          </div>
          <span className="pt-1 font-bold">${item.price}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-end justify-between">
        <IoTrashBinOutline
          className="text-destructive size-5 cursor-pointer"
          onClick={handleRemoveCartItem}
        />
        <div className="space-x-3">
          <Button
            size={"sm"}
            onClick={() => dispatch(decreaseQuantity({ key: item.key! }))}
            className="cursor-pointer rounded-full"
          >
            <FiMinus className="size-3" />
          </Button>
          <span>{item.quantity}</span>
          <Button
            size={"sm"}
            onClick={() => dispatch(increaseQuantity({ key: item.key! }))}
            className="cursor-pointer rounded-full"
          >
            <FaPlus className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
