import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Wishlist() {
  const { wishlist, setWishlist } = useContext(WishlistContext);

  const { cart, setCart } = useContext(CartContext);

  const handleRemove = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity >= product.stock) {
        alert("Maximum stock limit reached!");
        return;
      }

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      if (product.stock <= 0) {
        alert("Product is out of stock!");
        return;
      }
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Your Wishlist is Empty!</h2>

        <Link
          to="/products"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg mt-6"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="border rounded-xl p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>

            <p className="text-orange-500 font-bold mt-2">₹{product.price}</p>

            <button
              onClick={() => handleRemove(product.id)}
              className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600"
            >
              Remove ❤️
            </button>

            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-orange-500 text-white py-2 rounded-lg mt-3 hover:bg-orange-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
