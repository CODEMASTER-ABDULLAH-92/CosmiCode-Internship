import axios from "axios";
import React, { useContext, useState } from "react";
import { ContextApi } from "../Context/AppContext";
import { toast } from "react-hot-toast";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { url ,fetchAllNotes} = useContext(ContextApi);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Please add a title.");
    if (content.trim() === "") return toast.error("Please add content.");

    try {
      const response = await axios.post(
        `${url}/api/notes/addNotes`,
        { title, content },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setTitle("");
        setContent("");
        toast.success("Note added successfully!");
        navigate("/");
        fetchAllNotes();
      } else {
        toast.error("Failed to add note.");
      }
    } catch (error) {
      toast.error("Error while adding note.");
    }
  };

  return (
    <div className="min-h-screen  text-white">
      {/* Navbar */}
      <div className="pt-10">
        <Navbar />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="pt-24 flex flex-col items-center space-y-6"
      >
        {/* Title Input */}
        <div className="w-[90%] sm:w-[85%] md:w-[75%] flex flex-col space-y-2">
          <label htmlFor="title" className="text-2xl font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className="h-[70px] w-full bg-gray-800 text-white text-xl rounded-2xl px-6 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        {/* Content Input */}
        <div className="w-[90%] sm:w-[85%] md:w-[75%] flex flex-col space-y-2">
          <label htmlFor="content" className="text-2xl font-semibold">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content..."
            className="h-[300px] w-full resize-none bg-gray-800 text-white text-xl rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        {/* Submit Button */}
        <div className="w-[90%] sm:w-[85%] md:w-[75%] flex justify-end">
          <button
            type="submit"
            className="px-10 py-4 bg-green-500 text-gray-950 text-xl font-semibold rounded-2xl hover:bg-green-400 transition-all duration-300"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};
export default Create;
