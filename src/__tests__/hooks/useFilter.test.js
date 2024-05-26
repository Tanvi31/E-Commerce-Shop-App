import useFilters from "../../hooks/useFilters";
import { test, describe, expect, jest } from "@jest/globals";

describe("useFilters", () => {
  test("should handle category change correctly", () => {
    const setSelectedCategories = jest.fn();

    const initialSelectedCategories = ["category1", "category2"];

    const mockEventChecked = { target: { checked: true, value: "category3" } };

    const { handleCategoryChange } = useFilters({
      selectedCategories: initialSelectedCategories,
      setSelectedCategories,
    });
    handleCategoryChange(mockEventChecked);

    expect(setSelectedCategories).toHaveBeenCalledWith([
      ...initialSelectedCategories,
      "category3",
    ]);
  });

  test("should handle rating change correctly", () => {
    const setRatingFilter = jest.fn();

    const mockEventChecked = { target: { checked: true, value: "4" } };

    const { handleRatingChange } = useFilters({
      setRatingFilter,
    });
    handleRatingChange(mockEventChecked);

    expect(setRatingFilter).toHaveBeenCalledWith("4");
  });

  test("should handle reset correctly", () => {
    const setSelectedCategories = jest.fn();
    const setRatingFilter = jest.fn();
    const setFilterByPrice = jest.fn();

    // Call resetHandler
    const { resetHandler } = useFilters({
      setSelectedCategories,
      setRatingFilter,
      setFilterByPrice,
    });
    resetHandler();

    // Expect setSelectedCategories, setRatingFilter, and setFilterByPrice to be called with the correct values
    expect(setSelectedCategories).toHaveBeenCalledWith([]);
    expect(setRatingFilter).toHaveBeenCalledWith(null);
    expect(setFilterByPrice).toHaveBeenCalledWith(null);
  });
});
