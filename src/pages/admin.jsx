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
    <div className="min-h-screen bg-[#fafafa] text-[#1b1b1b] flex">

      {/* ================= SIDEBAR ================= */}

      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col">

        <div className="p-8 border-b border-gray-200">

          <h1 className="text-3xl font-black text-[#C9A227]">
            Blog Studio
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Professional Blog Management System
          </p>

        </div>

        <div className="flex-1 p-6 space-y-3">

          <button
            onClick={() => navigate("/")}
            className="w-full text-left px-5 py-3 rounded-xl bg-[#C9A227] text-white font-semibold hover:bg-[#b8941f] transition"
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => window.open("/", "_blank")}
            className="w-full text-left px-5 py-3 rounded-xl border border-gray-300 hover:border-[#C9A227] hover:text-[#C9A227] transition"
          >
            🌐 View Website
          </button>

          <button
            onClick={async () => {
              await signOut(auth);
              navigate("/login");
            }}
            className="w-full text-left px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
          >
            🚪 Sign Out
          </button>

        </div>

        <div className="p-6 border-t border-gray-200">

          <div className="rounded-2xl bg-[#C9A227]/10 border border-[#C9A227]/20 p-5">

            <p className="text-sm font-semibold text-[#C9A227]">
              CMS Status
            </p>

            <p className="text-sm text-gray-600 mt-2">
              Everything is synced with Firebase.
            </p>

          </div>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="flex-1 overflow-y-auto">

        {/* Header */}

        <div className="bg-white border-b border-gray-200 sticky top-0 z-20">

          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

            <div>

              <h2 className="text-4xl font-black">
                Blog Dashboard
              </h2>

              <p className="text-gray-500 mt-2">
                Manage posts, pages and media.
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="px-4 py-2 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/20 text-[#C9A227] font-semibold">
                {posts.length} Posts
              </div>

              <div className="px-4 py-2 rounded-full bg-gray-100">
                {pages.length} Pages
              </div>

            </div>

          </div>

        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">

          {/* Toast */}

          {toast && (

            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700 font-medium shadow-sm">
              {toast}
            </div>

          )}

          {/* CREATE PAGE */}

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 mb-8">

            <h3 className="text-2xl font-bold mb-6">
              Create Blog Category
            </h3>

            <div className="flex flex-col md:flex-row gap-4">

              <input
                value={newPageId}
                onChange={(e) => setNewPageId(e.target.value)}
                placeholder="Example: forex, crypto, stocks..."
                className="flex-1 border border-gray-300 rounded-xl p-4 outline-none focus:border-[#C9A227]"
              />

              <button
                onClick={createPage}
                className="bg-[#C9A227] hover:bg-[#b8941f] text-white px-8 rounded-xl font-semibold transition"
              >
                Create Page
              </button>

            </div>

          </div>

          {/* PAGE */}

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 mb-8">

            <h3 className="text-xl font-bold mb-5">
              Select Blog Category
            </h3>

            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-[#C9A227]"
            >

              <option value="">
                Choose Category
              </option>

              {pages.map((p) => (
                <option
                  key={p}
                  value={p}
                >
                  {p}
                </option>
              ))}

            </select>

          </div>

          {/* POST */}

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 mb-10">

            <h3 className="text-3xl font-black mb-8">

              {editingId ? "Edit Article" : "Create New Article"}

            </h3>

            <input
              placeholder="Post Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl p-4 mb-5 outline-none focus:border-[#C9A227]"
            />

            <textarea
              rows={4}
              placeholder="Short Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl p-4 mb-8 outline-none focus:border-[#C9A227]"
            />

            {/* Featured */}

            <div className="mb-10">

              <h4 className="font-bold mb-4">
                Featured Image
              </h4>

              {form.featuredImage ? (

                <div className="relative">

                  <img
                    src={form.featuredImage}
                    className="rounded-2xl h-72 w-full object-cover border border-gray-200"
                  />

                  <button
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        featuredImage: "",
                      }))
                    }
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => {
                      setUploadMode("featured");
                      setShowModal(true);
                    }}
                    className="absolute bottom-4 right-4 bg-[#C9A227] text-white px-4 py-2 rounded-lg"
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
                  className="w-full border-2 border-dashed border-[#C9A227]/40 rounded-2xl py-12 text-[#C9A227] font-semibold hover:bg-[#C9A227]/5 transition"
                >
                  + Upload Featured Image
                </button>

              )}

            </div>

            {/* Sections */}

            <div className="border border-gray-200 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-6">
                Article Sections
              </h3>

              <input
                placeholder="Section Heading"
                value={sectionDraft.title}
                onChange={(e) =>
                  setSectionDraft({
                    ...sectionDraft,
                    title: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl p-4 mb-4"
              />

              <textarea
                rows={7}
                placeholder="Write your content..."
                value={sectionDraft.content}
                onChange={(e) =>
                  setSectionDraft({
                    ...sectionDraft,
                    content: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl p-4 mb-5"
              />

              {sectionDraft.images.length > 0 && (

                <div className="grid md:grid-cols-3 gap-4 mb-5">

                  {sectionDraft.images.map((img, i) => (

                    <img
                      key={i}
                      src={img}
                      className="rounded-xl h-36 w-full object-cover"
                    />

                  ))}

                </div>

              )}

              <div className="flex gap-4">

                <button
                  onClick={() => {
                    setUploadMode("section");
                    setShowModal(true);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl transition"
                >
                  Upload Images
                </button>

                <button
                  onClick={addSection}
                  className="bg-[#C9A227] hover:bg-[#b8941f] text-white px-6 py-3 rounded-xl transition"
                >
                  Add Section
                </button>

              </div>

            </div>

            <button
              onClick={savePost}
              className="mt-10 w-full py-4 rounded-2xl bg-[#C9A227] hover:bg-[#b8941f] text-white text-lg font-bold transition"
            >
              {editingId ? "Update Article" : "Publish Article"}
            </button>

          </div>

          {/* POSTS */}

          <div>

            <h3 className="text-3xl font-black mb-8">
              Published Articles
            </h3>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-7">

              {posts.map((p) => (

                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition"
                >

                  {p.featuredImage && (

                    <img
                      src={p.featuredImage}
                      className="h-52 w-full object-cover"
                    />

                  )}

                  <div className="p-6">

                    <h3 className="font-bold text-2xl mb-3">
                      {p.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3">
                      {p.description}
                    </p>

                    <div className="flex gap-3 mt-8">

                      <button
                        onClick={() => editPost(p)}
                        className="flex-1 bg-[#C9A227] hover:bg-[#b8941f] text-white py-3 rounded-xl font-semibold transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deletePost(p.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Upload */}

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