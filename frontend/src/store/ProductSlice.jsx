import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadproduct: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { loadproduct } = ProductSlice.actions;
export default ProductSlice.reducer;
