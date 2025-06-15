import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Signup() {
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Check for existing username
      const usernameResponse = await axios.get(
        `http://localhost:5000/users?username=${values.username}`
      );
      if (usernameResponse.data.length > 0) {
        setFieldError("username", "Username is already taken");
        setSubmitting(false);
        return;
      }

      // Check for existing email
      const emailResponse = await axios.get(
        `http://localhost:5000/users?email=${values.email}`
      );
      if (emailResponse.data.length > 0) {
        setFieldError("email", "Email is already registered");
        setSubmitting(false);
        return;
      }

      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      await axios.post("http://localhost:5000/users", newUser);
      toast.success("Signup successful!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to sign up!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
            Sign Up to See Posts from Your Friends
          </h1>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
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
                    placeholder="Enter your username"
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
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full p-3 h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
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
                    placeholder="Enter your password"
                    className="input input-bordered w-full p-3 h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="input input-bordered w-full p-3 h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-blue-600 text-white w-full p-3 h-12 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Signup;
