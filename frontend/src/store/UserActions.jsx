import axios from "../api/axiosconfig";
import { loadproduct } from "./ProductSlice";
import { loaduser } from "./UserSlice";

export const asyncgetusers = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/users");
    dispatch(loaduser(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncgetproducts = () => async (dispatch, getState) => {
  try {
    const products = await axios.get("/products");
    dispatch(loadproduct(products.data));
  } catch (error) {
    console.log(error);
  }
};
