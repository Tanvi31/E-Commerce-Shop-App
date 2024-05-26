import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: [], address: [] },
  reducers: {
    addAddress: (state, action) => {
      state.address.push({ ...action.payload, paymentStatus: false });
    },
    orderPlaced: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addAddress, orderPlaced } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
export const ordersPlaced = (state) => state.order.orders;
