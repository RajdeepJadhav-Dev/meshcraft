import React, { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { TiThMenu } from "react-icons/ti";
import { gsap } from "gsap";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { RiLoginCircleFill } from "react-icons/ri";
import logo from "../../assets/logo/Horizontalwithbgsmall.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {

  let [isOpenNav, setIsOpenNav] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  



  

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between h-16 w-full px-4 sm:px-10 lg:px-20 bg-gray-900 text-white fixed z-50">
    
  <div className="text-xl font-semibold logo">
    <img
      srcSet={logo}
      alt="logo"
      className="h-[30px] sm:h-[40px] lg:h-[40px]"
    />
  </div>

  {/* Mobile Menu Button */}
  <div className="flex ml-auto md:hidden">
    <button
      className="p-2 rounded-lg"
      onClick={() => setIsOpenNav(!isOpenNav)}
    >
      <div className="w-6 h-[2px] bg-white"></div>
      <div className="w-6 h-[2px] bg-white mt-1"></div>
      <div className="w-6 h-[2px] bg-white mt-1"></div>
    </button>
  </div>

  {/* Navigation Menu */}
  <div
    className={`fixed top-16 left-0 w-full bg-gray-900 shadow-lg transition-all duration-300 transform z-40
      ${
        !isOpenNav?
        "-translate-y-full opacity-0 invisible"
        :"translate-y-0 opacity-100 visible"
      } 
      md:relative md:translate-y-0 md:opacity-100 md:visible md:bg-transparent md:shadow-none md:top-auto md:left-auto md:w-auto md:flex md:items-center py-2`}
  >
    <ul className="text-white flex flex-col md:flex-row justify-evenly items-center h-full w-full p-4 sm:p-0">
      <Link to="/">
        <li className="lg:pr-14 sm:pr-5 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]" onClick={() => setIsOpenNav(false)}>
          Home
        </li>
      </Link>
      <Link to="/about">
        <li className="lg:pr-10 sm:pr-5 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]" onClick={() => setIsOpenNav(false)}>
          About Us
        </li>
      </Link>
      <Link to="/services">
        <li className="lg:pr-10 sm:pr-5 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]" onClick={() => setIsOpenNav(false)}>
          Services
        </li>
      </Link>
      <Link to="/signup">
        <li className={`lg:pr-10 sm:pr-5 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] ${user ? 'hidden' : ''}`} onClick={() => setIsOpenNav(false)}>
          Sign In
        </li>
      </Link>
      <Link to="/marketplace">
        <li className="lg:pr-10 sm:pr-5 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]" onClick={() => setIsOpenNav(false)}>
          Marketplace
        </li>
      </Link>
    </ul>
  </div>

  {/* Buttons */}
  <div className="space-x-14 flex items-center">
    <Link
      to="/marketplace"
      className="bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 hidden md:block" onClick={() => setIsOpenNav(false)}
    >
      Marketplace
    </Link>
    <div className="relative">
        <ul className="flex flex-row items-center gap-4">
          <li>
            {user ? (
              <>
                <div className="relative">
                  {user.profilePicture && user.profilePicture.trim() !== "" ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-transparent hover:border-orange-500 transition-all duration-300 cursor-pointer transform hover:scale-105"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                  ) : (
                    <FaUserAlt
                      className="w-12 h-12 p-2 rounded-full text-gray-400 cursor-pointer border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:scale-105 bg-gray-800"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                  )}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-28 rounded-xl bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm"
                        style={{
                          boxShadow: '0 0 15px rgba(251, 176, 64, 0.1)',
                        }}
                      >
                        <div className="py-2">
                          {/* User Info Section */}
                          <div className="px-4 py-3 border-b border-gray-700">
                            <p className="text-sm text-gray-300">Signed in as</p>
                            <p className="text-sm font-medium text-white truncate">
                              {user.username || "User"}
                            </p>
                          </div>

                          {/* Menu Items */}
                          <div className="py-1">
                            <Link to="/profile">
                              <motion.div
                                whileHover={{ x: 6 }}
                                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] hover:text-white group transition-colors duration-200"
                                onClick={() => setDropdownOpen(false)}
                              >
                                <BsPersonFill className="mr-3 h-5 w-5" />
                                Profile
                              </motion.div>
                            </Link>
                            <motion.div
                              whileHover={{ x: 6 }}
                              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] hover:text-white group transition-colors duration-200 cursor-pointer"
                              onClick={handleSignOut}
                            >
                              <RiLoginCircleFill className="mr-3 h-5 w-5" />
                              Sign Out
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <FaUserAlt className="text-2xl w-6 h-6 text-gray-400 hidden" />
            )}
          </li>
        </ul>
      </div>
  </div>
</nav>
  );
}
