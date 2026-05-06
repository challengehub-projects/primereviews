import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-light mb-4">Contact Us</h1>
          <p className="text-white/60">
            Got a question, suggestion, or review request? Send us a message.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 space-y-6"
        >

          {/* NAME */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full pl-12 pr-4 py-3 bg-transparent border border-white/10 rounded-full focus:outline-none focus:border-white/40 transition"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full pl-12 pr-4 py-3 bg-transparent border border-white/10 rounded-full focus:outline-none focus:border-white/40 transition"
            />
          </div>

          {/* SUBJECT */}
          <div className="relative">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              placeholder="Subject"
              className="w-full pl-12 pr-4 py-3 bg-transparent border border-white/10 rounded-full focus:outline-none focus:border-white/40 transition"
            />
          </div>

          {/* MESSAGE */}
          <div className="relative">
            <textarea
              rows="5"
              placeholder="Your Message (optional)"
              className="w-full p-4 bg-transparent border border-white/10 rounded-2xl focus:outline-none focus:border-white/40 transition resize-none"
            />
          </div>

          {/* SUBMIT */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group w-full py-4 rounded-full bg-white text-black font-medium flex items-center justify-center gap-2 overflow-hidden"
          >
            <Send size={18} />
            Send Message
            <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" size={18} />
          </motion.button>

        </motion.form>

      </div>

    </div>
  );
}
