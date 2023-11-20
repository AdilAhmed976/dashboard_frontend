import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type = "spin", color = "gray", size = 36 }) => {
  return <ReactLoading type={type} color={color} height={size} width={size} />;
};

export default Loader;
