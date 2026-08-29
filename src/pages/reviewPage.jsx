import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ArrowLeft,
  ArrowRight,
  Search,
  CalendarDays,
} from "lucide-react";

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
      try {
        setLoading(true);

        const snap = await getDocs(
          collection(db, "pages", id, "posts")
        );

        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        const toTime = (t) =>
          t?.seconds ? t.seconds * 1000 : t || 0;

        data.sort(
          (a, b) => toTime(b.createdAt) - toTime(a.createdAt)
        );

        setPosts(data);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const filtered = posts.filter((post) =>
    (post.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getImage = (post) => {
    if (post?.featuredImage) return post.featuredImage;

    if (Array.isArray(post?.sections)) {
      for (const section of post.sections) {
        if (
          Array.isArray(section.images) &&
          section.images.length > 0
        ) {
          return section.images[0];
        }
      }
    }

    return null;
  };

  const formatDate = (date) => {
    if (!date) return "";

    let timestamp;

    if (date?.seconds) {
      timestamp = new Date(date.seconds * 1000);
    } else {
      timestamp = new Date(date);
    }

    if (isNaN(timestamp.getTime())) return "";

    return timestamp.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  function goNext() {
    navigate(`/reviews/${pageNumber + 1}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goPrev() {
    if (pageNumber > 1) {
      navigate(`/reviews/${pageNumber - 1}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const featuredPost = filtered[0];
  const remainingPosts = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900">

      {/* =====================================================
          TOP NAV / BACK
      ===================================================== */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          <div className="h-16 flex items-center justify-between">

            <button
              onClick={() => navigate("/")}
              className="
                group
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-600
                hover:text-orange-600
                transition
              "
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />

              Back to home
            </button>

            <div className="text-sm font-bold tracking-wide">
              <span className="text-orange-500">Prime</span>
              <span className="text-slate-900">Reviews</span>
            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          BLOG HEADER
      ===================================================== */}
      <header className="bg-white">

        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 pb-14">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

            {/* Heading */}
            <div className="max-w-2xl">

              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
                <span className="w-8 h-px bg-orange-500" />
                Reviews
              </div>

              <h1 className="
                mt-5
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-black
                tracking-tight
                leading-[1.05]
                text-slate-950
              ">
                Honest reviews.
                <br />
                <span className="text-slate-400">
                  Better decisions.
                </span>
              </h1>

              <p className="
                mt-6
                max-w-xl
                text-lg
                leading-8
                text-slate-500
              ">
                Explore our latest reviews, research and insights
                designed to help you make smarter choices.
              </p>

            </div>


            {/* Search */}
            <div className="w-full lg:w-80">

              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Search reviews
              </label>

              <div className="relative mt-2">

                <Search
                  size={19}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    placeholder:text-slate-400
                    focus:bg-white
                    focus:border-orange-400
                    focus:ring-4
                    focus:ring-orange-500/10
                    transition
                  "
                />

              </div>

            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="max-w-6xl mx-auto px-5 sm:px-6 py-12">


        {/* LOADING */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-8">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse"
              >
                <div className="aspect-[16/9] rounded-2xl bg-slate-200" />

                <div className="mt-5 h-4 w-24 rounded bg-slate-200" />

                <div className="mt-3 h-8 w-4/5 rounded bg-slate-200" />

                <div className="mt-3 h-4 w-full rounded bg-slate-200" />

                <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
              </div>
            ))}

          </div>
        )}


        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="py-24 text-center">

            <div className="
              mx-auto
              w-14
              h-14
              rounded-full
              bg-orange-50
              flex
              items-center
              justify-center
              text-orange-500
            ">
              <Search size={22} />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No reviews found
            </h2>

            <p className="mt-2 text-slate-500">
              Try searching for something else.
            </p>

          </div>
        )}


        {!loading && filtered.length > 0 && (
          <>

            {/* =================================================
                FEATURED REVIEW
            ================================================= */}
            {featuredPost && (
              <article
                onClick={() =>
                  navigate(`/post/${id}/${featuredPost.id}`)
                }
                className="
                  group
                  cursor-pointer
                  grid
                  lg:grid-cols-[1.25fr_0.75fr]
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  overflow-hidden
                  hover:shadow-2xl
                  hover:shadow-slate-200/60
                  transition-all
                  duration-300
                "
              >

                {/* Image */}
                <div className="
                  relative
                  aspect-[16/10]
                  lg:aspect-auto
                  min-h-[320px]
                  overflow-hidden
                ">

                  {getImage(featuredPost) ? (
                    <img
                      src={getImage(featuredPost)}
                      alt={featuredPost.title}
                      className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-700
                      "
                    />
                  ) : (
                    <div className="
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-orange-400
                      via-pink-500
                      to-purple-600
                    " />
                  )}

                  <div className="
                    absolute
                    top-5
                    left-5
                    px-3
                    py-1.5
                    rounded-full
                    bg-white/95
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-800
                  ">
                    Featured Review
                  </div>

                </div>


                {/* Text */}
                <div className="
                  p-7
                  sm:p-9
                  lg:p-11
                  flex
                  flex-col
                  justify-center
                ">

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-orange-500
                  ">
                    Review

                    {featuredPost.createdAt && (
                      <>
                        <span className="text-slate-300">
                          •
                        </span>

                        <span className="text-slate-400 normal-case tracking-normal font-medium">
                          {formatDate(featuredPost.createdAt)}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="
                    mt-4
                    text-3xl
                    sm:text-4xl
                    font-black
                    tracking-tight
                    leading-tight
                    text-slate-950
                    group-hover:text-orange-600
                    transition-colors
                  ">
                    {featuredPost.title}
                  </h2>

                  {featuredPost.description && (
                    <p className="
                      mt-5
                      text-base
                      sm:text-lg
                      text-slate-500
                      leading-8
                      line-clamp-4
                    ">
                      {featuredPost.description}
                    </p>
                  )}

                  <div className="
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-bold
                    text-slate-900
                    group-hover:text-orange-600
                    transition-colors
                  ">
                    Read full review

                    <ArrowRight
                      size={18}
                      className="
                        group-hover:translate-x-1
                        transition-transform
                      "
                    />
                  </div>

                </div>

              </article>
            )}


            {/* =================================================
                LATEST REVIEWS
            ================================================= */}
            {remainingPosts.length > 0 && (
              <section className="mt-20">

                <div className="
                  flex
                  items-end
                  justify-between
                  gap-4
                  mb-8
                ">

                  <div>
                    <p className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-orange-500
                    ">
                      Latest
                    </p>

                    <h2 className="
                      mt-2
                      text-3xl
                      font-black
                      tracking-tight
                    ">
                      More reviews
                    </h2>
                  </div>

                  <span className="hidden sm:block text-sm text-slate-400">
                    {filtered.length} articles
                  </span>

                </div>


                <div className="grid md:grid-cols-2 gap-x-10 gap-y-14">

                  {remainingPosts.map((post) => {

                    const img = getImage(post);

                    return (
                      <article
                        key={post.id}
                        onClick={() =>
                          navigate(`/post/${id}/${post.id}`)
                        }
                        className="group cursor-pointer"
                      >

                        {/* Image */}
                        <div className="
                          relative
                          aspect-[16/9]
                          overflow-hidden
                          rounded-2xl
                          bg-slate-100
                        ">

                          {img ? (
                            <img
                              src={img}
                              alt={post.title}
                              className="
                                w-full
                                h-full
                                object-cover
                                group-hover:scale-105
                                transition-transform
                                duration-500
                              "
                            />
                          ) : (
                            <div className="
                              w-full
                              h-full
                              bg-gradient-to-br
                              from-orange-400
                              via-pink-500
                              to-purple-600
                            " />
                          )}

                          <div className="
                            absolute
                            top-4
                            left-4
                            px-3
                            py-1.5
                            rounded-full
                            bg-white/95
                            text-xs
                            font-bold
                            text-slate-700
                          ">
                            Review
                          </div>

                        </div>


                        {/* Meta */}
                        <div className="
                          mt-5
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-slate-400
                        ">

                          <CalendarDays size={14} />

                          {formatDate(post.createdAt) || "Recently published"}

                        </div>


                        {/* Title */}
                        <h3 className="
                          mt-3
                          text-2xl
                          sm:text-3xl
                          font-bold
                          leading-tight
                          tracking-tight
                          text-slate-900
                          group-hover:text-orange-600
                          transition-colors
                        ">
                          {post.title}
                        </h3>


                        {/* Description */}
                        {post.description && (
                          <p className="
                            mt-3
                            text-slate-500
                            leading-7
                            line-clamp-2
                          ">
                            {post.description}
                          </p>
                        )}


                        {/* Read */}
                        <div className="
                          mt-5
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-bold
                          text-slate-900
                          group-hover:text-orange-600
                          transition-colors
                        ">
                          Read review

                          <ArrowRight
                            size={16}
                            className="
                              group-hover:translate-x-1
                              transition-transform
                            "
                          />
                        </div>

                      </article>
                    );
                  })}

                </div>

              </section>
            )}


            {/* =================================================
                PAGINATION
            ================================================= */}
            <div className="
              mt-20
              pt-8
              border-t
              border-slate-200
              flex
              items-center
              justify-between
            ">

              <button
                onClick={goPrev}
                disabled={pageNumber <= 1}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  text-slate-700
                  disabled:text-slate-300
                  disabled:cursor-not-allowed
                  hover:text-orange-600
                  transition
                "
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />

                Previous
              </button>


              <div className="
                text-sm
                text-slate-400
              ">
                Page{" "}
                <span className="font-bold text-slate-900">
                  {pageNumber}
                </span>
              </div>


              <button
                onClick={goNext}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  text-slate-700
                  hover:text-orange-600
                  transition
                "
              >
                Next

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

            </div>

          </>
        )}

      </main>

    </div>
  );
}
