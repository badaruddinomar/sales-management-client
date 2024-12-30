import StatsCard from "@/components/StatsCard";
import { statsData } from "@/data";
import React from "react";
const Home = () => {
  return (
    <main className="py-6">
      <h2 className="font-primary font-semibold text-[32px] mb-6">Dashboard</h2>
      {/* dashboard starts cards */}
      <div className="flex flex-wrap gap-4">
        {/* stats card-- */}
        {statsData.map((item, ind) => {
          return <StatsCard key={ind} stats={item} />;
        })}
      </div>
    </main>
  );
};

export default Home;
