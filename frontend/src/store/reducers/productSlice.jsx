import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product : null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproducts: (state, action) => {
        state.products = action.payload;
    }, 
    loadproductbyid: (state, action) => {
        state.product = action.payload;
    },
  },
});

export default productSlice.reducer;
export const {loadproducts ,loadproductbyid} = productSlice.actions;