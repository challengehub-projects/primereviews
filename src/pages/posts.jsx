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
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-4 border-[#d4af37] border-t-transparent animate-spin" />
            </div>
          </div>

          <h2 className="text-3xl font-light text-black mb-3">
            Loading Article
          </h2>

          <p className="text-gray-500 leading-7">
            We're preparing this article for you. This will only take a moment...
          </p>

          {/* Skeleton */}
          <div className="mt-12 space-y-4 animate-pulse">

            <div className="h-6 bg-gray-200 rounded-full w-3/4 mx-auto" />

            <div className="h-4 bg-gray-200 rounded-full w-full" />

            <div className="h-4 bg-gray-200 rounded-full w-5/6 mx-auto" />

            <div className="h-56 bg-gray-200 rounded-3xl mt-8" />

          </div>

        </div>
      </div>
    );
  }

  const sections = Array.isArray(post.sections) ? post.sections : [];


  return (
    <div className="min-h-screen bg-white text-[#1b1b1b]">

      {/* HERO */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* Breadcrumb */}

          <div className="text-sm text-gray-500 mb-5">
            Home
            <span className="mx-2">/</span>
            Blog
            <span className="mx-2">/</span>
            <span className="text-[#C9A227] font-semibold">
              {post.title}
            </span>
          </div>

          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/20 text-[#C9A227] font-semibold">
            Premium Market Analysis
          </span>

          <h1 className="text-5xl lg:text-6xl font-black mt-6 leading-tight max-w-5xl">
            {post.title}
          </h1>

          <p className="text-gray-600 text-xl leading-9 mt-7 max-w-4xl">
            {post.description}
          </p>

          {/* Meta */}

          <div className="flex flex-wrap gap-8 mt-10 text-gray-500 text-sm border-t border-b border-gray-200 py-5">

            <span>
              Published Today
            </span>

            <span>
              {sections.length} Sections
            </span>

            <span>
              8 min read
            </span>

          </div>

          {/* CTA */}

          <div className="flex flex-wrap gap-5 mt-10">

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-4 rounded-xl font-semibold shadow transition-all hover:shadow-xl"
            >
              Join WhatsApp
            </a>

            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="bg-[#229ED9] hover:bg-[#1688c3] text-white px-8 py-4 rounded-xl font-semibold shadow transition-all hover:shadow-xl"
            >
              Join Telegram
            </a>

          </div>

        </div>

        {post.featuredImage && (
          <div className="max-w-7xl mx-auto px-6 pb-16">
            <img
              src={post.featuredImage}
              alt=""
              className="w-full h-[600px] rounded-2xl object-cover shadow-2xl"
            />
          </div>
        )}
      </header>

      {/* MAIN */}

      <div className="max-w-7xl mx-auto px-6 py-20 flex gap-16">

        {/* LEFT SIDEBAR */}

        <aside className="hidden lg:block w-72">

          <div className="sticky top-10">

            <div className="border border-gray-200 rounded-2xl p-7">

              <h3 className="font-bold text-[#C9A227] uppercase tracking-widest text-sm mb-6">
                Article Contents
              </h3>

              <ul className="space-y-5">

                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(s.id)
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      className="block text-gray-700 hover:text-[#C9A227] transition"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}

              </ul>

            </div>

            {/* Community */}

            <div className="mt-8 border border-gray-200 rounded-2xl p-7">

              <h4 className="font-bold mb-4">
                Join Our Community
              </h4>

              <p className="text-gray-600 text-sm mb-6">
                Receive market updates, signals and educational content every day.
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="block text-center py-3 rounded-xl bg-[#25D366] text-white font-semibold mb-3"
              >
                WhatsApp
              </a>

              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className="block text-center py-3 rounded-xl bg-[#229ED9] text-white font-semibold"
              >
                Telegram
              </a>

            </div>

          </div>

        </aside>

        {/* ARTICLE */}

        <article className="flex-1 max-w-4xl">

          {sections.length === 0 && (
            <div className="text-gray-500">
              No content yet.
            </div>
          )}

          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-24 scroll-mt-24"
            >

              <h2 className="text-4xl font-bold mb-5">
                {section.title}
              </h2>

              <div className="w-20 h-1 bg-[#C9A227] rounded-full mb-10"></div>

              <div className="text-lg leading-10 text-gray-700 whitespace-pre-line">
                {section.content}
              </div>

              {Array.isArray(section.images) &&
                section.images.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-8 mt-12">

                    {section.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="rounded-2xl shadow-lg border border-gray-200 hover:scale-[1.02] transition"
                      />
                    ))}

                  </div>
                )}

            </section>
          ))}

        </article>

      </div>

      {/* COMMENTS */}

      <section className="border-t border-gray-200 bg-[#fafafa]">

        <div className="max-w-6xl mx-auto px-6 py-20">

          <h2 className="text-4xl font-black mb-12">
            Reader Comments
          </h2>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-14">

            <div className="space-y-5">

              <input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:border-[#C9A227] outline-none"
              />

              <textarea
                rows={6}
                placeholder="Write your thoughts..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:border-[#C9A227] outline-none"
              />

              <button
                onClick={submitComment}
                disabled={loading}
                className="bg-[#C9A227] hover:bg-[#b18d1f] text-white px-8 py-4 rounded-xl font-bold transition"
              >
                {loading ? "Posting..." : "Publish Comment"}
              </button>

            </div>

          </div>

          <div className="space-y-6">

            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm"
              >

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center font-bold text-[#C9A227]">
                    {c.name.charAt(0)}
                  </div>

                  <div>

                    <h4 className="font-bold">
                      {c.name}
                    </h4>

                    <p className="text-sm text-gray-400">
                      Community Member
                    </p>

                  </div>

                </div>

                <p className="mt-6 text-gray-700 leading-8">
                  {c.message}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
}