import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  // Auth state
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  
  // This function is called when the user logs in
  // Save user and token to state and localStorage
  const saveAuth = ({ user: u, token: t })  => { 
    setUser(u);
    setToken(t);
    setAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(u));
    localStorage.setItem("token", t);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // hydrate on first load 
  // ensures users don't have to log in again every time they refresh the page or reopen the app!
  useEffect(() => {
    // 1. Look for saved auth data in localStorage
    const storedUser = localStorage.getItem("user"); // user
    const storedToken = localStorage.getItem("token"); // token
    
    console.log("Hydrating auth:", { storedUser, storedToken });

    // 2. If found, restore the authentication state
    if (storedUser && storedToken) {
      // Parse and set user and token
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setAuthenticated(true); // User stays logged in!
    } else {
      console.log("No user or token found in localStorage");
    }
  }, []); // Empty dependency array = runs only on first load

  return (
    // Provide auth state and actions to children
    <AuthContext.Provider value={{ user, token, authenticated, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
