import React from 'react';
import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo/Horizontalwithbgsmall.png";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-8 pb-6 border-t border-gray-800">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-6">
            <img src={logo} alt="MeshCraft Assets" className="w-32 md:w-44 hover:opacity-90 transition-opacity" />
            <p className="text-sm md:text-base text-gray-400 max-w-md leading-relaxed px-4 md:px-0 text-center md:text-left">
              Your premier destination for high-quality digital assets and game development resources.
            </p>
          </div>
          
          {/* Quick Links */}
                   <div className="flex flex-col items-center mt-8 md:mt-1">
            <h4 className="text-lg md:text-xl font-bold text-white mb-6">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                About Us
              </Link>
              <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                Marketplace
              </Link>
              <Link to="/services" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                Services
              </Link>
              <Link to="/assets" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                Assets
              </Link>
              <Link to="/signup" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                Sign In
              </Link>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-6 mt-8 md:mt-0">
            <div className="flex space-x-8 md:space-x-6">
              <a 
                href="https://www.instagram.com/meshcraftassets"
                className="text-gray-400 hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
                target="_blank" rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl md:text-2xl" />
              </a>
              <a 
                href="https://www.linkedin.com/company/meshcraftassets"
                className="text-gray-400 hover:text-blue-500 transform hover:scale-110 transition-all duration-300"
                target="_blank" rel="noopener noreferrer"
              >
                <FaLinkedin className="text-xl md:text-2xl" />
              </a>
              <a 
                href="https://discord.gg/sUJ6hSKfYk"
                className="text-gray-400 hover:text-purple-500 transform hover:scale-110 transition-all duration-300"
                target="_blank" rel="noopener noreferrer"
              >
                <FaDiscord className="text-xl md:text-2xl" />
              </a>
            </div>
            <p className="text-xs md:text-sm text-gray-500 text-center md:text-right">
              © {new Date().getFullYear()} MeshCraft Assets.<br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;