import { motion } from "framer-motion";
import { ShieldCheck, Search, Users, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO / INTRO */}
      <section className="py-28 px-6 text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-light leading-tight mb-6"
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white/60 text-lg leading-relaxed"
        >
          We exist to bring clarity to a noisy internet. No hype. No paid bias. Just honest, well-researched reviews designed to help you make better decisions.
        </motion.p>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-light mb-6">Our Mission</h2>
        <p className="text-white/60 text-lg leading-relaxed">
          The modern internet is filled with misleading recommendations and sponsored content disguised as truth.
          <br /><br />
          Our mission is simple: deliver transparent, unbiased insights so you never waste your money or time again.
        </p>
      </section>

      {/* VALUES */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12">What We Stand For</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Honesty", icon: <ShieldCheck /> },
            { title: "Research", icon: <Search /> },
            { title: "Community", icon: <Users /> },
            { title: "Transparency", icon: <Globe /> }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <div className="flex justify-center mb-4 text-white/80">
                {item.icon}
              </div>
              <h3 className="text-lg">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6">Our Story</h2>
          <p className="text-black/70 leading-relaxed text-lg">
            This platform started with one simple frustration — not knowing which products or services to trust online.
            <br /><br />
            After encountering misleading reviews and fake recommendations, we decided to build something different.
            <br /><br />
            Today, we focus on delivering clear, structured, and honest breakdowns so anyone can make confident decisions.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-light mb-6">Start Exploring</h2>
        <p className="text-white/60 mb-10">
          Dive into our latest reviews and discover what’s actually worth your attention.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-10 py-4 rounded-full bg-white text-black font-medium"
        >
          View Reviews
        </motion.button>
      </section>

    </div>
  );
}
