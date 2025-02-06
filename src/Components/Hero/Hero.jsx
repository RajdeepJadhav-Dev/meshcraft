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
 
const shapesData = [
  { id: 1, src: shape9, top: "20vh", left: "58vw", animate: "animate-pulse", size: "w-20 sm:w-32" },
  { id: 2, src: shape8, top: "20vh", left: "78vw", animate: "animate-pulse", size: "w-20" },
  { id: 3, src: shape3, top: "50vh", left: "85vw", animate: "animate-pulse", size: "w-20 sm:w-32" },
  { id: 4, src: shape4, top: "30vh", left: "67vw", animate: "", size: "w-52 sm:w-64" },
  { id: 5, src: shape5, top: "50vh", left: "58vw", animate: "animate-pulse", size: "w-20 sm:w-30" },
  { id: 6, src: shape6, top: "70vh", left: "60vw", animate: "animate-pulse", size: "w-20 sm:w-32" },
  { id: 7, src: shape7, top: "72vh", left: "77vw", animate: "animate-pulse", size: "w-15 sm:w-25" }
];
 

 
const HeroText = forwardRef((_, ref) => (
  <div ref={ref} className="w-full">
    <h1 className="text-6xl mb-7 font-bold">Welcome to</h1>
    <img src={meshcraft} width="50%" className="mb-4" alt="MeshCraft" />
    <p className="text-lg font-bold space-y-2 text-gray-300">
      Explore the ultimate 3D mesh marketplace with unique designs and seamless trading.
    </p>
    <div className="mt-6 flex space-x-6">
      <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition duration-300">
        Sign In
      </button>
      <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition duration-300">
        Marketplace
      </button>
    </div>
  </div>
));
 
const HeroShapes = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
    {shapesData.map((shape) => (
      <img
        key={shape.id}
        src={shape.src}
        alt={`shape-${shape.id}`}
        className={`absolute shape-${shape.id} ${shape.size} opacity-90 filter drop-shadow-lg ${shape.animate}`}
        style={{ top: shape.top, left: shape.left }}
      />
    ))}
  </div>
);
 
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
 
    const initialParticlesCount = 20;
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
 
      shapesData.forEach((shape, index) => {
        tl.fromTo(
          `.shape-${shape.id}`,
          { opacity: 0 },
          { opacity: 1, duration: 1.8, ease: "power3.out" },
          index * 0.3
        );
      });
   
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
      className="relative w-full h-screen overflow-hidden bg-black text-white px-20 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/landing page.png')" }}    >
      <HeroShapes />
 
      <ContinuousParticles />
 
      <div className="relative z-10 flex items-center justify-between w-full h-full">
        <HeroText ref={heroTextRef} />
      </div>
    </section>
  );
};
 
export default Hero;