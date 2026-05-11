import { db } from "../auths/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setDoc,
  doc,
  updateDoc,
  getDocs,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { signOut, getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const auth = getAuth();

import CloudinaryModal from "../components/cloudinaryModal";

export default function AdminPage() {

  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [posts, setPosts] = useState([]);

  const [newPageId, setNewPageId] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image1: "",
    image2: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploadTarget, setUploadTarget] = useState("");
  const navigate = useNavigate();

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  // LOAD PAGES
  async function loadPages() {
    const snap = await getDocs(collection(db, "pages"));
    setPages(snap.docs.map(d => d.id));
  }

  // LOAD POSTS
  async function loadPosts(pageId) {
    if (!pageId) return;

    const snap = await getDocs(
      collection(db, "pages", pageId, "posts")
    );

    setPosts(snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    })));
  }

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    loadPosts(selectedPage);
  }, [selectedPage]);

  // CREATE PAGE
  async function createPage() {
    if (!newPageId) return showToast("Enter page id");

    await setDoc(doc(db, "pages", newPageId), {
      createdAt: Date.now()
    });

    showToast(`Page ${newPageId} created`);
    setNewPageId("");
    loadPages();
  }

  // CREATE / UPDATE POST (CLEAN NUMERIC ID SYSTEM)
  async function savePost() {
    if (!selectedPage) return showToast("Select page");

    const postId = editingId || String(posts.length + 1);

    await setDoc(
      doc(db, "pages", selectedPage, "posts", postId),
      {
        ...form,
        createdAt: Date.now()
      }
    );

    showToast(editingId ? "Post updated" : "Post created");

    setEditingId(null);
    setForm({
      title: "",
      description: "",
      content: "",
      image1: "",
      image2: ""
    });

    loadPosts(selectedPage);
  }

  // DELETE
  async function deletePost(id) {
    await setDoc(
      doc(db, "pages", selectedPage, "posts", id),
      {}
    );

    showToast("Post deleted");
    loadPosts(selectedPage);
  }

  function editPost(p) {
    setForm(p);
    setEditingId(p.id);
  }
 

  return (
  <div className="min-h-screen bg-[#0f0f0f] text-white flex">

    {/* SIDEBAR */}
    <aside className="w-64 bg-[#151515] border-r border-white/10 p-6 hidden md:flex flex-col">

      <h1 className="text-2xl font-bold mb-10">
        Twinkle Admin
      </h1>

      <nav className="space-y-3">

        <button className="w-full text-left px-4 py-3 rounded-xl bg-white text-black font-medium">
          Dashboard
        </button>

        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition">
          Posts
        </button>

        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition">
          Reviews
        </button>

      </nav>

      <div className="mt-auto">
        <button
          onClick={async () => {
            try {
              await signOut(auth);
              navigate("/login");
            } catch (error) {
              console.log(error);
            }
          }}
          className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl"
        >
          Sign Out
        </button>
      </div>

    </aside>

    {/* MAIN */}
    <main className="flex-1 p-4 md:p-8 overflow-y-auto">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-white text-black px-5 py-3 rounded-xl shadow-xl z-50">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="text-white/50 mt-1">
            Manage pages and posts
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-white/50 text-sm">Pages</p>
          <h3 className="text-3xl font-bold mt-2">{pages.length}</h3>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-white/50 text-sm">Posts</p>
          <h3 className="text-3xl font-bold mt-2">{posts.length}</h3>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-white/50 text-sm">Current Page</p>
          <h3 className="text-2xl font-bold mt-2">
            {selectedPage || "-"}
          </h3>
        </div>

      </div>

      {/* CREATE PAGE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">

        <h3 className="text-xl font-semibold mb-4">
          Create Page
        </h3>

        <div className="flex gap-3">

          <input
            value={newPageId}
            onChange={(e) => setNewPageId(e.target.value)}
            placeholder="Page ID"
            className="flex-1 bg-black/30 border border-white/10 p-4 rounded-xl outline-none"
          />

          <button
            onClick={createPage}
            className="bg-white text-black px-6 rounded-xl font-semibold hover:opacity-90"
          >
            Create
          </button>

        </div>

      </div>

      {/* PAGE SELECT */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">

        <h3 className="text-xl font-semibold mb-4">
          Select Page
        </h3>

        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="w-full bg-black/30 border border-white/10 p-4 rounded-xl outline-none"
        >
          <option value="">Select Page</option>

          {pages.map((p) => (
            <option key={p} value={p}>
              Page {p}
            </option>
          ))}
        </select>

      </div>

      {/* POST FORM */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">

        <h3 className="text-xl font-semibold mb-6">
          {editingId ? "Edit Post" : "Create Post"}
        </h3>

        <div className="space-y-4">

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full bg-black/30 border border-white/10 p-4 rounded-xl"
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full bg-black/30 border border-white/10 p-4 rounded-xl"
          />

          <textarea
            placeholder="Content"
            rows="6"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
            className="w-full bg-black/30 border border-white/10 p-4 rounded-xl"
          />

          {["image1", "image2"].map((key) => (
            <div key={key} className="flex gap-3">

              <input
                value={form[key]}
                readOnly
                placeholder={key}
                className="flex-1 bg-black/30 border border-white/10 p-4 rounded-xl"
              />

              <button
                onClick={() => {
                  setUploadTarget(key);
                  setShowModal(true);
                }}
                className="bg-white text-black px-5 rounded-xl font-semibold"
              >
                Upload
              </button>

            </div>
          ))}

          <button
            onClick={savePost}
            className="w-full bg-white text-black py-4 rounded-xl font-bold hover:opacity-90"
          >
            {editingId ? "Update Post" : "Create Post"}
          </button>

        </div>

      </div>

      {/* POSTS */}
      <div>

        <h3 className="text-2xl font-bold mb-6">
          Posts
        </h3>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {posts.map((p) => (
            <div
              key={p.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >

              {p.image1 && (
                <img
                  src={p.image1}
                  alt=""
                  className="w-full h-52 object-cover"
                />
              )}

              <div className="p-5">

                <h4 className="text-xl font-semibold">
                  {p.title}
                </h4>

                <p className="text-white/50 text-sm mt-2 line-clamp-3">
                  {p.description}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => editPost(p)}
                    className="flex-1 bg-yellow-500 text-black py-2 rounded-xl font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deletePost(p.id)}
                    className="flex-1 bg-red-600 py-2 rounded-xl font-semibold"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* CLOUDINARY */}
      {showModal && (
        <CloudinaryModal
          onClose={() => setShowModal(false)}
          onUpload={(url) => {
            setForm({ ...form, [uploadTarget]: url });
            setShowModal(false);
          }}
        />
      )}

    </main>

  </div>
);
}