import { test, describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Shimmer from "../../Components/Shimmer";
import { productsFetchLimit } from "../../utils/constants";

describe("Shimmer Component", () => {
  test("renders correct number of Skeleton components", () => {
    const { getAllByRole } = render(<Shimmer />);

    const skeletonComponents = getAllByRole("status");
    expect(skeletonComponents).toHaveLength(productsFetchLimit);
  });
});
