import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"


export default function ProtectedRoute({ children }) {

  const { user, loading } = getAuth();
  const location = useLocation();

  // 🔄 LOADING STATE (PREVENT FLASH)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-pulse text-sm opacity-70">
          Loading...
        </div>
      </div>
    );
  }

  // ❌ NOT LOGGED IN → REDIRECT
  console.log(user)
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // ✅ AUTHORIZED
  return children;
}