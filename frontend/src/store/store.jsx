import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import productSlice from "./ProductSlice";

export const store = configureStore({
  reducer: {
    user : userSlice,
    product : productSlice,
  },
});
