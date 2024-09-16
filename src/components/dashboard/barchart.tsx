"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A horizontal bar chart";

const chartConfig = {
  song: {
    label: "Song",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function StreamChart() {
  const { currentMonth } = useMonthStore();
  const { monthlyMetrics } = useMetricsStore();
  const streamData = monthlyMetrics[currentMonth].streamedSongs || [];

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle>Streams Bar Chart</CardTitle>
        <CardDescription>
          Top 5 streamed songs in {currentMonth}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={streamData}
            layout="vertical"
            margin={{
              left: 10,
            }}>
            <XAxis type="number" dataKey="streamCount" hide />
            <YAxis
              dataKey="songName"
              type="category"
              tickLine={false}
              //   tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              hide
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="streamCount" fill="var(--color-song)" radius={5}>
              <LabelList
                dataKey="songName"
                position="insideLeft"
                offset={8}
                className="fill-card"
                fontSize={12}
              />
              <LabelList
                dataKey="streamCount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
