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
      className="team-section"
      style={{ opacity, overflow: 'hidden' }}
    >
      <motion.h2
        className="section-title"
        style={{
          x: titleX,
          position: 'relative'
        }}
      >
        MEET OUR TEAM
      </motion.h2>
      <motion.div
        className="team-description"
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
    <div className="about-us-page">
      {/* Gaming Console Panel */}
      <div className="console-panel">
        <div className="outer-box">
          {/* Circles for the console */}
          <div className="circle-group">
            <span className="circle"></span>
            <span className="circle"></span>
            <span className="circle"></span>
          </div>
          <motion.p
            className="breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Meshcraft / About Us
          </motion.p>
          <motion.div
            className="inner-box"
            whileHover={{ boxShadow: "0px 8px 20px rgba(94, 154, 255, 0.7)" }}
          >
            {/* Animated MESHCRAFT Title */}
            <div className="meshcraft-title-container">
              <motion.h1
                className="meshcraft-title left-word"
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
                className="meshcraft-title right-word"
                initial={{ x: "100%", opacity: 0 }}
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
              className="description"
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
      <div className="panels-section">
        <div className="panels-container">
          {loopDepartments.map((dept, index) => (
            <div
              key={index}
              className={`square-panel ${hoveredIndex === index ? 'hovered' : ''}`}
              onMouseEnter={() => handlePanelEnter(index)}
              onMouseLeave={handlePanelLeave}
            >
              <div className="outer-panel">
              <div className="inner-panel">
  <div className="panel-image-container">
    <img
      src={dept.image}
      alt={dept.title}
      className="panel-image"
    />
  </div>
  <div className="panel-content">
    <h3 className="panel-title">{dept.title}</h3>
    <div className="count-container">
      <span>Number of People : </span>
      <motion.span
        className="count"
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