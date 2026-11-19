import { Link } from "react-router-dom";
import heroImage from "../assets/shopping-hero.jpg";
import { products } from "../data/products";

import {
  FaLaptop,
  FaTshirt,
  FaShoppingBag,
  FaBlender,
} from "react-icons/fa";

function Home() {
  const featuredProducts = products.slice(0, 4);

  

 const categories = [
  {
    name: "Electronics",
    icon: FaLaptop,
  },
  {
    name: "Fashion",
    icon: FaTshirt,
  },
  {
    name: "Accessories",
    icon: FaShoppingBag,
  },
  {
    name: "Home Appliances",
    icon: FaBlender,
  },
];

  return (
    <main>
      {/* hero section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* left content */}
        <div>
          <p className="text-orange-500 font-semibold mb-3">
            Welcome to Shop Mart
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Your Favorite Products
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Explore the latest collection of quality products at amazing prices.
            Find everything you need in one place.
          </p>

          <Link
            to="/products"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>

        {/* right image */}
        <div>
          <img
            src={heroImage}
            alt="Shopping Products"
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-16 ">
        <h2 className="text-3xl font-bold text-center mb-3">
          Featured Products
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Explore our handpicked products just for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-orange-500">
                  ₹{product.price}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="block text-center bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 mt-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* shop by category */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center ">Shop by Category</h3>
        <p className="text-center text-gray-600 mb-10">
          Explore products from your favorite categories
        </p>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {categories.map((category) => {
  const Icon = category.icon;

  return (
    <Link key={category.name}
    to={`/products?category=${category.name}`}
    className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-orange-100 rounded-full">
        <Icon className="text-3xl text-orange-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-800">
        {category.name}

      </h3>
    </Link>
  );
})}
       </div>
      </section>
    </main>
  );
}
export default Home;
