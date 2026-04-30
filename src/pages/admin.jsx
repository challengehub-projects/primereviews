import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

import { db } from "../auths/firebase";

import CloudinaryModal from "../components/cloudinaryModal";

export default function AdminPage() {
  const [pageId, setPageId] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image1: "",
    image2: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [uploadTarget, setUploadTarget] = useState("image1");

  // 🔥 LIMIT
  const MAX_POSTS = 13;

  // LOAD POSTS
  async function loadPosts() {
    if (!pageId) return;

    setLoading(true);

    try {
      const ref = collection(db, "pages", pageId, "posts");
      const snap = await getDocs(ref);

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
    loadPosts();
  }, [pageId]);

  // SAVE (CREATE / UPDATE)
  async function savePost() {
    if (!pageId) return alert("Enter Page ID");

    // 🚨 LIMIT CHECK
    if (!editingId && posts.length >= MAX_POSTS) {
      alert("You can only have 13 posts per page");
      return;
    }

    setLoading(true);

    try {
      const ref = collection(db, "pages", pageId, "posts");

      if (editingId) {
        await updateDoc(doc(db, "pages", pageId, "posts", editingId), form);
        setEditingId(null);
      } else {
        await addDoc(ref, {
          ...form,
          createdAt: Date.now(),
        });
      }

      setForm({
        title: "",
        description: "",
        content: "",
        image1: "",
        image2: "",
      });

      loadPosts();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  // DELETE
  async function removePost(id) {
    if (!pageId) return;

    await deleteDoc(doc(db, "pages", pageId, "posts", id));
    loadPosts();
  }

  // EDIT
  function editPost(post) {
    setForm(post);
    setEditingId(post.id);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin CMS</h1>
          <p className="text-gray-500">Pages + 13 post cards system</p>
        </div>

        {/* PAGE SELECT */}
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Page ID"
            value={pageId}
            onChange={(e) => setPageId(e.target.value)}
          />

          <p className="text-sm text-gray-500 mt-2">
            Posts: {posts.length} / {MAX_POSTS}
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-6 space-y-3">
          <h2 className="font-bold text-lg">
            {editingId ? "Edit Post" : "Create Post"}
          </h2>

          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Content"
            rows={4}
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />

          {/* IMAGES */}
          <div className="grid md:grid-cols-2 gap-3">
            {["image1", "image2"].map((key) => (
              <div key={key} className="flex gap-2">
                <input
                  className="flex-1 border p-2 rounded"
                  value={form[key]}
                  readOnly
                  placeholder={key}
                />

                <button
                  className="bg-blue-600 text-white px-3 rounded"
                  onClick={() => {
                    setUploadTarget(key);
                    setShowModal(true);
                  }}
                >
                  Upload
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={savePost}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading
              ? "Saving..."
              : editingId
                ? "Update Post"
                : "Add Post"}
          </button>
        </div>

        {/* POSTS GRID (13 cards max system) */}
        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <h3 className="font-bold">{p.title}</h3>
              <p className="text-sm text-gray-500">
                {p.description}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => editPost(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => removePost(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CLOUDINARY MODAL */}
        {showModal && (
          <CloudinaryModal
            onClose={() => setShowModal(false)}
            onUpload={(url) => {
              setForm({
                ...form,
                [uploadTarget]: url,
              });
              setShowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}