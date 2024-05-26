import {
  getTotalQuantity,
  getTotalCartValue,
  fetchProductsApi,
  fetchCategoriesApi,
  fetchProductsByCategoryApi,
} from "../../utils/helper";
import { test, describe, expect, jest } from "@jest/globals";

const cart = [
  {
    id: 1,
    title: "burger",
    price: 200,
    brand: "burger king",
    thumbnail: "",
    quantity: 3,
  },
  {
    id: 2,
    title: "mcGrill burger",
    price: 435,
    brand: "Mcd",
    thumbnail: "",
    quantity: 2,
  },
  {
    id: 3,
    title: "Paneer burger",
    price: 349,
    brand: "Wendys",
    thumbnail: "",
    quantity: 12,
  },
  {
    id: 4,
    title: "Chicken burger",
    price: 432,
    brand: "Smash",
    thumbnail: "",
    quantity: 4,
  },
];

test("cart items give correct quantity", () => {
  expect(getTotalQuantity(cart)).toBe(21);
});

test("cart items give correct quantity", () => {
  expect(getTotalCartValue(cart)).toBe(7386);
});

describe("fetchProductsApi", () => {
  beforeEach(() => {
    // Mock the global fetch function
    window.global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "Product 1" },
            { id: 2, name: "Product 2" },
          ]),
      })
    );
  });

  afterEach(() => {
    // Restore the original fetch function after each test
    window.global.fetch.mockClear();
  });

  test("should fetch products with the correct URL", async () => {
    const page = 2;
    await fetchProductsApi(page);
    expect(window.global.fetch).toHaveBeenCalledWith(
      `https://dummyjson.com/products?limit=9&skip=${(page - 1) * 9}`
    );
  });

  test("should return the expected products", async () => {
    const expectedProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    const result = await fetchProductsApi(2);
    expect(result).toEqual(expectedProducts);
  });
});

describe("fetchCategoriesApi", () => {
  beforeEach(() => {
    // Mock the global fetch function
    window.global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(["Category 1", "Category 2", "Category 3"]),
      })
    );
  });

  afterEach(() => {
    // Restore the original fetch function after each test
    window.global.fetch.mockClear();
  });

  test("should fetch categories with the correct URL", async () => {
    await fetchCategoriesApi();
    expect(window.global.fetch).toHaveBeenCalledWith(
      "https://dummyjson.com/products/categories"
    );
  });

  test("should return the expected categories", async () => {
    const expectedCategories = ["Category 1", "Category 2", "Category 3"];
    const result = await fetchCategoriesApi();
    expect(result).toEqual(expectedCategories);
  });
});

describe("fetchProductsByCategoryApi", () => {
  beforeEach(() => {
    // Mock the global fetch function
    window.global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "Product 1" },
            { id: 2, name: "Product 2" },
          ]),
      })
    );
  });

  afterEach(() => {
    // Restore the original fetch function after each test
    window.global.fetch.mockClear();
  });

  test("should fetch products with the correct category URL", async () => {
    const category = "electronics";
    await fetchProductsByCategoryApi(category);
    expect(window.global.fetch).toHaveBeenCalledWith(
      `https://dummyjson.com/products/category/${category}`
    );
  });

  test("should return the expected products", async () => {
    const expectedProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    const result = await fetchProductsByCategoryApi("electronics");
    expect(result).toEqual(expectedProducts);
  });
});
