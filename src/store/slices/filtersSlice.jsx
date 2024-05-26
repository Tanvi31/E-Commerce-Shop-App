import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setSearchText: (state, action) => {
      return action.payload;
    },
    clearSearch: (state) => {
      state = "";
    },
  },
});

export const { clearSearch, setSearchText } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
export const searchText = (state) => state.filter;
