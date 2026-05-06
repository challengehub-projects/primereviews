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
    <div className="min-h-screen bg-black text-white p-4 md:p-8">

      {toast && (
        <div className="fixed top-4 right-4 bg-white text-black px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">

        <h1 className="text-2xl text-center">Admin</h1>

        {/* CREATE PAGE */}
        <div className="bg-white/5 p-4 rounded">
          <input
            value={newPageId}
            onChange={e => setNewPageId(e.target.value)}
            placeholder="Page ID (1,2,3)"
            className="p-3 w-full bg-black/40"
          />

          <button onClick={createPage} className="bg-white text-black mt-2 px-4 py-2">
            Create Page
          </button>
        </div>

        {/* SELECT PAGE */}
        <select
          value={selectedPage}
          onChange={e => setSelectedPage(e.target.value)}
          className="w-full p-3 bg-white/5"
        >
          <option value="">Select Page</option>
          {pages.map(p => (
            <option key={p} value={p}>
              Page {p}
            </option>
          ))}
        </select>

        {/* FORM */}
        {/* FORM */}
        <div className="bg-white/5 p-4 space-y-3">

          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 bg-black/40"
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 bg-black/40"
          />

          <textarea
            placeholder="Content"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="w-full p-3 bg-black/40"
          />

          {/* ================= IMAGES (FIXED) ================= */}
          {["image1", "image2"].map((key) => (
            <div key={key} className="flex gap-2 items-center">

              <input
                value={form[key]}
                readOnly
                placeholder={key}
                className="flex-1 p-3 bg-black/40 rounded"
              />

              <button
                onClick={() => {
                  setUploadTarget(key);
                  setShowModal(true);
                }}
                className="bg-white text-black px-4 py-2 rounded"
              >
                Upload
              </button>

            </div>
          ))}

          {/* SAVE BUTTON */}
          <button
            onClick={savePost}
            className="bg-white text-black w-full py-3 rounded"
          >
            {editingId ? "Update" : "Create"} Post
          </button>

        </div>
        {/* POSTS */}
        <div className="grid gap-4">
          {posts.map(p => (
            <div key={p.id} className="bg-white/5 p-4">

              <h3>{p.title}</h3>

              <div className="flex gap-2 mt-2">

                <button onClick={() => editPost(p)} className="bg-yellow-500 px-2">
                  Edit
                </button>

                <button onClick={() => deletePost(p.id)} className="bg-red-600 px-2">
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>



      <button
        onClick={async () => {
          try {
             await signOut(auth);
            navigate("/login");
          } catch (error) {
            console.log(error)
          }

        }}
        className="bg-red-600 text-white px-4 py-2 rounded-full"
      >
        Sign Out
      </button>

      {showModal && (
        <CloudinaryModal
          onClose={() => setShowModal(false)}
          onUpload={(url) => {
            setForm({ ...form, [uploadTarget]: url });
            setShowModal(false);
          }}
        />
      )}

    </div>
  );
}