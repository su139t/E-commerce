import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductDetail from "../pages/admin/UpdateProduct";
import { useSelector } from "react-redux";
import UserProfile from "../pages/user/UserProfile";
import PageNotFound from "../PageNotFound";
import AuthWrappe from "./AuthWrappe";
import Cart from '../pages/user/Cart';
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
