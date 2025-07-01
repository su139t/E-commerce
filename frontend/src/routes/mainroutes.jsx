import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductDetail from "../pages/admin/UpdateProduct";
import { useSelector } from "react-redux";
import UserProfile from "../pages/user/UserProfile";
const Mainroutes = () => {
  const {users} = useSelector((state) => state.userReducer);
  return (
    <Routes>
      <Route element={users ? <Products /> : <Home />} path="/"></Route>
      <Route element={<Products />} path="/products"></Route>
      <Route element={<Register />} path="/register"></Route>
      <Route element={<Login />} path="/login"></Route>
      <Route element={<UserProfile />} path="/update-profile"></Route>
      <Route element={<CreateProduct />} path="/admin/create-products"></Route>
      <Route element={<ProductDetail />} path="/products-details/:id"></Route>
    </Routes>
  );
};

export default Mainroutes;
