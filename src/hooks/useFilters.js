const useFilters = ({
  selectedCategories,
  setSelectedCategories,
  setRatingFilter,
  setFilterByPrice,
}) => {
  const handleCategoryChange = (e) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, e.target.value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((filterTag) => filterTag !== e.target.value)
      );
    }
  };

  const handleRatingChange = (e) => {
    if (e.target.checked) {
      setRatingFilter(e.target.value);
    } else {
      setRatingFilter("");
    }
  };

  const resetHandler = () => {
    setSelectedCategories([]);
    setRatingFilter(null);
    setFilterByPrice(null);
  };

  return {
    handleCategoryChange,
    handleRatingChange,
    resetHandler,
  };
};

export default useFilters;
