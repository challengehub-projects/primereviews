import { useEffect, useState } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCznEzFpUkN7YHu0UA-Htcuh1zkqbX7-EY",
  authDomain: "prime-reviews-database-757cb.firebaseapp.com",
  projectId: "prime-reviews-database-757cb",
  storageBucket: "prime-reviews-database-757cb.appspot.com",
  messagingSenderId: "833492883199",
  appId: "1:833492883199:web:9c8cba383de54dcb8e1eca",
  measurementId: "G-5X2Z4GYWLZ",
};

// ✅ INIT FIREBASE PROPERLY
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function PageViewer() {
  const [pages, setPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentPage = pages[currentIndex];

  // LOAD PAGES
  async function loadPages() {
    try {
      const snap = await getDocs(collection(db, "pages"));

      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setPages(list);
    } catch (err) {
      console.error(err);
    }
  }

  // LOAD POSTS
  async function loadPosts(pageId) {
    if (!pageId) return;

    setLoading(true);

    try {
      const snap = await getDocs(
        collection(db, "pages", pageId, "posts")
      );

      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setPosts(list);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    if (currentPage?.id) {
      loadPosts(currentPage.id);
    }
  }, [currentIndex, pages]);

  function nextPage() {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevPage() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* NAV BAR */}
      <div className="flex items-center justify-between mb-6">

        <button
          onClick={prevPage}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded disabled:opacity-40"
        >
          <FaArrowLeft />
          Prev
        </button>

        <motion.h1
          key={currentPage?.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold"
        >
          {currentPage?.id || "Loading..."}
        </motion.h1>

        <button
          onClick={nextPage}
          disabled={currentIndex === pages.length - 1}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded disabled:opacity-40"
        >
          Next
          <FaArrowRight />
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500 mb-4">Loading posts...</p>
      )}

      {/* POSTS GRID */}
      <div className="grid md:grid-cols-3 gap-5">

        {posts.slice(0, 13).map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >

            {p.image1 && (
              <img
                src={p.image1}
                className="h-40 w-full object-cover rounded-lg mb-2"
              />
            )}

            <h2 className="font-bold text-lg">{p.title}</h2>
            <p className="text-gray-500 text-sm">
              {p.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}