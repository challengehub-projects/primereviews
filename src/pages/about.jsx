import { motion } from "framer-motion";
import { ShieldCheck, Search, Users, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white text-black min-h-screen">

      {/* HERO */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-light leading-tight mb-8"
          >
            About PrimeReviews
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            We help people make smarter decisions online by providing honest,
            research-driven reviews without paid promotions, misleading claims,
            or unnecessary hype.
          </motion.p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-light mb-8">
            Our Mission
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            Every day, thousands of people spend money based on fake reviews,
            sponsored recommendations, and misleading marketing.

            <br /><br />

            PrimeReviews exists to change that.

            <br /><br />

            We carefully research products, services, and online businesses,
            presenting clear and unbiased information that helps you make
            confident decisions before spending your money.
          </p>

        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-light text-center mb-14">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              {
                title: "Honesty",
                desc: "Every review is written with integrity.",
                icon: <ShieldCheck size={30} />,
              },
              {
                title: "Research",
                desc: "We investigate before publishing.",
                icon: <Search size={30} />,
              },
              {
                title: "Community",
                desc: "Real experiences help everyone.",
                icon: <Users size={30} />,
              },
              {
                title: "Transparency",
                desc: "No hidden sponsorships or bias.",
                icon: <Globe size={30} />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center"
              >
                <div className="flex justify-center mb-5 text-[#d4af37]">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-6">
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl font-light mb-8">
            Our Story
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            PrimeReviews began with one simple idea:

            <br /><br />

            Finding trustworthy information online shouldn't be difficult.

            <br /><br />

            After seeing countless fake reviews, exaggerated claims, and paid
            promotions pretending to be genuine opinions, we decided to create a
            platform focused on transparency.

            <br /><br />

            Today, our goal remains the same—to help people spend smarter,
            avoid scams, and discover products and services that truly deliver
            value.
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-4xl font-light mb-6">
            Ready to Explore?
          </h2>

          <p className="text-white/70 text-lg mb-10">
            Browse our latest reviews and discover products and services you can
            actually trust.
          </p>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full bg-[#d4af37] text-white font-medium hover:opacity-90 transition"
          >
            View Reviews
          </motion.button>

        </div>
      </section>

    </div>
  );
}
