import React, { useState, useEffect, useRef, useMemo } from "react";
import "./about-us.css";
import { motion, useScroll, useTransform } from "framer-motion";
import img3dModeling from "./3d_modeling.png";
import imgAnimations from "./animations.png";
import imgGameDevSupport from "./game_dev_support.png";
import imgMarketing from "./marketing.png";
 
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
 
const scaleBounce = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 10 } },
};
 
const MeetOurTeam = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
 
  const titleX = useTransform(scrollYProgress, [0, 0.5], ["-100%", "0%"]);
  const descriptionX = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);
 
  return (
    <motion.div ref={sectionRef} className="team-section" style={{ overflow: "hidden" }}>
      <motion.h2 className="section-title" style={{ x: titleX, opacity: scrollYProgress }}>
        MEET OUR TEAM
      </motion.h2>
      <motion.div className="team-description" style={{ x: descriptionX, opacity: scrollYProgress }}>
        <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          From brainstorming creative ideas to solving complex challenges, we collaborate with you to ensure your game not only looks stunning but plays exactly as envisioned.
          We also focus on project execution and marketing strategies, helping your game shine in a competitive market.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
 
const AboutUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const intervalRef = useRef(null);
 
  const departments = useMemo(() => [
    { title: "3D Modeling", image: img3dModeling },
    { title: "Animations", image: imgAnimations },
    { title: "Game Dev Support", image: imgGameDevSupport },
    { title: "Marketing", image: imgMarketing },
  ], []);
 
  const loopDepartments = useMemo(() => Array(6).fill(departments).flat(), [departments]);
 
  useEffect(() => {
    intervalRef.current = setInterval(() => setHoveredIndex(null), 10000);
    return () => clearInterval(intervalRef.current);
  }, []);
 
  const handlePanelEnter = (index) => {
    setHoveredIndex(index);
    clearInterval(intervalRef.current);
  };
 
  const handlePanelLeave = () => {
    setHoveredIndex(null);
    intervalRef.current = setInterval(() => setHoveredIndex(null), 10000);
  };
 
  return (
    <div className="about-us-page">
      <div className="main-content">
        <motion.div
          className="console-panel"
          variants={scaleBounce}
          initial="hidden"
          animate="visible"
        >
          <div className="outer-box">
            <div className="circle-group">
              <motion.span className="circle" animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 1.5 }}></motion.span>
              <motion.span className="circle" animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}></motion.span>
              <motion.span className="circle" animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}></motion.span>
            </div>
            <motion.p className="breadcrumb" whileHover={{ scale: 1.2, color: "#5e9aff" }}>Meshcraft / About Us</motion.p>
            <motion.div className="inner-box" whileHover={{ boxShadow: "0px 8px 20px rgba(94, 154, 255, 0.7)" }}>
              <div className="meshcraft-title-container">
                <motion.h1 className="meshcraft-title left-word" initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 50, damping: 10 }}>
                  MESH
                </motion.h1>
                <motion.h1 className="meshcraft-title right-word" initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 50, damping: 10 }}>
                  CRAFT
                </motion.h1>
              </div>
              <motion.p className="description" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
        </motion.div>
        <MeetOurTeam />
        <div className="panels-section">
          <div className="panels-container">
            {loopDepartments.map((dept, index) => (
              <motion.div
                key={index}
                className={`square-panel ${hoveredIndex === index ? "hovered" : ""}`}
                onMouseEnter={() => handlePanelEnter(index)}
                onMouseLeave={handlePanelLeave}
                whileHover={{ scale: 1.15, rotate: 5 }}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="outer-panel">
                  <div className="inner-panel">
                    <div className="panel-image-container">
                      <motion.img src={dept.image} alt={dept.title} className="panel-image" />
                    </div>
                    <motion.div className="panel-content" whileHover={{ y: -15 }}>
                      <h3 className="panel-title">{dept.title}</h3>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AboutUs;
 
 