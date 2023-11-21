import React from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = ({ data, name = "pass props name" }) => {
  const chartData = {
    labels: data,
    datasets: [
      {
        // label: name,
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        // borderColor: "#7064e8",
        borderWidth: 2,
      },
      // You can add more datasets if needed
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...data),
        pointLabels: {
          display: false, // Hide the labels at the data points
        },
        ticks: {
          display: true, // Hide the scale labels (if any)
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
    },
  };

  return (
    <div className="">
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
