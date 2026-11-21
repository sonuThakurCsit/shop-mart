import { createContext, useState , useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

 const [cart, setCart] = useState(() => {
  try {
    const savedCart = localStorage.getItem("cart");

    const parsedCart = savedCart
      ? JSON.parse(savedCart)
      : [];

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
});

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  },[cart])
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}