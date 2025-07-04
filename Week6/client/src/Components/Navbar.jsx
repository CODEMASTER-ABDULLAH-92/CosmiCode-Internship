import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full px-4 sm:px-8 md:px-16 lg:px-32 py-4">
      <div className="w-full border border-gray-500 bg-[#121212] rounded-2xl px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-green-400 font-bold text-3xl tracking-wide hover:text-green-300 transition-all duration-200"
        >
          ThinkPad
        </Link>

        {/* Create Button */}
        <Link
          to="/create"
          className="bg-green-400 text-gray-900 px-6 py-3 rounded-xl text-lg font-medium hover:bg-green-300 transition-all duration-300"
        >
          Create Note
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
