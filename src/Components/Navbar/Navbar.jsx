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
  let [isVisible, setIsVisible] = useState(true);
  let navbarRef = useRef(null);

  const lastScroll = useRef(0);
  let [isOpenNav, setIsOpenNav] = useState(false);
  let [isScroll, setIsScroll] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  

  const handleScroll = () => {
    if (window.scrollY > lastScroll.current) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScroll.current = window.scrollY;
  };
  
  

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    window.location.reload();
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 backdrop-blur-md w-full px-2 py-2 sm:px-8 bg-gray-950 z-50 text-white flex justify-between items-center font-semibold 
      ${
        isScroll
          ? " sm:bg-gradient-to-r from-[#303030] via-[#333333] via-[#363636] via[#393939] to-[#3c3c3c] sm:shadow-custom"
          : ""
      }`}
    >
      {/* Logo */}
      <div className="text-xl font-semibold logo">
        <img
          srcSet={logo}
          alt="logo"
          className=" h-[30px] sm:h-[40px] lg:h-[40px]"
        />
      </div>

      {/* Links */}
      <div
        className={` navbar h-48 w-1/2 backdrop-blur-sm sm:backdrop-blur-none rounded-md top-14 right-5 shadow-custom sm:shadow-none sm:top-auto sm:right-auto  transition-all absolute sm:relative p-4 z-50  duration-300 ease-in-out flex items-center justify-between text-white transform
        ${
          isOpenNav
            ? "opacity-100 translate-y-0 "
            : "opacity-0 -translate-y-100 h-0 sm:h-full sm:opacity-100 sm:translate-y-0"
        }`}
      >
        <ul className="text-white flex flex-col cursor-pointer sm:flex-row justify-evenly items-center  h-full w-full">
          <Link to='/'>
            <li className="lg:pr-14 sm:pr-5  hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]">
              Home
            </li>
          </Link>
          <Link to='/about'>
          <li className="lg:pr-10 sm:pr-5  hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]">
            About Us
          </li>
          </Link>
          <Link to='/services'>
          <li className="lg:pr-10 sm:pr-5  hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]">
            Services
          </li>
          </Link>
          <Link to='/contact'>
          <li className="lg:pr-10  sm:pr-5  hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]">
            Contact
          </li>
          </Link>
         
      
          <Link to='/signup'>
          <li className={`lg:pr-10  sm:pr-5  hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] ${user ? 'hidden' : ''}`}>
            Sign In
          </li>
          </Link>
          

         
        </ul>
      </div>

      {/* Buttons */}
      <div className="space-x-14 flex items-center">
        {/* <Link href="/marketplace/MarketPlace"> */}
        <Link
          to="/marketplace"
          className="bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
          href="/marketplace"
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
          
           

                    
              <div
                className="profileSection backdrop-blur-md w-[120px] rounded text-center 
                           shadow-profileBoxShadow opacity-0 hidden transition-all duration-500 ease-in-out absolute top-10 right-2"
              >
                <ul className="cursor-pointer backdrop-blur-md font-Montserrat bg-none font-medium">
                  <li
                    className="flex items-center justify-center py-2 px-1 
                              hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]"
                  >
                    <BsPersonFill className="text-white" />
                    &nbsp;Profile
                  </li>
                  <Link to="/login">
                    <li
                      className="flex items-center justify-center py-2 px-1
                                hover:text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]"
                    >
                      <RiLoginCircleFill className="text-white" />
                      &nbsp;Login
                  </li>
                  </Link>
                  
                </ul>

              </div>
            </li>
            <li>
              <button
                className=" md:hidden"
                onClick={() => setIsOpenNav(!isOpenNav)}
              >
                {isOpenNav ? <ImCross /> : <TiThMenu />}
              </button>
            </li>
        
          </ul>
        </div>
      </div>
    </nav>
  );
}
