import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="bg-gray-900 text-white flex justify-between items-center px-6 py-3 shadow-md">
      {/* Left: Logo Section */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="GSynergy Logo" className="h-10 w-auto" />
        <span className="text-lg font-semibold tracking-wide">GSynergy</span>
      </div>

      {/* Right: Navigation Links */}
      <div className="flex space-x-6">
        <NavItem to="/" label="Stores" />
        <NavItem to="/skus" label="SKUs" />
        <NavItem to="/planning" label="Planning" />
        <NavItem to="/chart" label="Charts" />
      </div>
    </div>
  );
};

// 🔹 Reusable NavItem Component (For Readability & Maintainability)
const NavItem = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="hover:underline transition duration-200">
    {label}
  </Link>
);

export default Navbar;
