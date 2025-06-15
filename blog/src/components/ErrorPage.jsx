import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! Page Not Found</p>
        <p className="text-gray-500 mb-8">
          It seems like the page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/my-posts")}
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
