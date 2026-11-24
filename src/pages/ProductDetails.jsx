import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { products } from "../data/products";
import { Link } from "react-router-dom";
function ProductDetails() {
  const { productId } = useParams();

  const { cart, setCart } = useContext(CartContext);

  const { wishlist, setWishlist } = useContext(WishlistContext);

  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Product Not Found!</h2>

        <p className="text-gray-500 mt-3">
          Sorry, this product does not exist.
        </p>
      </div>
    );
  }
  const handleAddToCart = () => {
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

  const handleWishlist = () => {
    const isAlreadyAdded = wishlist.find((item) => item.id === product.id);

    if (isAlreadyAdded) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Product Information */}
        <div>
          <p className="text-orange-500 font-semibold">{product.category}</p>

          <h1 className="text-3xl font-bold mt-3">{product.name}</h1>

          <p className="text-2xl text-orange-500 font-bold mt-5">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-600">Available Stock: {product.stock}</p>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
            >
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className="border border-red-500 text-red-500 px-8 py-3 rounded-lg hover:bg-red-50"
            >
              {wishlist.some((item) => item.id === product.id)
                ? "❤️ Remove from Wishlist"
                : "♡ Add to Wishlist"}
            </button>

            <Link
              to="/wishlist"
              className="inline-block ml-4 text-blue-600 underline"
            >
              View Wishlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
