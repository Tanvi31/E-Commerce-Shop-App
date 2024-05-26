import { test, describe, jest, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import ProductsSection from "../../Components/ProductsSection";
import useProductsSection from "../../hooks/useProductsSection";

jest.mock("../../hooks/useProductsSection", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ProductsSection Component", () => {
  beforeEach(() => {
    // Reset the mock implementation for each test
    useProductsSection.mockReturnValue({
      categories: ["Category1", "Category2"],
      selectedCategories: [],
      setSelectedCategories: jest.fn(),
      setRatingFilter: jest.fn(),
      setFilterByPrice: jest.fn(),
      filteredProducts: [],
      page: 1,
      setPage: jest.fn(),
      totalCount: 0,
      filterByPrice: "",
      isLoading: false,
    });
  });

  test("renders Filters and ProductsList components", () => {
    render(<ProductsSection />);
    screen.debug();

    // Check if Filters component is rendered with correct props
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Category1")).toBeInTheDocument();
    expect(screen.getByText("Category2")).toBeInTheDocument();
    expect(screen.getByText("Customer Rating")).toBeInTheDocument();
    expect(screen.getByText("4⭐&above")).toBeInTheDocument();
    expect(screen.getByText("3⭐&above")).toBeInTheDocument();

    // // Check if ProductsList component is rendered with correct props
    expect(screen.getByText("Sort By")).toBeInTheDocument();
    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
