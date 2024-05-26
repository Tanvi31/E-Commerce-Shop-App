import { test, describe, expect, jest } from "@jest/globals";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";
import { Route, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import PaymentForm from "../../Components/PaymentForm";
import { orderPlaced } from "../../store/slices/ordersSlice";

describe("Payment Details (Payment Form) Test", () => {
  test("Continue button disabled when cart empty", async () => {
    const mockStore = configureStore([]);
    const initialState = {
      cart: {
        items: [],
      },
      order: {
        address: [],
      },
    };
    let store;

    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/checkout"]}>
          <PaymentForm />
        </MemoryRouter>
      </Provider>
    );
    const continuePaymentBtn = screen.getByRole("button", {
      name: /place order/i,
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
      order: {
        address: [
          {
            firstName: "mayank",
            lastName: "setia",
            address: "BW 81C Shalimar Bagh ",
            apartment: "Bw",
            city: "New Delhi",
            id: "mayank7006",
          },
        ],
      },
    };
    let store;

    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/checkout"]}>
          <PaymentForm />
        </MemoryRouter>
      </Provider>
    );
    const continuePaymentBtn = screen.getByRole("button", {
      name: /place/i,
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
      order: {
        orders: [],
        address: [
          {
            firstName: "mayank",
            lastName: "setia",
            address: "BW 81C Shalimar Bagh ",
            apartment: "Bw",
            city: "New Delhi",
            id: "mayank7006",
          },
        ],
      },
    };
    let store;

    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/checkout"]}>
          <PaymentForm />
        </MemoryRouter>
      </Provider>
    );
    const continuePaymentBtn = screen.getByRole("button", {
      name: /place order/i,
    });
    await userEvent.click(continuePaymentBtn);
    const alertElement = screen.getAllByRole("alert");
    expect(alertElement.length).toBe(3);
  });

  test("should fill the forms and submit it", async () => {
    const orderId = "mayank7006";
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
      order: {
        orders: [
          {
            id: orderId,
            firstName: "mayank",
            lastName: "setia",
            address: "BW 81C Shalimar Bagh ",
            apartment: "Bw",
            city: "New Delhi",
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
            paymentStatus: true,
            orderDate: "27/03/2024",
          },
        ],
        address: [
          {
            firstName: "mayank",
            lastName: "setia",
            address: "BW 81C Shalimar Bagh ",
            apartment: "Bw",
            city: "New Delhi",
            id: "mayank7006",
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
            paymentStatus: false,
          },
        ],
      },
    };
    let store;
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/checkout"]}>
          <PaymentForm orderId={orderId} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText("Cardholder Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByPlaceholderText("Card Number"), {
      target: { value: "1234567890123456" },
    });
    fireEvent.change(getByPlaceholderText("CVV"), { target: { value: "123" } });

    fireEvent.submit(getByRole("button"));

    // Check if the correct actions were dispatched
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        orderPlaced({
          payload: {
            id: orderId,
            firstName: "mayank",
            lastName: "setia",
            address: "BW 81C Shalimar Bagh ",
            apartment: "Bw",
            city: "New Delhi",
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
            paymentStatus: true,
            orderDate: "27/03/2024",
          },
          type: "orders/orderPlaced",
        })
      );
    });
  });
});
