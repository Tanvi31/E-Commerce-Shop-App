import { render, fireEvent } from "@testing-library/react";
import { test, describe, expect, jest } from "@jest/globals";
import CartItem from "../../Components/CartItem";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useDispatch } from "react-redux";
import { removeItem } from "../../store/slices/cartSlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("CartItem Component", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

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
      ],
    },
  };
  let store;
  store = mockStore(initialState);
  test("renders cart item correctly", () => {
    const item = store.getState().cart.items[0];
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );
    expect(getByText("iPhone 9")).toBeInTheDocument();
    expect(getByText(/₹549/i)).toBeInTheDocument();
    expect(getByText(/Apple/i)).toBeInTheDocument();
    expect(getByAltText("product-img")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });

  test("dispatches removeItem action when Remove button is clicked", () => {
    const item = store.getState().cart.items[0];
    const { getByText } = render(<CartItem item={item} />);

    fireEvent.click(getByText("Remove"));

    expect(mockDispatch).toHaveBeenCalledWith(removeItem(1));
  });
});
