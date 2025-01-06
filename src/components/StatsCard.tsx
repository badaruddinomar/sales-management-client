import React from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { IoTrendingDownOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
interface IProps {
  title: string;
  value: number;
  icon: IconType;
  percentage: number;
}
const StatsCard = ({ title, value, icon: Icon, percentage }: IProps) => {
  return (
    <div className="bg-[#FAFAFA] px-4 py-3 rounded-lg w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-16px)] shadow-md">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-primary mb-3 font-semibold text-base">
          <span className="bg-gray-100 rounded-lg h-[40px] w-[40px] flex items-center justify-center">
            <Icon className="text-2xl text-purple-500" />
          </span>
          <span className="text-gray-primary capitalize">{title}</span>
        </p>
        <p
          className={`font-primary flex items-center justify-between space-x-1 mb-2 text-xs px-2 py-1 rounded-sm ${
            percentage > 0 ? "text-golden-primary" : "text-red-500"
          } ${percentage > 0 ? "bg-golden-primary/20" : "bg-red-200"}`}
        >
          <span>{percentage}%</span>{" "}
          {percentage > 0 ? <IoIosTrendingUp /> : <IoTrendingDownOutline />}
        </p>
      </div>
      <p className="font-primary font-semibold text-[26px] sm:text-[32px] text-dark-primary my-3">
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
