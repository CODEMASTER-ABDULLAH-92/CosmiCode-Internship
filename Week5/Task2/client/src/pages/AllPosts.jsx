import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Post from '../componet/Post';
import axios from 'axios';
// Action to update the Redux state

const AllPosts = () => {
  const dispatch = useDispatch();
const [posts,setPost] = useState([]);

const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/post/listing");
    setPost(response.data.data); // Correct usage
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);
  if (!posts || posts.length === 0) return <p className="text-center text-gray-600">No posts available.</p>;
  return (
    <div className="px-[5%] my-10">
      <h1 className="text-3xl font-bold text-center mb-6">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {posts.map((item, index) => (
          <Post key={index} title={item.title} image={item.image} content={item.content} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
