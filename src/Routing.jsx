import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar";

const Routing = () => {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </Sidebar>
    </>
  );
};

export default Routing;
