import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import {
  countriesData,
  sectorData,
  sourceData,
  topicsData,
} from "../Common/global";
import LineChart from "../Common/LineChart";
import { getBaseUrl } from "../Common/utils";
import axios from "axios";
import BarChart from "../Common/BarChart";
import Loader from "../Common/Loader";
import RadarChart from "../Common/RadarChart";
import PolarAreaChart from "../Common/PolarAreaChart";

const Filters = () => {
  // filter: filter Options Data,
  // data: filtered data,
  // selected: selected option of filter,
  // key:  example "country" / topic
  // chart_type: type of a chart

  // IF NEED A NEW FILTER ADD THE NEW OBJECT IN THE FILTER STATE & EVRYTHING UPDATES DYNAMICALLY
  const [filter, setFilter] = useState({
    country: {
      filter: countriesData,
      data: [],
      selected: countriesData[0]?.value || null,
      key: "country",
      chart_type: "line",
      loading: true,
    },
    topic: {
      filter: topicsData,
      data: [],
      selected: topicsData[0]?.value || null,
      key: "topic",
      chart_type: "bar",
      loading: true,
    },
    source: {
      filter: sourceData,
      data: [],
      selected: sourceData[0]?.value || null,
      key: "source",
      chart_type: "radar",
      loading: true,
    },
    sector: {
      filter: sectorData,
      data: [],
      selected: sectorData[0]?.value || null,
      key: "sector",
      chart_type: "polar",
      loading: true,
    },
  });
  console.log("🚀 ~ file: Filters.jsx:45 ~ Filters ~ filter:", filter);

  // NAME   :=>   KEY NAME FILTER , EXAMLE - COUNTRY , TOPIC , SOURCE
  // FILTER :=>   FILTER DATA AS PER THE FILTER VALUE
  // THIS FUNCTION WILL CALL THE API AS PER THE NAME/KEY OF FILTER , & UPDATES THE VALUE IN THE FILTER STATE OF KEY DATA
  const getFilteredData = async (name, filter) => {
    try {
      const res = await axios.get(
        getBaseUrl() + `filter/${name}?limit=${10}&filter=${filter}`
      );
      if (res.status === 200) {
        setTimeout(() => {
          setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: {
              ...prevFilter?.[name],
              data: res.data,
              loading: false,
            },
          }));
        }, 1000);
      }
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
    }
  };

  useEffect(() => {
    // Loop through the keys and call getData for each 'selected' property
    Object.keys(filter).forEach(async (key) => {
      await getFilteredData(key, filter[key]?.selected);
    });
  }, []);

  const renderChart = (key) => {
    let type = filter?.[key].chart_type;
    let chartObj = {
      line: (
        <LineChart
          data={filter?.[key]?.data?.map((e) => e?.intensity)}
          name={key}
        />
      ),
      bar: (
        <BarChart
          data={filter?.[key]?.data?.map((e) => e?.intensity)}
          name={key}
        />
      ),
      radar: (
        <RadarChart
          data={filter?.[key]?.data?.map((e) => e?.relevance)}
          name={key}
        />
      ),
      polar: (
        <PolarAreaChart
          data={filter?.[key]?.data?.map((e) => e?.intensity)}
          name={key}
        />
      ),
    };

    if (chartObj[type]) {
      return chartObj[type];
    } else {
      return <div>No Type of Chart Matched / defined</div>;
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <text className="text-2xl text-bold text-primary">Filters Feature</text>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {Object.keys(filter).map((key, index) => {
          return (
            <div
              key={key + "-" + index}
              className={
                "border border-2 shadow-lg rounded-2xl w-full h-full p-2 bg-white rounded-2xl max-h-[100%]"
              }
            >
              {filter?.[key]?.loading === true ? (
                <div className="flex flex-col justify-center items-center p-2 w-full h-full min-h-[300px]">
                  <p>Loading</p>
                  <Loader type="cylon" size={50} color={"#7367f0"} />
                </div>
              ) : (
                <>
                  <div className="flex flex-col justify-between items-start w-[100%]">
                    <p className="text-xl mb-4">
                      <span className="text-bold text-primary text-2xl text-underline">
                        {key}
                      </span>{" "}
                      data of {filter?.[key]?.selected}
                    </p>
                    <Select
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "grey" : "#26d6eb",
                        }),
                      }}
                      className="w-[50%] mb-4 shadow-lg"
                      onChange={(selectedOption) => {
                        setFilter((prevFilter) => ({
                          ...prevFilter,
                          [key]: {
                            ...prevFilter?.[key],
                            selected: selectedOption.value,
                            loading: true,
                          },
                        }));
                        (async () => {
                          await getFilteredData(key, selectedOption.value);
                        })();
                      }}
                      options={filter?.[key]?.filter}
                      value={
                        {
                          value: filter?.[key]?.selected,
                          label: filter?.[key]?.selected,
                        } || null
                      }
                    />
                  </div>
                  <div>{renderChart(key)}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
