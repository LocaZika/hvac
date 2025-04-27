import { AdminBreadcrumbSender } from "@components/adminComponents/breadcrumb/AdminBreadcrumb";
import { AdminChart } from "@components/adminComponents/chart/Chart";
import Statistic from "@components/adminComponents/statistic/Statistic";
import { ChartConfig } from "@components/ui/chart";
import { sendRequest } from "@utils/api.utils";
import { generateRandomColor } from "@utils/color.utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "This is the admin panel for managing the HVAC inventory.",
};

interface ILastMonthValueDifference {
  value: number;
  percent: number;
  growth: "up" | "down";
}
type TStatistic = {
  month: string;
} & Record<Exclude<string, "month">, number>;
interface IAdminData {
  customerCount: number;
  lastMonthEarningDifference: ILastMonthValueDifference;
  lastMonthGrowthDifference: ILastMonthValueDifference;
  orderCount: number;
  statistic: TStatistic[];
}

export default async function Dashboard() {
  const adminDataRes = await sendRequest<IBackendResponse<IAdminData>>({
    url: "/admin",
  });
  const {
    statistic,
    customerCount,
    lastMonthEarningDifference,
    lastMonthGrowthDifference,
    orderCount,
  } = adminDataRes.data;
  const chartData = [...statistic];
  const keys = new Set<string>();
  chartData.forEach((entry) => {
    Object.keys(entry).forEach((key) => {
      if (key !== "month") keys.add(key);
    });
  });
  const chartConfig: Record<string, { label: string; color: string }> =
    {} satisfies ChartConfig;
  keys.forEach((key) => {
    chartConfig[key] = {
      label: key.toUpperCase(),
      color: generateRandomColor(),
    };
  });
  return (
    <>
      <AdminBreadcrumbSender items={[{ title: "Dashboard", path: "/admin" }]} />
      <div className="dashboard-statistic mb-2 grid grid-cols-12 text-white">
        <div className="col-span-12 m-2 rounded-lg bg-gradient-to-br from-[#0061ff] from-25% to-[#60efff] p-3 shadow-lg md:col-span-3">
          <Statistic label={"Customers"} value={customerCount} />
        </div>
        <div className="col-span-12 m-2 rounded-lg bg-gradient-to-br from-[#07f49e] from-25% to-[#60efff] p-3 shadow-lg md:col-span-3">
          <Statistic label={"Orders"} value={orderCount} />
        </div>
        <div className="col-span-12 m-2 rounded-lg bg-gradient-to-br from-[#9946b2] from-25% to-[#fcb0f3] p-3 shadow-lg md:col-span-3">
          <Statistic
            label={"Earnings"}
            value={lastMonthEarningDifference.value}
            growthPercentages={lastMonthEarningDifference.percent}
            growth={lastMonthEarningDifference.growth}
          />
        </div>
        <div className="col-span-12 m-2 rounded-lg bg-gradient-to-br from-[#ea5459] from-25% to-[#f7ba2c] p-3 shadow-lg md:col-span-3">
          <Statistic
            label={"Growth"}
            value={lastMonthGrowthDifference.value}
            growthPercentages={lastMonthGrowthDifference.percent}
            growth={lastMonthGrowthDifference.growth}
          />
        </div>
      </div>
      <div className="dashboard-chart grid grid-cols-12 p-2">
        <div className="col-span-12 rounded-lg shadow-lg">
          <AdminChart
            title="Total Number Of Cars Sold"
            description="Showing total number of cars sold for the last 6 months"
            chartData={chartData}
            chartConfig={chartConfig}
          />
        </div>
      </div>
    </>
  );
}
