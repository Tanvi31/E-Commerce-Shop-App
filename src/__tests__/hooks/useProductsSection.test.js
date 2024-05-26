import { test, describe, expect, jest, beforeEach } from "@jest/globals";
import useProductsSection from "../../hooks/useProductsSection";
import * as React from "react";
import { renderHook, act } from "@testing-library/react";

const mockProductData = {
  products: [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/1/1.jpg",
        "https://cdn.dummyjson.com/product-images/1/2.jpg",
        "https://cdn.dummyjson.com/product-images/1/3.jpg",
        "https://cdn.dummyjson.com/product-images/1/4.jpg",
        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      ],
    },
  ],
  total: 1,
  skip: 0,
  limit: 5,
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Product Section Hook Tests", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("fetchProducts", async () => {
    const useStateSpy = jest.spyOn(React, "useState");
    const setCategories = jest.fn();
    const setProductsList = jest.fn();
    useStateSpy.mockImplementation((categories) => [categories, setCategories]);
    useStateSpy.mockImplementation((productsList) => [
      productsList,
      setProductsList,
    ]);
    fetch.mockResponse(JSON.stringify(["smartphones", "laptops"]));
    fetch.mockResponse(JSON.stringify(mockProductData));

    const { result } = renderHook(useProductsSection);
    expect(result.current.categories).toEqual([]);

    await act(() => result.current.fetchCategories());

    expect(result.current.filteredProducts).toEqual([
      {
        brand: "Apple",
        category: "smartphones",
        description: "An apple mobile which is nothing like apple",
        discountPercentage: 12.96,
        id: 1,
        images: [
          "https://cdn.dummyjson.com/product-images/1/1.jpg",
          "https://cdn.dummyjson.com/product-images/1/2.jpg",
          "https://cdn.dummyjson.com/product-images/1/3.jpg",
          "https://cdn.dummyjson.com/product-images/1/4.jpg",
          "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        ],
        price: 549,
        rating: 4.69,
        stock: 94,
        thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        title: "iPhone 9",
      },
    ]);
  });
});
