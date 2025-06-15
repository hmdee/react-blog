import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .get(
        `http://localhost:5000/users?username=${values.username}&password=${values.password}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data[0];
          localStorage.setItem("userId", user.id);
          localStorage.setItem(
            "username",
            user.username || user.name || "Unknown"
          );
          localStorage.setItem("isAuthenticated", "true");
          toast.success("Logged in successfully!");
          navigate("/my-posts");
        } else {
          toast.error("Incorrect username or password!");
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        toast.error("Failed to log in!");
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
            Welcome Back
          </h1>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    className="input input-bordered w-full p-3 h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="input input-bordered w-full p-3 h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-blue-600 text-white w-full p-3 h-12 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Login
                </button>
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
