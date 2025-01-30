import React from 'react';
import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo/Horizontalwithbgsmall.png";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="container mx-auto px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <img src={logo} alt="MeshCraft Assets" className="w-40" />
            <p className="text-base text-gray-400 max-w-md">
              Your premier destination for high-quality digital assets and game development resources.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/meshcraftassets"
                className="hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
                target="_blank" rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a 
                href="https://www.linkedin.com/company/meshcraftassets"
                className="hover:text-blue-500 transform hover:scale-110 transition-all duration-300"
                target="_blank" rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a 
                href="https://discord.gg/sUJ6hSKfYk"
                className="hover:text-purple-500 transform hover:scale-110 transition-all duration-300"
                target="_blank" rel="noopener noreferrer"
              >
                <FaDiscord className="text-2xl" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-all flex items-center">
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-white transition-all flex items-center">
                  <span className="mr-2">→</span> Marketplace
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-all flex items-center">
                  <span className="mr-2">→</span> Services
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-white transition-all flex items-center">
                  <span className="mr-2">→</span> Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} MeshCraft Assets. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
