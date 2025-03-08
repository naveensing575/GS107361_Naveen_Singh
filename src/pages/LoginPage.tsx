import { useAuth0 } from "@auth0/auth0-react";

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to GSynergy</h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg"
        onClick={() => loginWithRedirect()}
      >
        Login with Auth0
      </button>
    </div>
  );
}
