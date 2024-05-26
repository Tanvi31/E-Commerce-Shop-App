import React from "react";
import { productsFetchLimit } from "../utils/constants";

function Skeleton() {
  return (
    <div role="status" className="w-[30%] h-2/3 flex flex-col gap-2">
      <div className="w-full h-56">
        <div className="bg-gray-500 w-full h-full"></div>
      </div>
      <h4 className="bg-gray-500 py-2"></h4>
      <span className="bg-gray-500 py-2"></span>
    </div>
  );
}

const Shimmer = () => {
  return (
    <div className="mt-3 py-2 flex flex-wrap gap-4 justify-end">
      {[...Array(productsFetchLimit)].map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
};

export default Shimmer;
