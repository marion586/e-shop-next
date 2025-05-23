"use client";

import React from "react";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface BarGraphProps {
  data: GraphData[];
}

type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  console.log(data);

  const labels = data.map((item) => item.day);
  const amounts = data.map((item) => item.totalAmount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sale Amount",
        data: amounts,
        backgroundColor: "rgba(75 ,192 ,192,0.6)",
        borderColor: "rgba(75 ,192 ,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={chartData} options={options}></Bar>;
};

export default BarGraph;
