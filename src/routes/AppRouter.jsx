import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Wishlist from "../pages/Wishlist";
import OrderHistory from "../pages/OrderHistory";
import Register from "../pages/Register";
import Login from "../pages/Login";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<OrderHistory />} />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
