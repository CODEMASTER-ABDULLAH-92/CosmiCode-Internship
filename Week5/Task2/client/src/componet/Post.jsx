import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({title,image,content}) => {
  return (
    <div className="max-w-[330px] p-2 h-[480px] mx-auto m-2 bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
      {/* Post Image */}
      <div className='border-2 rounded-xl'>
      <img src={image} className="w-full h-48 p-3 object-center" alt="Post" />
      </div>
      {/* Post Content */}
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600 max-h-[100px] overflow-hidden text-sm mb-4">
          {content}
          {/* Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. */}
        </p>
        <p className="text-xs text-gray-500">Created on: {new Date().toDateString()}</p>
        {/* Action Buttons */}
        <div className="mt-4 flex space-x-2">
          <Link to="/update" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Save
          </Link>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
