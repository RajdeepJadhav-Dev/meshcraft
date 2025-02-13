import React, { useState } from "react";
import image2 from "../../assets/features/image2.jpg";
import image3 from "../../assets/features/image3.jpg";
import image4 from "../../assets/features/image4.jpg";
import image5 from "../../assets/features/image5.jpg";
import image6 from "../../assets/features/image6.jpg";

const ExpandingBoxes = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const images = [
    {
      url: image6,
      title: "Premium Quality",
      description: "Hand-picked collection of high-quality 3D models for all your creative needs.",
    },
    {
      url: image5,
      title: "Vast Selection",
      description: "Browse thousands of unique models across multiple categories and styles.",
    },
    {
      url: image3,
      title: "Easy Access",
      description: "Simple download process and instant access to your purchased models.",
    },
    {
      url: image4,
      title: "Full Support",
      description: "24/7 customer service and technical support for all your questions.",
    },
  ];

  return (
    <section className="py-4 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Features that Make Us Stand Out
        </h2>
        <div className="flex justify-center items-center w-full h-[430px] bg-black shadow-lg">
          <div className="flex w-[92vw] h-[350px]">
            {images.map((item, index) => (
              <div
                key={index}
                className={`relative min-w-[60px] overflow-hidden m-2 border bg-cover bg-center rounded-[50px] shadow-md cursor-pointer transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "flex-grow-[10]" : "flex-grow"
                }`}
                style={{ backgroundImage: `url(${item.url})` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div
                  className={`absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-4 rounded-[50px] transition-opacity duration-300 ease-in-out ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                  <p className="text-sm md:text-base mt-2 text-center">{item.description}</p>
                  <button className="bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] text-black mt-4 px-4 py-2 rounded-lg hover:scale-105 transition-transform">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandingBoxes;