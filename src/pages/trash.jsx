import { useEffect, useState } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-_RmLITahJNeHrA84wxXeWEDj8vYLJNg",
    authDomain: "blog-database-b95f7.firebaseapp.com",
    projectId: "blog-database-b95f7",
    storageBucket: "blog-database-b95f7.firebasestorage.app",
    messagingSenderId: "730060757439",
    appId: "1:730060757439:web:264a88711bb4215866a90a",
    measurementId: "G-EX3TPSYK4B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function Posts() {
  const [pages, setPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const fetchPages = async () => {
      const snapshot = await getDocs(collection(db, "pages"));
      const data = [];

      for (const doc of snapshot.docs) {
        const postsSnap = await getDocs(collection(db, "pages", doc.id, "posts"));

        const posts = postsSnap.docs.map((p) => p.data());

        data.push({
          id: doc.id,
          name: doc.data().name,
          posts,
        });
      }

      setPages(data);
    };

    fetchPages();
  }, []);

  const current = pages[pageIndex];

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <h3 className="text-2xl font-light mb-10 text-white/70">
        Latest Posts
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {current?.posts?.map((post, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
          >
            <img src={post.image} className="h-48 w-full object-cover" />

            <div className="p-4">
              <h4 className="font-light mb-2">{post.title}</h4>
              <p className="text-white/50 text-sm">{post.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-3">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setPageIndex(i)}
            className={`px-3 py-1 rounded ${
              i === pageIndex
                ? "bg-white text-black"
                : "bg-white/10 text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}