import React from "react";

function Pagination({ handleNextPage, handlePrevPage, page }) {
  return (
    <div className="flex justify-end mt-4">
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="mr-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-700 disabled:bg-gray-700"
      >
        Prev
      </button>
      <button
        onClick={() => {
          handleNextPage();
        }}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
