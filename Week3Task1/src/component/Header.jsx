import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            MySite
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-200 transition">About</Link>
            <Link to="/services" className="hover:text-blue-200 transition">Services</Link>
            <Link to="/blog" className="hover:text-blue-200 transition">Blog</Link>
            <Link to="/contact" className="hover:text-blue-200 transition">Contact</Link>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-2">
            <Link to="/" className="block hover:text-blue-200 transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block hover:text-blue-200 transition" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services" className="block hover:text-blue-200 transition" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/blog" className="block hover:text-blue-200 transition" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/contact" className="block hover:text-blue-200 transition" onClick={() => setIsOpen(false)}>Contact</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;