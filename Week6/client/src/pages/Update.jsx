import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContextApi } from "../Context/AppContext";
import { toast } from "react-hot-toast";
import Navbar from "../Components/Navbar";

const Update = () => {
  const { url, fetchAllNotes  } = useContext(ContextApi);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true); // optional loading state

  // ✅ Fetch Single Note on Mount
  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const response = await axios.get(`${url}/api/notes/getAllNotes/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          const { title, content } = response.data.notes;
          setTitle(title);
          setContent(content);

        } else {
          toast.error("Note not found.");
        }
      } catch (error) {
        toast.error("Error fetching note.");
      } finally {
        setLoading(false);
      }
    };

    getSinglePost();
  }, [id, url]);

  // ✅ Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title.trim() === "") return toast.error("Please add a title.");
      if (content.trim() === "") return toast.error("Please add content.");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
  


      const response = await axios.put(
        `${url}/api/notes/update/${id}`,
        { title, content }, // send as JSON
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.data.success) {
        toast.success("Note Updated Successfully");
        navigate("/");
        fetchAllNotes();
      } else {
        toast.error("Failed to update note");
      }
      
    } catch (error) {
      toast.error("Error updating note");
    }
  };

  return (
    <div className="min-h-screen  text-white">
      {/* Navbar */}
      <div className="pt-10">
        <Navbar />
      </div>

      {/* Form Section */}
      {loading ? (
        <div className="pt-24 text-center text-xl">Loading note...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="pt-24 flex flex-col items-center space-y-6"
        >
          {/* Title Input */}
          <div className="w-[75%] flex flex-col space-y-2">
            <label htmlFor="title" className="text-2xl font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="h-[70px] w-full bg-gray-800 text-white text-2xl rounded-2xl px-6 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          {/* Content Textarea */}
          <div className="w-[75%] flex flex-col space-y-2">
            <label htmlFor="content" className="text-2xl font-semibold">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              name="content"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content..."
              className="h-[400px] w-full resize-none bg-gray-800 text-white text-2xl rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <div className="w-[75%] flex justify-end">
            <button
              type="submit"
              className="px-10 py-5 bg-green-500 text-gray-950 text-2xl font-semibold rounded-2xl cursor-pointer transition-all duration-300 hover:bg-green-400"
            >
              Update Note
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Update;
