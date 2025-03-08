import { useLocation } from "react-router-dom";

export default function TopNav() {
  const location = useLocation();

  // Route-to-Title Mapping
  const pageTitles: { [key: string]: string } = {
    "/": "Stores",
    "/sku": "SKUs",
    "/planning": "Planning",
    "/chart": "Chart",
  };

  // Determine the active title based on the current path
  const activeTitle = pageTitles[location.pathname] || "Data Viewer";

  return (
    <nav className="w-full bg-white p-4 shadow-md border-b border-gray-300 flex justify-between items-center">
      <h1 className="text-3xl font-bold">{activeTitle}</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Login
      </button>
    </nav>
  );
}
