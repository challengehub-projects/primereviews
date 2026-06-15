import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getDocs,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "../auths/firebase";

export default function ReviewPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const pageNumber = Number(id || 1);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const snap = await getDocs(
        collection(db, "pages", id, "posts")
      );

      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));

      const toTime = (t) =>
        t?.seconds ? t.seconds * 1000 : t || 0;

      data.sort((a, b) =>
        toTime(b.createdAt) - toTime(a.createdAt)
      );

      setPosts(data);
      setLoading(false);
    }

    load();
  }, [id]);

  const filtered = posts.filter(p =>
    (p.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const getImage = (post) => {
    if (post?.featuredImage) return post.featuredImage;

    if (Array.isArray(post?.sections)) {
      for (let s of post.sections) {
        if (Array.isArray(s.images) && s.images.length > 0) {
          return s.images[0];
        }
      }
    }

    return null;
  };

  function goNext() {
    navigate(`/reviews/${pageNumber + 1}`);
  }

  function goPrev() {
    if (pageNumber > 1) {
      navigate(`/reviews/${pageNumber - 1}`);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-12">

      {/* TOP BAR (CLEAN + MODERN) */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Blog Reviews
            </h1>

            <p className="text-white/40 mt-1 text-sm">
              Page {pageNumber}
            </p>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl w-full md:w-[320px] outline-none"
          />

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* LOADING */}
        {loading && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="animate-pulse h-[350px] bg-white/5 rounded-3xl" />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-32 text-white/40">
            No posts found
          </div>
        )}

        {/* GRID */}
        {!loading && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {filtered.map(post => {

              const img = getImage(post);

              return (
                <div
                  key={post.id}
                  className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
                >

                  {img ? (
                    <img
                      src={img}
                      className="h-64 w-full object-cover"
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-white/30 bg-white/10">
                      No Image
                    </div>
                  )}

                  <div className="p-6">

                    <h2 className="text-xl font-bold">
                      {post.title}
                    </h2>

                    <p className="text-white/50 mt-2 line-clamp-3">
                      {post.description}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/post/${id}/${post.id}`)
                      }
                      className="mt-4 bg-white text-black px-4 py-2 rounded-xl hover:opacity-90"
                    >
                      Read →
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* PREMIUM CENTER PAGINATION */}
        <div className="flex justify-center items-center mt-20">

          <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-4 rounded-full">

            {/* LEFT */}
            <button
              onClick={goPrev}
              disabled={pageNumber <= 1}
              className="text-white text-2xl px-4 py-2 rounded-full hover:bg-white/10 disabled:opacity-30"
            >
              ←
            </button>

            {/* PAGE NUMBER */}
            <div className="text-lg font-semibold tracking-wide px-4">
              Page <span className="text-white/60">{pageNumber}</span>
            </div>

            {/* RIGHT */}
            <button
              onClick={goNext}
              className="text-white text-2xl px-4 py-2 rounded-full hover:bg-white/10"
            >
              →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}