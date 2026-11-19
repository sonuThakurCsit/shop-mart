import { products } from "../data/products";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(category || "all");

  const filterProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const searchProducts = filterProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedProducts = [...searchProducts];
  if (sort === "low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const priceFilteredProducts = sortedProducts.filter((product) => {
    const minMatch = minPrice === "" || product.price >= Number(minPrice);

    const maxMatch = maxPrice === "" || product.price <= Number(maxPrice);

    return minMatch && maxMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-3">Our Products</h2>

      <div className="relative mb-6">
        <FaSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* sorting Dropdown */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6"
      >
        <option value="default">Default Sorting</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>

      {/* Price Range  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="number"
          placeholder="Minimum Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />

        <input
          type="number"
          placeholder="Maximum Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* category dropworn */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          const value = e.target.value;

          setSelectedCategory(value);

          if (value === "all") {
            setSearchParams({});
          } else {
            setSearchParams({ category: value });
          }
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6"
      >
        <option value="all">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Accessories">Accessories</option>
        <option value="Home Appliances">Home Appliances</option>
      </select>

      <p className="text-gray-600 mb-8">
        Total Products: {priceFilteredProducts.length}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {priceFilteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <h2 className="text-2xl font-bold text-gray-700">
              No Products Found!
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching with another product name.
            </p>
          </div>
        ) : (
          priceFilteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-orange-500 font-bold">₹{product.price}</p>

                <Link
                  to={`/product/${product.id}`}
                  className="block text-center bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 mt-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
