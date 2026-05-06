import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../auths/firebase";

export default function PostPage() {

  const { pageId, postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(
        doc(db, "pages", pageId, "posts", postId)
      );

      if (snap.exists()) {
        setPost(snap.data());
      }
    }

    load();
  }, [pageId, postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-2xl mx-auto space-y-5">

        {/* IMAGES (SMALLER + CLEAN) */}
        <div className="grid grid-cols-2 gap-2">

          {post.image1 && (
            <img
              src={post.image1}
              className="h-48 w-full object-cover rounded-lg border border-black"
            />
          )}

          {post.image2 && (
            <img
              src={post.image2}
              className="h-48 w-full object-cover rounded-lg border border-black"
            />
          )}

        </div>

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
          {post.title}
        </h1>

        {/* DATE */}
        <p className="text-white/40 text-xs">
          {new Date(post.createdAt).toDateString()}
        </p>

        {/* CONTENT */}
        <p className="text-white/70 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {post.content}
        </p>

        {/* JOIN BUTTONS */}
        <div className="flex flex-col md:flex-row gap-3 pt-4">

          <a
            href="https://wa.me/YOUR_NUMBER"
            className="bg-green-500 text-black px-4 py-2 rounded-full text-center text-sm"
          >
            Join WhatsApp
          </a>

          <a
            href="https://t.me/YOUR_CHANNEL"
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-center text-sm"
          >
            Join Telegram
          </a>

        </div>

      </div>

    </div>
  );
}