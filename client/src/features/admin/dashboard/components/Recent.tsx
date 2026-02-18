import { timeAgo } from "@/common/libs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product, ProductMeta } from "@/store/types/product";
import { MailX, ShieldCheck, UserCheck } from "lucide-react";

interface RecentProps {
  productMeta?: ProductMeta;
  products: Product[];
}

const Recent = ({ products, productMeta }: RecentProps) => {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-base">
            Recently Active Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {productMeta?.recentUsers.map((u) => (
              <div
                key={u.email}
                className="border-border flex items-center justify-between border-b py-2 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={u?.avatar?.image_url}
                      alt={u?.avatar?.public_alt}
                    />
                    <AvatarFallback>
                      {u?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground flex items-center gap-1.5 text-sm font-medium">
                      {u.name}
                      {u.role === "admin" && (
                        <ShieldCheck className="text-primary size-3" />
                      )}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1 text-xs">
                      {u.email}
                      {u.emailVerified ? (
                        <UserCheck className="size-3 text-green-500" />
                      ) : (
                        <MailX className="text-destructive size-3" />
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={u.provider === "google" ? "secondary" : "outline"}
                    className="text-[10px]"
                  >
                    {u.provider}
                  </Badge>
                  <span
                    className={`h-2 w-2 rounded-full ${u.active ? "bg-success" : "bg-muted-foreground"}`}
                  />
                  <span className="text-muted-foreground w-14 text-right text-xs">
                    {timeAgo(u.lastActiveAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-base">
            Recently Added Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {products.slice(0, 8).map((p) => (
              <div
                key={p.name}
                className="border-border flex items-center justify-between border-b py-2 last:border-0"
              >
                <div>
                  <p className="text-foreground flex items-center gap-1.5 text-sm font-medium">
                    {p.name}
                    {p.is_newArrival && (
                      <Badge className="border-0 bg-green-500 text-[10px] text-white">
                        New
                      </Badge>
                    )}
                    {p.is_feature && (
                      <Badge className="border-0 bg-orange-500 text-[10px] text-white">
                        Featured
                      </Badge>
                    )}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {p.category} · ★ {p.rating_count}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-foreground text-sm font-semibold">
                    ${p.price}
                  </p>
                  <p
                    className={`text-xs ${p.instock_count === 0 ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {p.instock_count === 0
                      ? "Out of stock"
                      : `${p.instock_count} in stock`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recent;
