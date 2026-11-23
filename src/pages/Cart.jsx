import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const handleIncrease = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleDecrease = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">
          Your Cart is Empty!
        </h2>

        <p className="text-gray-500 mt-3">Add some products to your cart.</p>
      </div>
    );
  }

  const handleRemove = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-5">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-5 border rounded-xl p-5"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg"
            />

            <div>
              <h2 className="text-xl font-bold">{item.name}</h2>

              <p className="text-orange-500 font-semibold mt-2">
                ₹{item.price}
              </p>

              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => handleIncrease(item.id)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              <p className="font-semibold mt-2">
                Subtotal: ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-3 hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t pt-6 flex flex-col items-end">
        <p className="text-lg text-gray-600">Total Items: {totalItems}</p>

        <h2 className="text-2xl font-bold mt-2">Total Price: ₹{totalPrice}</h2>
      </div>

      <Link
        to="/checkout"
        className="block w-full text-center bg-orange-500 text-white py-3 rounded-lg mt-6 hover:bg-orange-600 font-semibold"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}

export default Cart;
