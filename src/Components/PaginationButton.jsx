import React from "react";

const PaginationButton = ({ pagination, handleNext, handlePrev, name }) => {
  return (
    <div className="flex justify-between items-center w-[20%]">
      <button
        className="rounded-xl bg-primary text-white px-4 py-1 border border-white"
        onClick={() => handlePrev(name)}
      >
        Prev
      </button>
      {pagination?.[name] ? (
        <text className="p-2 m-2 text-xl bold">{pagination?.[name]}</text>
      ) : (
        <text>Pass Name Prop </text>
      )}
      <button
        className="rounded-xl bg-primary text-white px-4 py-1 border border-white"
        onClick={() => handleNext(name)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
