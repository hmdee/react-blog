import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post details:", error));
  }, [id]);

  if (!post) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-6 max-w-2xl mx-auto">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-2">by {post.author || "Unknown"}</p>
        <p className="text-sm text-gray-500 mb-4">Published on {post.date}</p>
        <p className="text-gray-700">{post.description}</p>
        <button
          onClick={() => navigate("/my-posts")}
          className="mt-4 btn bg-blue-600 text-white hover:bg-blue-700"
        >
          Back to Posts
        </button>
      </div>
    </div>
  );
}

export default PostDetails;
