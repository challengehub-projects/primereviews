import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AdminPage from "./pages/admin";
import LoginPage from "./pages/login";
import PageViewer from "./pages/reviewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<AdminPage />} />
         <Route path="/reviews" element={<PageViewer />} />
      </Routes>
    </BrowserRouter>
  );
}