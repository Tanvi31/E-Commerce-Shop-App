import { getByText, render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe } from "@jest/globals";
import Cart from "../../Pages/Cart";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import configureStore from "redux-mock-store";

describe("Cart Page Tests", () => {
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

  test("should render the cart items", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <Routes>
            <Route path={"/cart"} element={<Cart />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("iPhone 9")).toBeInTheDocument();
    expect(screen.getByText("iPhone X")).toBeInTheDocument();
  });

  test("toggleAccordion function works as expected", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <Routes>
            <Route path={"/cart"} element={<Cart />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const faqItem = getByText("Return Policy");

    fireEvent.click(faqItem);

    expect(getByText(/Lorem ipsum/i)).toBeInTheDocument();
  });
});
