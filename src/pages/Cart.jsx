import { useContext } from "react";
import { CartContext } from "../context/CartContext";

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
