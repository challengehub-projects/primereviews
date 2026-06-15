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
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-xl bg-black/50
        border-b border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="
              text-white text-xl font-light tracking-[6px]
              hover:text-[#d4af37] transition
            "
          >
            PrimeReviews
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-12">

            {links.map((link) => {

              const active =
                location.pathname === link.path ||
                (link.label === "Reviews" &&
                  location.pathname.startsWith("/reviews"));

              return (
                <Link key={link.label} to={link.path} className="relative group">

                  <span className={`
                    transition tracking-wide
                    ${active ? "text-[#d4af37]" : "text-white/70 group-hover:text-[#d4af37]"}
                  `}>
                    {link.label}
                  </span>

                  <span className={`
                    absolute left-0 -bottom-2 h-[1px]
                    bg-[#d4af37] transition-all duration-500
                    ${active ? "w-full" : "w-0 group-hover:w-full"}
                  `} />

                  <span className={`
                    absolute left-1/2 -bottom-[5px]
                    w-1 h-1 rounded-full bg-[#d4af37]
                    transition
                    ${active ? "opacity-100 scale-150" : "opacity-0"}
                  `} />

                </Link>
              );
            })}

          </div>

          {/* MOBILE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
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
              className="fixed inset-0 bg-black/50 md:hidden"
            />

            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="absolute top-full left-0 right-0 bg-black/95 border-b border-white/10"
            >
              <div className="flex flex-col py-6">

                {links.map((link, i) => {

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
                        px-8 py-5 text-lg border-b border-white/5
                        ${active ? "text-[#d4af37]" : "text-white/80"}
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