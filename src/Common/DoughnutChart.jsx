import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({data}) => {
  // Sample data for the doughnut chart
  const dataChart = {
    // labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        data: data, // Sample data values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Sample colors
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h2>Doughnut Chart Example</h2>
      <Doughnut data={dataChart} />
    </div>
  );
};

export default DoughnutChart;

