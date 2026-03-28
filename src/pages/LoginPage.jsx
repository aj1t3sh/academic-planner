import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const success = login(email, password);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">

      {/* FLOATING CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >

        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to continue your journey
        </p>

        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md"
        >
          Login
        </button>

        {/* LINK */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold">
            Signup
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default LoginPage;