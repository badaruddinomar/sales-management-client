import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  offset?: number[];
}
export const PieChart = ({
  labels,
  data,
  backgroundColor,
  offset,
}: PieChartProps) => {
  const pieChartData: ChartData<"pie", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 1,
        offset,
      },
    ],
  };

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Pie data={pieChartData} options={pieChartOptions} />;
};
