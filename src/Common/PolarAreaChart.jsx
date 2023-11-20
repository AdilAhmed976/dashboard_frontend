import React from "react";
import { PolarArea } from "react-chartjs-2";

const PolarAreaChart = () => {
  // Sample data for the polar area chart
  const data = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    datasets: [
      {
        data: [20, 30, 25, 15, 10], // Sample data values
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

  return (
    <div>
      <h2>Polar Area Chart Example</h2>
      <PolarArea data={data} />
    </div>
  );
};

export default PolarAreaChart;
