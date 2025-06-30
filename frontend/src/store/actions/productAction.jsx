import { toast } from "react-toastify";
import axios from "../../api/axiosconfig.jsx";
import { loadproducts, loadproductbyid } from "../reducers/productSlice.jsx";

export const asyncCreateProduct = (product) => async (dispatch) => {
  try {
    const res = await axios.post("/products", product);
    if (res.status === 201 || res.status === 200) {
      toast.success("Product Successfully Created");
    }
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
  }
};

export const asyncGetProduct = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/products");
    if (data) dispatch(loadproducts(data));
    else console.log("No products found!");
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
  }
};

export const asyncGetProductById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/products/${id}`);
    dispatch(loadproductbyid(data));
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
  }
};

export const asyncUpdateProduct = (product) => async (dispatch) => {
  try {
    await axios.patch(`/products/${product.id}`, product);
    toast.success("Product Updated Successfully");
    dispatch(asyncGetProduct()); // ✅ refetch updated list
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
  }
};

export const asyncDeleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/products/${id}`);
    toast.success("Product Deleted Successfully");
    dispatch(asyncGetProduct()); // ✅ refetch updated list
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
  }
};
