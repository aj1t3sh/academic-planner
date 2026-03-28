import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaClipboardList, FaChartLine, FaSignOutAlt } from "react-icons/fa";

import CoursesPage from "./pages/CoursesPage";
import PlannerPage from "./pages/PlannerPage";
import SummaryPage from "./pages/SummaryPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PlannerProvider } from "./context/PlannerContext"; 

function Layout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div
      className={`min-h-screen flex ${
        isAuthPage
          ? "bg-gray-100"
          : "bg-gradient-to-br from-indigo-100 via-white to-purple-100"
      }`}
    >

      {/* SIDEBAR */}
      {!isAuthPage && (
        <aside className="w-64 bg-white/70 backdrop-blur-xl shadow-xl p-6 flex flex-col">
          <h1 className="text-2xl font-bold text-indigo-600 mb-10">
            🎓 Academic Planner
          </h1>

          <nav className="flex flex-col space-y-6 text-gray-700 font-medium">
            <NavLink to="/" className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive ? "bg-indigo-600 text-white" : "hover:bg-indigo-100"
              }`}>
              <FaBook /> Courses
            </NavLink>

            <NavLink to="/planner" className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive ? "bg-indigo-600 text-white" : "hover:bg-indigo-100"
              }`}>
              <FaClipboardList /> Planner
            </NavLink>

            <NavLink to="/summary" className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive ? "bg-indigo-600 text-white" : "hover:bg-indigo-100"
              }`}>
              <FaChartLine /> Summary
            </NavLink>
          </nav>

          {user && (
            <button
              onClick={logout}
              className="mt-auto bg-red-500 text-white py-2 rounded-xl"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </aside>
      )}

      {/* MAIN */}
      <main className={`flex-1 ${isAuthPage ? "" : "p-10"}`}>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <Routes location={location}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route path="/" element={
                <PrivateRoute><CoursesPage /></PrivateRoute>
              } />

              <Route path="/planner" element={
                <PrivateRoute><PlannerPage /></PrivateRoute>
              } />

              <Route path="/summary" element={
                <PrivateRoute><SummaryPage /></PrivateRoute>
              } />
            </Routes>

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PlannerProvider> {/* ✅ ADD THIS */}
        <Layout />
      </PlannerProvider>
    </AuthProvider>
  );
}

export default App;

