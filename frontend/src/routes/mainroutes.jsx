import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { lazy } from "react";
const Products = lazy(() => import("../pages/Products"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetail = lazy(() => import("../pages/admin/UpdateProduct"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const PageNotFound = lazy(() => import("../PageNotFound"));
const AuthWrappe = lazy(() => import("./AuthWrappe"));
const Cart = lazy(() => import("../pages/user/Cart"));
import { useSelector } from "react-redux";

const Mainroutes = () => {
  const { users } = useSelector((state) => state.userReducer);
  return (
    <Routes>
      <Route element={<Products />} path="/"></Route>
      <Route element={<Register />} path="/register"></Route>
      <Route element={<Login />} path="/login"></Route>
      <Route
        element={
          <AuthWrappe>
            <UserProfile />
          </AuthWrappe>
        }
        path="/update-profile"
      ></Route>
      <Route
        element={
          <AuthWrappe>
            <CreateProduct />
          </AuthWrappe>
        }
        path="/admin/create-products"
      ></Route>
      <Route
        element={
          <AuthWrappe>
            <Cart />
          </AuthWrappe>
        }
        path="/cart"
      ></Route>
      <Route element={<ProductDetail />} path="/products-details/:id"></Route>
      <Route element={<PageNotFound />} path="*"></Route>
    </Routes>
  );
};

export default Mainroutes;
