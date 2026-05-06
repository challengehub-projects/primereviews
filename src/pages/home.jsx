import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck, Search, Users } from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function HomePage() {
  const text = "Honest Reviews You Can Trust";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Navbar />
      <div className="bg-black text-white">


      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-light tracking-wide leading-tight min-h-[120px]">
            {displayed}
            <span className="animate-pulse">|</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-white/60 mt-6 text-lg max-w-xl mx-auto"
          >
            Discover real insights, avoid scams, and make smarter online decisions.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-10 relative px-10 py-4 rounded-full bg-white text-black font-medium overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition duration-700"></span>
            <span className="relative z-10">Explore Reviews</span>
          </motion.button>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-light mb-6">Who We Are</h3>
        <p className="text-white/60 text-lg leading-relaxed">
          We cut through noise, hype, and fake promises. Every review you see here is built on research, real user experience, and honesty — nothing more, nothing less.
        </p>
      </section>

      {/* CARDS WITH ICONS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "No Fake Reviews",
              icon: <ShieldCheck size={28} />
            },
            {
              title: "Deep Research",
              icon: <Search size={28} />
            },
            {
              title: "Real User Insights",
              icon: <Users size={28} />
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-md text-center border border-white/10 hover:border-white/30 transition"
            >
              <div className="flex justify-center mb-4 text-white/80">
                {item.icon}
              </div>
              <h4 className="text-xl mb-3">{item.title}</h4>
              <p className="text-white/50 text-sm">
                We focus on clarity and truth so you always know what you're getting into.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EPIC ABOUT */}
      <section className="relative py-28 px-6 text-center overflow-hidden">

        {/* glow background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-2xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h3 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
            Built for clarity in a world full of noise
          </h3>

          <p className="text-white/60 text-lg leading-relaxed">
            The internet is filled with paid opinions, fake hype, and misleading promises.
            <br /><br />
            This platform exists to change that.
            <br /><br />
            Every review is carefully broken down, simplified, and made transparent — so you don’t waste your time or your money.
          </p>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center">
        <h3 className="text-3xl font-light mb-6">Ready to Explore?</h3>
        <p className="text-white/60 mb-10">
          Start discovering products and services that actually deliver value.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative px-12 py-4 rounded-full bg-white text-black font-medium overflow-hidden"
        >
          <span className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition"></span>
          <span className="relative z-10">View Reviews</span>
        </motion.button>
      </section>

    
    </div>
    <Footer />
    </>
  
    
  );
}
