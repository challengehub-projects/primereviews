import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "../auths/firebase";

export default function PostPage() {
  const { pageId, postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const WHATSAPP_LINK = "https://chat.whatsapp.com/your-group-link";
  const TELEGRAM_LINK = "https://t.me/your-group-link";

  // LOAD POST
  useEffect(() => {
    async function loadPost() {
      const snap = await getDoc(
        doc(db, "pages", pageId, "posts", postId)
      );

      if (snap.exists()) {
        setPost({ id: snap.id, ...snap.data() });
      }

      loadComments();
    }

    loadPost();
  }, [pageId, postId]);

  // COMMENTS
  async function loadComments() {
    const snap = await getDocs(
      collection(db, "pages", pageId, "posts", postId, "comments")
    );

    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    setComments(data);
  }

  async function submitComment() {
    if (!name || !message) return;

    setLoading(true);

    await addDoc(
      collection(db, "pages", pageId, "posts", postId, "comments"),
      {
        name,
        message,
        createdAt: Date.now()
      }
    );

    setName("");
    setMessage("");
    await loadComments();
    setLoading(false);
  }

  console.log(post)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const sections = Array.isArray(post.sections) ? post.sections : [];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HERO */}
      <div className="border-b border-white/10 bg-gradient-to-b from-black to-[#0b0b0b]">
        <div className="max-w-5xl mx-auto px-6 py-20">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {post.title}
          </h1>

          <p className="text-white/60 mt-6 text-lg max-w-2xl">
            {post.description}
          </p>

          {/* COMMUNITY STRIP */}
          <div className="mt-8 flex flex-wrap gap-3 items-center">

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 transition font-semibold"
            >
              Join WhatsApp
            </a>

            <a
              href={TELEGRAM_LINK}
              target="_blank"
              className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-semibold"
            >
              Join Telegram
            </a>

            <div className="text-white/40 text-sm ml-2">
              Join the community for updates & signals
            </div>
          </div>

          {/* FEATURED IMAGE */}
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              className="mt-10 rounded-3xl w-full h-[450px] object-cover shadow-xl"
            />
          )}

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-12 flex gap-10">

        {/* TABLE OF CONTENTS */}
        <aside className="hidden md:block w-64 sticky top-10 h-fit">
          <h3 className="text-white/50 text-sm mb-4 tracking-wider">
            CONTENT
          </h3>

          <ul className="space-y-3 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(s.id)?.scrollIntoView({
                      behavior: "smooth"
                    });
                  }}
                  className="text-white/60 hover:text-white transition"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* ARTICLE */}
        <article className="flex-1 space-y-16">

          {sections.length === 0 && (
            <div className="text-white/40">
              No sections added to this post yet.
            </div>
          )}

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">

              <h2 className="text-3xl font-bold mb-4">
                {section.title}
              </h2>

              <p className="text-white/70 leading-7 whitespace-pre-line">
                {section.content}
              </p>

              {/* IMAGES */}
              {Array.isArray(section.images) && section.images.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {section.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="rounded-2xl w-full h-[300px] object-cover"
                    />
                  ))}
                </div>
              )}

            </section>
          ))}
        </article>
      </div>

      {/* COMMENTS */}
      <div className="max-w-5xl mx-auto px-6 py-16 border-t border-white/10">

        <h3 className="text-2xl font-bold mb-6">
          Comments
        </h3>

        <div className="space-y-3 mb-10">

          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl"
          />

          <textarea
            placeholder="Write a comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-3 rounded-xl"
          />

          <button
            onClick={submitComment}
            disabled={loading}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>

        </div>

        {/* LIST */}
        <div className="space-y-5">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white/5 p-4 rounded-xl border border-white/10"
            >
              <p className="font-semibold">{c.name}</p>
              <p className="text-white/70 mt-1">{c.message}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}