import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import MyPosts from "./components/MyPosts.jsx";
import PostDetails from "./components/PostDetails.jsx";
import NewPost from "./components/NewPost.jsx";
import Navbar from "./components/Navbar.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Navigate to="/my-posts" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/post-details/:id" element={<PostDetails />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
