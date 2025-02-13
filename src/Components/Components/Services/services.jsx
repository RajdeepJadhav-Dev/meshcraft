import React from "react";
import image1 from "./DM.jpg";
import image2 from "./CR.png";
import image3 from "./TAS.jpg";
import image4 from "./REN.png";
import image5 from "./UV.png";
import image6 from "./GAO.png";
 
const services = [
  {
    title: "Digital Marketing",
    description:
      "We offer a wide range of digital marketing services to help you grow your business.",
    image: image1,
  },
  {
    title: "Content Creation",
    description:
      "Our team of experienced content creators will help you bring your ideas to life.",
    image: image2,
  },
  {
    title: "Technical Asset Sales",
    description:
      "We provide a platform for buying and selling technical assets.",
    image: image3,
  },
  {
    title: "Real Estate Networking",
    description:
      "We connect real estate professionals and help them grow their network.",
    image: image4,
  },
  {
    title: "User Verification",
    description:
      "We provide user verification services to ensure the security of your platform.",
    image: image5,
  },
  {
    title: "Game Asset Optimization",
    description:
      "We help game developers optimize their assets for better performance.",
    image: image6,
  },
];
 
const software = [
  {
    name: "Blender",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/768px-Blender_logo_no_text.svg.png?20210507122249",
  },
  {
    name: "Unity",
    logo: "https://www.citypng.com/public/uploads/preview/unity-white-logo-icon-png-701751694968149dpc3d4ff9d.png?v=2025012519https://icon2.cleanpng.com/20180425/ibq/avtpu8r68.webp",
  },
  {
    name: "Unreal Engine",
    logo: "https://cdn.worldvectorlogo.com/logos/unreal-1.svg ",
  },
  {
    name: "Substance Painter",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-adobe-substance-painter-icon-download-in-svg-png-gif-file-formats--logo-suite-new-pack-files-folders-icons-2132641.png?f=webp&w=256",
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
 
 
const Services = () => {
  return (
    <div className="min-h-screen p-8 bg-[#000000] text-white">
    {/* Header Section */}
    <header className="mt-5 text-center py-8">
      <h1 className="text-4xl font-bold text-white mb-4 inline-block border-b-3 border-[#ff5e00] pb-2 animate-[fade-in_1s_ease-in-out]">
        Our Core Services
      </h1>
      <p className="text-lg text-[#c1c1c1]">
        Delivering industry-leading 3D solutions tailored to your needs.
      </p>
    </header>
 
    {/* Services Grid */}
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 animate-[slide-up_1s_ease-in-out]">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-[#282828] shadow-[0_4px_10px_rgba(0,0,0,0.5)] rounded-lg p-6
                   hover:shadow-[0_8px_20px_rgba(255,94,0,0.7)] transition-all duration-300
                   hover:-translate-y-2"
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-40 object-cover rounded-md mb-4 animate-[fade-in_0.8s_ease-in-out]"
          />
          <h2 className="text-xl font-semibold text-white mb-2">
            {service.title}
          </h2>
          <p className="text-[#c1c1c1]">{service.description}</p>
        </div>
      ))}
    </section>
    <section className="mt-16 bg-[#282828] p-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)] animate-slide-up">
  <h2 className="text-2xl font-bold text-white mb-4">Software Expertise</h2>
  <p className="text-[#c1c1c1] mb-4">
    MeshCraft's team is proficient with industry-standard tools:
  </p>
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[90%] mx-auto">
    {software.map((tool, index) => (
      <li key={index} className="flex items-center space-x-4 p-3 bg-[#1a1a1a] rounded-lg">
        <img
  src={tool.logo}
  alt={tool.name}
  className="w-10 h-10 rounded object-contain"
/>
        <span className="text-white font-medium">{tool.name}</span>
      </li>
    ))}
  </ul>
</section>
 
{/* Contact Card */}
<section className="mt-16 bg-[#282828] p-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)] animate-fade-in">
  <h2 className="text-2xl font-bold text-white mb-4 text-center">
    Let's Collaborate!
  </h2>
  <p className="text-[#c1c1c1] text-center mb-6">
    If you'd like to discuss a project or require more specific services, you can contact MeshCraft.
  </p>
  <div className="bg-[#1a1a1a] p-6 rounded-lg">
    <form className="space-y-4">
      <div>
        <label className="block text-white font-medium mb-2">Name</label>
        <input
          type="text"
          className="w-full p-3 bg-[#282828] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#ff5e00] focus:ring-1 focus:ring-[#ff5e00]"
          placeholder="Your Name"
        />
      </div>
      <div>
        <label className="block text-white font-medium mb-2">
          Services Needed
        </label>
        <input
          type="text"
          className="w-full p-3 bg-[#282828] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#ff5e00] focus:ring-1 focus:ring-[#ff5e00]"
          placeholder="e.g., 3D Modeling, Animation"
        />
      </div>
      <div>
        <label className="block text-white font-medium mb-2">
          Description
        </label>
        <textarea
          className="w-full p-3 bg-[#282828] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#ff5e00] focus:ring-1 focus:ring-[#ff5e00]"
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
          className="w-full p-3 bg-[#282828] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#ff5e00] focus:ring-1 focus:ring-[#ff5e00]"
          placeholder="your.email@example.com"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#ff5e00] text-white font-medium py-3 rounded-lg hover:bg-[#ff7e33] transition duration-300"
      >
        Submit
      </button>
    </form>
  </div>
</section>
 
     
    </div>
  );
};
 
export default Services;