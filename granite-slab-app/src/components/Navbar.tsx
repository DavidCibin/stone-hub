import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../public/images/close.png";
import menuIcon from "../../public/images/menu.png";
import { useScreenContext } from "../context/appContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useScreenContext();

  // Auto-close menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b shadow-md z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">
          SlabStore
        </Link>

        {isMobile && (
          <div className="lg:hidden">
            <div
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <img src={closeIcon} /> : <img src={menuIcon} />}
            </div>
          </div>
        )}

        <nav className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/inventory" className="hover:text-blue-600">
            Inventory
          </Link>
        </nav>
      </div>

      {isMobile && isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md z-40">
          <ul className="flex flex-col px-4 py-2 space-y-2">
            <li>
              <Link
                to="/"
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inventory
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
