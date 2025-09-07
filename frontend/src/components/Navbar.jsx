import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const Navbar = () => {
  const { authenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50">
      {/* Made the navbar fixed with top positioning */}
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Smart Task Hub</h1>
        <ul className="flex space-x-4">
          {authenticated ? (
            <li>
              <Link onClick={logout} to="/login" className="text-white hover:text-gray-300">
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="text-white hover:text-gray-300">
                SignIn
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
