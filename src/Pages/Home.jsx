import React, { useEffect, useState } from "react";
import { getBaseUrl } from "../Common/utils";
import DoughnutChart from "../Common/DoughnutChart";
import axios from "axios";
import PolarAreaChart from "../Common/PolarAreaChart";
const Home = () => {
  const [allData, setAllData] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get(getBaseUrl());
      if (res.status === 200) {
        setAllData(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="border-2 p-2 pl-4">
      <p>Intensity</p>
      <DoughnutChart data={allData?.map((r) => r.intensity)} />
      <PolarAreaChart  data={allData?.map((r) => r.intensity)} />
      <p>Likelihood</p>
      <p>Relevance</p>
      <p>Year</p>
      <p>Country</p>
      <p>Topics</p>
      <p>Region</p>
      <p>City</p>
      <p>{getBaseUrl()}</p>
    </div>
  );
};

export default Home;
