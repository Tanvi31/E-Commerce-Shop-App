import React, { useState } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { CiDiscount1 } from "react-icons/ci";

function ProductCards({ productsList, isLoading }) {
  return (
    <>
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="mt-3 py-2 flex flex-wrap gap-4 justify-start">
          {productsList.map((e) => {
            return (
              <div className="w-[30%] h-2/3" key={e.id}>
                <Link to={`/details/${e.id}`}>
                  <div className="w-full h-56">
                    <div className="bg-gray-500 w-full h-full">
                      <img
                        src={e.thumbnail}
                        alt="product-img"
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <h4 className="py-1 font-bold">{e.title}</h4>
                  <div className="flex justify-between">
                    <span>₹{e.price}</span>
                    <span className="flex justify-between items-center gap-1">
                      <CiDiscount1 /> {Number(e.discountPercentage).toFixed(0)}%
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ProductCards;
