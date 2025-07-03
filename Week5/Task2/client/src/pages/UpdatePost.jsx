// import React, { useState } from "react";
// import axios from "axios";

// const UpdatePost = ({ postId }) => { // Pass postId as a prop
//   const [formData, setFormData] = useState({
//     content: "",
//     title: "",
//     createdAt: "",
//     image: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: Array.from(e.target.files) });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       formData.image.forEach((file) => data.append("image", file));
//       data.append("content", formData.content);
//       data.append("title", formData.title);
//       data.append("createdAt", new Date().toISOString());

//       await axios.put(`http://localhost:8000/api/post/update/${postId}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setFormData({
//         content: "",
//         title: "",
//         image: [],
//         createdAt: "",
//       });

//       alert("Post updated successfully!");
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//         Update Post
//       </h1>
//       <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
//         <form onSubmit={handleChange}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">
//               Upload Images
//             </label>
//             <input
//               type="file"
//               name="image"
//               multiple
//               className="w-full p-2 border rounded-md"
//               onChange={handleFileChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Content</label>
//             <textarea
//               name="content"
//               value={formData.content}
//               className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 h-24"
//               onChange={handleChange}
//             />
//           </div>

//           <button type="submit" className="w-[70%] self-center bg-blue-600 text-white py-3 rounded-4xl hover:bg-blue-700 transition font-bold text-2xl">
//             Update Post
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdatePost;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePost = () => {
  const { postId } = useParams(); // Get postId from URL
  const navigate = useNavigate(); // For redirection

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    createdAt: "",
    image: [], // Store selected files
    existingImage: "", // Store existing image URL
  });

  // Fetch the post details when the page loads
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
// postRouter.get("/listing",listPost);

//         const response = await axios.get(`http://localhost:8000/api/post/listing/${postId}`);
//         const post = response.data.data;
//         setFormData({
//           title: post.title,
//           content: post.content,
//           createdAt: post.createdAt,
//           existingImage: post.image, // Store existing image
//           image: [],
//         });
//       } catch (error) {
//         console.error("Error fetching post:", error);
//       }
//     };

//     fetchPost();
//   }, [postId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let i = 0; i < formData.image.length; i++) {
        data.append("image", formData.image[i]);
      }
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("createdAt", new Date().toISOString());

      await axios.put(`http://localhost:8000/api/post/update/${postId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post updated successfully!");
      navigate("/"); // Redirect to home after update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Update Post
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          {/* Display Existing Image */}
          {formData.existingImage && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Current Image
              </label>
              <img
                src={`http://localhost:8000/uploads/${formData.existingImage}`}
                alt="Current"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}

          {/* Upload New Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Upload New Images
            </label>
            <input
              type="file"
              multiple
              className="w-full p-2 border rounded-md"
              onChange={handleFileChange}
            />
          </div>

          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              onChange={handleChange}
            />
          </div>

          {/* Content Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 h-24"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-[70%] self-center bg-blue-600 text-white py-3 rounded-4xl hover:bg-blue-700 transition font-bold text-2xl"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
