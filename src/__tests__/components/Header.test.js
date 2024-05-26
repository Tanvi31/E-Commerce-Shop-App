// Header.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import { expect, test, describe } from "@jest/globals";
import Header from "../../Components/Header";

describe("Header component", () => {
  test("renders without errors", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText("My Orders")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /support/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("navigates to My Orders page when My Orders link is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText("My Orders"));
    expect(window.location.pathname).toBe("/orders");
  });

  test("updates search input value correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });
});
