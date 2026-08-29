import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Send,
} from "lucide-react";

import { db } from "../auths/firebase";

export default function PostPage() {
  const { pageId, postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [postLoading, setPostLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [commentsOpen, setCommentsOpen] = useState(false);

  const WHATSAPP_LINK = "https://chat.whatsapp.com/your-group-link";
  const TELEGRAM_LINK = "https://t.me/your-group-link";

  // =========================================================
  // LOAD POST
  // =========================================================

  useEffect(() => {
    async function loadPost() {
      try {
        setPostLoading(true);

        const postRef = doc(
          db,
          "pages",
          pageId,
          "posts",
          postId
        );

        const snap = await getDoc(postRef);

        if (snap.exists()) {
          setPost({
            id: snap.id,
            ...snap.data(),
          });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Failed to load post:", error);
        setPost(null);
      } finally {
        setPostLoading(false);
      }
    }

    if (pageId && postId) {
      loadPost();
    } else {
      setPostLoading(false);
      setPost(null);
    }
  }, [pageId, postId]);

  // =========================================================
  // LOAD COMMENTS
  // =========================================================

  useEffect(() => {
    async function loadComments() {
      try {
        setCommentsLoading(true);

        const commentsRef = collection(
          db,
          "pages",
          pageId,
          "posts",
          postId,
          "comments"
        );

        const snap = await getDocs(commentsRef);

        const data = snap.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        data.sort((a, b) => {
          const aTime = a.createdAt?.seconds
            ? a.createdAt.seconds * 1000
            : a.createdAt || 0;

          const bTime = b.createdAt?.seconds
            ? b.createdAt.seconds * 1000
            : b.createdAt || 0;

          return bTime - aTime;
        });

        setComments(data);
      } catch (error) {
        console.error("Failed to load comments:", error);
        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    }

    if (pageId && postId) {
      loadComments();
    }
  }, [pageId, postId]);

  // =========================================================
  // ADD COMMENT
  // =========================================================

  async function submitComment() {
    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanMessage || !pageId || !postId) {
      return;
    }

    try {
      setLoading(true);

      const commentsRef = collection(
        db,
        "pages",
        pageId,
        "posts",
        postId,
        "comments"
      );

      await addDoc(commentsRef, {
        name: cleanName,
        message: cleanMessage,
        createdAt: Date.now(),
      });

      setName("");
      setMessage("");

      // Reload comments after publishing.
      const snap = await getDocs(commentsRef);

      const data = snap.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      data.sort((a, b) => {
        const aTime = a.createdAt?.seconds
          ? a.createdAt.seconds * 1000
          : a.createdAt || 0;

        const bTime = b.createdAt?.seconds
          ? b.createdAt.seconds * 1000
          : b.createdAt || 0;

        return bTime - aTime;
      });

      setComments(data);
    } catch (error) {
      console.error("Failed to publish comment:", error);
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // HELPERS
  // =========================================================

  function formatDate(date) {
    if (!date) {
      return "Recently published";
    }

    const value = date?.seconds
      ? new Date(date.seconds * 1000)
      : new Date(date);

    if (Number.isNaN(value.getTime())) {
      return "Recently published";
    }

    return value.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function scrollToComments() {
    setCommentsOpen(true);

    setTimeout(() => {
      document
        .getElementById("comments")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }

  function scrollToSection(id) {
    if (!id) return;

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (postLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">

          <div className="mx-auto w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border-[3px] border-orange-500 border-t-transparent animate-spin" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Loading article
          </h2>

          <p className="mt-2 text-slate-500">
            Preparing this article for you...
          </p>

          <div className="mt-10 animate-pulse space-y-4">
            <div className="h-8 w-3/4 mx-auto rounded-lg bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-5/6 mx-auto rounded bg-slate-200" />
            <div className="h-60 mt-8 rounded-2xl bg-slate-200" />
          </div>

        </div>
      </div>
    );
  }

  // =========================================================
  // POST NOT FOUND
  // =========================================================

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">

          <div className="mx-auto w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <MessageCircle size={28} />
          </div>

          <h2 className="mt-6 text-2xl font-black text-slate-900">
            Article not found
          </h2>

          <p className="mt-2 text-slate-500">
            The article you are looking for does not exist or may have
            been removed.
          </p>

          <button
            onClick={() => navigate(`/reviews/${pageId}`)}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-slate-900
              px-6
              py-3
              text-sm
              font-bold
              text-white
              hover:bg-orange-500
              transition
            "
          >
            <ArrowLeft size={17} />
            Back to reviews
          </button>

        </div>
      </div>
    );
  }

  const sections = Array.isArray(post.sections)
    ? post.sections
    : [];

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <nav
        className="
          sticky
          top-0
          z-50
          border-b
          border-slate-200
          bg-white/95
          backdrop-blur
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            h-16
            px-5
            sm:px-6
            flex
            items-center
            justify-between
          "
        >

          <button
            onClick={() => navigate(`/reviews/${pageId}`)}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-600
              hover:text-orange-600
              transition
            "
          >
            <ArrowLeft size={17} />

            <span className="hidden sm:inline">
              Back to reviews
            </span>

            <span className="sm:hidden">
              Back
            </span>
          </button>


          <button
            onClick={() => navigate("/")}
            className="text-lg font-black tracking-tight"
          >
            <span className="text-orange-500">
              Prime
            </span>

            <span className="text-slate-900">
              Reviews
            </span>
          </button>


          <button
            onClick={scrollToComments}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-600
              hover:text-orange-600
              transition
            "
          >
            <MessageCircle size={17} />

            <span className="hidden sm:inline">
              Comments
            </span>

            <span>
              ({comments.length})
            </span>
          </button>

        </div>
      </nav>


      {/* =====================================================
          ARTICLE HEADER
      ===================================================== */}

      <header className="bg-[#fafafa]">

        <div
          className="
            max-w-5xl
            mx-auto
            px-5
            sm:px-6
            pt-12
            sm:pt-16
            lg:pt-20
            pb-10
          "
        >

          {/* Breadcrumb */}

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-slate-400
              overflow-hidden
            "
          >

            <button
              onClick={() => navigate("/")}
              className="hover:text-orange-600 transition"
            >
              Home
            </button>

            <span>
              /
            </span>

            <button
              onClick={() => navigate(`/reviews/${pageId}`)}
              className="hover:text-orange-600 transition"
            >
              Reviews
            </button>

            <span>
              /
            </span>

            <span className="truncate text-slate-600">
              {post.title}
            </span>

          </div>


          {/* Verification */}

          <div
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-orange-600
            "
          >
            <BadgeCheck size={17} />

            Verified Review
          </div>


          {/* Title */}

          <h1
            className="
              mt-5
              max-w-4xl
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-black
              leading-[1.05]
              tracking-tight
              text-slate-950
            "
          >
            {post.title}
          </h1>


          {/* Description */}

          {post.description && (
            <p
              className="
                mt-6
                max-w-3xl
                text-lg
                sm:text-xl
                leading-8
                text-slate-500
              "
            >
              {post.description}
            </p>
          )}


          {/* Metadata */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-3
              text-sm
              text-slate-500
            "
          >

            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} />

              {formatDate(post.createdAt)}
            </span>


            <span className="text-slate-300">
              •
            </span>


            <span>
              {sections.length}{" "}
              {sections.length === 1
                ? "section"
                : "sections"}
            </span>


            <span className="text-slate-300">
              •
            </span>


            <button
              onClick={scrollToComments}
              className="
                inline-flex
                items-center
                gap-2
                hover:text-orange-600
                transition
              "
            >
              <MessageCircle size={16} />

              {comments.length} comments
            </button>

          </div>

        </div>


        {/* Featured Image */}

        {post.featuredImage && (
          <div
            className="
              max-w-6xl
              mx-auto
              px-5
              sm:px-6
              pb-12
              sm:pb-16
            "
          >

            <div
              className="
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
                bg-slate-100
                shadow-xl
              "
            >

              <img
                src={post.featuredImage}
                alt={post.title || "Article featured image"}
                className="
                  block
                  w-full
                  aspect-[16/9]
                  object-cover
                "
              />

            </div>

          </div>
        )}

      </header>


      {/* =====================================================
          ARTICLE CONTENT
      ===================================================== */}

      <main
        className="
          max-w-6xl
          mx-auto
          px-5
          sm:px-6
          py-12
          sm:py-16
          lg:py-20
        "
      >

        <div
          className="
            grid
            lg:grid-cols-[220px_minmax(0,720px)]
            gap-10
            lg:gap-16
            justify-center
          "
        >

          {/* =================================================
              DESKTOP SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-24">

              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-slate-400
                  mb-5
                "
              >
                On this page
              </p>


              <div className="border-l border-slate-200">

                {sections.map((section, index) => (
                  <button
                    key={section.id || index}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className="
                      block
                      w-full
                      border-l-2
                      border-transparent
                      -ml-px
                      px-4
                      py-2
                      text-left
                      text-sm
                      leading-6
                      text-slate-500
                      hover:text-orange-600
                      hover:border-orange-500
                      transition
                    "
                  >
                    {index + 1}. {section.title}
                  </button>
                ))}

              </div>


              {/* Community */}

              <div
                className="
                  mt-8
                  pt-7
                  border-t
                  border-slate-200
                "
              >

                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-slate-400
                    mb-3
                  "
                >
                  Community
                </p>


                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    justify-between
                    py-2
                    text-sm
                    font-semibold
                    text-slate-600
                    hover:text-[#25D366]
                    transition
                  "
                >
                  WhatsApp

                  <ArrowRight size={14} />
                </a>


                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    justify-between
                    py-2
                    text-sm
                    font-semibold
                    text-slate-600
                    hover:text-[#229ED9]
                    transition
                  "
                >
                  Telegram

                  <ArrowRight size={14} />
                </a>

              </div>

            </div>

          </aside>


          {/* =================================================
              ARTICLE
          ================================================= */}

          <article className="min-w-0">

            {/* Mobile Contents */}

            {sections.length > 0 && (
              <details
                className="
                  lg:hidden
                  mb-10
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                "
              >

                <summary
                  className="
                    cursor-pointer
                    list-none
                    px-5
                    py-4
                    flex
                    items-center
                    justify-between
                    font-bold
                  "
                >
                  <span>
                    On this page
                  </span>

                  <ChevronDown size={18} />
                </summary>


                <div
                  className="
                    px-5
                    pb-5
                    space-y-3
                  "
                >

                  {sections.map((section, index) => (
                    <button
                      key={section.id || index}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className="
                        block
                        w-full
                        text-left
                        text-sm
                        text-slate-600
                        hover:text-orange-600
                        transition
                      "
                    >
                      {index + 1}. {section.title}
                    </button>
                  ))}

                </div>

              </details>
            )}


            {/* No content */}

            {sections.length === 0 && (
              <div
                className="
                  py-16
                  text-center
                  text-slate-500
                "
              >
                No article content yet.
              </div>
            )}


            {/* Sections */}

            {sections.map((section, index) => {
              const sectionId =
                section.id || `section-${index + 1}`;

              return (
                <section
                  key={section.id || index}
                  id={sectionId}
                  className="
                    scroll-mt-24
                    mb-14
                    sm:mb-18
                    lg:mb-20
                  "
                >

                  {/* Section number */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      mb-4
                    "
                  >

                    <span
                      className="
                        text-xs
                        font-bold
                        text-orange-500
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>


                    <span
                      className="
                        w-8
                        h-px
                        bg-orange-300
                      "
                    />

                  </div>


                  {/* Section title */}

                  <h2
                    className="
                      text-2xl
                      sm:text-3xl
                      lg:text-4xl
                      font-black
                      tracking-tight
                      leading-tight
                      text-slate-950
                    "
                  >
                    {section.title}
                  </h2>


                  {/* Section content */}

                  {section.content && (
                    <div
                      className="
                        mt-6
                        text-base
                        sm:text-lg
                        leading-8
                        sm:leading-9
                        text-slate-700
                        whitespace-pre-line
                      "
                    >
                      {section.content}
                    </div>
                  )}


                  {/* Section Images */}

                  {Array.isArray(section.images) &&
                    section.images.length > 0 && (
                      <div
                        className="
                          mt-8
                          space-y-6
                        "
                      >

                        {section.images.map(
                          (image, imageIndex) => (
                            <figure
                              key={imageIndex}
                              className="
                                overflow-hidden
                                rounded-2xl
                                bg-slate-100
                                border
                                border-slate-200
                              "
                            >

                              <img
                                src={image}
                                alt={`${section.title || "Section"} ${
                                  imageIndex + 1
                                }`}
                                className="
                                  block
                                  w-full
                                  max-h-[620px]
                                  object-cover
                                "
                              />

                            </figure>
                          )
                        )}

                      </div>
                    )}

                </section>
              );
            })}


            {/* Article End */}

            <div
              className="
                border-t
                border-slate-200
                pt-8
                sm:pt-10
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    font-bold
                    text-orange-500
                  "
                >
                  Have something to say?
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Join the discussion below.
                </p>

              </div>


              <button
                type="button"
                onClick={scrollToComments}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-3
                  rounded-full
                  bg-slate-900
                  text-white
                  text-sm
                  font-bold
                  hover:bg-orange-500
                  transition
                "
              >
                <MessageCircle size={17} />

                Comment
              </button>

            </div>

          </article>

        </div>

      </main>


      {/* =====================================================
          COMMUNITY
      ===================================================== */}

      <section
        className="
          border-y
          border-slate-200
          bg-[#fafafa]
        "
      >

        <div
          className="
            max-w-5xl
            mx-auto
            px-5
            sm:px-6
            py-12
            sm:py-16
            text-center
          "
        >

          <p
            className="
              text-xs
              uppercase
              tracking-[0.18em]
              font-bold
              text-orange-500
            "
          >
            Stay connected
          </p>


          <h2
            className="
              mt-3
              text-2xl
              sm:text-3xl
              font-black
              tracking-tight
            "
          >
            More insights. Less noise.
          </h2>


          <p
            className="
              mt-3
              max-w-xl
              mx-auto
              text-sm
              sm:text-base
              leading-7
              text-slate-500
            "
          >
            Follow the community for new reviews,
            useful discussions and updates.
          </p>


          <div
            className="
              mt-6
              flex
              flex-col
              sm:flex-row
              justify-center
              gap-3
            "
          >

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                px-6
                py-3
                rounded-full
                bg-[#25D366]
                text-white
                text-sm
                font-bold
                hover:bg-[#1ebe5d]
                transition
              "
            >
              Join WhatsApp
            </a>


            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                px-6
                py-3
                rounded-full
                bg-[#229ED9]
                text-white
                text-sm
                font-bold
                hover:bg-[#1688c3]
                transition
              "
            >
              Join Telegram
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMMENTS
      ===================================================== */}

      <section
        id="comments"
        className="
          border-b
          border-slate-200
          bg-white
          scroll-mt-20
        "
      >

        <div
          className="
            max-w-5xl
            mx-auto
            px-5
            sm:px-6
            py-8
            sm:py-10
          "
        >

          {/* Comment Header */}

          <button
            type="button"
            onClick={() => setCommentsOpen((value) => !value)}
            className="
              w-full
              flex
              items-center
              justify-between
              gap-5
              text-left
              group
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-full
                  bg-orange-50
                  text-orange-600
                  flex
                  items-center
                  justify-center
                "
              >
                <MessageCircle size={20} />
              </div>


              <div>

                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    font-black
                  "
                >
                  Reader comments
                </h2>


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-400
                  "
                >
                  {comments.length === 0
                    ? "Be the first to share your thoughts."
                    : `${comments.length} ${
                        comments.length === 1
                          ? "comment"
                          : "comments"
                      }`}
                </p>

              </div>

            </div>


            <div
              className="
                w-10
                h-10
                shrink-0
                rounded-full
                border
                border-slate-200
                flex
                items-center
                justify-center
                text-slate-500
                group-hover:border-orange-300
                group-hover:text-orange-600
                transition
              "
            >
              {commentsOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

          </button>


          {/* Open Comments */}

          {commentsOpen && (
            <div
              className="
                mt-8
                pt-8
                border-t
                border-slate-200
              "
            >

              {/* Comment Form */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                  sm:p-7
                "
              >

                <h3
                  className="
                    font-bold
                    text-slate-900
                  "
                >
                  Leave a comment
                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-400
                  "
                >
                  Share your thoughts respectfully.
                </p>


                <div
                  className="
                    mt-5
                    grid
                    md:grid-cols-2
                    gap-4
                  "
                >

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Your name"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      text-sm
                      outline-none
                      placeholder:text-slate-400
                      focus:border-orange-400
                      focus:ring-4
                      focus:ring-orange-500/10
                      transition
                    "
                  />

                  <div className="hidden md:block" />

                </div>


                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder="What do you think about this review?"
                  rows={5}
                  className="
                    mt-4
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-4
                    text-sm
                    leading-7
                    outline-none
                    resize-none
                    placeholder:text-slate-400
                    focus:border-orange-400
                    focus:ring-4
                    focus:ring-orange-500/10
                    transition
                  "
                />


                <div
                  className="
                    mt-4
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                  "
                >

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Your comment will be visible to other readers.
                  </p>


                  <button
                    type="button"
                    onClick={submitComment}
                    disabled={
                      loading ||
                      !name.trim() ||
                      !message.trim()
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-6
                      py-3
                      rounded-full
                      bg-slate-900
                      text-white
                      text-sm
                      font-bold
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      hover:bg-orange-500
                      transition
                    "
                  >

                    <Send size={16} />

                    {loading
                      ? "Publishing..."
                      : "Publish comment"}

                  </button>

                </div>

              </div>


              {/* Comments List */}

              <div className="mt-10">

                {commentsLoading ? (

                  <div className="space-y-5">

                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className="
                          animate-pulse
                          border-b
                          border-slate-200
                          pb-6
                        "
                      >

                        <div className="flex gap-4">

                          <div
                            className="
                              w-10
                              h-10
                              rounded-full
                              bg-slate-200
                              shrink-0
                            "
                          />


                          <div className="flex-1">

                            <div
                              className="
                                h-4
                                w-28
                                rounded
                                bg-slate-200
                              "
                            />

                            <div
                              className="
                                mt-4
                                h-4
                                w-full
                                rounded
                                bg-slate-200
                              "
                            />

                            <div
                              className="
                                mt-2
                                h-4
                                w-3/4
                                rounded
                                bg-slate-200
                              "
                            />

                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                ) : comments.length === 0 ? (

                  <div
                    className="
                      py-12
                      text-center
                      border
                      border-dashed
                      border-slate-200
                      rounded-2xl
                    "
                  >

                    <MessageCircle
                      size={24}
                      className="mx-auto text-slate-300"
                    />


                    <h3
                      className="
                        mt-3
                        font-bold
                        text-slate-800
                      "
                    >
                      No comments yet
                    </h3>


                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-400
                      "
                    >
                      Start the conversation.
                    </p>

                  </div>

                ) : (

                  <div className="space-y-7">

                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="
                          border-b
                          border-slate-200
                          pb-7
                          last:border-0
                        "
                      >

                        <div
                          className="
                            flex
                            items-start
                            gap-4
                          "
                        >

                          <div
                            className="
                              w-10
                              h-10
                              shrink-0
                              rounded-full
                              bg-gradient-to-br
                              from-orange-400
                              to-pink-500
                              text-white
                              flex
                              items-center
                              justify-center
                              font-bold
                              uppercase
                            "
                          >
                            {comment.name?.charAt(0) || "?"}
                          </div>


                          <div className="min-w-0 flex-1">

                            <div
                              className="
                                flex
                                flex-wrap
                                items-center
                                gap-x-3
                                gap-y-1
                              "
                            >

                              <h4
                                className="
                                  font-bold
                                  text-slate-900
                                "
                              >
                                {comment.name}
                              </h4>


                              <span
                                className="
                                  text-xs
                                  text-slate-400
                                "
                              >
                                Community member
                              </span>

                            </div>


                            <p
                              className="
                                mt-2
                                text-sm
                                sm:text-base
                                leading-7
                                text-slate-600
                                whitespace-pre-line
                              "
                            >
                              {comment.message}
                            </p>

                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                )}

              </div>

            </div>
          )}

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className="
          bg-[#fafafa]
          border-t
          border-slate-200
        "
      >

        <div
          className="
            max-w-6xl
            mx-auto
            px-5
            sm:px-6
            py-8
            flex
            items-center
            justify-between
            gap-5
          "
        >

          <button
            type="button"
            onClick={() => navigate(`/reviews/${pageId}`)}
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-slate-500
              hover:text-orange-600
              transition
            "
          >

            <ArrowLeft
              size={16}
              className="
                group-hover:-translate-x-1
                transition
              "
            />

            All reviews
          </button>


          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-slate-500
              hover:text-orange-600
              transition
            "
          >

            Home

            <ArrowRight
              size={16}
              className="
                group-hover:translate-x-1
                transition
              "
            />

          </button>

        </div>

      </footer>

    </div>
  );
}
