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

     
    </div>
  );
};

export default Services;
