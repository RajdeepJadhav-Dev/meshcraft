import React, { useEffect } from "react";
// import { SiStarship } from "react-icons/si";
import {gsap} from "gsap";
import shape9 from "../../assets/Background shapes/9.png"
import shape8 from "../../assets/Background shapes/8.png"
import shape3 from "../../assets/Background shapes/3.png"
import shape4 from "../../assets/Background shapes/4.png"
import shape5 from "../../assets/Background shapes/5.png"
import shape6 from "../../assets/Background shapes/6.png"
import shape7 from "../../assets/Background shapes/7.png"


const Hero = () => {

  const shapePos = [
    { top: "23vh", left: "7vw" },
    { top: "25vh", left: "80vw" },
    { left: "70vw", top: "45vh" },
    { top: "15vh", left: "43vw" },
    { left: "20vw", top: "45vh" },
    { left: "37vw", top: "55vh" },
    { top: "55vh", left: "55vw" },
  ];
  useEffect(() => {
    console.log(`${process.env.PUBLIC_URL}/finisher-header.es5.min.js`);
    const script = document.createElement('script');
    script.src = `${process.env.PUBLIC_URL}/finisher-header.es5.min.js`; // Corrected path, assuming this file is in the public folder
    script.async = true;
    script.onload = () => {
      if (window.FinisherHeader) {
        new window.FinisherHeader({
          "count": 100,
          "size": {
            "min": 2,
            "max": 8,
            "pulse": 0
          },
          "speed": {
            "x": {
              "min": 0,
              "max": 0.4
            },
            "y": {
              "min": 0,
              "max": 0.6
            }
          },
          "colors": {
            "background": "#000000",
            "particles": [
              "#fbfcca",
              "#d7f3fe",
              "#ffd0a7"
            ]
          },
          "blending": "overlay",
          "opacity": {
            "center": 1,
            "edge": 0
          },
          "skew": 0,
          "shapes": [
            "c"
          ]
        });
      }
    };
    document.body.appendChild(script);

    // GSAP animation for shapes
    shapePos.forEach((ele, i) => {
      gsap.from(`.shape${i + 1}`, {
        opacity: 0,
        top: '20vh',
        left: '45vw',
      });
      gsap.to(`.shape${i + 1}`, {
        opacity: 0.7,
        duration: 1,
        top: ele.top,
        left: ele.left,
      });
    });
    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="header finisher-header flex -z-20 h-screen w-screen text-white flex-col relative items-center">
      <div className="mainContent relative z-10 h-screen w-full justify-center flex items-center">
      <ul className="box-area z-0 overflow-hidden w-full h-full absolute left-0 top-0">
        <li className="shape1 absolute w-[15vw] h-[15vw] sm:w-[13vw] sm:h-[13vh] opacity-70 hidden sm:block">
            <img src={shape9} alt="shape" className="animate-bounce"/>
        </li>
        {/* 2 */}
        <li className="shape2 absolute w-[10vw] h-[10vh] sm:w-[12vw] sm:h-[12vh] opacity-70 hidden sm:block">
          <img src={shape8} alt="shape" className="animate-[spin_3s_linear_infinite]" />
        </li>
        {/* 3 */}
        <li className="shape3 absolute w-[10vw] h-[10vw] sm:w-[10vw] sm:h-[10vh] opacity-70 hidden sm:block">
          <img src={shape3} alt="shape" className="animate-bounce"/>
        </li>
        {/* 4 */}
        <li className="shape4 absolute w-[30vw] h-[30vw] sm:w-[15vw] sm:h-[15vh] opacity-50 block">
          <img src={shape4} alt="shape"className="animate-pulse" />
        </li>
        {/* 5 */}
        <li className="shape5 absolute w-[10vw] h-[10vw] sm:h-[11vh] sm:w-[11vw] opacity-70 hidden sm:block">
          <img src={shape5} alt="shape" className="animate-bounce" />
        </li>
        {/* 6 */}
        <li className="shape6 absolute w-[5vw] h-[5vw] sm:h-[12vh] sm:w-[12vw] opacity-70 hidden sm:block">
          <img src={shape6} alt="shape" className="animate-[spin_3s_linear_infinite] " />
        </li>
        {/* 7 */}
        <li className="shape7 absolute w-[5vw] h-[5vw] sm:w-[12vw] sm:h-[12vh] md:w-[7vw] md:h-[7vw] opacity-70 hidden sm:block">
          <img src={shape7} alt="shape" className="animate-bounce" />
        </li>
        </ul>
      {/* <div className="w-full h-[100vh] absolute top-0"> */}
        {/* <SplineNext scene="https://prod.spline.design/y5qpQlHLTdTzGL-N/scene.splinecode" /> */}
      {/* </div> */}
      {/* <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8 absolute top-28"> */}
          <h2 className="text-3xl z-20 md:text-5xl font-semibold text-white">
            Welcome to&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24]">
              MeshCraft
            </span>
          </h2>
        {/* Left Column - Text */}
        {/* <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="mb-4 py-1 px-3 bg-gray-800 rounded-full inline-flex gap-1 items-center text-sm ">
            <SiStarship color="red" size={20} /> NEW ARRIVALS
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Meet the new home <br /> for your digital goods
          </h1>
          <p className="text-xl mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            dolorem optio mo
          </p> */}

          {/* Search Bar */}
          {/* <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden m-4">
            <input
              type="text"
              placeholder="Search 3D assets..."
              className="w-full py-2 px-4 text-black placeholder-gray-500"
            />
          </div> */}

          {/* Filter Buttons */}
          {/* <div className="flex space-x-4 m-4">
            <button className="bg-white text-black px-4 py-2 rounded-full">
              All
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
              Free
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
              Aliens
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
              Animals
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full">
              Monsters
            </button>
          </div> */}
        {/* </div> */}

        {/* Right Column - Slider */}
        {/* <div className="md:w-1/2"></div> */}
      </div>
    </section>
  );
};

export default Hero;
