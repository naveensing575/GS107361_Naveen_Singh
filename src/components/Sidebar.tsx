import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 text-gray-800 p-4 flex flex-col items-center shadow-md border-r border-gray-300">
      <img src={logo} alt="GSynergy Logo" className="w-32 mb-6" />

      <nav className="w-full">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block p-2 hover:bg-gray-300 rounded">
              🏬 Stores
            </Link>
          </li>
          <li>
            <Link to="/sku" className="block p-2 hover:bg-gray-300 rounded">
              📦 SKUs
            </Link>
          </li>
          <li>
            <Link
              to="/planning"
              className="block p-2 hover:bg-gray-300 rounded"
            >
              📊 Planning
            </Link>
          </li>
          <li>
            <Link to="/chart" className="block p-2 hover:bg-gray-300 rounded">
              📈 Chart
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
