import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, name = "Pass Name Props" }) => {
  const chartData = {
    labels: data?.map((e, i) => name + "-" + (i + 1)),
    datasets: [
      {
        label: name,
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        borderRadius: 15, // Set border radius for all bars
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
    },
    // scales: {
    //   x: {
    //     grid: {
    //       display: false,
    //     },
    //   },
    //   y: {
    //     beginAtZero: true,
    //     grid: {
    //       display: false,
    //     },
    //   },
    // },
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
