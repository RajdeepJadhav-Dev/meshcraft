import React, { useState, useEffect } from "react";
import {
  FaUserShield,
  FaUsersCog,
  FaEdit,
  FaSignOutAlt,
  FaCogs,
  FaTrash,
  FaCheck,
  FaBars,
  FaTimes
} from "react-icons/fa";
import ProfilePic from "../../assets/admin/Face.png";
import { useNavigate } from "react-router-dom";
 
const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "Admin",
    email: "webd.meshcraft@gmail.com",
  });
  const navigate = useNavigate();
 
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };
 
  const [isEditing, setIsEditing] = useState(false);
  const [tempAdmin, setTempAdmin] = useState(admin);
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
 
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    fetch('/.netlify/functions/allusers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
 
  return (
    <div className="relative">
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-xl hover:scale-105 transition-transform"
        >
          {sidebarOpen ? (
            <FaTimes className="text-white text-xl" />
          ) : (
            <FaBars className="text-white text-xl" />
          )}
        </button>
      </div>
 
      {/* Mobile Sidebar Dropdown Menu */}
      {sidebarOpen && (
        <div className="md:hidden fixed top-20 left-4 bg-[#1b1e33] rounded-lg shadow-lg p-4 z-40">
          <ul className="space-y-2">
            <li>
              <a href="/admin" className="block text-gray-200 hover:text-white">
                Add Assets
              </a>
            </li>
            <li>
              <a href="/admin/editassets" className="block text-gray-200 hover:text-white">
                Edit Assets
              </a>
            </li>
            <li>
              <a href="/admin/deleteassets" className="block text-gray-200 hover:text-white">
                Delete Assets
              </a>
            </li>
            <li>
              <a href="/admin/profile" className="block text-gray-200 hover:text-white">
                Profile
              </a>
            </li>
            <li>
              <button onClick={handleLogout} className="block text-gray-200 hover:text-white">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
 
      {/* Main Profile Card */}
      <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-6">
        <div className="w-full bg-[#1b1e33] p-6 rounded-3xl shadow-lg text-white">
          {/* Top Section: Admin Info & Total Users Card */}
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            {/* Admin Info */}
            <div className="flex items-center gap-4">
              <img
                src={ProfilePic}
                alt="Admin"
                className="w-20 h-20 rounded-full border-4 border-purple-500 shadow-lg object-cover"
              />
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempAdmin.name}
                    onChange={(e) =>
                      setTempAdmin({ ...tempAdmin, name: e.target.value })
                    }
                    className="text-2xl font-bold bg-transparent border-b-2 border-gray-500 focus:border-purple-500 outline-none"
                  />
                ) : (
                  <div className="flex flex-row gap-3 items-center">
                    <h1 className="text-2xl font-bold">{admin.name}</h1>
                    <div className="hidden sm:flex justify-end">
                      <button
                        onClick={handleLogout}
                        className="py-2 px-6 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg flex items-center gap-2"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  </div>
                )}
                <p className="text-gray-400 break-all mt-2">{admin.email}</p>
              </div>
            </div>
 
            {/* Total Users Card */}
            <div className="mt-4 w-full lg:w-48 md:mt-0 md:w-36">
              <div className="bg-gray-800 rounded-lg p-4 text-center min-w-[150px]">
                <h3 className="text-lg font-bold">Total Users</h3>
                <p className="text-2xl">{users.length}</p>
              </div>
            </div>
          </div>
 
          {/* Users List Table */}
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-bold uppercase text-gray-400">
                    Username
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-bold uppercase text-gray-400">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-bold uppercase text-gray-400">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2 text-sm">{user.username}</td>
                    <td className="px-4 py-2 text-sm">{user.email}</td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AdminProfile;