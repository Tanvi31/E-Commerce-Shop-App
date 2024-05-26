import { test, describe, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Products from "../../Pages/Products";
import ProductsSection from "../../Components/ProductsSection";

jest.mock("../../Components/ProductsSection", () => {
  return () => <div>ProductsSection</div>;
});

describe("Products component", () => {
  test("renders the heading and description", () => {
    render(<Products />);

    const headingElement = screen.getByText("E-Commerce Shop App");
    expect(headingElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(/Lorem ipsum dolor/i);
    expect(descriptionElement).toBeInTheDocument();
  });
});
