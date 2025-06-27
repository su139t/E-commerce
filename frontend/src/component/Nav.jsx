import { NavLink } from "react-router-dom";
import Home from "../pages/Home";

const Nav = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-20 font-medium py-4 border border-amber-100 rounded-full bg-[#096B68] text-white text-sm sm:text-base">
        <NavLink to="/" className={(e) => (e.isActive ? "text-red-400" : "")}>
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={(e) => (e.isActive ? "text-red-400" : "")}
        >
          Products
        </NavLink>
        <NavLink
          to="/login"
          className={(e) => (e.isActive ? "text-red-400" : "")}
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
