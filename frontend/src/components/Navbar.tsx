import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { isLoggedIn, logoutUser } from "../hooks/authHelper";
import closeIcon from "../assets/images/close.svg";
import menuIcon from "../assets/images/menu.svg";
import nhsLogo from "../assets/images/nsh-logo.svg";
import { useScreenContext } from "../context/AppContext";
import { useMainContext } from "../context/MainContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useScreenContext();
  const { cartItems } = useMainContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  // Auto-close menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg z-30 h-20 text-teal-500">
      <div className="mx-auto h-full px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <img
            src={nhsLogo}
            alt="Natural Stone Logo"
            className="h-13 hover:opacity-90"
          />
        </Link>

        {isMobile && (
          <div className="lg:hidden">
            <div
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <img src={closeIcon} className="h-8" />
              ) : (
                <img src={menuIcon} className="h-8" />
              )}
            </div>
          </div>
        )}

        <nav className="hidden lg:flex space-x-6">
          <Link
            to="/"
            className="hover:text-teal-700 hover:border-b hover:border-teal-700"
          >
            Home
          </Link>
          <Link
            to="/inventory"
            className="hover:text-teal-700 hover:border-b hover:border-teal-700"
          >
            Inventory
          </Link>
          <Link
            to="/contact"
            className="hover:text-teal-700 hover:border-b hover:border-teal-700"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="hover:text-teal-700 hover:border-b hover:border-teal-700 flex items-center relative mr-6"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center -top-1 -right-4.5 absolute">
                {cartItems.length}
              </span>
            )}
          </Link>
          {isLoggedIn() ? (
            <button onClick={handleLogout} className="text-red-600 font-medium">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          )}
        </nav>
      </div>

      {isMobile && isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md z-40">
          <ul className="flex flex-col px-4 py-2 space-y-2">
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-teal-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className="block py-2 hover:text-teal-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Inventory
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 hover:text-teal-700"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 hover:text-teal-700 flex items-center relative mr-6"
              >
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center -top-1 -right-4.5 absolute">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>
            <li>
              {isLoggedIn() ? (
                <button
                  onClick={handleLogout}
                  className="block py-2 text-red-600 font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
