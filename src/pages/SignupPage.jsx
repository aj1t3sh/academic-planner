import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const success = signup(email, password);
    if (success) navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700">

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Create Account 🚀
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Start your academic journey
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          Signup
        </button>

        {/* LINK */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default SignupPage;