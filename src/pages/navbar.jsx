import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "Reviews", path: "/reviews/1" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="
      fixed top-0 left-0 right-0 z-50
      backdrop-blur-xl bg-white/90
      border-b border-gray-200
      shadow-sm
    "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-4 group"
          >

            {/* Logo */}

            <div className="
        h-12 w-12
        rounded-2xl
        bg-gradient-to-br
        from-[#C9A227]
        to-[#e6c85c]
        flex
        items-center
        justify-center
        shadow-lg
        group-hover:scale-105
        transition
      ">

              <span className="text-white text-2xl font-black">
                P
              </span>

            </div>

            {/* Brand */}

            <div>

              <h1
                className="
          text-2xl
          font-black
          tracking-tight
          text-[#1b1b1b]
          group-hover:text-[#C9A227]
          transition
        "
              >
                PrimeReviews
              </h1>

              <p
                className="
          text-xs
          uppercase
          tracking-[0.35em]
          text-gray-500
        "
              >
                Finance • Trading • Analysis
              </p>

            </div>

          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-10">

            {links.map((link) => {
              const active =
                location.pathname === link.path ||
                (link.label === "Reviews" &&
                  location.pathname.startsWith("/reviews"));

              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className="relative group py-2"
                >

                  <span
                    className={`
                text-[15px]
                font-semibold
                tracking-wide
                transition
                ${active
                        ? "text-[#C9A227]"
                        : "text-gray-700 group-hover:text-[#C9A227]"
                      }
              `}
                  >
                    {link.label}
                  </span>

                  <span
                    className={`
                absolute
                left-0
                -bottom-1
                h-[2px]
                bg-[#C9A227]
                rounded-full
                transition-all
                duration-300
                ${active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                      }
              `}
                  />

                </Link>
              );
            })}

            {/* CTA */}

            <Link
              to="/reviews"
              className="
          ml-4
          px-6
          py-3
          rounded-xl
          bg-[#C9A227]
          hover:bg-[#b8941f]
          text-white
          font-semibold
          shadow-md
          hover:shadow-xl
          transition-all
        "
            >
              Explore Reviews
            </Link>

          </div>

          {/* Mobile */}

          <button
            onClick={() => setOpen(!open)}
            className="
        md:hidden
        h-11
        w-11
        rounded-xl
        border
        border-gray-300
        bg-white
        shadow-sm
        flex
        items-center
        justify-center
        hover:border-[#C9A227]
        hover:text-[#C9A227]
        transition
      "
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 md:hidden"
            />

            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="
              absolute top-full left-0 right-0
              bg-white
              border-b border-gray-200
              shadow-xl
            "
            >
              <div className="flex flex-col py-4">
                {links.map((link) => {
                  const active =
                    location.pathname === link.path ||
                    (link.label === "Reviews" &&
                      location.pathname.startsWith("/reviews"));

                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`
                      px-8 py-5 text-lg border-b border-gray-100
                      transition
                      ${active
                          ? "text-[#d4af37] font-semibold"
                          : "text-gray-700 hover:text-[#d4af37]"
                        }
                    `}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}