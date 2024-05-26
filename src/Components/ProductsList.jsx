import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";

function ProductsList({
  productsList,
  totalCount,
  isLoading,
  page,
  setPage,
  selectedCategories,
  setFilterByPrice,
}) {
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleSort = (e) => {
    setFilterByPrice(e.target.value);
  };

  return (
    <div className="w-3/4 min-h-screen">
      <div className="flex flex-col items-end">
        <div className="py-1 px-2 border border-solid border-black">
          <label className="text-gray-500 text-xs" htmlFor="products">
            Sort By
          </label>
          <select
            name="products"
            id="products"
            onChange={(e) => handleSort(e)}
            className="font-bold focus:outline-none"
          >
            <option value="general">Popular</option>
            <option value="low">Lowest Discount</option>
            <option value="high">Highest Discount</option>
          </select>
        </div>
        <div className="pt-2">
          <p className="text-xs">{`Showing ${totalCount} Products`}</p>
        </div>
      </div>
      <ProductCards productsList={productsList} isLoading={isLoading} />
      {selectedCategories.length > 0 ? (
        ""
      ) : (
        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          page={page}
        />
      )}
    </div>
  );
}

export default ProductsList;
