import React from "react";
import { motion } from "framer-motion";
import characters3d from "../../assets/featured-collection/3d-character.png";
import textureAndmaterial from "../../assets/featured-collection/texture-materials.png";
import environmentassets from "../../assets/featured-collection/environment-assets.png";
import { Link } from "react-router-dom";
 
const FeaturedCollections = () => {
  const collections = [
    {
      title: "3D Characters",
      description:
        "Explore our wide range of 3D character models for your projects.",
      image: characters3d,
    },
    {
      title: "Textures & Materials",
      description:
        "High-quality textures and materials to enhance your designs.",
      image: textureAndmaterial,
    },
    {
      title: "Environment Assets",
      description: "Ready-to-use environment assets to build immersive worlds.",
      image: environmentassets,
    },
  ];
 
  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4 sm:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-12">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b
                                              from-white/10 to-white/5
                                              border-t border-l border-white/10
                                              shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
                                              backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-purple-500/50 transition-shadow duration-300 border-4 border-gray-900"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <div className="relative h-80 w-full flex justify-center items-center bg-transparent">
                <motion.img
                  src={collection.image}
                  alt={collection.title}
                  className="h-80 w-80 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 150 }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {collection.title}
                </h3>
                <p className="text-gray-400 mb-4">{collection.description}</p>
                <Link to="/services">
                <motion.button
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore
                </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default FeaturedCollections;