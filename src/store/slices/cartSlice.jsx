import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.items.push({ ...action.payload });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.items.filter(
        (item) => item.id !== action.payload
      );
      state.items = removeItem;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const selectCartItems = (state) => state.cart.items;
