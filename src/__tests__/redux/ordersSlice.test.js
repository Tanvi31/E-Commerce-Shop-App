import {
  addAddress,
  orderPlaced,
  ordersReducer,
} from "../../store/slices/ordersSlice";
import { expect, describe, it } from "@jest/globals";

describe("Orders Slice", () => {
  it("add address", () => {
    const initialState = {
      orders: [],
      address: [],
    };
    const action = {
      type: addAddress.type,
      payload: {
        firstName: "mayank",
        lastName: "setia",
        address: "BW 81C Shalimar Bagh ",
        apartment: "Bw",
        city: "New Delhi",
        id: "mayank9432",
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
    };
    const newState = ordersReducer(initialState, action);
    expect(newState.address).toHaveLength(1);
  });

  it("complete Orders", () => {
    const initialState = {
      orders: [],
      address: [
        {
          firstName: "mayank",
          lastName: "setia",
          address: "BW 81C Shalimar Bagh ",
          apartment: "Bw",
          city: "New Delhi",
          id: "mayank9432",
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
    };
    const action = {
      type: orderPlaced.type,
      payload: {
        id: "mayank9432",
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
    };
    const newState = ordersReducer(initialState, action);
    expect(newState.orders).toHaveLength(1);
  });
});
