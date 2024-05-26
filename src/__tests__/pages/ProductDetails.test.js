import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, jest, beforeEach, it } from "@jest/globals";
import * as Redux from "react-redux";
import ProductDetails from "../../Pages/ProductDetails";
import { Provider } from "react-redux";
import store from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  selectCartItems,
  incrementQuantity,
  decrementQuantity,
} from "../../store/slices/cartSlice";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 2,
  }),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.spyOn(Redux, "useSelector").mockReturnValue([
  {
    id: 2,
    title: "iPhone X",
    price: 899,
    brand: "Apple",
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    quantity: 1,
  },
]);

window.global.scrollTo = jest.fn();

describe("Product Details Page", () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(
      JSON.stringify({
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
      })
    );
  });

  test("renders loading state initially", async () => {
    render(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );

    const heading = screen.getByText(/Loading.../i);
    expect(heading).toBeInTheDocument();
  });

  it("renders Product Details after data is loaded", async () => {
    render(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );

    await waitFor(() => {
      const heading = screen.getByText("iPhone X");
      expect(heading).toBeInTheDocument();
    });
  });

  test("test add to cart handler", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );

    await waitFor(() => {
      const addToCartBtn = screen.getByText(/Add to cart/i);
      expect(addToCartBtn).toBeInTheDocument();
      fireEvent.click(addToCartBtn);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      addItem({
        id: 2,
        title: "iPhone X",
        price: 899,
        brand: "Apple",
        thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
        quantity: 1,
      })
    );
  });

  test("test quantity increase button", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );

    await waitFor(() => {
      const increaseQuantityBtn = screen.getByText("+");
      expect(increaseQuantityBtn).toBeInTheDocument();
      fireEvent.click(increaseQuantityBtn);
    });

    // Product id is passed, not quantity
    expect(mockDispatch).toHaveBeenCalledWith(incrementQuantity(2));
  });

  test("test quantity decrease button", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );

    await waitFor(() => {
      const decreaseQuantityBtn = screen.getByText("-");
      expect(decreaseQuantityBtn).toBeInTheDocument();
      fireEvent.click(decreaseQuantityBtn);
    });

    // Product id is passed, not quantity
    expect(mockDispatch).toHaveBeenCalledWith(decrementQuantity(2));
  });

  test("test redux store returns cart item", async () => {
    render(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );

    expect(useSelector).toHaveBeenCalledWith(selectCartItems);
  });
});
