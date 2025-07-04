import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import { ContextApi } from "../Context/AppContext";
import Note from "../Components/Note";

const Home = () => {
  const { note } = useContext(ContextApi);

  return (
    <div className="min-h-screen  text-white">
      {/* Navbar */}
      <div className="pt-6 sm:pt-10">
        <Navbar />
      </div>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {note.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {note.map((item) => (
              <Note
                key={item._id}
                id={item._id}
                title={item.title}
                content={item.content}
                date={new Date(item.createdAt).toDateString()}
                updateDate={new Date(item.updatedAt).toDateString()}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-lg text-gray-400 mt-20">
            No notes found. Start by creating one!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
