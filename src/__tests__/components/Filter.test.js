import { test, describe, expect, jest } from "@jest/globals";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import Filters from "../../Components/Filters"; // Update the path to the Filters component if needed
import useFilters from "../../hooks/useFilters";

// describe("Filters component", () => {
//   const categories = ["Category 1", "Category 2", "Category 3"];
//   const selectedCategories = [];
//   const setSelectedCategories = jest.fn();
//   const setRatingFilter = jest.fn();
//   const setFilterByPrice = jest.fn();

//   test("renders filters correctly", () => {
//     render(
//       <Filters
//         categories={categories}
//         selectedCategories={selectedCategories}
//         setSelectedCategories={setSelectedCategories}
//         setRatingFilter={setRatingFilter}
//         setFilterByPrice={setFilterByPrice}
//       />
//     );

//     // Check if the heading "Filters" is rendered
//     const filtersHeading = screen.getByText("Filters");
//     expect(filtersHeading).toBeInTheDocument();

//     // Check if the "Clear Filters" link is rendered
//     const clearFiltersLink = screen.getByText("Clear Filters");
//     expect(clearFiltersLink).toBeInTheDocument();

//     // Check if the category checkboxes are rendered
//     categories.forEach((category) => {
//       const categoryCheckbox = screen.getByLabelText(category);
//       expect(categoryCheckbox).toBeInTheDocument();
//     });

//     // Check if the "Min" and "Max" buttons for price range are rendered
//     const minPriceButton = screen.getByText("Min");
//     expect(minPriceButton).toBeInTheDocument();
//     const maxPriceButton = screen.getByText("Max");
//     expect(maxPriceButton).toBeInTheDocument();

//     // Check if the customer rating checkboxes are rendered
//     screen.getAllByRole("checkbox").forEach((checkbox) => {
//       expect(checkbox).toBeInTheDocument();
//     });
//   });
// });

jest.mock("../../hooks/useFilters", () => jest.fn());

describe("Filters Functionality", () => {
  const setSelectedCategories = jest.fn();
  const setRatingFilter = jest.fn();
  const setFilterByPrice = jest.fn();
  const mockHandleCategoryChange = jest.fn();
  const mockHandleRatingChange = jest.fn();
  const mockResetHandler = jest.fn();

  beforeEach(() => {
    useFilters.mockReturnValue({
      handleCategoryChange: mockHandleCategoryChange,
      handleRatingChange: mockHandleRatingChange,
      resetHandler: mockResetHandler,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const categories = ["category1", "category2"];

  test("should call resetHandler on Clear Filters click", () => {
    const { getByText } = render(
      <Filters
        categories={categories}
        selectedCategories={[]}
        setSelectedCategories={setSelectedCategories}
        setRatingFilter={setRatingFilter}
        setFilterByPrice={setFilterByPrice}
      />
    );

    fireEvent.click(getByText("Clear Filters"));
    expect(mockResetHandler).toHaveBeenCalled();
  });

  test("should call handleCategoryChange on category checkbox change", () => {
    const { getByTestId } = render(
      <Filters
        categories={categories}
        selectedCategories={[]}
        setSelectedCategories={setSelectedCategories}
        setRatingFilter={setRatingFilter}
        setFilterByPrice={setFilterByPrice}
      />
    );

    const categoryCheckbox = getByTestId("category1");
    expect(categoryCheckbox).toBeInTheDocument();

    fireEvent.click(categoryCheckbox);
    expect(mockHandleCategoryChange).toHaveBeenCalled();
  });

  test('should call setFilterByPrice with "min" on Min button click', () => {
    const { getByText } = render(
      <Filters
        categories={categories}
        selectedCategories={[]}
        setSelectedCategories={setSelectedCategories}
        setRatingFilter={setRatingFilter}
        setFilterByPrice={setFilterByPrice}
      />
    );

    fireEvent.click(getByText("Min"));
    expect(setFilterByPrice).toHaveBeenCalledWith("min");
  });

  test('should call setFilterByPrice with "max" on Max button click', () => {
    const { getByText } = render(
      <Filters
        categories={categories}
        selectedCategories={[]}
        setSelectedCategories={setSelectedCategories}
        setRatingFilter={setRatingFilter}
        setFilterByPrice={setFilterByPrice}
      />
    );

    fireEvent.click(getByText("Max"));
    expect(setFilterByPrice).toHaveBeenCalledWith("max");
  });
});
