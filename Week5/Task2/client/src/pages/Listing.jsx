import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const List = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  const fetchPost = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/post/listing");
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deleteUser = async (postId) => {
    try {
      await axios.delete(`http://localhost:8000/api/post/remove/${postId}`);
      fetchPost(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const updateUser = (postId) => {
    navigate(`/update-post/${postId}`); // Navigate to UpdatePost page
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Trainers List</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((trainer) => (
              <tr key={trainer._id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  <img
                    src={`${trainer.image}`} // Ensure correct image URL
                    alt={trainer.title}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3 text-black">{trainer.content}</td>
                <td className="p-3">
                  <button
                    onClick={() => updateUser(trainer._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(trainer._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
