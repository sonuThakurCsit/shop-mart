
import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ReviewContext } from "../context/ReviewContext";

import { products } from "../data/products";

function ProductDetails() {
  const { productId } = useParams();

  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const { review, setReview } = useContext(ReviewContext);

  // Review Form State
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // Find Current Product
  const product = products.find(
    (item) => item.id === Number(productId)
  );

  // Handle Product Not Found
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">
          Product Not Found!
        </h2>

        <p className="text-gray-500 mt-3">
          Sorry, this product does not exist.
        </p>
      </div>
    );
  }

  // Filter Reviews According to Product ID
  const productReviews = review.filter(
    (item) => item.productId === product.id
  );

  // Calculate Average Rating
  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce(
            (total, item) => total + item.rating,
            0
          ) / productReviews.length
        ).toFixed(1)
      : "0.0";

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Review Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.comment.trim()) {
      alert("Please enter your name and review!");
      return;
    }

    const newReview = {
      id: Date.now(),
      productId: product.id,
      name: formData.name.trim(),
      rating: Number(formData.rating),
      comment: formData.comment.trim(),
    };

    setReview((prevReviews) => [
      ...prevReviews,
      newReview,
    ]);

    setFormData({
      name: "",
      rating: 5,
      comment: "",
    });
  };

  // Handle Add To Cart
  const handleAddToCart = () => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      if (existingProduct.quantity >= product.stock) {
        alert("Maximum stock limit reached!");
        return;
      }

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      if (product.stock <= 0) {
        alert("Product is out of stock!");
        return;
      }

      setCart([
        ...cart,
        { ...product, quantity: 1 },
      ]);
    }
  };

  // Handle Wishlist
  const handleWishlist = () => {
    const isAlreadyAdded = wishlist.find(
      (item) => item.id === product.id
    );

    if (isAlreadyAdded) {
      setWishlist(
        wishlist.filter((item) => item.id !== product.id)
      );
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Product Details */}
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
          <p className="text-orange-500 font-semibold">
            {product.category}
          </p>

          <h1 className="text-3xl font-bold mt-3">
            {product.name}
          </h1>

          <p className="text-2xl text-orange-500 font-bold mt-5">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-600">
            Available Stock: {product.stock}
          </p>

          {/* Average Rating */}
          <div className="mt-4">
            <p className="text-yellow-500 text-xl">
              {"★".repeat(Math.round(Number(averageRating)))}
              {"☆".repeat(5 - Math.round(Number(averageRating)))}
            </p>

            <p className="text-gray-600 text-sm">
              {averageRating} / 5 ({productReviews.length} Reviews)
            </p>
          </div>

          {/* Product Buttons */}
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
              className="inline-block text-blue-600 underline"
            >
              View Wishlist
            </Link>

          </div>
        </div>
      </div>

      {/* Review Section */}
      <section className="mt-16">

        <h2 className="text-3xl font-bold mb-6">
          Customer Reviews
        </h2>

        {/* Review Form */}
        <div className="bg-gray-50 border rounded-xl p-6 mb-10">

          <h3 className="text-xl font-semibold mb-5">
            Write Your Review
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="border p-3 rounded-lg w-full"
            />

            {/* Rating */}
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>

            {/* Comment */}
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Write your review..."
              required
              rows="4"
              className="border p-3 rounded-lg w-full"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
            >
              Submit Review
            </button>

          </form>
        </div>

        {/* Display Reviews */}
        <div className="space-y-5">

          {productReviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet! Be the first to review this product.
            </p>
          ) : (
            productReviews.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-5"
              >

                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-yellow-500 text-xl mt-1">
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </p>

                <p className="text-gray-600 mt-3">
                  {item.comment}
                </p>

              </div>
            ))
          )}

        </div>
      </section>

    </div>
  );
}

export default ProductDetails;
