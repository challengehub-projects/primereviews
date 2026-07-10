import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export default function ProtectedRoute({ children }) {
  const auth = getAuth();
  const location = useLocation();

  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#C9A227]/30 border-t-[#C9A227] rounded-full animate-spin" />
          <p className="text-gray-600 text-sm font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Logged in
  return children;
}