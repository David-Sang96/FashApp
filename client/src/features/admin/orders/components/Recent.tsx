import { formatDate, formatPrice } from "@/common/libs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Order } from "@/store/types/order";

interface RecentProps {
  orders: Order[];
}

const Recent = ({ orders }: RecentProps) => {
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:hidden">
          {orders.map((order) => (
            <div key={order._id} className="space-y-2 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">#{order._id}</span>
                <Badge className={statusColor[order.status]}>
                  {order.status}
                </Badge>
              </div>

              <div className="text-muted-foreground text-sm">
                {order.customer}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>{formatDate(order.createdAt)}</span>
                <span className="font-semibold">
                  {formatPrice(order.bill, "USD")}
                </span>
              </div>
            </div>
          ))}
        </div>
        <table className="w-full text-sm max-md:hidden">
          <thead>
            <tr className="bg-muted/50 border">
              <th className="p-2 ps-5 text-left">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-muted/70 border transition-colors"
              >
                <td className="p-2 ps-5 text-left">{order._id}</td>
                <td className="p-2 text-center">{order.customer}</td>
                <td className="p-2 text-center">
                  {formatPrice(order.bill, "USD")}
                </td>
                <td className="p-2 text-center">
                  {formatDate(order.createdAt)}
                </td>
                <td className="p-2 text-center">
                  <Badge className={statusColor[order.status]}>
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default Recent;
