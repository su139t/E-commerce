import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogOutUser } from "../store/actions/userAction";
import { Menu, X } from "lucide-react"; // Or use any icon lib

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.users);

  const SignOutHandler = () => {
    dispatch(asyncLogOutUser());
    navigate("/login");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-[#21306d] text-white px-4 py-3 border border-amber-100">
      {/* Top section */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold"></h1>

        {/* Toggle button */}
        <button className="sm:hidden focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-6 md:gap-10 font-medium text-sm sm:text-base">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-red-400" : "")}
          >
            Home
          </NavLink>

          {user ? (
            <>
              {user.isAdmin ? (
                <NavLink
                  to="/admin/create-products"
                  className={({ isActive }) => (isActive ? "text-red-400" : "")}
                >
                  Create Products
                </NavLink>
              ) : (
                ""
              )}
              <NavLink
                to="/update-profile"
                className={({ isActive }) => (isActive ? "text-red-400" : "")}
                onClick={closeMenu}
              >
                Settings
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? "text-red-400" : "")}
                onClick={closeMenu}
              >
                Cart
              </NavLink>
              <button onClick={SignOutHandler}>Sign Out</button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "text-red-400" : "")}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden flex flex-col gap-4 mt-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-red-400" : "")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "text-red-400" : "")}
            onClick={closeMenu}
          >
            Products
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/admin/create-products"
                className={({ isActive }) => (isActive ? "text-red-400" : "")}
                onClick={closeMenu}
              >
                Create Products
              </NavLink>
              <NavLink
                to="/update-profile"
                className={({ isActive }) => (isActive ? "text-red-400" : "")}
                onClick={closeMenu}
              >
                Settings
              </NavLink>
              <button onClick={SignOutHandler}>Sign Out</button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "text-red-400" : "")}
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
