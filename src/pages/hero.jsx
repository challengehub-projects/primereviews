import { motion } from "framer-motion";
import { useEffect, useState } from "react";


export default function Hero() {
  const text = "Honest Reviews You Can Trust";
  const [displayed, setDisplayed] = useState("");

  // Typing effect
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
    <section className="relative h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl">

        {/* TYPING TITLE */}
        <h2 className="text-5xl md:text-6xl font-light tracking-wide leading-tight min-h-[120px]">
          {displayed}
          <span className="animate-pulse">|</span>
        </h2>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-white/60 mt-6 text-lg max-w-xl mx-auto"
        >
          Discover real insights, avoid scams, and make smarter online decisions before you spend your money.
        </motion.p>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 flex justify-center"
        >
          <button className="relative px-8 py-3 rounded-full text-black bg-white font-medium transition-all duration-300 hover:scale-105">

            {/* GLOW EFFECT */}
            <span className="absolute inset-0 rounded-full bg-white blur-lg opacity-40 animate-pulse"></span>

            <span className="relative z-10">
              Explore Reviews
            </span>

          </button>
        </motion.div>

      </div>

    </section>
  );
}
 