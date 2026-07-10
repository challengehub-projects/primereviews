import { useState } from "react";
import { db } from "../auths/firebase";
import {
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiArrowRight
} from "react-icons/fi";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const WHATSAPP_NUMBER = "2348012345678"; // change this
  const EMAIL = "support@yourdomain.com";

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function sendMessage() {
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);

    await addDoc(collection(db, "contacts"), {
      ...form,
      createdAt: Date.now()
    });

    setLoading(false);
    setSent(true);

    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-6 py-24">

      <div className="w-full max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-14">

          <h1 className="text-5xl font-light mb-4">
            Get in Touch
          </h1>

          <p className="text-gray-600 text-lg">
            We'd love to hear from you. Reach out through WhatsApp, email, or send us a message below.
          </p>

        </div>

        {/* CONTACT OPTIONS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-white border border-gray-200 shadow-lg rounded-2xl p-6 hover:border-[#d4af37] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4">

              <div className="p-4 rounded-xl bg-green-100 text-green-600">
                <FiPhone size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  WhatsApp
                </h3>

                <p className="text-gray-500 text-sm">
                  Chat with us instantly
                </p>
              </div>

            </div>

            <FiArrowRight className="text-gray-400 group-hover:text-[#d4af37] transition" />
          </a>

          {/* EMAIL */}
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center justify-between bg-white border border-gray-200 shadow-lg rounded-2xl p-6 hover:border-[#d4af37] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4">

              <div className="p-4 rounded-xl bg-blue-100 text-blue-600">
                <FiMail size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Email
                </h3>

                <p className="text-gray-500 text-sm">
                  {EMAIL}
                </p>
              </div>

            </div>

            <FiArrowRight className="text-gray-400 group-hover:text-[#d4af37] transition" />
          </a>

        </div>

        {/* CONTACT FORM */}
        <div className="bg-white border border-gray-200 shadow-xl rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-8">
            Send Us a Message
          </h2>

          {/* NAME */}
          <div className="flex items-center gap-3 border border-gray-300 rounded-2xl p-4 mb-5 bg-gray-50">

            <FiUser className="text-gray-500" />

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-transparent outline-none text-black placeholder:text-gray-400"
            />

          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-3 border border-gray-300 rounded-2xl p-4 mb-5 bg-gray-50">

            <FiMail className="text-gray-500" />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full bg-transparent outline-none text-black placeholder:text-gray-400"
            />

          </div>

          {/* MESSAGE */}
          <div className="flex gap-3 border border-gray-300 rounded-2xl p-4 mb-8 bg-gray-50">

            <FiMessageSquare className="text-gray-500 mt-1" />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows={6}
              className="w-full bg-transparent outline-none resize-none text-black placeholder:text-gray-400"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={sendMessage}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-[#d4af37] transition duration-300"
          >
            <FiSend />
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* SUCCESS */}
          {sent && (
            <p className="text-green-600 text-center mt-5 font-medium">
              ✓ Message sent successfully!
            </p>
          )}

        </div>

      </div>

    </div>
  );
}