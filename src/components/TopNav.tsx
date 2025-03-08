import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function TopNav() {
  const location = useLocation();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const pageTitles: { [key: string]: string } = {
    "/": "Stores",
    "/sku": "SKUs",
    "/planning": "Planning",
    "/chart": "Chart",
  };

  const activeTitle = pageTitles[location.pathname] || "Data Viewer";

  return (
    <nav className="w-full bg-white p-4 shadow-md border-b border-gray-300 flex justify-between items-center">
      <h1 className="text-3xl font-bold">{activeTitle}</h1>
      {isAuthenticated ? (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      )}
    </nav>
  );
}
