
import { useState, useContext } from "react";

import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";

function Checkout() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const { cart, setCart } = useContext(CartContext);
  const { orders, setOrders } = useContext(OrderContext);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form Validation
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      alert("Please enter your full name");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Phone number must be 10 digits");
      return false;
    }

    if (!formData.address.trim()) {
      alert("Please enter your address");
      return false;
    }

    if (!formData.city.trim()) {
      alert("Please enter your city");
      return false;
    }

    if (!formData.state.trim()) {
      alert("Please enter your state");
      return false;
    }

    if (!/^[0-9]{6}$/.test(formData.pinCode)) {
      alert("PIN code must be 6 digits");
      return false;
    }

    return true;
  };

  // Calculate Total Items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle Order Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Create New Order
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      customer: { ...formData },
      items: cart.map((item) => ({ ...item })),
      totalItems,
      totalPrice,
      status: "Confirmed",
    };

    // Save Order in OrderContext
    setOrders((prevOrders) => [
      ...prevOrders,
      newOrder,
    ]);

    // Save Current Order for Confirmation Screen
    setPlacedOrder(newOrder);

    // Empty Cart
    setCart([]);

    // Show Success Message
    setOrderPlaced(true);
  };

  // Order Confirmation Screen
  if (orderPlaced) {
    return (
      <div className="text-center py-20 px-6">

        <div className="text-green-500 text-6xl mb-5">
          ✓
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with Shop Mart.
        </p>

        <div className="max-w-md mx-auto mt-8 border rounded-xl p-6 text-left">
          <h2 className="text-xl font-bold mb-4">
            Order Details
          </h2>

          <p className="mb-2">
            <span className="font-semibold">Order ID:</span>{" "}
            {placedOrder?.id}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Total Items:</span>{" "}
            {placedOrder?.totalItems}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Total Amount:</span>{" "}
            ₹{placedOrder?.totalPrice}
          </p>

          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-green-600">
              {placedOrder?.status}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">

      {/* Customer Details */}
      <div className="border rounded-xl p-6 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          Customer Details
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div>
            <label className="block font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-2">
              Delivery Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              rows="3"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block font-medium mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

          </div>

          {/* PIN Code */}
          <div>
            <label className="block font-medium mb-2">
              PIN Code
            </label>

            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Enter PIN code"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Place Order
          </button>

        </form>
      </div>

      {/* Order Summary */}
      <div className="mt-8 border rounded-xl p-6 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          Order Summary
        </h2>

        <div className="space-y-4">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-4 border-b pb-4"
            >

              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>

            </div>
          ))}

        </div>

        <div className="border-t mt-5 pt-5 space-y-3">

          <div className="flex justify-between">
            <span className="text-gray-600">
              Total Items
            </span>

            <span className="font-semibold">
              {totalItems}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Total Amount
            </span>

            <span className="text-xl font-bold text-orange-500">
              ₹{totalPrice}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Checkout;
