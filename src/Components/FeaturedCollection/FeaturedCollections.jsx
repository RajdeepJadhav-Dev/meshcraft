import React from "react";
import characters3d from "../../assets/featured-collection/3d-character.png";
import textureAndmaterial from "../../assets/featured-collection/texture-materials.png";
import enviroinmentAassets from "../../assets/featured-collection/envroinment-assets.png"

const FeaturedCollections = () => {
  const collections = [
    {
      title: "3D Characters",
      description:
        "Explore our wide range of 3D character models for your projects.",
      image: characters3d, // Replace with actual image path
    },
    {
      title: "Textures & Materials",
      description:
        "High-quality textures and materials to enhance your designs.",
      image: textureAndmaterial, // Replace with actual image path
    },
    {
      title: "Environment Assets",
      description: "Ready-to-use environment assets to build immersive worlds.",
      image: enviroinmentAassets, // Replace with actual image path
    },
  ];

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl text-center text-white mb-8">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-48 object-contain"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  {collection.title}
                </h3>
                <p className="text-gray-400">{collection.description}</p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
