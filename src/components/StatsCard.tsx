import React from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { IoTrendingDownOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
interface IProps {
  title: string;
  value: number;
  icon: IconType;
  percentage: number;
  selectedMonth: { label: string; value: string };
}
const StatsCard = ({
  title,
  value,
  icon: Icon,
  percentage,
  selectedMonth,
}: IProps) => {
  return (
    <div className="bg-[#FAFAFA] px-4 py-3 rounded-lg w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-16px)] shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-3 font-semibold text-base">
          <span className="bg-gray-100 rounded-lg h-[40px] w-[40px] flex items-center justify-center">
            <Icon className="text-2xl text-purple-500" />
          </span>
          <p className="font-primary text-gray-primary flex flex-col leading-5">
            <span className="text-[10px]">{selectedMonth.label}</span>
            <span className="capitalize">{title}</span>
          </p>
        </div>
        <p
          className={`font-primary flex items-center justify-between space-x-1 mb-2 text-xs px-1 text-[10px] py-1 rounded-sm ${
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
