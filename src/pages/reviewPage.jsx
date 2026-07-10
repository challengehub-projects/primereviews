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
    <div className="min-h-screen bg-white text-black py-12">

      {/* HEADER */}
      <div className="border-b border-gray-200 bg-white sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <h1 className="text-4xl font-light">
              Blog Reviews
            </h1>

            <p className="text-gray-500 mt-2">
              Page {pageNumber}
            </p>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className="
            w-full md:w-[340px]
            rounded-2xl
            border border-gray-300
            bg-gray-50
            px-5 py-3
            outline-none
            focus:ring-2
            focus:ring-[#d4af37]
          "
          />

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {loading && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse h-[420px] rounded-3xl bg-gray-200"
              />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-32 text-center text-gray-500 text-lg">
            No posts found.
          </div>
        )}

        {!loading && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {filtered.map((post) => {

              const img = getImage(post);

              return (

                <div
                  key={post.id}
                  className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  border border-gray-200
                  overflow-hidden
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                  flex
                  flex-col
                "
                >

                  {/* IMAGE */}
                  {img ? (

                    <div className="relative w-full aspect-[16/10] overflow-hidden">

                      <img
                        src={img}
                        alt={post.title}
                        className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        hover:scale-105
                      "
                      />

                    </div>

                  ) : (

                    <div className="aspect-[16/10] flex items-center justify-center bg-gray-100 text-gray-400">
                      No Image
                    </div>

                  )}

                  {/* BODY */}
                  <div className="p-6 flex flex-col flex-1">

                    <h2 className="text-2xl font-semibold mb-3 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 leading-7 line-clamp-3 flex-1">
                      {post.description}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/post/${id}/${post.id}`)
                      }
                      className="
                      mt-6
                      self-start
                      bg-black
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      hover:bg-[#d4af37]
                      transition
                    "
                    >
                      Read Review →
                    </button>

                  </div>

                </div>

              );

            })}

          </div>
        )}

        {/* PAGINATION */}

        <div className="flex justify-center mt-20">

          <div className="flex items-center gap-6 bg-white border border-gray-200 rounded-full shadow-lg px-6 py-4">

            <button
              onClick={goPrev}
              disabled={pageNumber <= 1}
              className="
              w-12
              h-12
              rounded-full
              bg-gray-100
              hover:bg-[#d4af37]
              hover:text-white
              disabled:opacity-40
              transition
            "
            >
              ←
            </button>

            <div className="text-lg font-medium">
              Page <span className="text-[#d4af37]">{pageNumber}</span>
            </div>

            <button
              onClick={goNext}
              className="
              w-12
              h-12
              rounded-full
              bg-gray-100
              hover:bg-[#d4af37]
              hover:text-white
              transition
            "
            >
              →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}