import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Common/Loader";
import { data } from "../Common/global";
import BarChart from "../Common/BarChart";
import LineChart from "../Common/LineChart";
import { getBaseUrl } from "../Common/utils";
import RadarChart from "../Common/RadarChart";
import PolarAreaChart from "../Common/PolarAreaChart";
import PaginationButton from "../Components/PaginationButton";

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
          setAllData(res.data);
        }, 0);
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
    // getData();
    setTimeout(() => {
      setAllData(data);
      setLikelihood(data?.map((r) => r?.likelihood));
      setRelevance(data?.map((r) => r?.relevance));
      setIntensity(data?.map((r) => r?.intensity));
      setCountry(data?.map((r) => r?.country));
      setTopics(data?.map((r) => r?.topic));
      setRegion(data?.map((r) => r?.region));
    }, 1000);
  }, []);
  return (
    <div className="p-2 pl-4 w-[100%] border-2 border-red-800">
      <div className="flex gap-4">
        {/* Likelihood */}
        {allData?.likelihood?.length === 0 ||
        likelihood?.length === 0 ||
        allData == null ? (
          <div className="flex justify-center items-center p-2 w-[70%] h-[100%]">
            <Loader type="cylon" />
          </div>
        ) : (
          <div className="border-2 p-2 w-[70%] rounded-2xl h-[100%] shadow-lg">
            <p className="text-2xl text-white mb-4">Likelihood data.</p>
            <LineChart data={likelihood} name="Likelihood" />
            <PaginationButton
              pagination={pagination}
              handlePrev={handlePrev}
              handleNext={handleNext}
              name={"likelihood"}
            />
          </div>
        )}

        {/* Relevance */}
        {allData?.relevance?.length === 0 ||
        relevance?.length === 0 ||
        allData == null ? (
          <div className="flex justify-center items-center p-2 border-2 w-[40%] h-[100%]">
            <Loader type="cylon" />
          </div>
        ) : (
          <div className="p-2 w-[40%] h-[100%] rounded-2xl border-2 border-black-800 shadow-lg">
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

      <div className="flex gap-6">
        {/* // Intensity */}
        {allData?.intensity?.length === 0 ||
        intensity?.length === 0 ||
        allData == null ? (
          <div className="flex justify-center items-center p-2 border-2 w-[100%] h-[100%]">
            <Loader />
          </div>
        ) : (
          <div className="p-2 w-[40%] h-[100%] border-2 shadow-lg rounded-2xl bg-indigo-100">
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
      {allData?.year?.length === 0 || allData == null ? (
        <div className="flex justify-center items-center p-2 border-2 w-[100%] h-[100%]">
          <Loader type="cylon" />
        </div>
      ) : (
        <div className="p-2 border-2 w-[100%] h-[100%]">
          <p>Year</p>
          <BarChart
            data={allData?.map((r) => r?.relevance)}
            name={"relevance"}
          />
        </div>
      )}

      {/* <PolarAreaChart data={allData?.map((r) => r.intensity)} />
      <p>Likelihood</p>
      <p>Relevance</p>
      <p>Year</p>
      <p>Country</p>
      <p>Topics</p>
      <p>Region</p>
      <p>City</p>
      <p>{getBaseUrl()}</p> */}
    </div>
  );
};

export default Home;
