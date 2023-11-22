import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { countriesData, sourceData, topicsData } from "../Common/global";
import LineChart from "../Common/LineChart";
import { getBaseUrl } from "../Common/utils";
import axios from "axios";
import BarChart from "../Common/BarChart";

const Filters = () => {
  const [filter, setFilter] = useState({
    country: {
      filter: countriesData,
      data: [],
      selected: countriesData[0]?.value || null,
      key: "country",
      chart_type: "line",
    },
    topic: {
      filter: topicsData,
      data: [],
      selected: topicsData[0]?.value || null,
      key: "topic",
      chart_type: "bar",
    },
    source: {
      filter: sourceData,
      data: [],
      selected: sourceData[0]?.value || null,
      key: "source",
      chart_type: "line",
    },
  });
  console.log("🚀 ~ file: Filters.jsx:29 ~ Filters ~ filter:", filter);

  const getFilteredData = async (name, filter) => {
    try {
      const res = await axios.get(
        getBaseUrl() + `filter/${name}?limit=${10}&filter=${filter}`
      );
      if (res.status === 200) {
        setFilter((prevFilter) => ({
          ...prevFilter,
          [name]: {
            ...prevFilter?.[name],
            data: res.data,
          },
        }));
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
          data={filter?.[key]?.data?.map((e) => e.intensity)}
          name={key}
        />
      ),
      bar: (
        <BarChart
          data={filter?.[key]?.data?.map((e) => e.intensity)}
          name={key}
        />
      ),
    };

    if (chartObj[type]) {
      return chartObj[type];
    } else {
      <div>No Type of Chart Matched / defined</div>;
    }
  };

  return (
    <div className="p-4">
      <text className="text-2xl mb-4f">Filters</text>
      <div className="grid grid-cols-2 gap-6">
        {Object.keys(filter).map((key, index) => {
          return (
            <div
              key={key + "-" + index}
              className={
                index === 2
                  ? "col-span-2"
                  : "col-span-1" +
                    " border border-2 min-h-90 shadow-lg rounded-2xl w-full h-full p-2"
              }
            >
              <div className="flex justify-between items-center border-2 w-[100%]">
                <p>Country{key}</p>
                <Select
                  className="w-[30%]"
                  defaultValue={filter?.[key]?.filter[0] || null}
                  onChange={(selectedOption) => {
                    setFilter((prevFilter) => ({
                      ...prevFilter,
                      [key]: {
                        ...prevFilter?.[key],
                        selected: selectedOption.value,
                      },
                    }));
                    (async () => {
                      await getFilteredData(key, selectedOption.value);
                    })();
                  }}
                  options={filter?.[key]?.filter}
                />
              </div>
              <div>{renderChart(key)}</div>
            </div>
          );
        })}

        {/* Country Filter */}
        {/* <div className="col-span-1 border border-2 min-h-90 shadow-lg rounded-2xl w-full h-full p-2">
          <div className="flex justify-between items-center border-2 w-[100%]">
            <p>Topic</p>
            <Select
              className="w-[30%]"
              defaultValue={filter.topic?.filter[0] || null}
              onChange={(selectedOption) => {
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  topic: {
                    ...prevFilter.topic,
                    selected: selectedOption.value,
                  },
                }));
                (async () => {
                  await getFilteredData(
                    filter?.topic?.key,
                    selectedOption.value
                  );
                })();
              }}
              options={filter.topic?.filter}
            />
          </div>
          <div>
            <LineChart
              data={filter?.topic?.data?.map((e) => e.relevance)}
              name="Likelihood"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Filters;
