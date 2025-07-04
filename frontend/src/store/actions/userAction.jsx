import axios from "../../api/axiosconfig";
import { toast } from "react-toastify";
import { loadusers, logoutuser } from "../reducers/userSlice";

// Login
export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );

    if (data.length > 0) {
      const loggedInUser = data[0];
      dispatch(loadusers(loggedInUser));
      localStorage.setItem("UserLogin", JSON.stringify(loggedInUser));
      // toast.success("LogIn Successfully...");
    } else {
      toast.error("User Not Found...");
    }
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
  }
};

// Logout
export const asyncLogOutUser = () => async (dispatch) => {
  try {
    dispatch(logoutuser());
    localStorage.removeItem("UserLogin");
    // toast.success("LogOut Successfully...");
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
  }
};

// Persist user on reload
export const asyncCurrentUser = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("UserLogin"));
    if (user) dispatch(loadusers(user));
    else dispatch(logoutuser());
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
  }
};

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    // if (res.status === 201 || res.status === 200) {
    //   toast.success("User Successfully Registered...");
    // }
  } catch (error) {
    console.log(error);
    toast.error(`Error : ${error.message}`);
  }
};

export const asyncUpdateUser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.patch("/users/" + user.id, user);
    localStorage.removeItem("UserLogin");
    localStorage.setItem("UserLogin", JSON.stringify(res.data));
    dispatch(asyncCurrentUser());
    // if (res.status === 201 || res.status === 200) {
    //   toast.success("User Profile Successfully Update...");
    // }
  } catch (error) {
    console.log(error);
    toast.error(`Error : ${error.message}`);
  }
};

export const asyncDeleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/users/${id}`);
    dispatch(asyncLogOutUser()); // ✅ refetch updated list
    // toast.success("account Deleted Successfully");
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
  }
};
