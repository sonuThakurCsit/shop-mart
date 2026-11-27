import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Login
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const { email, password } = formData;

    if (!email.trim() || !password) {
      setError("Please fill all fields!");
      return;
    }

    // Get Registered Users
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Find User
    const loggedInUser = savedUsers.find(
      (user) =>
        user.email === email.trim().toLowerCase() && user.password === password,
    );

    if (!loggedInUser) {
      setError("Invalid email or password!");
      return;
    }

    // Create Current User
    const currentUser = {
      id: loggedInUser.id,
      fullName: loggedInUser.fullName,
      email: loggedInUser.email,
    };

    // Login Through AuthContext
    login(currentUser);

    // Navigate to Home
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>

        <p className="text-gray-500 text-center mb-6">
          Login to your Shop Mart account
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
