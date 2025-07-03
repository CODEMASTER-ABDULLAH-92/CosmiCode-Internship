import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


const [user,setUser] = useState(null);


const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = await axios.get("http://localhost:8000/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    setUser(response.data.user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};


useEffect(() => {
fetchUser();
}, [])


  // const stats = [
  //   { title: "Total Users", value: 1200 },
  //   { title: "Active Memberships", value: 850 },
  //   { title: "Revenue (This Month)", value: "$12,500" },
  // ];

  const recentUsers = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Alice Brown", email: "alice@example.com" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform bg-gray-900 text-white w-64 p-5 transition-transform md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
        <ul className="flex flex-col">
          <Link to="/addPost" className="py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">Add Post</Link>
          <Link to="/listing" className="py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">Listing Posts</Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Toggle Button */}
        <button
          className="md:hidden bg-gray-900 text-white p-2 rounded mb-4"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        {/* <h1 className="text-3xl font-bold mb-4">{user.name ? user.name.charAt(0).toUpperCase() : "?"} Dashboard</h1> */}
        <h1 className="text-3xl  font-bold mb-4">
  {user ? `${user.name.charAt(0).toUpperCase() + user.name.slice(1)} Dashboard` : "Dashboard"}
</h1>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{stat.title}</h2>
              <p className="text-2xl mt-2">{stat.value}</p>
            </div>
          ))}
        </div> */}

        {/* Recent Users Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Post Users</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex justify-between p-2 border-b">
                <span>{user.name}</span>
                <span className="text-gray-500">{user.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dash;