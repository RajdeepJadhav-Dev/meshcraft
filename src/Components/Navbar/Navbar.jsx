import React, { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { TiThMenu } from "react-icons/ti";
import { gsap } from "gsap";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { RiLoginCircleFill } from "react-icons/ri";
import logo from "../../assets/logo/Horizontalwithbgsmall.png";
import { Link } from "react-router-dom";

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
  {/* Logo */}
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
    <div>
      <ul className="flex flex-row items-center gap-4">
        <li>
          {user ? (
            <>
              {user.profilePicture && user.profilePicture.trim() !== "" ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-gray-900 border-4 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              ) : (
                <FaUserAlt
                  className="w-12 h-12 rounded-full text-gray-400 cursor-pointer border-gray-900 border-4 flex items-center justify-center"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              )}
              {dropdownOpen && (
                <div
                  className="absolute top-16 right-4 w-32 
                    backdrop-filter backdrop-blur-lg bg-opacity-30 bg-gray-800 
                    border border-gray-200/20 rounded-md shadow-lg 
                    transition-all duration-300"

                >
                  <ul className="flex flex-col items-center">
                    <Link to="/profile">
                      <li
                        className="py-2 px-4 w-full text-white text-center
                        hover:bg-white/10 transition-colors duration-200" 
                        onClick = {() => setDropdownOpen(false)}
                      >
                        Profile
                      </li>
                    </Link>
                    <li
                      className="py-2 px-4 w-full text-white text-center
                        hover:bg-white/10 transition-colors duration-200"
                      onClick={handleSignOut}

                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
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
