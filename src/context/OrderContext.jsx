
import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("orders");

      const parsedOrders = savedOrders
        ? JSON.parse(savedOrders)
        : [];

      return Array.isArray(parsedOrders) ? parsedOrders : [];
    } catch (error) {
      console.log("Error loading orders:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
}
