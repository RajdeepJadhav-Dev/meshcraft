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
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    window.location.reload();
  };

  return (
    <nav className="md:border-b-4 md:border-b-gray-950 flex items-center justify-between h-16 w-full px-4 sm:px-10 lg:px-20 bg-gray-900 text-white fixed z-50 shadow-lg">
      <div className="text-xl font-semibold logo">
        <img srcSet={logo} alt="logo" className="h-[30px] sm:h-[40px] lg:h-[40px]" />
      </div>

      <div className="flex ml-auto md:hidden">
        <button
          className="p-2 rounded-lg"
          onClick={() => setIsOpenNav(!isOpenNav)}
        >
          <TiThMenu className="w-6 h-6 text-white" />
        </button>
      </div>

      <div
        className={`  fixed top-16 left-0 w-full shadow-lg transition-all duration-300 transform z-40 ${
          !isOpenNav
            ? " -translate-y-full opacity-0 invisible"
            : "border-t-2 border-t-gray-700 translate-y-0 opacity-100 visible "
        } md:relative bg-gray-900 md:translate-y-0 md:opacity-100 md:visible md:bg-transparent md:shadow-none md:top-auto md:left-auto md:w-auto md:flex md:items-center`}
      >
        <ul className="text-white flex flex-col md:flex-row justify-evenly items-center h-full w-full p-4 sm:p-0">
  {[
    { to: "/", text: "Home" },
    { to: "/about", text: "About Us" },
    { to: "/services", text: "Services" },
    { to: "/signup", text: "Sign In", showWhenUser: false },
  ].map((link, index) =>
    (link.showWhenUser === false && user) ? null : (
      <motion.div
        key={index}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to={link.to}>
          <li
            className="lg:pr-10 sm:pr-5 py-2 md:py-0 font-medium transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]"
            onClick={() => setIsOpenNav(false)}
          >
            {link.text}
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] group-hover:w-full transition-all duration-300"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
            />
          </li>
        </Link>
      </motion.div>
    )
  )}
</ul>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <Link
          to="/marketplace"
          className="bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform hidden md:block"
          onClick={() => setIsOpenNav(false)}
        >
          Marketplace
        </Link>
        <div className="relative">
          <ul className="flex flex-row items-center gap-4">
            <li>
              {user ? (
                <>
                  <div className="relative min-w-[50px]">
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
                          className="absolute -right-10 mt-3 w-48 rounded-xl bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm"
                          style={{
                            boxShadow: "0 0 15px rgba(251, 176, 64, 0.1)",
                          }}
                        >
                          <div className="pb-2">
                            <div className="px-4 py-3 border-b border-gray-700">
                              <p className="text-sm text-gray-300">Signed in as</p>
                              <p className="text-sm font-medium text-white truncate">
                                {user.username || "User"}
                              </p>
                            </div>

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