import { render, screen } from "@testing-library/react";
import SummaryCard from "../../Components/SummaryCard";
import { test, describe, expect } from "@jest/globals";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

describe("Test for Checkout Button", () => {
  test("should disable the checkout button when cart empty", async () => {
    const mockStore = configureStore([]);
    const initialState = {
      cart: {
        items: [],
      },
    };
    let store;

    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <SummaryCard />
        </MemoryRouter>
      </Provider>
    );

    const continueBtn = screen.getByRole("button", {
      name: /checkout/i,
    });

    expect(continueBtn).toBeDisabled();
  });

  test("should navigate to checkout page on click of continue", async () => {
    const mockStore = configureStore([]);
    const initialState = {
      cart: {
        items: [
          {
            id: 1,
            title: "iPhone 9",
            price: 549,
            brand: "Apple",
            thumbnail:
              "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
            quantity: 3,
          },
        ],
      },
    };
    let store;

    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <SummaryCard />
        </MemoryRouter>
      </Provider>
    );

    const continueBtn = screen.getByRole("button", {
      name: /checkout/i,
    });

    expect(continueBtn).not.toBeDisabled();
  });
});
