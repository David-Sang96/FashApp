import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({
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
              className={`text-xs ${trend === "up" ? "text-green-500" : "text-destructive"}`}
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
