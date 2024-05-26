/* eslint-disable react/prop-types */
import { ratingsFilterData } from "../utils/constants";
import useFilters from "../hooks/useFilters";

function Filters({
  categories,
  selectedCategories,
  setSelectedCategories,
  setRatingFilter,
  setFilterByPrice,
}) {
  const { handleCategoryChange, handleRatingChange, resetHandler } = useFilters(
    {
      selectedCategories,
      setSelectedCategories,
      setRatingFilter,
      setFilterByPrice,
    }
  );

  return (
    <div className="w-1/4">
      <div className="py-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl">Filters</span>
          <span
            className="text-gray-500 underline text-sm cursor-pointer"
            onClick={resetHandler}
          >
            Clear Filters
          </span>
        </div>
        <div className="flex flex-col">
          <h4 className="py-3 font-bold">Categories</h4>
          <ul className="max-h-36 overflow-y-auto">
            {categories.map((category) => {
              return (
                <li className="py-1.5 flex items-center" key={category}>
                  <input
                    className="w-5 h-5 rounded-none"
                    type="checkbox"
                    id={category}
                    data-testid={category}
                    name={category}
                    value={category}
                    onChange={(e) => handleCategoryChange(e)}
                  />
                  <label className="pl-2 capitalize" htmlFor={category}>
                    {category}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pt-8">
          <h4 className="font-bold">Price Range</h4>
          <div className="flex gap-2 py-2">
            <button
              className="bg-white text-black border border-black px-3"
              onClick={() => setFilterByPrice("min")}
            >
              Min
            </button>
            <button
              className="bg-white text-black border border-black px-3"
              onClick={() => setFilterByPrice("max")}
            >
              Max
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="pt-3 pb-2 font-bold">Customer Rating</h4>
          <ul>
            {ratingsFilterData.map((e) => {
              return (
                <li className="py-1 flex items-center" key={e.id}>
                  <input
                    className="w-5 h-5 rounded-none"
                    type="checkbox"
                    id={e.id}
                    name={e.name}
                    value={e.name}
                    onChange={handleRatingChange}
                  />
                  <label className="pl-2" htmlFor={e.id}>
                    {e.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Filters;
