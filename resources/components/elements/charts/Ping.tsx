import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Pings {
  [key: string]: number;
}
interface ArgsProps {
  label: string;
  color: string;
  data: string;
}
interface LineChartProps {
  pings: Pings | null;
  args: ArgsProps[];
  className?: string
}

const PingLineChart: React.FC<LineChartProps> = ({ className, pings, args }) => {
  if (!pings) return;
  const [chartData, setChartData] = useState<any>({
    labels: new Array(10).fill(''),
    datasets: args.map((arg) => ({
      label: arg.label,
      fill: false,
      borderColor: arg.color,
      data: new Array(10).fill(0),
    })),
  });

  useEffect(() => {
    setChartData((prevData: any) => {
      const updatedDatasets = args.map((arg, index) => {
        const newData = [...prevData.datasets[index].data.slice(1), pings[arg.data as keyof Pings]];
        return {
          ...prevData.datasets[index],
          data: newData,
        };
      });

      return {
        ...prevData,
        datasets: updatedDatasets,
      };
    });
  }, [pings, args]);


  return (
    <div className={className}>
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default PingLineChart;
