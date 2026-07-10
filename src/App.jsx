import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Home from "./pages/home";
import LoginPage from "./pages/login";
import ReviewPage from "./pages/reviewPage";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import AdminPage from "./pages/admin";
import PostPage from "./pages/posts";

import Navbar from "./pages/navbar";
import Footer from "./pages/footer";

import ProtectedRoute from "./components/protectedRoute";

/* 🔥 GLOBAL LAYOUT (THIS FIXES EVERYTHING) */
function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col">

      {/* Fixed navbar */}
      <Navbar />

      {/* IMPORTANT: pushes content below navbar */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

/* 🔥 SIMPLE LAYOUT WITHOUT FOOTER (for admin/login) */
function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC SITE */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reviews/:id" element={<ReviewPage />} />
          <Route path="/post/:pageId/:postId" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* ADMIN (no footer usually) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}