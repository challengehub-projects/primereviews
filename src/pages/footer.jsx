import { FaWhatsapp, FaPhone, FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";


export default function Footer() {
    return (
      <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">

          {/* TOP GRID */}
          <div className="grid md:grid-cols-3 gap-12">

              {/* BRAND */}
              <div>
                  <h1 className="text-xl tracking-[6px] font-light mb-4">
                     PrimeReviews
                  </h1>
                  <p className="text-white/50 text-sm leading-relaxed">
                      Luxury fashion, beauty & lifestyle brand offering premium collections
                      including bags, skincare, footwear, and natural oils.
                  </p>
              </div>

              {/* LINKS */}
              <div>
                  <h3 className="text-white/80 mb-4 font-light tracking-wide">
                      Quick Links
                  </h3>

                  <ul className="space-y-3 text-white/50 text-sm">
                      <li><a href="/" className="hover:text-[#d4af37] transition">Home</a></li>
                      <li><a href="/about" className="hover:text-[#d4af37] transition">About</a></li>
                      <li><a href="/contact" className="hover:text-[#d4af37] transition">Contact</a></li>
                  </ul>
              </div>

              {/* CONTACT */}
              <div>
                  <h3 className="text-white/80 mb-4 font-light tracking-wide">
                      Contact Us
                  </h3>

                  <div className="space-y-3 text-white/50 text-sm">

                      <div className="flex items-center gap-2">
                          <FaPhone className="text-[#d4af37]" />
                          <span>+234 812 345 6789</span>
                      </div>

                      <div className="flex items-center gap-2">
                          <FaPhone className="text-[#d4af37]" />
                          <span>+234 901 234 5678</span>
                      </div>

                      <div className="flex items-center gap-2">
                          <FaEnvelope className="text-[#d4af37]" />
                          <span>hello@peaceluxe.com</span>
                      </div>

                      {/* WHATSAPP BUTTON */}
                      <a
                          href="https://wa.me/2348123456789"
                          target="_blank"
                          className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
                      >
                          <FaWhatsapp />
                          Chat on WhatsApp
                      </a>

                  </div>
              </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex justify-center gap-6 mt-14 text-white/60">

              <a href="https://wa.me/2348123456789" target="_blank">
                  <FaWhatsapp className="text-xl hover:text-[#d4af37] transition" />
              </a>

              <a href="https://instagram.com" target="_blank">
                  <FaInstagram className="text-xl hover:text-[#d4af37] transition" />
              </a>

              <a href="https://facebook.com" target="_blank">
                  <FaFacebook className="text-xl hover:text-[#d4af37] transition" />
              </a>

              <a href="https://twitter.com" target="_blank">
                  <FaTwitter className="text-xl hover:text-[#d4af37] transition" />
              </a>

              <a href="mailto:hello@peaceluxe.com">
                  <FaEnvelope className="text-xl hover:text-[#d4af37] transition" />
              </a>

          </div>

          {/* BOTTOM TEXT */}
          <div className="text-center mt-10 text-white/30 text-xs tracking-wide">
              © {new Date().getFullYear()} ReviewStack. All rights reserved.
          </div>

      </div>
  </footer>
    );
  }