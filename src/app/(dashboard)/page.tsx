"use client";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import StatsCard from "@/components/StatsCard";
import { LiaSellsy } from "react-icons/lia";
import { CiCoins1 } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { useGetStatsQuery } from "@/redux/apiClient/statsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthLabels } from "@/data";
import { useState } from "react";

const Home = () => {
  const [month, setMonth] = useState<{ label: string; value: string }>({
    label: "Current Month",
    value: "0",
  });
  const { data: stats, isLoading } = useGetStatsQuery({
    lastMonth: month.value,
  });
  const handleMonthChange = (val: string) => {
    const selectedMonth = monthLabels.find((item) => item.value === val);
    if (selectedMonth) {
      setMonth(selectedMonth);
    }
  };

  if (isLoading) {
    return (
      <LoadingSpinner size={40} color="#000" borderWidth="5px" height="50vh" />
    );
  }

  return (
    <main className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-primary font-semibold text-[26px] sm:text-[32px]">
          Dashboard
        </h2>
        <Select onValueChange={handleMonthChange}>
          <SelectTrigger className="w-[120px] sm:w-[180px] focus-visible:ring-0">
            <SelectValue placeholder="Filter by Month" />
          </SelectTrigger>
          <SelectContent>
            {monthLabels.map((item, ind) => {
              return (
                <SelectItem
                  key={ind}
                  value={item.value}
                  className="capitalize font-primary"
                >
                  {item.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* dashboard starts cards */}
      <div className="flex flex-wrap gap-4">
        {/* stats card-- */}
        <StatsCard
          title={"Total Sales"}
          value={stats?.data?.sales?.total}
          icon={LiaSellsy}
          percentage={stats?.data?.sales?.percentage}
          selectedMonth={month}
        />
        <StatsCard
          title={"Total Revenue"}
          value={stats?.data?.revenue?.total}
          icon={CiCoins1}
          percentage={stats?.data?.revenue?.percentage}
          selectedMonth={month}
        />
        <StatsCard
          title={"Total Products"}
          value={stats?.data?.products?.total}
          icon={FiShoppingBag}
          percentage={stats?.data?.products?.percentage}
          selectedMonth={month}
        />
        <StatsCard
          title={"Total Transactions"}
          value={stats?.data?.transactions?.total}
          icon={IoNewspaperOutline}
          percentage={stats?.data?.transactions?.percentage}
          selectedMonth={month}
        />
      </div>
    </main>
  );
};

export default Home;
