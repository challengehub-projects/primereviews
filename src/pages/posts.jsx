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

  useEffect(() => {

    async function load() {

      const snap = await getDoc(
        doc(db, "pages", pageId, "posts", postId)
      );

      if (snap.exists()) {
        setPost(snap.data());
      }

      loadComments();
    }

    load();

  }, [pageId, postId]);

  async function loadComments() {

    const snap = await getDocs(
      collection(db, "pages", pageId, "posts", postId, "comments")
    );

    const data = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    data.sort((a, b) =>
      (b.createdAt || 0) - (a.createdAt || 0)
    );

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

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HERO (UNCHANGED) */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <h1 className="text-4xl md:text-6xl font-bold">
            {post.title}
          </h1>

          <p className="text-white/50 mt-6">
            {post.description}
          </p>

        </div>

      </div>

      {/* GALLERY FIX */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {Array.isArray(post.gallery) && post.gallery.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5 mb-10">

            {post.gallery.map((img, i) => (
              <img
                key={i}
                src={typeof img === "string" ? img : img?.url}
                className="rounded-3xl w-full h-[350px] object-cover"
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}