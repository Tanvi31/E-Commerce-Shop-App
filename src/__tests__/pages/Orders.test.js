import { expect, test, describe, jest } from "@jest/globals";
import { render, screen, within } from "@testing-library/react";
import Orders from "../../Pages/Orders";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { getTotalCartValue } from "../../utils/helper";

const ordersTableColumnNames = [
  {
    columnName: "ORDER NO.",
  },
  {
    columnName: "CUSTOMER NAME",
  },
  {
    columnName: "PAYMENT STATUS",
  },
  {
    columnName: "AMOUNT",
  },
  {
    columnName: "ADDRESS",
  },
  {
    columnName: "ORDER DATE",
  },
  {
    columnName: "STATUS",
  },
];

describe("Orders Page Tests", () => {
  const mockStore = configureStore([]);
  const initialState = {
    order: {
      orders: [
        {
          id: "mayank7006",
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
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("Orders Page Rendered Successfully", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/orders"]}>
          <Orders />
        </MemoryRouter>
      </Provider>
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test("should render a table with columns", () => {
    const ordersList = store.getState().order.orders;
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/orders"]}>
          <Orders />
        </MemoryRouter>
      </Provider>
    );
    const table = screen.getAllByRole("table");
    const thead = table[0].firstChild;

    const headers = within(thead).getAllByRole("columnheader");
    expect(headers).toHaveLength(ordersTableColumnNames.length);
    headers.forEach((th, idx) => {
      expect(th).toHaveTextContent(ordersTableColumnNames[idx].columnName);
    });

    const tbody = table[0].lastChild;
    const rows = within(tbody).getAllByRole("row");
    expect(rows).toHaveLength(ordersList.length);

    rows.forEach((tr, rowIndex) => {
      const cells = within(tr).getAllByRole("cell");
      expect(cells).toHaveLength(ordersTableColumnNames.length);
    });
  });
});

jest.mock("../../utils/helper", () => ({
  getTotalCartValue: jest.fn((items) =>
    items.reduce((acc, item) => acc + item.price, 0)
  ),
}));

describe("Orders Component", () => {
  const mockStore = configureStore([]);
  const initialState = {
    order: {
      orders: [
        {
          id: "mayank7006",
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
    },
  };
  let store;
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
  });

  test("renders orders correctly", () => {
    const ordersList = store.getState().order.orders;

    // Render the Orders component with mock data
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/orders"]}>
          <Orders />
        </MemoryRouter>
      </Provider>
    );

    // Assert that getTotalCartValue was called for each order item and displayed correctly in the table
    expect(getTotalCartValue).toHaveBeenCalledTimes(ordersList.length);
    ordersList.forEach((order) => {
      const totalValue = order.items.reduce((acc, item) => acc + item.price, 0);
      expect(getTotalCartValue).toHaveBeenCalledWith(order.items);
      expect(getByText(totalValue.toString())).toBeInTheDocument();
    });
  });
});
