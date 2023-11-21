import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data, name = "pass Label" }) => {
  const chartData = {
    labels: data?.map((e, i) => name + "-" + (i + 1)),
    datasets: [
      {
        label: name,
        data: data,
        fill: false,
        // borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 192)",
      pointStyle: 'circle',
      pointRadius: 4,
      pointHoverRadius: 10
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Set to false to hide the x-axis labels
      },
      y: {
        display: true, // Set to false to hide the y-axis labels
      },
    },
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
    },
  };

  return (
    <div className="border-2 flex jutsify-center items-center">
      <Line data={chartData} options={options}  />
    </div>
  );
};

export default LineChart;
