import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, name = "Pass Name Props" }) => {
  // Helper function to create a linear gradient fill
  const createGradientFill = (color1, color2) => {
    const ctx = document.createElement("canvas").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const gradientFill = createGradientFill("#7367f0", "#26d6eb");

  const chartData = {
    labels: data,
    datasets: [
      {
        label: name,
        data: data,
        // backgroundColor: "rgba(75, 192, 192, 0.5)",
        backgroundColor: gradientFill,
        // borderColor: "rgba(75, 192, 192, 1)",
        // borderWidth: 2,
        borderRadius: 25, // Set border radius for all bars
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true, // Set to false to hide the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
    indexAxis: 'y',
  };

  return (
    <div
      // className="max-w-md mx-auto mt-8"
      className="w-full"
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
