"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useMetricsStore } from "@/store/streamStore";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive line chart";

const chartConfig = {
  users: {
    label: "Users",
  },
  totalUsers: {
    label: "Total Users",
    color: "hsl(var(--chart-1))",
  },
  activeUsers: {
    label: "Active Users",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function UserGrowthChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("totalUsers");
  const { monthlyMetrics } = useMetricsStore();
  const months = Object.keys(monthlyMetrics).slice(-10);
  const userGrowthData = months.map((month) => ({
    month,
    totalUsers: monthlyMetrics[month].totalUsers,
    activeUsers: monthlyMetrics[month].activeUsers,
  }));
  const total = React.useMemo(
    () => ({
      totalUsers: userGrowthData.reduce(
        (acc, curr) => acc + curr.totalUsers,
        0
      ),
      activeUsers: userGrowthData.reduce(
        (acc, curr) => acc + curr.activeUsers,
        0
      ),
    }),
    [userGrowthData]
  );

  return (
    <Card className="shadow">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>User Growth Line Chart</CardTitle>
          <CardDescription>
            Showing{" "}
            {activeChart == "totalUsers" ? "Total Users" : "Active Users"} for
            the last 10 months
          </CardDescription>
        </div>
        <div className="flex">
          {["totalUsers", "activeUsers"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}>
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={userGrowthData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value.slice(0, 3);
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="users"
                  labelFormatter={(value) => {
                    return value.toLocaleString();
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
