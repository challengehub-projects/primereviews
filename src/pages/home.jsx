import Navbar from "./navbar";
import Hero from "./hero";
import Footer from "./footer";
import FloatingArrows from "./floatingarrows";

export default function Home() {
  return (
    <div className="bg-[#0b0b0d] text-white min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Footer />
      <FloatingArrows />
    </div>
  );
}