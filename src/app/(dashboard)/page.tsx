"use client";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import StatsCard from "@/components/StatsCard";
import { LiaSellsy } from "react-icons/lia";
import { CiCoins1 } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { IoNewspaperOutline } from "react-icons/io5";
import { useGetStatsQuery } from "@/redux/apiClient/statsApi";

const Home = () => {
  const { data: stats, isLoading } = useGetStatsQuery({});

  if (isLoading) {
    return (
      <LoadingSpinner size={40} color="#000" borderWidth="5px" height="50vh" />
    );
  }
  return (
    <main className="py-6">
      <h2 className="font-primary font-semibold text-[32px] mb-6">Dashboard</h2>
      {/* dashboard starts cards */}
      <div className="flex flex-wrap gap-4">
        {/* stats card-- */}
        <StatsCard
          title={"Total Sales"}
          value={stats?.data?.totalSales}
          icon={LiaSellsy}
          percentage={16}
        />
        <StatsCard
          title={"Total Revenue"}
          value={stats?.data?.totalRevenue}
          icon={CiCoins1}
          percentage={16}
        />
        <StatsCard
          title={"Total Products"}
          value={stats?.data?.totalProducts}
          icon={FiShoppingBag}
          percentage={16}
        />
        <StatsCard
          title={"Total Transactions"}
          value={stats?.data?.totalTransactions}
          icon={IoNewspaperOutline}
          percentage={16}
        />
      </div>
    </main>
  );
};

export default Home;
