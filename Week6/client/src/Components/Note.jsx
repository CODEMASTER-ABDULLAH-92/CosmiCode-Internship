

import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ContextApi } from '../Context/AppContext'; // ✅ import context
import { Link } from 'react-router-dom';

const Note = ({ title, content, id,date,updateDate }) => {
  const { url, fetchAllNotes } = useContext(ContextApi); // ✅ get url & fetchAllNotes

  const removePost = async () => {
    try {
      const response = await axios.delete(`${url}/api/notes/remove/${id}`, {
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllNotes(); // ✅ refresh notes after deletion
      }
    } catch (error) {
      toast.error("Error in removing post");
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-900 border-t-2 border-green-500 hover:shadow-lg transition duration-300 rounded-2xl p-6 w-full max-w-3xl mx-auto">
      <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>

      <p className="text-gray-300 text-base mb-6 leading-relaxed">
        {content.length > 300 ? content.slice(0, 300) + '...' : content}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500 mt-4 flex-wrap gap-4">
        <div className="space-y-1">
          <div>Created: <span className="text-gray-400">{date}</span></div>
          <div>Updated: <span className="text-gray-400">{updateDate}</span></div>
        </div>

        <div className="flex space-x-3">
          <Link to={`/update/${id}`} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition duration-300"
          >
            Update
          </Link>
          <button 
            onClick={removePost}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
