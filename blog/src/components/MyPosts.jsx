import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    if (!authStatus) {
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);

    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPosts(sortedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load posts! Ensure the server is running.");
      });

    // Fetch users for backward compatibility with older posts
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users! Ensure the server is running.");
      });
  }, [navigate]);

  useEffect(() => {
    if (state?.newPost && state?.newPostId) {
      const newPostWithId = { ...state.newPost, id: state.newPostId };
      setPosts((prevPosts) => {
        const updatedPosts = [
          newPostWithId,
          ...prevPosts.filter((post) => post.id !== state.newPostId),
        ];
        return updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      });
    }
  }, [state]);

  const handleImageLoad = (postId, event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setImageDimensions((prev) => ({
      ...prev,
      [postId]: { width: naturalWidth, height: naturalHeight },
    }));
  };

  if (!isAuthenticated) {
    return null;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`http://localhost:5000/posts/${id}`)
        .then(() => {
          setPosts(posts.filter((post) => post.id !== id));
          toast.success("Post deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          toast.error("Failed to delete post!");
        });
    }
  };

  const getUsername = (userId) => {
    const currentUserId = localStorage.getItem("userId");
    const currentUsername = localStorage.getItem("username");
    if (userId === currentUserId && currentUsername) {
      return currentUsername;
    }
    const user = users.find((u) => u.id === userId);
    return user ? user.username || user.name || "Unknown" : "Unknown";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">My Posts</h1>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => {
            const dimensions = imageDimensions[post.id];
            const aspectRatio = dimensions
              ? `${dimensions.width}/${dimensions.height}`
              : "16/9";
            return (
              <div
                key={post.id}
                className="bg-white p-6 rounded-lg shadow-md w-full"
              >
                <div
                  className="overflow-hidden rounded-t-lg w-full bg-gray-200"
                  style={{ aspectRatio }}
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain"
                      onLoad={(e) => handleImageLoad(post.id, e)}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-2">
                    {post.description || "No content available"}
                  </p>
                  <p className="text-gray-800 font-medium mt-2">
                    By:{" "}
                    {post.username ||
                      (post.userId ? getUsername(post.userId) : "Unknown")}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Published on: {new Date(post.date).toLocaleString()}
                  </p>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Link
                      to={`/new-post?id=${post.id}`}
                      className="btn bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="btn bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Link
        to="/new-post"
        className="fixed bottom-6 right-6 btn btn-circle bg-blue-600 text-white text-3xl hover:bg-blue-700"
      >
        +
      </Link>
    </div>
  );
}

export default MyPosts;
