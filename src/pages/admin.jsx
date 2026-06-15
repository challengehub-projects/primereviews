import { db } from "../auths/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  setDoc,
  doc,
  getDocs,
  collection,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { signOut, getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const auth = getAuth();

import CloudinaryModal from "../components/cloudinaryModal";

export default function AdminPage() {

  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPageId, setNewPageId] = useState("");

  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [uploadMode, setUploadMode] = useState(""); 
  // "featured" | "section"

  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // POST STRUCTURE
  const [form, setForm] = useState({
    title: "",
    description: "",
    featuredImage: "",
    sections: []
  });

  // SECTION DRAFT
  const [sectionDraft, setSectionDraft] = useState({
    title: "",
    content: "",
    images: []
  });

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
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

    setPosts(
      snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }))
    );
  }

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    loadPosts(selectedPage);
  }, [selectedPage]);

  // CREATE PAGE
  async function createPage() {
    if (!newPageId.trim()) return showToast("Enter page ID");

    await setDoc(doc(db, "pages", newPageId), {
      createdAt: Date.now()
    });

    setNewPageId("");
    loadPages();
    showToast("Page created");
  }

  // FEATURED IMAGE
  function setFeaturedImage(url) {
    setForm(prev => ({
      ...prev,
      featuredImage: url
    }));
  }

  // SECTION IMAGE
  function addImageToSection(url) {
    setSectionDraft(prev => ({
      ...prev,
      images: [...(prev.images || []), url]
    }));
  }

  // ADD SECTION
  function addSection() {
    if (!sectionDraft.title.trim()) {
      return showToast("Section title required");
    }

    const newSection = {
      id: Date.now().toString(),
      title: sectionDraft.title,
      content: sectionDraft.content,
      images: sectionDraft.images || []
    };

    setForm(prev => ({
      ...prev,
      sections: [...(prev.sections || []), newSection]
    }));

    setSectionDraft({
      title: "",
      content: "",
      images: []
    });

    showToast("Section added");
  }

  // SAVE POST
  async function savePost() {
    if (!selectedPage) return showToast("Select page");

    const postId = editingId || Date.now().toString();

    await setDoc(
      doc(db, "pages", selectedPage, "posts", postId),
      {
        ...form,
        createdAt: Date.now()
      }
    );

    setForm({
      title: "",
      description: "",
      featuredImage: "",
      sections: []
    });

    setEditingId(null);
    loadPosts(selectedPage);

    showToast(editingId ? "Post updated" : "Post created");
  }

  // DELETE POST
  async function deletePost(id) {
    await deleteDoc(doc(db, "pages", selectedPage, "posts", id));
    loadPosts(selectedPage);
    showToast("Post deleted");
  }

  // EDIT POST
  function editPost(p) {
    setForm({
      title: p.title || "",
      description: p.description || "",
      featuredImage: p.featuredImage || "",
      sections: p.sections || []
    });

    setEditingId(p.id);
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#151515] border-r border-white/10 p-6 hidden md:flex flex-col">

        <h1 className="text-2xl font-bold mb-10">Blog CMS</h1>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-black py-2 rounded-xl mb-3"
        >
          Dashboard
        </button>

        <button
          onClick={async () => {
            await signOut(auth);
            navigate("/login");
          }}
          className="bg-red-600 py-2 rounded-xl"
        >
          Sign Out
        </button>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-y-auto">

        {/* TOAST */}
        {toast && (
          <div className="fixed top-5 right-5 bg-white text-black px-4 py-2 rounded-xl">
            {toast}
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6">Blog Studio</h2>

        {/* CREATE PAGE */}
        <div className="bg-white/5 p-4 rounded-xl mb-6 flex gap-3">

          <input
            value={newPageId}
            onChange={(e) => setNewPageId(e.target.value)}
            placeholder="Create Page ID"
            className="flex-1 p-3 bg-black/40 rounded-xl"
          />

          <button
            onClick={createPage}
            className="bg-white text-black px-4 rounded-xl"
          >
            Create
          </button>

        </div>

        {/* PAGE SELECT */}
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="w-full p-3 bg-black/40 rounded-xl mb-6"
        >
          <option value="">Select Page</option>
          {pages.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {/* POST FORM */}
        <div className="bg-white/5 p-6 rounded-xl mb-8">

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full p-3 bg-black/40 rounded-xl mb-3"
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full p-3 bg-black/40 rounded-xl mb-3"
          />

          {/* FEATURED IMAGE */}
          <div className="mb-5">

            <h4 className="text-white/60 text-sm mb-2">
              Featured Image
            </h4>

            {form.featuredImage ? (
              <div className="relative">
                <img
                  src={form.featuredImage}
                  className="w-full h-52 object-cover rounded-xl"
                />

                <button
                  onClick={() =>
                    setForm(prev => ({ ...prev, featuredImage: "" }))
                  }
                  className="absolute top-2 right-2 bg-red-600 px-3 py-1 rounded-lg text-sm"
                >
                  Remove
                </button>

                <button
                  onClick={() => {
                    setUploadMode("featured");
                    setShowModal(true);
                  }}
                  className="absolute bottom-2 right-2 bg-black/70 px-3 py-1 rounded-lg text-sm"
                >
                  Replace
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setUploadMode("featured");
                  setShowModal(true);
                }}
                className="w-full p-4 border border-dashed border-white/20 rounded-xl"
              >
                + Upload Featured Image
              </button>
            )}

          </div>

          {/* SECTION BUILDER */}
          <div className="border border-white/10 p-4 rounded-xl mb-4">

            <h3 className="mb-3 font-semibold">Add Section</h3>

            <input
              placeholder="Section Title"
              value={sectionDraft.title}
              onChange={(e) =>
                setSectionDraft({ ...sectionDraft, title: e.target.value })
              }
              className="w-full p-3 bg-black/40 rounded-xl mb-3"
            />

            <textarea
              placeholder="Section Content"
              value={sectionDraft.content}
              onChange={(e) =>
                setSectionDraft({ ...sectionDraft, content: e.target.value })
              }
              className="w-full p-3 bg-black/40 rounded-xl mb-3"
            />

            {sectionDraft.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {sectionDraft.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="h-20 w-full object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setUploadMode("section");
                setShowModal(true);
              }}
              className="bg-gray-700 px-3 py-2 rounded-xl mb-3"
            >
              + Upload Image
            </button>

            <button
              onClick={addSection}
              className="bg-white text-black px-4 py-2 rounded-xl w-full"
            >
              + Add Section
            </button>

          </div>

          <button
            onClick={savePost}
            className="w-full bg-white text-black py-3 rounded-xl font-bold"
          >
            {editingId ? "Update Post" : "Create Post"}
          </button>

        </div>

        {/* POSTS */}
        <div className="grid md:grid-cols-2 gap-5">

          {posts.map((p) => (
            <div key={p.id} className="bg-white/5 p-4 rounded-xl">

              <h3 className="font-bold">{p.title}</h3>
              <p className="text-white/50 text-sm">{p.description}</p>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() => editPost(p)}
                  className="bg-yellow-500 text-black px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePost(p.id)}
                  className="bg-red-600 px-3 py-1 rounded"
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
              if (uploadMode === "featured") {
                setFeaturedImage(url);
              } else {
                addImageToSection(url);
              }
              setShowModal(false);
            }}
          />
        )}

      </main>
    </div>
  );
}