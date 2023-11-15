import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sidebarMenus } from "../Common/global";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex">
      <div
        className={` ${
          isSidebarOpen ? "w-72" : "w-20 "
        } h-screen p-5 pt-8 sticky top-0 duration-300`}
      >
        <button
          className={`absolute flex justify-center align-center cursor-pointer right-3 top-3 p-2 border-2 rounded-full border border-solid text-color-primary ${!isSidebarOpen}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <FaChevronLeft color={"#7064e8"} />
          ) : (
            <FaChevronRight color={"#7064e8"} />
          )}
        </button>
        <div className="flex gap-x-4 items-center border border-solid border-transparent border-opacity-50">
          <h1
            className={`origin-left font-medium text-xl duration-200 text-primary-color ${
              !isSidebarOpen && "scale-0"
            }`}
          >
            BlackCoffer
          </h1>
        </div>
        <ul className="pt-6">
          {sidebarMenus?.map((Menu, index) => (
            <button
              key={index}
              className={`flex w-[100%] align-center p-2 rounded-md border-2 cursor-pointer hover:bg-primary hover:text-black text-gray-500 text-sm items-center mb-3
              ${isSidebarOpen ? "" : "justify-center"}`}
              onClick={() => navigate(Menu.src)}
            >
              {Menu.icon}
              <p
                className={`${
                  !isSidebarOpen && "hidden"
                } origin-left text-lg duration-200 ml-2`}
              >
                {Menu.title}
              </p>
            </button>
          ))}
        </ul>
      </div>
      <div className="w-full"> {children}</div>
    </div>
  );
};

export default Sidebar;
