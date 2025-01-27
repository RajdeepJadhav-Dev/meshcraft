import React from "react";
import "./services.css";

const Services = () => {
  return (
    <div className="bg-[#1b1b1b] min-h-screen p-8">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in border-b-[3px] border-[#ff5e00] inline-block pb-2">
          Our Core Services
        </h1>
        <p className="text-lg text-[#c1c1c1]">
          Delivering industry-leading 3D solutions tailored to your needs.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 animate-slide-up">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#282828] shadow-[0_4px_10px_rgba(0,0,0,0.5)] rounded-lg p-6 hover:shadow-[0_8px_20px_rgba(255,94,0,0.7)] transition duration-300 transform hover:-translate-y-2"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-40 object-cover rounded-md mb-4 animate-image-fade-in"
            />
            <h2 className="text-xl font-semibold text-white mb-2">
              {service.title}
            </h2>
            <p className="text-[#c1c1c1]">{service.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 bg-[#333333] p-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)] animate-slide-up">
        <h2 className="text-2xl font-bold text-white mb-4">Software Expertise</h2>
        <p className="text-[#c1c1c1] mb-4">
          MeshCraft's team is proficient with industry-standard tools:
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {software.map((tool, index) => (
            <li key={index} className="flex items-center space-x-4">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-10 h-10 rounded"
              />
              <span className="text-white font-medium">{tool.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 bg-[#282828] p-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)] animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Let's Collaborate!
        </h2>
        <p className="text-[#c1c1c1] text-center mb-6">
          If you'd like to discuss a project or require more specific services, you can contact MeshCraft.
        </p>
        <div className="bg-[#333333] p-6 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
          <form className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 bg-[#282828] text-white border border-[#444444] rounded-lg focus:border-[#ff5e00]"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Services Needed
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#282828] text-white border border-[#444444] rounded-lg focus:border-[#ff5e00]"
                placeholder="e.g., 3D Modeling, Animation"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Description
              </label>
              <textarea
                className="w-full p-3 bg-[#282828] text-white border border-[#444444] rounded-lg focus:border-[#ff5e00]"
                rows="4"
                placeholder="Describe your project or requirements"
              ></textarea>
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 bg-[#282828] text-white border border-[#444444] rounded-lg focus:border-[#ff5e00]"
                placeholder="your.email@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff5e00] text-white font-medium py-3 rounded-lg hover:bg-[#d94800] transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

// Sample data for services
const services = [
  {
    title: "3D Modeling",
    description:
      "Creation of detailed and optimized 3D assets for various applications, including games, VR/AR, and simulations.",
    image: "https://via.placeholder.com/400x200?text=3D+Modeling",
  },
  {
    title: "Character Rigging",
    description:
      "Rigging 3D characters for animations and seamless integration into game engines or other platforms.",
    image: "https://via.placeholder.com/400x200?text=Character+Rigging",
  },
  {
    title: "Texturing & Shading",
    description:
      "Applying realistic or stylized textures to assets using tools like Substance Painter and Photoshop.",
    image: "https://via.placeholder.com/400x200?text=Texturing+%26+Shading",
  },
  {
    title: "Rendering",
    description:
      "Delivering high-quality rendered images or animations for promotional or visualization purposes.",
    image: "https://via.placeholder.com/400x200?text=Rendering",
  },
  {
    title: "UV Mapping",
    description:
      "Preparing models for texturing with clean and efficient UV layouts.",
    image: "https://via.placeholder.com/400x200?text=UV+Mapping",
  },
  {
    title: "Game Asset Optimization",
    description:
      "Ensuring assets are optimized for performance without compromising quality, suitable for use in engines like Unity and Unreal.",
    image: "https://via.placeholder.com/400x200?text=Game+Asset+Optimization",
  },
];

// Software expertise data with logos
const software = [
  {
    name: "Blender",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Blender_logo_no_text.svg",
  },
  {
    name: "Unity",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Unity_2021.svg",
  },
  {
    name: "Unreal Engine",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Unreal_Engine_Logo.svg",
  },
  {
    name: "Substance Painter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Adobe_Substance_3D_Painter_logo.svg",
  },
  {
    name: "Photoshop",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
  },
  {
    name: "Illustrator",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
  },
];

export default Services;
