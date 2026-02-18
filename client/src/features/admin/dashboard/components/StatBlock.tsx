import { formatPrice } from "@/common/libs";
import type { Product, ProductMeta } from "@/store/types/product";
import type { UserInfo } from "@/store/types/user";
import {
  DollarSign,
  Layers,
  Mail,
  Package,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatCard } from "./StaCard";

interface StatBlockProps {
  users: UserInfo[];
  products: Product[];
  productsMeta: ProductMeta;
}

const StatBlock = ({ users, products, productsMeta }: StatBlockProps) => {
  const totalPrice = products
    .map((item) => item.price)
    .reduce((prev, cur) => prev + cur, 0);

  const totalOutOfStock = products.filter(
    (item) => item.instock_count === 0,
  ).length;

  const newArrivals = products.filter((item) => item.is_newArrival).length;
  const featured = products.filter((item) => item.is_feature).length;

  const activeUsers = users.reduce(
    (count, user) => count + (user.active ? 1 : 0),
    0,
  );
  const adminUsers = users.filter((user) => user.role === "admin").length;
  const verifiedEmail = users.filter((user) => user.emailVerified).length;
  const unverifiedEmail = users.filter((user) => !user.emailVerified).length;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={users.length}
          subtext={`${activeUsers} active`}
          icon={Users}
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard
          title="Total Products"
          value={products.length}
          subtext={`${totalOutOfStock} out of stock`}
          icon={Package}
          trend="up"
          trendValue="+8.2%"
        />
        <StatCard
          title="Inventory Value"
          value={formatPrice(totalPrice, "USD")}
          subtext="across all products"
          icon={DollarSign}
          trend="up"
          trendValue="+15.3%"
        />
        <StatCard
          title="Avg Rating"
          value={productsMeta.averageRating}
          subtext="across all products"
          icon={Star}
          trend="down"
          trendValue="-0.3"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Admins"
          value={adminUsers}
          subtext="admin accounts"
          icon={ShieldCheck}
        />
        <StatCard
          title="Verified Emails"
          value={verifiedEmail}
          subtext={`${unverifiedEmail} unverified`}
          icon={Mail}
        />
        <StatCard
          title="New Arrivals"
          value={newArrivals}
          subtext="products marked new"
          icon={TrendingUp}
        />
        <StatCard
          title="Featured"
          value={featured}
          subtext="featured products"
          icon={Layers}
        />
      </div>
    </div>
  );
};

export default StatBlock;
