import React, { useLayoutEffect, useRef, forwardRef, useEffect } from "react";
import { gsap } from "gsap";
import shape9 from "../../assets/Background shapes/9.png";
import shape8 from "../../assets/Background shapes/8.png";
import shape3 from "../../assets/Background shapes/3.png";
import shape4 from "../../assets/Background shapes/4.png";
import shape5 from "../../assets/Background shapes/5.png";
import shape6 from "../../assets/Background shapes/6.png";
import shape7 from "../../assets/Background shapes/7.png";
import meshcraft from "../../assets/MESH_orange.png";
import { Link } from "react-router-dom";

 
// const shapesData = [
//   { id: 1, src: shape9, top: "20vh", left: "58vw", animate: "animate-pulse", size: "w-20 sm:w-32" },
//   { id: 2, src: shape8, top: "20vh", left: "78vw", animate: "animate-pulse", size: "w-20" },
//   { id: 3, src: shape3, top: "50vh", left: "85vw", animate: "animate-pulse", size: "w-20 sm:w-32" },
//   { id: 4, src: shape4, top: "30vh", left: "67vw", animate: "", size: "w-52 sm:w-64" },
//   { id: 5, src: shape5, top: "50vh", left: "58vw", animate: "animate-pulse", size: "w-20 sm:w-30" },
//   { id: 6, src: shape6, top: "70vh", left: "60vw", animate: "animate-pulse", size: "w-20 sm:w-32" },
//   { id: 7, src: shape7, top: "72vh", left: "77vw", animate: "animate-pulse", size: "w-15 sm:w-25" }
// ];
 
 
 
const shapesData = [
  { id: 1, src: shape9, top: "20vh", left: "58vw", animate: "animate-pulse", size: "w-20 sm:w-32" },
  { id: 2, src: shape8, top: "20vh", left: "78vw", animate: "animate-pulse", size: "w-20" },
  { id: 3, src: shape3, top: "50vh", left: "85vw", animate: "animate-pulse", size: "w-20 sm:w-32" },
  { id: 4, src: shape4, top: "30vh", left: "67vw", animate: "", size: "w-52 sm:w-64" },
  { id: 5, src: shape5, top: "50vh", left: "58vw", animate: "animate-pulse", size: "w-20 sm:w-30" },
  { id: 6, src: shape6, top: "70vh", left: "60vw", animate: "animate-pulse", size: "w-20 sm:w-32" },
  { id: 7, src: shape7, top: "72vh", left: "77vw", animate: "animate-pulse", size: "w-15 sm:w-25" }
];
 
const HeroShapes = () => {
  const centerRef = useRef(null); // Reference for shape 4 (the center)
  const shapeRefs = useRef({}); // References for the small shapes (keyed by shape id)
  const orbitData = useRef({}); // For each small shape: { baseX, baseY } relative to shape 4
  const globalRotation = useRef(0); // Global accumulated rotation (in radians)
  const lastScrollY = useRef(window.scrollY);
 
  // After mounting, compute each small shape's base offset relative to shape 4.
  useEffect(() => {
    if (centerRef.current) {
      // Get center of shape 4 (in viewport coordinates)
      const centerRect = centerRef.current.getBoundingClientRect();
      const centerX = centerRect.left + centerRect.width / 2;
      const centerY = centerRect.top + centerRect.height / 2;
 
      // For every small shape, compute its base offset vector:
      // (small shape center - shape4 center)
      Object.keys(shapeRefs.current).forEach((id) => {
        const shape = shapeRefs.current[id];
        if (shape) {
          const rect = shape.getBoundingClientRect();
          const shapeCenterX = rect.left + rect.width / 2;
          const shapeCenterY = rect.top + rect.height / 2;
          const baseX = shapeCenterX - centerX;
          const baseY = shapeCenterY - centerY;
          orbitData.current[id] = { baseX, baseY };
        }
      });
    }
  }, []);
 
  // Listen for scroll events and update the orbit of each small shape.
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
 
      // Determine a small angular change (in radians) based on scroll delta.
      const rotationSensitivity = 0.002; // Adjust sensitivity as needed.
      // Now, we add the deltaAngle so that:
      // - Scrolling down (delta > 0) produces a positive (anticlockwise) rotation.
      // - Scrolling up (delta < 0) produces a negative (clockwise) rotation.
      const deltaAngle = delta * rotationSensitivity;
      globalRotation.current = globalRotation.current + deltaAngle;
 
      // For each small shape, calculate the new transform offset.
      Object.keys(orbitData.current).forEach((id) => {
        const { baseX, baseY } = orbitData.current[id];
        const theta = globalRotation.current;
        // Rotate the base offset by theta.
        const rotatedX = baseX * Math.cos(theta) - baseY * Math.sin(theta);
        const rotatedY = baseX * Math.sin(theta) + baseY * Math.cos(theta);
        // The transform offset to apply is the difference from the original base.
        const transformX = rotatedX - baseX;
        const transformY = rotatedY - baseY;
 
        gsap.to(shapeRefs.current[id], {
          x: transformX,
          y: transformY,
          duration: 0.2,
          ease: "power1.out"
        });
      });
    };
 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  return (
    <div className="absolute bg-[radial-gradient(circle_at_95%_8%,#3A220E_20%,transparent_50%),linear-gradient(to_right,#000000,#000000)] inset-0 w-full h-full pointer-events-none overflow-hidden">
      {shapesData.map((shape) => {
        if (shape.id === 4) {
          // Render the center (big) shape.
          return (
            <img
              key={shape.id}
              ref={centerRef}
              src={shape.src}
              alt={`shape-${shape.id}`}
              className={`absolute shape-${shape.id} ${shape.size} opacity-90 filter drop-shadow-lg ${shape.animate}`}
              style={{ top: shape.top, left: shape.left }}
            />
          );
        } else {
          // Render the small shapes.
          return (
            <img
              key={shape.id}
              ref={(el) => {
                shapeRefs.current[shape.id] = el;
              }}
              src={shape.src}
              alt={`shape-${shape.id}`}
              className={`absolute shape-${shape.id} ${shape.size} opacity-90 filter drop-shadow-lg ${shape.animate}`}
              style={{ top: shape.top, left: shape.left }}
            />
          );
        }
      })}
    </div>
  );
};
const Navbar = () => {
  const navLinks = ["Home", "Services", "About us", "Contact us", "Sign In"];
  return (
    <nav className="fixed top-0 w-full flex items-center justify-between px-12 py-4 bg-black bg-opacity-90 shadow-md z-50">
      <div className="text-3xl font-bold flex items-center">
        <img src="../../assets/logo.png" alt="MeshCraft Logo" className="w-10 h-10 mr-2" />
        <span className="text-[#ff6600]">Mesh</span>Craft
      </div>
      <div className="flex space-x-8 text-lg">
        {navLinks.map((link, idx) => (
          <a key={idx} href="#" className="hover:text-[#ff6600] transition duration-300">
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
};
 
const HeroText = forwardRef((_, ref) => (
  <div ref={ref} className="w-full">
    <h1 className="text-6xl mb-7 font-bold">Welcome to</h1>
    <img src={meshcraft} width="50%" className="mb-4" alt="MeshCraft" />
    <p className="text-lg font-bold space-y-2 text-gray-300">
      Explore the ultimate 3D mesh marketplace with unique designs and seamless trading.
    </p>
    <div className="mt-6 flex space-x-6">
      <Link to="/signup" className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition duration-300">
        Sign In
      </Link>
      <Link to= "/marketplace" className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition duration-300">
        Marketplace
      </Link>
    </div>
  </div>
));
 
 
const ContinuousParticles = () => {
  const containerRef = useRef(null);
 
  useEffect(() => {
    const container = containerRef.current;
 
    const spawnParticle = (initial = false) => {
      const particle = document.createElement("div");
      const isOrange = Math.random() < 0.5;
      const size = isOrange ? "4px" : "3px";
 
      particle.style.position = "absolute";
      particle.style.borderRadius = "50%";
      particle.style.backgroundColor = "#ff6600";
      particle.style.width = size;
      particle.style.height = size;
      particle.style.left = `${Math.random() * 100}%`;
 
      const startTop = initial ? `${Math.random() * 100}%` : "110%";
      particle.style.top = startTop;
 
      container.appendChild(particle);
 
      const fullDuration = 25 + Math.random() * 10;
      const startValue = initial ? parseFloat(startTop) : 110;
      const distance = startValue + 15;
      const duration = fullDuration * (distance / 120);
 
      gsap.to(particle, {
        duration: duration,
        ease: "linear",
        top: "-10%",
        onComplete: () => {
          container.removeChild(particle);
        },
      });
    };
 
    const initialParticlesCount = 25;
    for (let i = 0; i < initialParticlesCount; i++) {
      spawnParticle(true);
    }
 
    const intervalId = setInterval(() => spawnParticle(false), 500);
 
    return () => clearInterval(intervalId);
  }, []);
 
  return <div ref={containerRef} className="absolute inset-0 pointer-events-none"></div>;
};
 
const Hero = () => {
  const heroTextRef = useRef(null);
 
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
 
      // Animate the shapes
      shapesData.forEach((shape, index) => {
        tl.fromTo(
          `.shape-${shape.id}`,
          { opacity: 0 },
          { opacity: 1, duration: 1.8, ease: "power3.out" },
          index * 0.3
        );
      });
 
      // Animate the hero text
      gsap.from(heroTextRef.current, {
        opacity: 0,
        x: -100,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);
 
  return (
    <section
      className="relative w-full h-screen overflow-hidden text-white px-20 flex items-center justify-center"
    >
      <HeroShapes />
      <ContinuousParticles />
      <div className="relative z-10 flex items-center justify-between w-full h-full">
        <HeroText ref={heroTextRef} />
      </div>
    </section>
  );
};
 
export default Hero;