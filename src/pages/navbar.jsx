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
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
          >

            <div
              className="
              h-10 w-10 sm:h-12 sm:w-12
              rounded-xl sm:rounded-2xl
              bg-gradient-to-br
              from-[#C9A227]
              to-[#e6c85c]
              flex items-center justify-center
              shadow-lg
              "
            >
              <span className="text-white text-xl sm:text-2xl font-black">
                P
              </span>
            </div>


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

            {links.map((link)=>{

              const active =
                location.pathname === link.path ||
                (link.label==="Reviews" &&
                location.pathname.startsWith("/reviews"));

              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className="relative group py-2"
                >

                  <span
                    className={`
                    text-sm font-semibold
                    transition
                    ${
                      active
                      ? "text-[#C9A227]"
                      : "text-gray-700 group-hover:text-[#C9A227]"
                    }
                    `}
                  >
                    {link.label}
                  </span>

                  <span
                    className={`
                    absolute bottom-0 left-0
                    h-[2px]
                    bg-[#C9A227]
                    rounded-full
                    transition-all
                    ${
                      active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                    }
                    `}
                  />

                </Link>
              )
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
          <button
            onClick={()=>setOpen(!open)}
            className="
            md:hidden
            h-10 w-10
            rounded-xl
            border
            border-gray-300
            flex items-center justify-center
            bg-white
            shadow-sm
            "
          >
            {
              open
              ? <X size={22}/>
              : <Menu size={22}/>
            }
          </button>


        </div>

      </div>


      {/* MOBILE DRAWER */}
      <AnimatePresence>

      {
        open && (

          <>

          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            onClick={()=>setOpen(false)}
            className="
            fixed inset-0
            bg-black/30
            md:hidden
            "
          />


          <motion.div

            initial={{
              x:"100%"
            }}

            animate={{
              x:0
            }}

            exit={{
              x:"100%"
            }}

            transition={{
              duration:.3
            }}

            className="
            fixed
            right-0
            top-[72px]
            h-screen
            w-[85%]
            max-w-sm
            bg-white
            shadow-2xl
            md:hidden
            "

          >

            <div className="flex flex-col py-6">

            {
              links.map((link)=>{

                const active =
                location.pathname===link.path ||
                location.pathname.startsWith("/reviews");


                return (

                <Link
                  key={link.label}
                  to={link.path}
                  onClick={()=>setOpen(false)}
                  className={`
                  px-8 py-5
                  text-lg
                  border-b
                  border-gray-100
                  font-medium
                  ${
                    active
                    ?"text-[#C9A227]"
                    :"text-gray-700"
                  }
                  `}
                >
                  {link.label}
                </Link>

                )

              })
            }


            <Link
              to="/reviews/1"
              onClick={()=>setOpen(false)}
              className="
              mx-8 mt-6
              text-center
              py-3
              rounded-xl
              bg-[#C9A227]
              text-white
              font-semibold
              "
            >
              Explore Reviews
            </Link>


            </div>

          </motion.div>

          </>

        )
      }

      </AnimatePresence>


    </motion.nav>
  );
}