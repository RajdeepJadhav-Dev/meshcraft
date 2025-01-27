import React, { useState, useEffect, useRef } from "react";
import "./about-us.css";
import { motion, useScroll, useTransform } from "framer-motion";
import img3dModeling from './3d_modeling.png';
import imgAnimations from './animations.png';
import imgGameDevSupport from './game_dev_support.png';
import imgMarketing from './marketing.png';

const MeetOurTeam = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleX = useTransform(scrollYProgress, [0, 0.5], ["-100%", "0%"]);
  const descriptionX = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <motion.div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black text-white p-20"
      style={{ opacity }}
    >
      <motion.h2
        className="text-7xl font-bold text-right mr-12 ml-14 leading-tight"
        style={{
          x: titleX,
          position: 'relative'
        }}
      >
        MEET OUR TEAM
      </motion.h2>
      <motion.div
        className="text-xl text-gray-300 text-left mr-14 leading-relaxed"
        style={{
          x: descriptionX,
          position: 'relative'
        }}
      >
        <p>
          From brainstorming creative ideas to solving complex challenges, we'll
          collaborate with you to ensure your game not only looks stunning but plays
          exactly as you've envisioned. We also focus on the bigger picture — from
          project execution to marketing strategies. We understand the challenges
          of standing out in a competitive market and are here to provide insights
          to help your game shine. Let's join forces to transform your vision into
          an unforgettable gaming experience.
        </p>
      </motion.div>
    </motion.div>
  );
};

const AboutUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const intervalRef = useRef(null);

  const departments = [
    { title: "3D Modeling", count: 5, image: img3dModeling },
    { title: "Animations", count: 5, image: imgAnimations },
    { title: "Web Dev", count: 10, image: imgGameDevSupport },
    { title: "Marketing", count: 5, image: imgMarketing },
  ];

  const loopDepartments = [
    ...departments, ...departments, ...departments,
    ...departments, ...departments, ...departments
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setHoveredIndex(null);
    }, 40000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePanelEnter = (index) => {
    setHoveredIndex(index);
    clearInterval(intervalRef.current);
  };

  const handlePanelLeave = () => {
    setHoveredIndex(null);
    intervalRef.current = setInterval(() => {
      setHoveredIndex(null);
    }, 40000);
  };


  return (
    <div className="min-h-screen bg-black text-white py-20 px-5 relative">
    <div className="flex justify-center items-center my-12 relative pb-12">
      <div className="bg-gray-800 border-2 border-white rounded-2xl p-5 w-11/12 max-w-7xl shadow-lg transition-shadow duration-300 hover:shadow-blue-400/70 relative">
        <div className="absolute top-2.5 left-5 flex gap-2.5">
          <span className="w-3 h-3 bg-gray-900 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-900 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-900 rounded-full"></span>
        </div>
        
        <motion.p
          className="text-sm text-gray-400 text-center -mt-2.5 mb-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Meshcraft / About Us
        </motion.p>
        <motion.div className="bg-gray-900 border-2 border-white rounded-2xl p-10 text-center shadow-inner">
            {/* Title container */}
            <div className="flex justify-center items-center mb-5">
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-white opacity-0"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 50, 
                  damping: 10, 
                  duration: 1 
                }}
              >
                MESH
              </motion.h1>
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-white opacity-0"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 50, 
                  damping: 10, 
                  duration: 1 
                }}
              >
                CRAFT
              </motion.h1>
            </div>
            {/* Description */}
            <motion.p
              className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto animate-fadeIn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              At <em>Meshcraft</em>, we're dedicated to helping indie game developers
              like you turn your ideas into reality. We understand the challenges of
              building a game from the ground up, which is why we're here to support
              you every step of the way. From detailed 3D models and lifelike characters
              to breathtaking level designs and seamless animations, we provide everything
              you need to bring your vision to life. But we're more than just a service — 
              we're your partner on this creative journey.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <MeetOurTeam />

      {/* Panels Section */}
      <div className="mt-12 overflow-hidden relative w-full">
        <div className="flex py-10 animate-slowMarquee">
          {loopDepartments.map((dept, index) => (
            <div
              key={index}
              className={`flex-shrink-0 mr-10 transition-transform duration-300 relative 
                ${hoveredIndex === index ? 'scale-105 z-10' : ''}`}
              onMouseEnter={() => handlePanelEnter(index)}
              onMouseLeave={handlePanelLeave}
            >
              <div className="bg-gray-800 rounded-2xl border-2 border-white p-4 min-w-[250px] h-[350px] shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative bg-transparent rounded-2xl border-2 border-white h-full flex flex-col overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <img
                      src={dept.image}
                      alt={dept.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 p-4 text-center">
                    <h3 className="text-base font-bold text-white mb-1">
                      {dept.title}
                    </h3>
                    <div className="mt-[230px] text-sm text-white">
                      <span>Number of People : </span>
                      <motion.span
                        className="text-blue-300"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                        }}
                      >
                        {dept.count}
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;