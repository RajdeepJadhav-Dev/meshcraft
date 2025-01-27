import React from 'react';
import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer=() => {
  return (
    <footer className="bg-black text-gray-300 py-8">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="bg-orange-500 rounded-full h-6 w-6"></span> {/* Logo Placeholder */}
            <span className="text-lg font-semibold">MeshCraft Assets</span>
          </div>
          <p className="text-sm text-gray-400">
            The new home for your digital goods
          </p>
          <div className='flex flex-row gap-2'>
            <a className=" cursor-pointer px-2 py-2 rounded-lg transition-all duration-500 text-white" 
            href='https://www.instagram.com/meshcraftassets?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
            <FaInstagram className='text-2xl '/>
            </a>
            <a className=" cursor-pointer px-2 py-2 rounded-lg transition-all duration-500 text-sm font-semibold text-white " 
            href='https://www.linkedin.com/company/meshcraftassets/posts/?feedView=all'>
            <FaLinkedin className='text-2xl '/>
            </a>
            <a className=" px-2 py-2 rounded-lg text-sm transition-all duration-500 font-semibold text-white  ">
            <FaDiscord className='text-2xl '/>
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-200 mb-2">MeshCraft Assets</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Explore</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Marketplace</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200 mb-2">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Activate Membership</a></li>
              <li><a href="#" className="hover:underline">Sign In</a></li>
              <li><a href="#" className="hover:underline">Reset Password</a></li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h4 className="font-semibold text-gray-200 mb-4">Join our mailing list</h4>
          <p className="text-sm text-gray-400 mb-4">
            Get notified about new products as soon as they drop
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-gray-800 px-4 py-2 rounded-l-lg w-full text-sm focus:outline-none"
            />
            <button className="bg-white text-black px-4 py-2 rounded-r-lg font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 flex justify-center items-center px-8">
        
        <p className="text-xs text-gray-500">© Copyright 2024 MeshCraft Asstes</p>
        
      </div>
    </footer>
  );
};

export default Footer;
