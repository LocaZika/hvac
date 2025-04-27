'use client'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

interface IAdminChartProps {
  title: string;
  description: string;
  chartData: object[];
  chartConfig: ChartConfig;
}

export function AdminChart({title, description, chartData, chartConfig}: IAdminChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full" style={{ height: 'calc(100vh - 404px)' }}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickCount={5}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {
                Object.keys(chartConfig).map((key) => {
                  return (
                    <linearGradient key={`lg-${key}`} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={`var(--color-${key})`}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={`var(--color-${key})`}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  )
                })
              }
            </defs>
            {
              Object.keys(chartConfig).map((key) => {
                return (
                  <Area
                    key={`area-${key}`}
                    dataKey={key}
                    type="natural"
                    fill={`url(#fill${key})`}
                    fillOpacity={0.4}
                    stroke={`var(--color-${key})`}
                    stackId="a"
                  />
                )
              })
            }
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
