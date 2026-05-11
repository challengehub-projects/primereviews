import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    <div className="bg-black text-white">

      {/* HERO SECTION */}
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
            Discover real insights, avoid scams, and make smarter online decisions before you spend your money.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-10 flex justify-center"
          >
            <button className="relative px-8 py-3 rounded-full text-black bg-white font-medium transition-all duration-300 hover:scale-105">
              <span className="absolute inset-0 rounded-full bg-white blur-lg opacity-40 animate-pulse"></span>
              <span className="relative z-10">Explore Reviews</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CARDS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-light mb-10 text-center">Featured Reviews</h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[1,2,3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h4 className="text-xl font-medium mb-2">Product Review {item}</h4>
                <p className="text-white/60 text-sm">
                  Honest breakdown of features, pricing, and whether it's worth your money.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-light mb-6">Why Trust Us?</h3>
          <p className="text-black/70 text-lg leading-relaxed">
            We cut through the noise of fake reviews and paid promotions. Our mission is to give you clear, honest, and unbiased insights so you can make confident decisions online.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 text-center">
        <h3 className="text-3xl font-light mb-6">Start Exploring</h3>
        <p className="text-white/60 mb-8">
          Browse our latest reviews and discover what’s truly worth it.
        </p>
        <button className="px-8 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition">
          View All Reviews
        </button>
      </section>

    </div>
  );
}
