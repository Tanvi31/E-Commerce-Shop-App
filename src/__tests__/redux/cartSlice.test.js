import {
  addItem,
  incrementQuantity,
  decrementQuantity,
  cartReducer,
  removeItem,
} from "../../store/slices/cartSlice";

import { expect, describe, it } from "@jest/globals";

const cart = [
  {
    id: 1,
    title: "burger",
    price: 200,
    brand: "burger king",
    thumbnail: "",
    quantity: 3,
  },
  {
    id: 2,
    title: "mcGrill burger",
    price: 435,
    brand: "Mcd",
    thumbnail: "",
    quantity: 2,
  },
  {
    id: 3,
    title: "Paneer burger",
    price: 349,
    brand: "Wendys",
    thumbnail: "",
    quantity: 12,
  },
  {
    id: 4,
    title: "Chicken burger",
    price: 432,
    brand: "Smash",
    thumbnail: "",
    quantity: 4,
  },
];

describe("cartSlice Reducers", () => {
  //add item to cart
  it("should add items to the cart", () => {
    const initialState = { items: [] };
    const action = {
      type: addItem.type,
      payload: {
        id: 1,
        title: "burger",
        price: 200,
        brand: "burger king",
        thumbnail: "",
        quantity: 3,
      },
    };
    const newState = cartReducer(initialState, action);
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].id).toBe(1);
  });
  // increase qty by 1
  it("should increment the quantity of an existing item", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "burger",
          price: 200,
          brand: "burger king",
          thumbnail: "",
          quantity: 3,
        },
      ],
    };
    const action = { type: incrementQuantity.type, payload: 1 };
    const newState = cartReducer(initialState, action);
    expect(newState.items[0].quantity).toBe(4);
  });
  // decrease qty by 1
  it("should decrement quantity of an existing item in the cart", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "burger",
          price: 200,
          brand: "burger king",
          thumbnail: "",
          quantity: 3,
        },
      ],
    };
    const action = { type: decrementQuantity.type, payload: 1 };
    const newState = cartReducer(initialState, action);
    expect(newState.items[0].quantity).toBe(2);
  });
  // remove the item from the cart
  it("should remove an item from the cart", () => {
    const initialState = {
      items: [
        {
          id: 1,
          title: "burger",
          price: 200,
          brand: "burger king",
          thumbnail: "",
          quantity: 3,
        },
      ],
    };
    const action = { type: removeItem.type, payload: 1 };
    const newState = cartReducer(initialState, action);
    expect(newState.items).toHaveLength(0);
  });
});
