import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPriceOfCartItem: 0
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addPrice: (state, action) => {
      state.totalPriceOfCartItem += action.payload; // Add the price to the total
    },
    removePrice: (state, action) => {
      state.totalPriceOfCartItem -= action.payload; // Subtract the price from the total
    }
  }
});

export const { addPrice, removePrice } = productSlice.actions;

export default productSlice.reducer;
