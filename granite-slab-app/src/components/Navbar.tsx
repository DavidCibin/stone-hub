import { useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../public/images/close.png";
import menuIcon from "../../public/images/menu.png";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          GraniteSlabs
        </Link>

        <div className="lg:hidden">
          <div onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <img src={closeIcon} /> : <img src={menuIcon} />}
          </div>
        </div>

        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/inventory" className="text-gray-700 hover:text-gray-900">
            Inventory
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700"
          >
            Home
          </Link>
          <Link
            to="/inventory"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700"
          >
            Inventory
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
