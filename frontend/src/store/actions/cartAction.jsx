import { axios } from "axios";
import { loadcarts } from "../reducers/cartSlice";

const asyncGetCart = (cart) => async (dispatch, getState) => {
  try {
    const data = await axios.get("/carts");
    loadcarts(data);
  } catch (error) {
    console.log(error);
  }
};
