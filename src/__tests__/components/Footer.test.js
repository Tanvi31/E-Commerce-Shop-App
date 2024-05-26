import { render } from "@testing-library/react";
import { test, describe, expect } from "@jest/globals";
import Footer from "../../Components/Footer";

describe("Footer Component", () => {
  test("renders footer with correct elements and content", () => {
    const { getByText, getAllByText } = render(<Footer />);

    expect(getAllByText("Lorem Ipsum")).toHaveLength(3);

    const listItems = getAllByText("Lorem");
    expect(listItems).toHaveLength(15);

    expect(
      getByText("copyrights sight.com all rights reserved")
    ).toBeInTheDocument();
  });
});
