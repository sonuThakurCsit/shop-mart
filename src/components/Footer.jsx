import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Shop Mart</h2>
          <p className="text-gray-400 text-sm max-w-sm ">
            Your one-stop destination for quality products at the best prices.
          </p>
        </div>

        <div className="flex flex-col gap-3 ">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <NavLink
            to="/"
            className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
          >
            Cart
          </NavLink>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
          <div className="flex flex-col gap-3">
            <p className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              About Us
            </p>
            <p className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              Contact Us
            </p>
            <p className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              Help Center
            </p>
            <p className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              FAQs
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4">
            <FaInstagram  className="text-orange-500 text-2xl hover:text-white transition-colors duration-300 cursor-pointer" />
            <FaFacebook  className="text-orange-500 text-2xl hover:text-white transition-colors duration-300 cursor-pointer" />
            <FaTwitter  className="text-orange-500 text-2xl hover:text-white transition-colors duration-300 cursor-pointer" />
            <FaYoutube  className="text-orange-500 text-2xl hover:text-white transition-colors duration-300 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-700 ">
        <p className="text-gray-400 text-sm text-center">
         © 2026 Shop Mart. All rights reserved.   
        </p>
      </div>
    </footer>
  );
}
export default Footer;
