/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, describe, expect, jest } from "@jest/globals";
import App from "../App";
import Orders from "../Pages/Orders";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout";
import Products from "../Pages/Products";
import Layout from "../Components/Layout";

// Mock imported components
jest.mock("../Pages/Orders", () => () => (
  <div data-testid="orders-page">Orders Page</div>
));
jest.mock("../Pages/ProductDetails", () => () => (
  <div data-testid="product-details-page">Product Details Page</div>
));
jest.mock("../Pages/Cart", () => () => (
  <div data-testid="cart-page">Cart Page</div>
));
jest.mock("../Pages/Checkout", () => () => (
  <div data-testid="checkout-page">Checkout Page</div>
));
jest.mock("../Pages/Products", () => () => (
  <div data-testid="products-page">Products Page</div>
));
jest.mock("../Components/Layout", () => ({ children }) => (
  <div>{children}</div>
));

describe("App component", () => {
  test('renders Products page when path is "/"', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const productsPageElement = screen.getByTestId("products-page");
    expect(productsPageElement).toBeInTheDocument();
  });

  test('renders Orders page when path is "/orders"', () => {
    render(
      <MemoryRouter initialEntries={["/orders"]}>
        <App />
      </MemoryRouter>
    );

    const ordersPageElement = screen.getByTestId("orders-page");
    expect(ordersPageElement).toBeInTheDocument();
  });

  test('renders Product Details page when path is "/details/:id"', () => {
    render(
      <MemoryRouter initialEntries={["/details/123"]}>
        <App />
      </MemoryRouter>
    );

    const productDetailsPageElement = screen.getByTestId(
      "product-details-page"
    );
    expect(productDetailsPageElement).toBeInTheDocument();
  });

  test('renders Cart page when path is "/cart"', () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <App />
      </MemoryRouter>
    );

    const cartPageElement = screen.getByTestId("cart-page");
    expect(cartPageElement).toBeInTheDocument();
  });

  test('renders Checkout page when path is "/checkout"', () => {
    render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <App />
      </MemoryRouter>
    );

    const checkoutPageElement = screen.getByTestId("checkout-page");
    expect(checkoutPageElement).toBeInTheDocument();
  });
});
