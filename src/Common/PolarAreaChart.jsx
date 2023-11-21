import React from "react";
import { PolarArea } from "react-chartjs-2";

const PolarAreaChart = ({ data, labels, name = "Pass Name Prop" }) => {
  // Sample data for the polar area chart
  const chartData = {
    labels: data?.map((e, i) => name + "-" + (i + 1)),
    datasets: [
      {
        data: data, // Sample data values
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ], // Sample colors
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
    },
  };

  return (
    <div>
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PolarAreaChart;
