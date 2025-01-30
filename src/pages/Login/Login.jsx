import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setErrorMessage(""); // Clear global error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required!";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required!";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters!";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      // console.log(response.user);
      setSuccessMessage("Login successful!");
      navigate("/home");
    } catch (error) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    }
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
            Welcome Back to BharatGo
          </h3>
          <p className="text-xl mb-4 text-center">
            Please enter your credentials
          </p>
          {successMessage && (
            <p className="mb-4 text-green-500 text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="mb-4 text-red-500 text-center">{errorMessage}</p>
          )}
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
            />
            {formErrors.email && (
              <p className="mt-1 text-red-500">{formErrors.email}</p>
            )}
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
            />
            {formErrors.password && (
              <p className="mt-1 text-red-500">{formErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-500 text-xl">
            Do not have an account ?
            <Link className="text-blue-500 hover:text-blue-700" to="/register">
              Signup
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
