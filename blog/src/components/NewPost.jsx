import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

const NewPostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

function NewPost() {
  const [image, setImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get("id");

  useEffect(() => {
    if (postId) {
      axios
        .get(`http://localhost:5000/posts/${postId}`)
        .then((response) => {
          const post = response.data;
          setImage(post.image || null);
          setInitialValues({
            title: post.title || "",
            description: post.description || "",
          });
        })
        .catch((error) =>
          console.error("Error fetching post for edit:", error)
        );
    }
  }, [postId]);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const formData = new FormData();
      formData.append("image", compressedFile);
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=003267b865ac8b05bffd6dc01d2b1d98",
        formData
      );
      setImage(response.data.data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image!");
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username") || "Unknown";
    const updatedPost = {
      title: values.title,
      description: values.description,
      image: image || (postId ? undefined : ""),
      date: new Date().toISOString(),
      userId: userId,
      username: username,
    };
    if (postId) {
      axios
        .put(`http://localhost:5000/posts/${postId}`, updatedPost)
        .then(() => {
          navigate("/my-posts");
          toast.success("Post updated successfully!");
          setSubmitting(false);
        })
        .catch((error) => {
          console.error("Error updating post:", error);
          toast.error("Failed to update post!");
          setSubmitting(false);
        });
    } else {
      axios
        .post("http://localhost:5000/posts", updatedPost)
        .then((response) => {
          const newPostId = response.data.id || response.data.name;
          navigate("/my-posts", { state: { newPost: updatedPost, newPostId } });
          toast.success("Post created successfully!");
          setSubmitting(false);
        })
        .catch((error) => {
          console.error("Error creating post:", error);
          toast.error("Failed to create post!");
          setSubmitting(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
            Create Post
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={NewPostSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    className="input input-bordered w-full p-3 h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Enter description"
                    className="input input-bordered w-full p-3 h-40 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      handleImageUpload(e);
                      setFieldValue("image", e.currentTarget.files[0]);
                    }}
                    className="input input-bordered w-full p-3 h-12 border-gray-300 rounded-lg"
                  />
                  {image && (
                    <div className="mt-4 border-dashed border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                      <p className="text-gray-700">Selected Image</p>
                      <p className="text-sm text-gray-500">
                        The image will be uploaded upon posting
                      </p>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-blue-600 text-white w-full p-3 h-12 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {postId ? "Update" : "Post"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
