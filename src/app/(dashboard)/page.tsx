"use client";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import StatsCard from "@/components/StatsCard";
import { LiaSellsy } from "react-icons/lia";
import { CiCoins1 } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import {
  useGetPieChartDataQuery,
  useGetReveneLineChartStatsQuery,
  useGetStatsQuery,
} from "@/redux/apiClient/statsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthLabels } from "@/data";
import { useState } from "react";
import { useGetSalesQuery } from "@/redux/apiClient/salesApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISale } from "@/types";
import Link from "next/link";
import { GoEye } from "react-icons/go";
import { PieChart } from "@/components/charts/PieChart";
import { LineChart } from "@/components/charts/LineChart";
import { rangeConst } from "@/constants";

const Home = () => {
  const [month, setMonth] = useState<{ label: string; value: string }>({
    label: "Current Month",
    value: "0",
  });
  const [range, setRange] = useState<string>(rangeConst[0].value);
  const { data: stats, isLoading } = useGetStatsQuery({
    lastMonth: month.value,
  });
  const { data: sales } = useGetSalesQuery({ limit: 5 });
  const { data: pieChartData } = useGetPieChartDataQuery({});
  const { data: revenueChartData } = useGetReveneLineChartStatsQuery({ range });
  const handleMonthChange = (val: string) => {
    const selectedMonth = monthLabels.find((item) => item.value === val);
    if (selectedMonth) {
      setMonth(selectedMonth);
    }
  };
  const handleRangeChange = (val: string) => {
    setRange(val);
  };
  if (isLoading) {
    return (
      <LoadingSpinner size={40} color="#000" borderWidth="5px" height="50vh" />
    );
  }
  const tableHeading = ["Customer", "Product", "Total", "View"];
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
        <div className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-16px)]">
          <StatsCard
            title={"Total Sales"}
            value={stats?.data?.sales?.total}
            icon={LiaSellsy}
            percentage={stats?.data?.sales?.percentage}
            selectedMonth={month}
          />
        </div>
        <div className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-16px)]">
          <StatsCard
            title={"Total Revenue"}
            value={stats?.data?.revenue?.total}
            icon={CiCoins1}
            percentage={stats?.data?.revenue?.percentage}
            selectedMonth={month}
          />
        </div>
        <div className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-16px)]">
          <StatsCard
            title={"Total Products"}
            value={stats?.data?.products?.total}
            icon={FiShoppingBag}
            percentage={stats?.data?.products?.percentage}
            selectedMonth={month}
          />
        </div>
        <div className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-16px)]">
          <StatsCard
            title={"Total Transactions"}
            value={stats?.data?.transactions?.total}
            icon={IoNewspaperOutline}
            percentage={stats?.data?.transactions?.percentage}
            selectedMonth={month}
          />
        </div>
      </div>
      {/* recent transaction-- */}
      <h4 className="font-primary font-semibold text-[20px]  py-5">
        Recent Transactions
      </h4>
      {/* products table-- */}
      <div className="flex flex-wrap gap-5">
        <div className="w-full sm:w-[calc(65%-20px)] flex-1 overflow-x-auto mb-5 border-[1px] border-[#eee] rounded-lg">
          <Table className="font-primary min-w-[500px]">
            <TableHeader className="bg-gray-light">
              <TableRow>
                {tableHeading.map((item, index) => {
                  return (
                    <TableHead
                      key={index}
                      className="font-primary py-4 font-semibold"
                    >
                      {item}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales?.data?.map((sale: ISale) => {
                return (
                  <TableRow key={sale?._id}>
                    <TableCell className="font-medium  py-3 ">
                      {sale?.customerName}{" "}
                    </TableCell>
                    <TableCell className="font-medium  py-3 ">
                      {sale?.products?.length}
                    </TableCell>
                    <TableCell className="font-medium   py-3 ">
                      {sale?.totalAmount}
                    </TableCell>
                    <TableCell className="font-medium flex  py-3 ">
                      <Link
                        href={`/sales/${sale?._id}`}
                        className="bg-purple-200 transition-all duration-300 hover:bg-purple-300 px-2 py-1 rounded-md"
                      >
                        <GoEye className="text-purple-500" />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {/* gender ratio pie charts-- */}
        <div className="w-full sm:w-[calc(35%-20px)] flex  justify-center items-center  rounded-lg bg-[#FAFAFA] shadow-md h-[290px]">
          <div className="max-h-[270px]  ">
            <h4 className="font-primary font-semibold text-center text-[20px] ">
              Gender Ratio
            </h4>
            <PieChart
              labels={["Male", "Female"]}
              data={[
                pieChartData?.data?.genderRatio?.male,
                pieChartData?.data?.genderRatio?.female,
              ]}
              backgroundColor={[`hsl(110,80%, 80%)`, `hsl(110,80%, 50%)`]}
              offset={[0, 70]}
            />
          </div>
        </div>
      </div>

      {/* line chart -- */}
      <div className="flex flex-wrap gap-5">
        <div className="bg-[#FAFAFA] w-full sm:w-[calc(65%-20px)] flex-1 p-5 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h4 className="font-primary font-semibold text-[20px] py-5">
              Revenue
            </h4>
            <Select value={range} onValueChange={handleRangeChange}>
              <SelectTrigger className="w-[120px] sm:w-[180px] focus-visible:ring-0">
                <SelectValue placeholder="Filter by Month" />
              </SelectTrigger>
              <SelectContent>
                {rangeConst.map((item, ind) => {
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

          <LineChart
            data={revenueChartData?.data?.data}
            backgroundColor={"#F2F3F5"}
            borderColor={"#A957F7"}
            label="Revenue"
            labels={revenueChartData?.data?.labels}
          />
        </div>
        {/* gender ratio pie charts-- */}
        <div className="w-full sm:w-[calc(35%-20px)] flex max-h-[auto] justify-center items-center  rounded-lg bg-[#FAFAFA] shadow-md ">
          <div className="">
            <h4 className="font-primary font-semibold text-center text-[20px] ">
              Payment Ratio
            </h4>
            <PieChart
              labels={["Cash", "Card", "Online"]}
              data={[
                pieChartData?.data?.paymentRatio?.cash,
                pieChartData?.data?.paymentRatio?.card,
                pieChartData?.data?.paymentRatio?.online,
              ]}
              backgroundColor={[`#79D7BE`, `#FDE7BB`, "#CB9DF0"]}
              offset={[0, 70]}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
