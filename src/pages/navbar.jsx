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
      transition={{ duration: 0.6 }}
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white/90 backdrop-blur-xl
        border-b border-gray-200
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="min-h-[72px] flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
        
              <span className="text-white text-xl sm:text-2xl font-black">
                <img src="favicon.svg" alt="Logo" />
              </span>
           

            <div className="leading-tight">
              <h1
                className="
                  text-lg sm:text-2xl
                  font-black
                  tracking-tight
                  text-[#1b1b1b]
                "
              >
                PrimeReviews
              </h1>

              <p
                className="
                  hidden xs:block
                  text-[9px] sm:text-xs
                  uppercase
                  tracking-[0.25em]
                  text-gray-500
                "
              >
                Finance • Trading • Analysis
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
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
                    className={`text-sm font-semibold transition ${active
                        ? "text-[#C9A227]"
                        : "text-gray-700 group-hover:text-[#C9A227]"
                      }`}
                  >
                    {link.label}
                  </span>

                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C9A227] rounded-full transition-all ${active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              );
            })}

            <Link
              to="/reviews/1"
              className="
                px-5 py-2.5
                rounded-xl
                bg-[#C9A227]
                hover:bg-[#b8941f]
                text-white
                font-semibold
                shadow-md
                transition
              "
            >
              Explore Reviews
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="
    flex md:hidden
    items-center justify-center
    w-11 h-11
    rounded-xl
    border border-gray-200
    bg-white
    text-[#1b1b1b]
    hover:bg-gray-100
    transition
    shadow-sm
  "
          >
            {open ? (
              <X className="w-6 h-6" strokeWidth={2.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden
              absolute
              top-full
              left-0
              w-full
              bg-white
              border-b border-gray-200
              shadow-xl
              overflow-hidden
            "
          >
            <div className="flex flex-col">
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
                    className={`px-6 py-4 text-base font-medium transition ${active
                        ? "text-[#C9A227] bg-[#C9A227]/5"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#C9A227]"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="p-6 pt-2">
                <Link
                  to="/reviews/1"
                  onClick={() => setOpen(false)}
                  className="
                    block
                    w-full
                    text-center
                    py-3
                    rounded-xl
                    bg-[#C9A227]
                    hover:bg-[#b8941f]
                    text-white
                    font-semibold
                    transition
                  "
                >
                  Explore Reviews
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}