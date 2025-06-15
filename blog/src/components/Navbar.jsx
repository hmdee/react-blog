import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
    console.log("Logout triggered");
  };

  return (
    <div className="navbar fixed top-0 w-full z-50 p-6 bg-gray-800 text-white">
      <div className="navbar-start">
        <a className="text-2xl font-bold hover:text-gray-300 transition duration-200">
          Blog
        </a>
      </div>
      <div className="navbar-end flex items-center space-x-6">
        <Link
          to="/my-posts"
          className="btn btn-ghost text-lg hover:bg-gray-700 rounded-md px-4 py-2 transition duration-200"
        >
          Home
        </Link>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost text-lg hover:bg-gray-700 rounded-md px-4 py-2"
          >
            User
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-3 shadow-lg bg-gray-100 rounded-xl w-48"
          >
            <li>
              <a className="text-gray-900 hover:bg-gray-200 rounded-md p-2">
                Profile
              </a>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="text-gray-900 hover:bg-gray-200 rounded-md p-2 cursor-pointer"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
