import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProductsList from "../../Components/ProductsList";
import { test, describe, expect, jest } from "@jest/globals";
import { Route, MemoryRouter } from "react-router-dom";

describe("ProductsList component", () => {
  const productsList = [
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
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/2/1.jpg",
        "https://cdn.dummyjson.com/product-images/2/2.jpg",
        "https://cdn.dummyjson.com/product-images/2/3.jpg",
        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      ],
    },
  ];
  const totalCount = 3;
  const isLoading = false;
  const page = 1;
  const setPage = jest.fn();
  const selectedCategories = [];
  const setFilterByPrice = jest.fn();

  test("renders products list with pagination", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsList
          productsList={productsList}
          totalCount={totalCount}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          selectedCategories={selectedCategories}
          setFilterByPrice={setFilterByPrice}
        />
      </MemoryRouter>
    );

    expect(getByText("Showing 3 Products")).toBeInTheDocument();
    expect(getByText("iPhone 9")).toBeInTheDocument();
    expect(getByText("iPhone X")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });

  test("calls setPage when next button is clicked", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsList
          productsList={productsList}
          totalCount={totalCount}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          selectedCategories={selectedCategories}
          setFilterByPrice={setFilterByPrice}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Next"));

    expect(setPage).toHaveBeenCalledWith(2);
  });

  test("calls setPage when prev button is clicked", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsList
          productsList={productsList}
          totalCount={totalCount}
          isLoading={isLoading}
          page={2}
          setPage={setPage}
          selectedCategories={selectedCategories}
          setFilterByPrice={setFilterByPrice}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Prev"));

    expect(setPage).toHaveBeenCalledWith(1);
  });

  test("calls setFilterByPrice when sorting option is changed", () => {
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductsList
          productsList={productsList}
          totalCount={totalCount}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          selectedCategories={selectedCategories}
          setFilterByPrice={setFilterByPrice}
        />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText("Sort By"), { target: { value: "low" } });

    expect(setFilterByPrice).toHaveBeenCalledWith("low");
  });
});
