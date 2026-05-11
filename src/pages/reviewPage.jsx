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

  function nextPage() {
    navigate(`/reviews/${Number(id) + 1}`);
  }

  function prevPage() {
    if (Number(id) > 1) {
      navigate(`/reviews/${Number(id) - 1}`);
    }
  }

  const filtered = posts.filter(p => {

    const text = (
      p.title ||
      p.name ||
      p.postTitle ||
      ""
    ).toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const getImage = (post) => {

    const g = post?.gallery;

    if (Array.isArray(g) && g.length > 0) {
      return typeof g[0] === "string"
        ? g[0]
        : g[0]?.url;
    }

    if (typeof g === "string") return g;

    return post?.image || post?.imageUrl || post?.photo || null;
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HEADER (UNCHANGED) */}
      <div className="sticky top-0 z-50 bg-black/50 backdrop-blur border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-4xl font-bold">Prime Reviews</h1>
            <p className="text-white/40 mt-1">Page {id}</p>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl w-full md:w-[300px]"
          />

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* SKELETON */}
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
                <div key={post.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

                  {img ? (
                    <img
                      src={img}
                      className="h-64 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-white/30 bg-white/10">
                      No Image
                    </div>
                  )}

                  <div className="p-6">

                    <h2 className="text-xl font-bold">
                      {post.title || post.name || post.postTitle || "Untitled"}
                    </h2>

                    <p className="text-white/50 mt-2 line-clamp-3">
                      {post.description}
                    </p>

                    <button
                      onClick={() => navigate(`/post/${id}/${post.id}`)}
                      className="mt-4 bg-white text-black px-4 py-2 rounded-xl"
                    >
                      Read →
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* PAGINATION (UNCHANGED) */}
        <div className="flex justify-center gap-4 mt-20">

          <button onClick={prevPage} className="px-6 py-3 bg-white/10 rounded-xl">
            ← Previous
          </button>

          <button onClick={nextPage} className="px-6 py-3 bg-white text-black rounded-xl">
            Next →
          </button>

        </div>

      </div>
    </div>
  );
}