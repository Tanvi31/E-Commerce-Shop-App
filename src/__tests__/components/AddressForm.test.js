import { test, describe, expect, jest } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";
import { Route, MemoryRouter } from "react-router-dom";
import AddressForm from "../../Components/AddressForm";
import { Provider } from "react-redux";

describe("Shipping Information (Address Form) Test", () => {
  const handleOnSubmitMock = jest.fn();
  test("Continue button disabled when cart empty", async () => {
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
        <MemoryRouter initialEntries={["/checkout"]}>
          <AddressForm />
        </MemoryRouter>
      </Provider>
    );
    const continuePaymentBtn = screen.getByRole("button", {
      name: /payment/i,
    });

    expect(continuePaymentBtn).toBeDisabled();
  });
  test("Should Continue to Payment Info Form when Cart has Items", async () => {
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
        <MemoryRouter initialEntries={["/checkout"]}>
          <AddressForm />
        </MemoryRouter>
      </Provider>
    );
    const continuePaymentBtn = screen.getByRole("button", {
      name: /payment/i,
    });

    expect(continuePaymentBtn).not.toBeDisabled();
  });
  test("Should Show Error Messages when Empty Form Submitted", async () => {
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
        <MemoryRouter initialEntries={["/checkout"]}>
          <AddressForm />
        </MemoryRouter>
      </Provider>
    );
    const continuePaymentBtn = screen.getByRole("button", {
      name: /payment/i,
    });
    await userEvent.click(continuePaymentBtn);
    const alertElement = screen.getAllByRole("alert");
    expect(alertElement.length).toBe(5);
  });
  test("should fill the forms and submit it", async () => {
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
        <MemoryRouter initialEntries={["/checkout"]}>
          <AddressForm />
        </MemoryRouter>
      </Provider>
    );

    const firstName = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstName, { target: { value: "John" } });

    const lastName = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastName, { target: { value: "Doe" } });

    const address = screen.getByPlaceholderText("Address");
    fireEvent.change(address, { target: { value: "NW New York" } });

    const apartment = screen.getByPlaceholderText(/Apartment/i);
    fireEvent.change(apartment, { target: { value: "81C" } });

    const city = screen.getByPlaceholderText("City");
    fireEvent.change(city, { target: { value: "New York" } });

    screen.getByRole("form").onsubmit = handleOnSubmitMock;
    screen.debug();
    // fireEvent.click(screen.getByRole("form"));
    // expect(handleOnSubmitMock).toHaveBeenCalled();
  });
});
