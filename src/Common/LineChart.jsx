import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data, name = "pass Label" }) => {

  // Helper function to create a linear gradient fill
const createGradientFill = (color1, color2) => {
  const ctx = document.createElement('canvas').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

  const gradientFill = createGradientFill("#7367f0", 'rgba(255, 255, 255, 0)');

  const chartData = {
    labels: data?.map((e, i) => name + "-" + (i + 1)),
    datasets: [
      {
        label: name,
        data: data || [],
        borderWidth: 2,
        fill: true, // Enable fill for the area under the line
        backgroundColor: gradientFill, // Use the gradient as the fill color
        tension: 0.1,
        borderColor: "#7367f0",
      // backgroundColor: "rgb(75, 192, 192)",
      pointStyle: 'circle',
      pointRadius: 6,
      pointHoverRadius: 14
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Set to false to hide the x-axis labels
        ticks: {
          // color: 'red', // Change x-axis label text color
          // font: {
          //   size: 14, // Change x-axis label text size
          // },
        },
      },
      y: {
        display: true, // Set to false to hide the y-axis labels
        ticks: {
          font: {
            size: 16, // Change x-axis label text size
          },
        },
        grid: {
          display: false,
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
    <div className="flex jutsify-center items-center text-white">
      <Line data={chartData} options={options}  />
    </div>
  );
};

export default LineChart;
