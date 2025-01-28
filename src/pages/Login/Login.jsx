import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "admin", // Default value as per the object
    avatar: "", // Allow user to add an avatar URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your submission logic here
  };

  return (
    <div className="grid items-center justify-center h-screen bg-gradient-to-l to-[#eeaeca] from-[#94bbe9]">
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="bg-white w-[300px] sm:w-[600px] rounded-xl shadow shadow-blue-200 p-5"
      >
        <form onSubmit={handleSubmit} className="p-5">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Welcome Back
          </h3>
          <p className="text-xl mb-4 text-center">Please Login</p>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-gray-500 text-xl">
            Do not have an account ?{" "}
            <Link className="text-blue-500 hover:text-blue-700" to="/register">
              Signup here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
