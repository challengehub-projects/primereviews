import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Globe,
  MessageCircle,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const values = [
    {
      title: "Honesty",
      description:
        "We aim to present information clearly and fairly, without dressing up weak products or services.",
      icon: ShieldCheck,
    },
    {
      title: "Research",
      description:
        "We look beyond marketing claims and take the time to investigate what actually matters.",
      icon: Search,
    },
    {
      title: "Community",
      description:
        "Real experiences and thoughtful discussions help readers make better decisions.",
      icon: Users,
    },
    {
      title: "Transparency",
      description:
        "We believe readers deserve to understand how and why information is presented.",
      icon: Globe,
    },
  ];

  const reviewSteps = [
    {
      number: "01",
      title: "Investigate",
      description:
        "We look at the product, service, company, claims, available information, and important details readers should know.",
    },
    {
      number: "02",
      title: "Analyze",
      description:
        "We separate useful information from marketing language and highlight both strengths and potential concerns.",
    },
    {
      number: "03",
      title: "Explain",
      description:
        "We turn the information into a clear review that is easier to understand and act on.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">

          {/* Logo */}

          <Link
            to="/"
            className="text-lg font-black tracking-tight transition hover:opacity-70"
          >
            <span className="text-orange-500">Prime</span>
            <span className="text-slate-900">Reviews</span>
          </Link>

          {/* Navigation */}

          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-semibold text-slate-500 transition hover:text-orange-600"
            >
              Home
            </Link>

            <Link
              to="/reviews"
              className="text-sm font-semibold text-slate-500 transition hover:text-orange-600"
            >
              Reviews
            </Link>

            <Link
              to="/about"
              className="text-sm font-semibold text-orange-600"
            >
              About
            </Link>
          </div>

          {/* CTA */}

          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500"
          >
            <span className="hidden sm:inline">Explore Reviews</span>
            <span className="sm:hidden">Reviews</span>
            <ArrowRight size={15} />
          </Link>

        </div>
      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <header className="relative overflow-hidden border-b border-slate-100 bg-[#fafafa]">

        {/* Background decoration */}

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-100/60 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-50 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-16 text-center sm:px-6 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">

          {/* Breadcrumb */}

          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <Link
              to="/"
              className="transition hover:text-orange-600"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-slate-600">
              About
            </span>
          </div>

          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-600"
          >
            <BadgeCheck size={15} />
            About PrimeReviews
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
          >
            Helping you make
            <span className="block text-orange-500">
              smarter decisions.
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-500 sm:text-xl"
          >
            PrimeReviews is a review and research platform built to
            help people understand products, services, and online
            businesses before they spend their money.
          </motion.p>

          {/* Actions */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/reviews"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-orange-500 sm:w-auto"
            >
              Explore our reviews
              <ArrowRight size={16} />
            </Link>

            <a
              href="#mission"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-600 sm:w-auto"
            >
              Learn more
            </a>
          </motion.div>

        </div>
      </header>


      {/* =====================================================
          MISSION
      ===================================================== */}

      <section
        id="mission"
        className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-5xl">

          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
                Our mission
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Less hype.
                <span className="block text-slate-400">
                  More clarity.
                </span>
              </h2>
            </div>

            <div className="text-base leading-8 text-slate-600 sm:text-lg">

              <p>
                The internet is full of recommendations. The difficult
                part is knowing which ones deserve your attention.
              </p>

              <p className="mt-6">
                PrimeReviews exists to make that process easier. We
                research products, services, and online businesses and
                turn what we find into straightforward reviews that
                readers can actually use.
              </p>

              <p className="mt-6">
                Our goal isn't to tell you what to buy. It's to give you
                enough useful information to make the decision for
                yourself.
              </p>

              <Link
                to="/reviews"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700"
              >
                Read our latest reviews
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="border-y border-slate-200 bg-[#fafafa] px-5 py-16 sm:px-6 sm:py-24">

        <div className="mx-auto max-w-6xl">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
              What we stand for
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              The principles behind every review.
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Good reviews should help people understand what they are
              getting into, not simply convince them to click a button.
            </p>

          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-7"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-6 text-lg font-black text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          HOW WE REVIEW
      ===================================================== */}

      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:py-28">

        <div className="mx-auto max-w-5xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
              Our approach
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              How we approach reviews.
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              We focus on useful information rather than simply
              repeating what a company says about itself.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {reviewSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >

                <div className="text-4xl font-black text-orange-500">
                  {step.number}
                </div>

                <h3 className="mt-6 text-xl font-black">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.description}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          STORY
      ===================================================== */}

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-6 sm:py-24 lg:py-28">

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400">
              Our story
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Built around a simple idea.
            </h2>

          </div>


          <div className="text-base leading-8 text-slate-300 sm:text-lg">

            <p>
              Finding trustworthy information online shouldn't be
              difficult.
            </p>

            <p className="mt-6">
              PrimeReviews was created around that idea. Instead of
              adding more noise to an already crowded internet, we want
              to create useful, understandable reviews that help readers
              slow down and make informed choices.
            </p>

            <p className="mt-6">
              As the platform grows, our focus remains the same:
              transparency, useful research, and a better experience for
              people trying to decide where to spend their time and
              money.
            </p>

            <Link
              to="/reviews"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-orange-500 hover:text-white"
            >
              Browse reviews
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          DISCOVER
      ===================================================== */}

      <section className="bg-[#fafafa] px-5 py-16 sm:px-6 sm:py-24">

        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
                Keep exploring
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Useful information starts here.
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                Explore reviews, learn more about our approach, or join
                the conversation with other readers.
              </p>

            </div>

            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700"
            >
              View all reviews
              <ArrowRight size={16} />
            </Link>

          </div>


          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {/* Reviews */}

            <Link
              to="/reviews"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <BookOpen size={21} />
              </div>

              <h3 className="mt-6 text-xl font-black">
                Read Reviews
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore our latest reviews and research before making
                your next decision.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
                Explore
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>

            </Link>


            {/* About */}

            <Link
              to="/about"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <BadgeCheck size={21} />
              </div>

              <h3 className="mt-6 text-xl font-black">
                About PrimeReviews
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Learn about our mission, values, and the principles
                behind the platform.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
                Our story
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>

            </Link>


            {/* Community */}

            <a
              href="https://chat.whatsapp.com/your-group-link"
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <MessageCircle size={21} />
              </div>

              <h3 className="mt-6 text-xl font-black">
                Join the Community
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Connect with other readers, share experiences, and
                discuss reviews.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-600">
                Join WhatsApp
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>

            </a>

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="border-t border-slate-200 bg-white px-5 py-16 sm:px-6 sm:py-24">

        <div className="mx-auto max-w-3xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <Search size={21} />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
            Ready to make a better decision?
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            Explore PrimeReviews and discover information designed to
            help you research before you buy.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              to="/reviews"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-orange-500 sm:w-auto"
            >
              Explore Reviews
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-7 py-3.5 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-600 sm:w-auto"
            >
              Back Home
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-slate-200 bg-[#fafafa]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-6">

          <Link
            to="/"
            className="text-lg font-black tracking-tight"
          >
            <span className="text-orange-500">Prime</span>
            <span className="text-slate-900">Reviews</span>
          </Link>


          <div className="flex items-center gap-6 text-sm font-semibold text-slate-500">

            <Link
              to="/"
              className="transition hover:text-orange-600"
            >
              Home
            </Link>

            <Link
              to="/reviews"
              className="transition hover:text-orange-600"
            >
              Reviews
            </Link>

            <Link
              to="/about"
              className="transition hover:text-orange-600"
            >
              About
            </Link>

          </div>


          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} PrimeReviews
          </p>

        </div>

      </footer>

    </div>
  );
}
