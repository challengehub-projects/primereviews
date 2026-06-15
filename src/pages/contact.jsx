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
    <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6 ">

      <div className="w-full max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-bold">
            Get in Touch
          </h1>

          <p className="text-white/40 mt-3">
            We respond fast — choose your preferred way.
          </p>

        </div>

        {/* CONTACT OPTIONS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            className="group flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-green-400 transition"
          >
            <div className="flex items-center gap-4">

              <div className="p-3 bg-green-500/10 text-green-400 rounded-xl">
                <FiPhone size={20} />
              </div>

              <div>
                <p className="font-semibold">WhatsApp</p>
                <p className="text-white/40 text-sm">
                  Chat with us instantly
                </p>
              </div>

            </div>

            <FiArrowRight className="text-white/40 group-hover:text-white transition" />
          </a>

          {/* EMAIL */}
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-blue-400 transition"
          >
            <div className="flex items-center gap-4">

              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                <FiMail size={20} />
              </div>

              <div>
                <p className="font-semibold">Email</p>
                <p className="text-white/40 text-sm">
                  {EMAIL}
                </p>
              </div>

            </div>

            <FiArrowRight className="text-white/40 group-hover:text-white transition" />
          </a>

        </div>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur">

          <h2 className="text-xl font-semibold mb-6">
            Send a Message
          </h2>

          {/* NAME */}
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 p-4 rounded-2xl mb-4">

            <FiUser className="text-white/40" />

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="bg-transparent w-full outline-none"
            />

          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 p-4 rounded-2xl mb-4">

            <FiMail className="text-white/40" />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="bg-transparent w-full outline-none"
            />

          </div>

          {/* MESSAGE */}
          <div className="flex gap-3 bg-black/40 border border-white/10 p-4 rounded-2xl mb-6">

            <FiMessageSquare className="text-white/40 mt-1" />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message..."
              rows="5"
              className="bg-transparent w-full outline-none resize-none"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={sendMessage}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-2xl font-semibold hover:opacity-90 transition"
          >
            <FiSend />
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* SUCCESS */}
          {sent && (
            <p className="text-green-400 text-center mt-4">
              Message sent successfully ✓
            </p>
          )}

        </div>

      </div>
    </div>
  );
}