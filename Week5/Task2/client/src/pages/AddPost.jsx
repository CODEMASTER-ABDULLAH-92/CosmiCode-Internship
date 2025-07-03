import axios from "axios";
import React, { useState } from "react";

const Add = () => {
  const [formData, setFormData] = useState({
    content: "",
    title: "",
    createdAt: "",
    image: [],
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const data = new FormData();
      for (let i = 0; i < formData.image.length; i++) {
        data.append("image", formData.image[i]);
      }
      data.append("content", formData.content);
      data.append("title", formData.title);
      data.append("createdAt", new Date().toISOString());

      await axios.post("http://localhost:8000/api/post/addPost", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData({
        content: "",
        title: "",
        image: [],
        createdAt: "",
      });
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Failed to add post. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Add New Post
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Images
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              multiple
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 h-24"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-[70%] flex items-center justify-center bg-blue-600 text-white py-3 rounded-4xl hover:bg-blue-700 transition font-bold text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-6 w-6 mr-2 border-4 border-white border-t-transparent rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
                Adding...
              </div>
            ) : (
              "Add Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
