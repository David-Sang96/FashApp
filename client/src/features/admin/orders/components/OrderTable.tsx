import type { Order } from "@/store/types/order";

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  return <div>OrderTable</div>;
};

export default OrderTable;
