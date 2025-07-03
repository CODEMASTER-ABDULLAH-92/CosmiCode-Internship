import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const [user, setUser] = useState(null); // Store logged-in user

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // If no token, no need to fetch user

        const response = await axios.get("http://localhost:8000/api/user/me", {headers: { Authorization: `Bearer ${token}` },withCredentials: true,});

        setUser(response.data.user); // Store user in state
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/user/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("token"); // Remove token
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Post App</Link>

        <div className="flex items-center space-x-4">
          <Link to="/posts">Posts</Link>

          {user ? (
            <div className="flex items-center space-x-2">
              {/* Display User's First Letter */}
              <span className="bg-gray-800 text-white px-3 py-1 rounded-full">
                <Link to="/dash"> 
                
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
          
                </Link>
              </span>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;

