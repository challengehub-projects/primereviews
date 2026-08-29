import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Search,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

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

      if (i > text.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Verified Reviews",
      description:
        "We focus on real products, services and businesses so you can understand what you're actually getting.",
      icon: ShieldCheck,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Deep Research",
      description:
        "We look beyond marketing claims and dig into features, pricing, performance and real-world experiences.",
      icon: Search,
      color: "from-sky-500 to-blue-600",
    },
    {
      title: "Community Insights",
      description:
        "Real experiences from users help us identify the strengths, weaknesses and details that matter most.",
      icon: Users,
      color: "from-emerald-500 to-green-600",
    },
  ];

  const steps = [
    "We research the product or service.",
    "We compare available information and user experiences.",
    "We identify the important pros, cons and potential problems.",
    "We present everything clearly so you can decide for yourself.",
  ];

  return (
    <div className="bg-white text-slate-900">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
            alt="People discussing and researching together"
            className="w-full h-full object-cover"
          />

          {/* Your original color identity */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-pink-600/80 to-indigo-800/90" />

          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Decorative glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-300/30 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-300/20 blur-[150px] rounded-full" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="max-w-4xl">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-white text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              Trusted by readers
            </motion.div>

            {/* Heading */}
            <h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.98] text-white">
              {displayed}
              <span className="animate-pulse text-orange-200">|</span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-7 max-w-2xl text-lg sm:text-xl lg:text-2xl leading-8 text-white/90"
            >
              Honest reviews, deep research and trusted recommendations
              designed to help you make smarter decisions before spending
              your money.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="/reviews/1"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-orange-600 font-bold shadow-2xl hover:shadow-white/20 transition"
              >
                Explore Reviews
                <ArrowRight size={18} />
              </motion.a>

              <motion.a
                href="/about"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/40 bg-white/10 backdrop-blur text-white font-semibold hover:bg-white/20 transition"
              >
                Learn How We Review
              </motion.a>
            </motion.div>
          </div>

          {/* Small trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex flex-wrap gap-x-8 gap-y-4 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              Research-focused
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              Transparent opinions
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              Reader-first
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          INTRO / ABOUT
      ===================================================== */}
      <section className="py-24 lg:py-32 bg-sky-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* Left */}
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
                Why us
              </span>

              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                Reviews backed by research.
              </h2>
            </div>

            {/* Right */}
            <div>
              <p className="text-lg lg:text-xl text-slate-600 leading-9">
                The internet gives you thousands of opinions, but finding
                useful information can be difficult. We bring research,
                comparisons and real experiences together in one place.
              </p>

              <p className="mt-6 text-lg text-slate-600 leading-9">
                Our goal is simple: give you enough honest information to make
                a confident decision without having to spend hours researching
                everything yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section heading */}
          <div className="max-w-2xl mb-14">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              What we do
            </span>

            <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
              More than just star ratings.
            </h2>

            <p className="mt-5 text-lg text-slate-600 leading-8">
              We look at the details behind the rating so you can understand
              what makes something worth your time and money.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-7">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Color bar */}
                  <div
                    className={`h-1.5 bg-gradient-to-r ${item.color}`}
                  />

                  <div className="p-8 lg:p-9">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={28} />
                    </div>

                    <h3 className="mt-7 text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-slate-600 leading-7">
                      {item.description}
                    </p>

                    <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      Learn more
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-purple-600">
                Our process
              </span>

              <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                We make the research easier.
              </h2>

              <p className="mt-6 text-lg text-slate-600 leading-8">
                Instead of relying on one opinion, we bring together multiple
                sources of information and turn them into something simple and
                useful.
              </p>

              <a
                href="/about"
                className="inline-flex items-center gap-2 mt-8 font-bold text-purple-600 hover:text-purple-700"
              >
                Learn about our methodology
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Steps */}
            <div className="space-y-5">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold flex items-center justify-center">
                    {index + 1}
                  </div>

                  <p className="text-slate-700 font-medium leading-7">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DARK MISSION SECTION
      ===================================================== */}
      <section className="relative overflow-hidden py-28 lg:py-36 bg-slate-950">
        {/* Glow */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-orange-500/20 blur-[150px]" />

        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[150px]" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/10 text-orange-300 text-sm font-bold uppercase tracking-widest">
            Our mission
          </span>

          <h2 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Built for clarity.
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-lg lg:text-xl text-slate-300 leading-9">
            The internet is filled with sponsored opinions, misleading
            recommendations and reviews that don't tell the full story.
          </p>

          <p className="mt-5 max-w-3xl mx-auto text-lg lg:text-xl text-slate-300 leading-9">
            We believe reviews should be transparent, useful and easy to
            understand. That's why we focus on research and honest information
            first.
          </p>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="relative overflow-hidden py-28 lg:py-36 px-6 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-700">
        {/* Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-[100px]" />

        <div className="absolute -bottom-32 -right-20 w-[450px] h-[450px] rounded-full bg-cyan-300/20 blur-[130px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/20 backdrop-blur text-white text-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-white" />
            Start exploring
          </span>

          <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Ready to make a smarter decision?
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg lg:text-xl text-white/90 leading-8">
            Explore detailed reviews, compare products and discover useful
            information before you spend your money.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="/reviews/1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-white text-orange-600 font-bold shadow-2xl"
            >
              Browse Reviews
              <ArrowRight size={18} />
            </motion.a>

            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center px-9 py-4 rounded-full border-2 border-white/70 text-white font-bold hover:bg-white/10 transition"
            >
              About Us
            </motion.a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
