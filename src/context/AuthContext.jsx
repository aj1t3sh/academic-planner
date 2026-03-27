import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);
    if (exists) {
      alert("User already exists");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      u => u.email === email && u.password === password
    );

    if (!found) {
      alert("Invalid credentials");
      return false;
    }

    setUser(found);
    localStorage.setItem("user", JSON.stringify(found));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);