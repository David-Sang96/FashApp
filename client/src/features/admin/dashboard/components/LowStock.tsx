import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/store/types/product";
import { AlertTriangle } from "lucide-react";
interface LowStockProps {
  products: Product[];
}

const LowStock = ({ products }: LowStockProps) => {
  const LOW_STOCK_THRESHOLD = 15;
  const lowStockProducts = products.filter(
    (item) => item.instock_count <= LOW_STOCK_THRESHOLD,
  );

  return (
    <Card className="border-border border-warning/30">
      <CardHeader className="flex flex-row items-center gap-2 text-yellow-500">
        <AlertTriangle className="size-4" />
        <CardTitle className="text-base">Low Stock Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {lowStockProducts.map((p) => (
            <div
              key={p.name}
              className="border-border flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="text-foreground text-sm font-medium">{p.name}</p>
                <p className="text-muted-foreground text-xs">{p.category}</p>
              </div>
              <Badge
                variant={p.instock_count === 0 ? "destructive" : "secondary"}
                className="text-xs"
              >
                {p.instock_count === 0 ? "Out" : p.instock_count}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStock;
