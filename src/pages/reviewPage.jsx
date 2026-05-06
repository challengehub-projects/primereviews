import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../auths/firebase";

export function ReviewPage() {

  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(
        collection(db, "pages", id, "posts")
      );

      setPosts(snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      })));
    }

    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-2xl mb-6">Page {id}</h1>

      {/* GRID CONTAINER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {posts.map(p => (
          <div
            key={p.id}
            className="bg-white/5 border border-black rounded-2xl p-4 space-y-3"
          >

            {/* IMAGES */}
            <div className="grid grid-cols-2 gap-2">

              {p.image1 && (
                <img
                  src={p.image1}
                  className="h-40 w-full object-cover rounded-lg border border-black"
                />
              )}

              {p.image2 && (
                <img
                  src={p.image2}
                  className="h-40 w-full object-cover rounded-lg border border-black"
                />
              )}

            </div>

            {/* TITLE */}
            <h2 className="text-lg font-semibold">
              {p.title}
            </h2>

            {/* DATE */}
            <p className="text-xs text-white/40">
              {new Date(p.createdAt).toDateString()}
            </p>

            {/* DESCRIPTION */}
            <p className="text-white/60 text-sm line-clamp-3">
              {p.description}
            </p>

            {/* READ BUTTON */}
            <a
              href={`/post/${id}/${p.id}`}
              className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm"
            >
              Read Post »
            </a>

          </div>
        ))}

      </div>

    </div>
  );
}