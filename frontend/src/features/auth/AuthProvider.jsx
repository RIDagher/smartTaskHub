import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // save both user and token
  const saveAuth = ({ user: u, token: t }) => {
    setUser(u);
    setToken(t);
    setAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(u));
    localStorage.setItem("token", t);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // hydrate on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    console.log("Hydrating auth:", { storedUser, storedToken });
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setAuthenticated(true);
    } else {
      console.log("No user or token found in localStorage");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, authenticated, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
