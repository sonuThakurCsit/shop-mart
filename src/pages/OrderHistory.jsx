import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

function OrderHistory() {
  const { orders, setOrders } = useContext(OrderContext);

  const handleCancelOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order,
      ),
    );
  };

  // Agar koi order nahi hai
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">My Orders</h1>

        <p className="text-gray-500">You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-xl p-6 shadow-sm">
            {/* Order Information */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-5">
              <div>
                <h2 className="font-bold text-lg">Order ID: {order.id}</h2>

                <p className="text-gray-500 text-sm mt-1">
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-green-600 font-semibold">{order.status}</p>

                {order.status === "Confirmed" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-5">
              <h3 className="font-semibold mb-2">Delivery Details</h3>

              <p>{order.customer.fullName}</p>

              <p className="text-gray-600">
                {order.customer.address}, {order.customer.city}
              </p>

              <p className="text-gray-600">
                {order.customer.state} - {order.customer.pinCode}
              </p>
            </div>

            {/* Ordered Products */}
            <h3 className="font-semibold mb-3">Ordered Products</h3>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>

                    <p className="text-gray-500 text-sm">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="flex justify-between items-center mt-5">
              <p className="text-gray-600">Total Items: {order.totalItems}</p>

              <p className="text-xl font-bold">Total: ₹{order.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
