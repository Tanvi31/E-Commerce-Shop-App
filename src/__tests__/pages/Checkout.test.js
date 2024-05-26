import { expect, test, describe, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Checkout from "../../Pages/Checkout";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { useState } from "react";

describe("Checkout Page Test", () => {
  const mockStore = configureStore([]);
  const initialState = {
    cart: {
      items: [
        {
          id: 1,
          title: "iPhone 9",
          price: 549,
          brand: "Apple",
          thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
          quantity: 3,
        },
        {
          id: 2,
          title: "iPhone X",
          price: 899,
          brand: "Apple",
          thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
          quantity: 4,
        },
      ],
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("Checkout Page Renders", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/checkout"]}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const heading = screen.getByRole("heading", { name: "Checkout" });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText("iPhone 9")).toBeInTheDocument();
    expect(screen.getByText("iPhone X")).toBeInTheDocument();
  });
});
