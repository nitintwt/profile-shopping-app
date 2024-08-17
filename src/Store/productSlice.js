import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPriceOfCartItem: 0,
  totalProducts:[]
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
    },
    addProduct:(state, action)=>{
      state.totalProducts.push(...state.totalProducts, ...action.payload)
    },
    deleteAllProductFromCart:(state , action)=>{
      state.totalProducts=[]
    }
  }
});

export const { addPrice, removePrice , addProduct , deleteAllProductFromCart } = productSlice.actions;

export default productSlice.reducer;
