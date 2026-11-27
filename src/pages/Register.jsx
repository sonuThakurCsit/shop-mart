import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Registration
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const { fullName, email, password, confirmPassword } = formData;

    // Empty Field Validation
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill all fields!");
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email!");
      return;
    }

    // Password Length Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    // Password Matching
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Get Existing Users
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Check Duplicate Email
    const userExists = savedUsers.some(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (userExists) {
      setError("Email already registered!");
      return;
    }

    // Create New User
    const newUser = {
      id: Date.now(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    // Save User
    localStorage.setItem("users", JSON.stringify([...savedUsers, newUser]));

    setSuccess("Registration successful!");

    // Clear Form
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Navigate to Login
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

        <p className="text-gray-500 text-center mb-6">Join Shop Mart today!</p>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>
        )}

        {success && (
          <p className="bg-green-100 text-green-600 p-3 rounded mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

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
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
