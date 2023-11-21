import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ data, labels, name = "Pass Name Prop" }) => {
  // Sample data for the doughnut chart
  const dataChart = {
    labels: data?.map((e, i) => name + "-" + (i + 1)),
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
      <Doughnut data={dataChart} />
    </div>
  );
};

export default DoughnutChart;
