import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Layers,
  Mail,
  MailX,
  Package,
  ShieldCheck,
  Star,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// --- Mock data derived from User & Product models ---

const userStats = {
  total: 1247,
  active: 1102,
  inactive: 145,
  admins: 23,
  regularUsers: 1224,
  emailVerified: 987,
  emailUnverified: 260,
  localProvider: 892,
  googleProvider: 355,
};

const productStats = {
  total: 2350,
  outOfStock: 47,
  newArrivals: 182,
  featured: 96,
  totalInventoryValue: 1_284_750,
  averageRating: 4.2,
  categories: [
    { name: "Electronics", count: 620 },
    { name: "Clothing", count: 510 },
    { name: "Accessories", count: 430 },
    { name: "Footwear", count: 340 },
    { name: "Home", count: 280 },
    { name: "Sports", count: 170 },
  ],
};

const providerData = [
  { name: "Local", value: userStats.localProvider },
  { name: "Google", value: userStats.googleProvider },
];

const signupTrend = [
  { month: "Aug", users: 68 },
  { month: "Sep", users: 95 },
  { month: "Oct", users: 112 },
  { month: "Nov", users: 140 },
  { month: "Dec", users: 128 },
  { month: "Jan", users: 175 },
  { month: "Feb", users: 192 },
];

const recentProducts = [
  {
    name: "Wireless Headphones Pro",
    category: "Electronics",
    price: 129.99,
    instock_count: 245,
    is_newArrival: true,
    rating_count: 4.7,
    createdAt: "2 hours ago",
  },
  {
    name: "Running Shoes Ultra",
    category: "Footwear",
    price: 89.99,
    instock_count: 0,
    is_newArrival: true,
    rating_count: 4.3,
    createdAt: "5 hours ago",
  },
  {
    name: "Cotton T-Shirt Pack",
    category: "Clothing",
    price: 34.99,
    instock_count: 520,
    is_newArrival: false,
    rating_count: 4.1,
    createdAt: "1 day ago",
  },
  {
    name: "Smart Watch X2",
    category: "Electronics",
    price: 249.99,
    instock_count: 12,
    is_newArrival: true,
    rating_count: 4.8,
    createdAt: "1 day ago",
  },
  {
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 45.0,
    instock_count: 180,
    is_newArrival: false,
    rating_count: 3.9,
    createdAt: "2 days ago",
  },
];

const recentUsers = [
  {
    name: "Sarah Chen",
    email: "sarah@example.com",
    provider: "local",
    role: "admin",
    active: true,
    emailVerified: true,
    lastLogin: "2m ago",
  },
  {
    name: "Marcus Webb",
    email: "marcus@gmail.com",
    provider: "google",
    role: "user",
    active: true,
    emailVerified: true,
    lastLogin: "15m ago",
  },
  {
    name: "Aisha Patel",
    email: "aisha@example.com",
    provider: "local",
    role: "user",
    active: false,
    emailVerified: false,
    lastLogin: "3d ago",
  },
  {
    name: "James Liu",
    email: "james@gmail.com",
    provider: "google",
    role: "user",
    active: true,
    emailVerified: true,
    lastLogin: "1h ago",
  },
  {
    name: "Elena Rodriguez",
    email: "elena@example.com",
    provider: "local",
    role: "admin",
    active: true,
    emailVerified: true,
    lastLogin: "30m ago",
  },
];

const lowStockProducts = [
  { name: "Running Shoes Ultra", instock_count: 0, category: "Footwear" },
  { name: "Leather Belt Classic", instock_count: 3, category: "Accessories" },
  { name: "Smart Watch X2", instock_count: 12, category: "Electronics" },
  { name: "Silk Scarf Luxury", instock_count: 8, category: "Clothing" },
];

const CHART_COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(262, 83%, 58%)",
  "hsl(190, 90%, 50%)",
];

function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ElementType;
  trend?: "up" | "down";
  trendValue?: string;
}) {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-foreground text-2xl font-bold">{value}</div>
        <div className="mt-1 flex items-center gap-1">
          {trend &&
            (trend === "up" ? (
              <ArrowUpRight className="text-success h-3 w-3" />
            ) : (
              <ArrowDownRight className="text-destructive h-3 w-3" />
            ))}
          {trendValue && (
            <span
              className={`text-xs ${trend === "up" ? "text-success" : "text-destructive"}`}
            >
              {trendValue}
            </span>
          )}
          <span className="text-muted-foreground text-xs">{subtext}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Overview of users &amp; products
        </p>
      </div>

      {/* Top stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={userStats.total.toLocaleString()}
          subtext={`${userStats.active} active`}
          icon={Users}
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard
          title="Total Products"
          value={productStats.total.toLocaleString()}
          subtext={`${productStats.outOfStock} out of stock`}
          icon={Package}
          trend="up"
          trendValue="+8.2%"
        />
        <StatCard
          title="Inventory Value"
          value={`$${(productStats.totalInventoryValue / 1000).toFixed(0)}K`}
          subtext="across all products"
          icon={DollarSign}
          trend="up"
          trendValue="+15.3%"
        />
        <StatCard
          title="Avg Rating"
          value={productStats.averageRating.toFixed(1)}
          subtext="across all products"
          icon={Star}
          trend="down"
          trendValue="-0.3"
        />
      </div>

      {/* Secondary stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Admins"
          value={userStats.admins}
          subtext="admin accounts"
          icon={ShieldCheck}
        />
        <StatCard
          title="Verified Emails"
          value={userStats.emailVerified}
          subtext={`${userStats.emailUnverified} unverified`}
          icon={Mail}
        />
        <StatCard
          title="New Arrivals"
          value={productStats.newArrivals}
          subtext="products marked new"
          icon={TrendingUp}
        />
        <StatCard
          title="Featured"
          value={productStats.featured}
          subtext="featured products"
          icon={Layers}
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Signup trend */}
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground text-base">
              User Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={signupTrend}>
                <defs>
                  <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(221,83%,53%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(221,83%,53%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(220,13%,91%)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "hsl(220,9%,46%)" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "hsl(220,9%,46%)" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid hsl(220,13%,91%)",
                    fontSize: 13,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(221,83%,53%)"
                  fill="url(#signupGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Provider pie */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base">
              Auth Providers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={providerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                  paddingAngle={4}
                >
                  {providerData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid hsl(220,13%,91%)",
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex gap-4">
              {providerData.map((d, i) => (
                <div
                  key={d.name}
                  className="text-muted-foreground flex items-center gap-1.5 text-xs"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[i] }}
                  />
                  {d.name} ({d.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories bar chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-base">
            Products by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={productStats.categories}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "hsl(220,9%,46%)" }}
              />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220,9%,46%)" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid hsl(220,13%,91%)",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {productStats.categories.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom tables */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent users */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base">
              Recently Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((u) => (
                <div
                  key={u.email}
                  className="border-border flex items-center justify-between border-b py-2 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-accent text-accent-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
                      {u.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-foreground flex items-center gap-1.5 text-sm font-medium">
                        {u.name}
                        {u.role === "admin" && (
                          <ShieldCheck className="text-primary h-3 w-3" />
                        )}
                      </p>
                      <p className="text-muted-foreground flex items-center gap-1 text-xs">
                        {u.email}
                        {u.emailVerified ? (
                          <UserCheck className="text-success h-3 w-3" />
                        ) : (
                          <MailX className="text-destructive h-3 w-3" />
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        u.provider === "google" ? "secondary" : "outline"
                      }
                      className="text-[10px]"
                    >
                      {u.provider}
                    </Badge>
                    <span
                      className={`h-2 w-2 rounded-full ${u.active ? "bg-success" : "bg-muted-foreground"}`}
                    />
                    <span className="text-muted-foreground w-12 text-right text-xs">
                      {u.lastLogin}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent products */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base">
              Recently Added Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProducts.map((p) => (
                <div
                  key={p.name}
                  className="border-border flex items-center justify-between border-b py-2 last:border-0"
                >
                  <div>
                    <p className="text-foreground flex items-center gap-1.5 text-sm font-medium">
                      {p.name}
                      {p.is_newArrival && (
                        <Badge className="bg-primary/10 text-primary border-0 text-[10px]">
                          New
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

      {/* Low stock alert */}
      <Card className="border-border border-warning/30">
        <CardHeader className="flex flex-row items-center gap-2">
          <AlertTriangle className="text-warning h-4 w-4" />
          <CardTitle className="text-foreground text-base">
            Low Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {lowStockProducts.map((p) => (
              <div
                key={p.name}
                className="border-border flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-foreground text-sm font-medium">
                    {p.name}
                  </p>
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
    </div>
  );
}
