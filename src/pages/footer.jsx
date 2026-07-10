import { FaWhatsapp, FaPhone, FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="bg-white text-black border-t border-gray-200 pt-20 pb-10 px-6">
            <div className="max-w-6xl mx-auto">

                {/* TOP GRID */}
                <div className="grid md:grid-cols-3 gap-12">

                    {/* BRAND */}
                    <div>
                        <h1 className="text-xl tracking-[6px] font-light mb-4">
                            PrimeReviews
                        </h1>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Trusted reviews, honest opinions, and in-depth research to help you
                            make smarter decisions before spending your money online.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div>
                        <h3 className="text-black mb-4 font-medium tracking-wide">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-gray-600 text-sm">
                            <li>
                                <a href="/" className="hover:text-[#d4af37] transition">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="/reviews" className="hover:text-[#d4af37] transition">
                                    Reviews
                                </a>
                            </li>

                            <li>
                                <a href="/about" className="hover:text-[#d4af37] transition">
                                    About
                                </a>
                            </li>

                            <li>
                                <a href="/contact" className="hover:text-[#d4af37] transition">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="text-black mb-4 font-medium tracking-wide">
                            Contact Us
                        </h3>

                        <div className="space-y-3 text-gray-600 text-sm">

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
                                <span>hello@primereviews.com</span>
                            </div>

                            <a
                                href="https://wa.me/2348123456789"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full bg-[#d4af37] text-white hover:opacity-90 transition"
                            >
                                <FaWhatsapp />
                                Chat on WhatsApp
                            </a>

                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-10"></div>

                {/* SOCIAL */}
                <div className="flex justify-center gap-6 text-gray-500">

                    <a
                        href="https://wa.me/2348123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#d4af37] transition"
                    >
                        <FaWhatsapp className="text-xl" />
                    </a>

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#d4af37] transition"
                    >
                        <FaInstagram className="text-xl" />
                    </a>

                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#d4af37] transition"
                    >
                        <FaFacebook className="text-xl" />
                    </a>

                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#d4af37] transition"
                    >
                        <FaTwitter className="text-xl" />
                    </a>

                    <a
                        href="mailto:hello@primereviews.com"
                        className="hover:text-[#d4af37] transition"
                    >
                        <FaEnvelope className="text-xl" />
                    </a>

                </div>

                {/* COPYRIGHT */}
                <div className="text-center mt-8 text-gray-500 text-xs tracking-wide">
                    © {new Date().getFullYear()} PrimeReviews. All rights reserved.
                </div>

            </div>
        </footer>
    );
}