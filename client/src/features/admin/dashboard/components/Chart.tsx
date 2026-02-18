import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductMeta } from "@/store/types/product";
import type { UserInfo } from "@/store/types/user";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  productsMeta: ProductMeta;
  users: UserInfo[];
}

const CHART_COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(262, 83%, 58%)",
  "hsl(190, 90%, 50%)",
];

const Chart = ({ productsMeta, users }: ChartProps) => {
  const localProvider = users.filter(
    (user) => user.provider === "local",
  ).length;
  const googleProvider = users.filter(
    (user) => user.provider === "google",
  ).length;

  const providerData = [
    {
      name: "Google",
      value: googleProvider,
      fill: CHART_COLORS[0],
    },
    {
      name: "Local",
      value: localProvider,
      fill: CHART_COLORS[1],
    },
  ];

  const categoryData = productsMeta?.totalProductOfEachCategory.map(
    (item, index) => ({
      ...item,
      fill: CHART_COLORS[index % CHART_COLORS.length],
    }),
  );

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground text-base">
              User Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={productsMeta.signupTrend}>
                <defs>
                  <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={CHART_COLORS[4]}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={CHART_COLORS[4]}
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
                  stroke={CHART_COLORS[4]}
                  fill="url(#signupGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
                />

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
              {providerData.map((d) => (
                <div
                  key={d.name}
                  className="text-muted-foreground flex items-center gap-1.5 text-xs"
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: d.fill }}
                  />
                  {d.name} ({d.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base">
              Products by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categoryData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(220,13%,91%)"
                />
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
                <Bar dataKey="count" radius={[4, 4, 0, 0]} fillOpacity={0.9} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chart;
