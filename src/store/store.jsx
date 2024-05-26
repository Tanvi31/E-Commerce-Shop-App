import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import { ordersReducer } from "./slices/ordersSlice";
import { filtersReducer } from "./slices/filtersSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: ordersReducer,
    filter: filtersReducer,
  },
});

export default store;
