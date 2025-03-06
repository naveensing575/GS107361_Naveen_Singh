import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-800 text-white h-screen p-5 fixed">
      <h2 className="text-xl font-bold mb-6">Navigation</h2>
      <ul className="space-y-4">
        <NavItem to="/" label="🏪 Stores" />
        <NavItem to="/skus" label="📦 SKUs" />
        <NavItem to="/planning" label="📊 Planning" />
        <NavItem to="/chart" label="📈 Charts" />
      </ul>
    </aside>
  );
};

// 🔹 Reusable NavItem Component
const NavItem = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link to={to} className="block py-2 px-3 hover:bg-gray-700 rounded">
      {label}
    </Link>
  </li>
);

export default Sidebar;
