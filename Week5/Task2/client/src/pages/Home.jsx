import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Post from "../componet/Post";

const Home = () => {
  const posts = useSelector((state) => state.post.posts);
  const navigate = useNavigate(); // Corrected navigator usage

  const checkUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/posts"); // Redirect to /posts if logged in
    } else {
      navigate("/login"); // Redirect to /login if not logged in
    }
  };
  return (
    <div className="px-[5%] my-10">
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {posts.slice(0, 8).map((item, index) => (
          <Post key={index} title={item.title} image={item.image} content={item.content} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={checkUserLoggedIn}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Home;
