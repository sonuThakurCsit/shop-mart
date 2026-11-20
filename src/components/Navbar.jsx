import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 const { cart } = useContext(CartContext);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-orange-500 transition-colors duration-300"
      : "hover:text-orange-500 transition-colors duration-300";

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 sticky top-0 z-50">
      {/* Main Navbar */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-500">Shop Mart</h1>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-2xl cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} flex items-center gap-2`
            }
          >
            <span>Cart</span>
            <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
              {totalQuantity}
            </span>
          </NavLink>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-64 px-4 py-2 rounded-lg outline-none bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500"
          />

          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
            aria-label="Search products"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-5 pt-6">
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={handleMenuClose}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={navLinkClass}
            onClick={handleMenuClose}
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} flex items-center gap-2`
            }
            onClick={handleMenuClose}
          >
            <span>Cart</span>
            <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
              {totalQuantity}
            </span>
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
