/* // pages/PostPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { posts } from "../data/posts";
export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const index = posts.findIndex((p) => p.id === Number(id));
  const post = posts[index];

  if (!post) return <h2>Post not found</h2>;

  const goNext = () => {
    const next = (index + 1) % posts.length;
    navigate(`/post/${posts[next].id}`);
  };

  const goPrev = () => {
    const prev =
      index === 0 ? posts.length - 1 : index - 1;
    navigate(`/post/${posts[prev].id}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <img src={post.image1} width="200" />
        <img src={post.image2} width="200" />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={goPrev}>⬅️ Prev</button>
        <button onClick={goNext} style={{ marginLeft: "10px" }}>
          Next ➡️
        </button>
      </div>
    </div>
  );
} */