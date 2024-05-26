import React from "react";
import { render } from "@testing-library/react";
import Layout from "../../Components/Layout";
import { test, describe, expect, jest } from "@jest/globals";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

jest.mock("../../Components/Header", () => {
  return () => <div>Header</div>;
});

jest.mock("../../Components/Footer", () => {
  return () => <div>Footer</div>;
});

describe("Layout", () => {
  test("renders children", () => {
    const ChildComponent = () => <div data-testid="child">Child Component</div>;

    const { getByTestId } = render(
      <Layout>
        <ChildComponent />
      </Layout>
    );

    expect(getByTestId("child")).toBeInTheDocument();
  });
});
