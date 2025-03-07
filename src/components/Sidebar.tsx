import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-lg font-bold mb-6">GSynergy</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
              🏬 Stores
            </Link>
          </li>
          <li>
            <Link to="/sku" className="block p-2 hover:bg-gray-700 rounded">
              📦 SKUs
            </Link>
          </li>
          <li>
            <Link
              to="/planning"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              📊 Planning
            </Link>
          </li>
          <li>
            <Link to="/chart" className="block p-2 hover:bg-gray-700 rounded">
              📈 Chart
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
