import { Route , Routes } from "react-router-dom";
import Home from '../pages/Home';
import Products from '../pages/Products';
import Register from '../pages/Register';
import Login from '../pages/Login';
import CreateProduct from '../pages/admin/CreateProduct';
import ProductDetail from '../pages/admin/UpdateProduct';
const Mainroutes = () => {
  return (
    <Routes>
      <Route element={<Home/>} path="/"></Route>
      <Route element={<Products/>} path="/products"></Route>
      <Route element={<Register/>} path="/register"></Route>
      <Route element={<Login/>} path="/login"></Route>
      <Route element={<CreateProduct/>} path="/admin/create-products"></Route>
      <Route element={<ProductDetail/>} path="/products-details/:id"></Route>
    </Routes>
  )
}

export default Mainroutes