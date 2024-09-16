"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { useMonthStore } from "@/store/stateStore";
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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive pie chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  Ads: {
    label: "Ads",
    color: "hsl(var(--chart-1))",
  },
  Subscriptions: {
    label: "Subscriptions",
    color: "hsl(var(--chart-2))",
  },
  Merchandise: {
    label: "Merchandise",
    color: "hsl(var(--chart-3))",
  },
  Concerts: {
    label: "Concerts",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const id = "pie-interactive";
  const { currentMonth } = useMonthStore();
  const { monthlyMetrics } = useMetricsStore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const revenueData = monthlyMetrics[currentMonth].revenueSources || [];
  revenueData.forEach((item) => {
    item.fill = `var(--color-${item.source})`;
  });
  const [activeSource, setActiveSource] = React.useState(revenueData[0].source);

  const activeIndex = React.useMemo(
    () => revenueData.findIndex((item) => item.source === activeSource),
    [activeSource, revenueData]
  );
  const sources = React.useMemo(
    () => revenueData.map((item) => item.source),
    [revenueData]
  );

  return (
    <Card data-chart={id} className="flex flex-col shadow">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Revenue Pie Chart</CardTitle>
          <CardDescription>{currentMonth}</CardDescription>
        </div>
        <Select value={activeSource} onValueChange={setActiveSource}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {sources.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto min-h-[200px] aspect-square w-full max-w-[300px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={revenueData}
              dataKey="amount"
              nameKey="source"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold">
                          {revenueData[activeIndex].amount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          {revenueData[activeIndex].source}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
