import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import { ReviewPage } from "./pages/reviewPage";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";
import AdminPage from "./pages/admin";
import PostPage from "./pages/posts";
import ProtectedRoute from "./components/protectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={ <AdminPage />} />
        <Route path="/about" element={
          <>
          <Navbar />
           <AboutPage />
           <Footer />
          </>
         } />
         <Route path="/contact" element={
          <>
          <Navbar />
          <ContactPage />
          <Footer />
          </>
         } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reviews/:id" element={<ReviewPage />} />
        <Route path="/post/:pageId/:postId" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}