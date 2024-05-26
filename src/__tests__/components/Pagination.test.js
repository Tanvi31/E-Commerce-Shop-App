import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { test, describe, expect, jest } from "@jest/globals";
import Pagination from "../../Components/Pagination";

describe("Pagination Component", () => {
  test("renders Prev button as disabled when on first page", () => {
    const handleNextPage = jest.fn();
    const handlePrevPage = jest.fn();
    const page = 1;

    const { getByText } = render(
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        page={page}
      />
    );

    const prevButton = getByText("Prev");
    const nextButton = getByText("Next");

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  test("calls handleNextPage when Next button is clicked", () => {
    const handleNextPage = jest.fn();
    const handlePrevPage = jest.fn();
    const page = 1;

    const { getByText } = render(
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        page={page}
      />
    );

    const nextButton = getByText("Next");

    fireEvent.click(nextButton);

    expect(handleNextPage).toHaveBeenCalled();
  });

  test("calls handlePrevPage when Prev button is clicked", () => {
    const handleNextPage = jest.fn();
    const handlePrevPage = jest.fn();
    const page = 2;

    const { getByText } = render(
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        page={page}
      />
    );

    const prevButton = getByText("Prev");

    fireEvent.click(prevButton);

    expect(handlePrevPage).toHaveBeenCalled();
  });
});
