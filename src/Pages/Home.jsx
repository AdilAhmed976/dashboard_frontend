import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Common/Loader";
import BarChart from "../Common/BarChart";
import LineChart from "../Common/LineChart";
import { getBaseUrl } from "../Common/utils";
import RadarChart from "../Common/RadarChart";
import PolarAreaChart from "../Common/PolarAreaChart";
import PaginationButton from "../Components/PaginationButton";
import { countriesData, sourceData, topicsData } from "../Common/global";
import Filters from "../Components/Filters";

const Home = () => {
  const [allData, setAllData] = useState(null);

  const [likelihood, setLikelihood] = useState(null);
  const [relevance, setRelevance] = useState(null);
  const [intensity, setIntensity] = useState(null);
  const [country, setCountry] = useState(null);
  const [topics, setTopics] = useState(null);
  const [region, setRegion] = useState(null);

  const stateFunctions = {
    likelihood: (value) => setLikelihood(value),
    relevance: (value) => setRelevance(value),
    intensity: (value) => setIntensity(value),
    // year: (value) => setYear(value),
    country: (value) => setCountry(value),
    topics: (value) => setTopics(value),
    region: (value) => setRegion(value),
  };

  const [pagination, setPagination] = useState({
    likelihood: 1,
    relevance: 1,
    intensity: 1,
    year: 1,
    country: 1,
    topics: 1,
    region: 1,
  });

  const getData = async () => {
    try {
      const res = await axios.get(getBaseUrl());
      if (res.status === 200) {
        setTimeout(() => {
          setAllData(res?.data);
          setLikelihood(res?.data?.map((r) => r?.likelihood));
          setRelevance(res?.data?.map((r) => r?.relevance));
          setIntensity(res?.data?.map((r) => r?.intensity));
          setCountry(res?.data?.map((r) => r?.country));
          setTopics(res?.data?.map((r) => r?.topic));
          setRegion(res?.data?.map((r) => r?.region));
        }, 1000);
      }
    } catch (error) {}
  };

  const handlePrev = (name) => {
    if (!name || pagination?.[name] <= 1) return;
    let keys = Object.keys(pagination);

    if (keys.includes(name)) {
      setPagination((prev) => {
        return { ...prev, [name]: prev?.[name] - 1 };
      });
      (async () => {
        try {
          const res = await axios.get(
            getBaseUrl() + `${name}/100?page=${pagination?.[name] - 1}`
          );
          if (res.status === 200) {
            if (!stateFunctions?.[name]) return;
            stateFunctions?.[name](res.data?.map((r) => r?.[name]));
          }
        } catch (error) {}
      })();
    }
  };
  const handleNext = (name) => {
    if (!name || pagination?.[name] >= 10) return;
    let keys = Object.keys(pagination);

    if (keys.includes(name)) {
      setPagination((prev) => {
        return { ...prev, [name]: prev?.[name] + 1 };
      });
      (async () => {
        try {
          const res = await axios.get(
            getBaseUrl() + `${name}/100?page=${pagination?.[name] + 1}`
          );
          if (res.status === 200) {
            if (!stateFunctions?.[name]) return;
            stateFunctions?.[name](res.data?.map((r) => r?.[name]));
          }
        } catch (error) {}
      })();
    }
  };

  useEffect(() => {
    getData(); 
  }, []);
  
  return (
    <div className="p-2 pl-4">
      <div className="grid grid-cols-3 gap-6 p-4">
        {/* Likelihood */}
        <div className="col-span-2 flex">
          {allData?.likelihood?.length === 0 ||
          likelihood?.length === 0 ||
          allData == null ? (
            <div className="flex justify-center items-center p-2 w-full border-2 shadow-lg">
              <Loader type="cylon" />
            </div>
          ) : (
            <div className="border-2 p-2 rounded-2xl shadow-lg w-full h-full">
              <p className="text-2xl mb-4">Likelihood data.</p>
              <LineChart data={likelihood} name="Likelihood" />
              <PaginationButton
                pagination={pagination}
                handlePrev={handlePrev}
                handleNext={handleNext}
                name={"likelihood"}
              />
            </div>
          )}
        </div>

        {/* Relevance */}
        <div className="col-span-1 flex">
          {allData?.relevance?.length === 0 ||
          relevance?.length === 0 ||
          allData == null ? (
            <div className="flex justify-center items-center p-2 w-full h-full border-2 shadow-lg">
              <Loader type="cylon" />
            </div>
          ) : (
            <div className="p-2 rounded-2xl border-2 border-black-800 shadow-lg w-full h-full">
              <p className="text-2xl mb-4">Relevance</p>
              <PolarAreaChart data={relevance} name={"relevance"} />
              <PaginationButton
                pagination={pagination}
                handlePrev={handlePrev}
                handleNext={handleNext}
                name={"relevance"}
              />
            </div>
          )}
        </div>

        {/* Intensity */}
        <div className="col-span-1 flex">
          {allData?.intensity?.length === 0 ||
          intensity?.length === 0 ||
          allData == null ? (
            <div className="flex justify-center items-center p-2 w-full h-full border-2 shadow-lg">
              <Loader />
            </div>
          ) : (
            <div className="p-2 border-2 shadow-lg rounded-2xl w-full h-full">
              <p>Intensity</p>
              <RadarChart data={intensity} name={"intensity"} />
              <PaginationButton
                pagination={pagination}
                handlePrev={handlePrev}
                handleNext={handleNext}
                name={"intensity"}
              />
            </div>
          )}
        </div>

        {/* Year */}
        <div className="col-span-2 flex">
          {allData?.year?.length === 0 || allData == null ? (
            <div className="flex justify-center items-center p-2 w-full h-full border-2 shadow-lg min-h-90">
              <Loader type="cylon" />
            </div>
          ) : (
            <div className="p-2 border-2 shadow-lg rounded-2xl w-full h-full ">
              <p>Year</p>
              <BarChart
                data={allData?.map((r) => r?.relevance)}
                name={"year"}
              />
            </div>
          )}
        </div>
      </div>

      <Filters />
    </div>
  );
};

export default Home;
