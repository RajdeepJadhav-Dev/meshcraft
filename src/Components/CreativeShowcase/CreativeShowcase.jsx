import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import blender from "../../assets/SoftwareLogo/Blender.png";
import maya from "../../assets/SoftwareLogo/Maya.png";
import unity from "../../assets/SoftwareLogo/Unity3D.png";
import unrealEngine from "../../assets/SoftwareLogo/UnrealEngine.png";
import santer from "../../assets/SoftwareLogo/Santer.png";

const Model = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001; // Slight rotation for animation
    }
  });

  return (
    <primitive ref={modelRef} object={scene} scale={8} position={[2, -5, -10]} />
  );
};

const Sidebar = ({ assets, onAssetClick }) => {
  return (
    <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto text-white rounded-r-lg">
      <h3 className="text-lg font-bold mb-4">Other Assets</h3>
      <ul className="space-y-4">
        {assets.map((asset, index) => (
          <li
            key={index}
            onClick={() => onAssetClick(asset)}
            className="cursor-pointer flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-700"
          >
            <img
              src={asset.softwareLogo}
              alt={`${asset.title} Software Logo`}
              className="w-12 h-12 rounded-md"
            />
            <div>
              <p className="font-semibold">{asset.title}</p>
              <p className="text-sm text-gray-400">{asset.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FullscreenCard = ({ model, onClose, assets, onAssetClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 text-white">
      <div className="bg-gray-900 rounded-lg shadow-lg w-11/12 max-w-6xl flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center p-6">
          <div className="relative w-full h-3/5">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 15, 10]} angle={0.3} />
              <Suspense fallback={null}>
                <Model modelUrl={model.modelUrl} />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>
          <div className="w-full mt-6">
            <h2 className="text-2xl font-bold mb-4">{model.title}</h2>
            <p className="text-lg mb-2">{model.description}</p>
          </div>
          <button
            className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {/* Sidebar */}
        <Sidebar assets={assets} onAssetClick={onAssetClick} />
      </div>
    </div>
  );
};

const CreativeShowcase = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [loadedModels, setLoadedModels] = useState({});

  const showcaseItems = [
    {
      title: "Alien Adventure Animation",
      description: "A stunning animation featuring our Alien Character.",
      modelUrl: "/3dfiles/Archery.gltf",
      thumbnail: "/thumbnails/alien.png",
      softwareLogo: blender,
    },
    {
      title: "Furry Felix Short Film",
      description: "A short film showcasing the lovable Furry Felix.",
      modelUrl: "/3dfiles/Hydroaptor.gltf",
      thumbnail: "/thumbnails/furry-felix.png",
      softwareLogo: maya,
    },
    {
      title: "Lion Cub Illustration",
      description: "An illustration inspired by our Lion Cub model.",
      modelUrl: "/3dfiles/Archery.gltf",
      thumbnail: "/thumbnails/Lion.png",
      softwareLogo: unity,
    },
  ];

  const handleCardClick = (item) => {
    setSelectedModel(item);
    // Mark the model as loaded when clicked
    setLoadedModels((prev) => ({ ...prev, [item.modelUrl]: true }));
  };

  const closeModal = () => {
    setSelectedModel(null);
  };

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Creative Showcase
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item)}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            >
              <div className="relative w-full h-48 bg-gray-900">
                {loadedModels[item.modelUrl] ? (
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} />
                    <Suspense fallback={null}>
                      <Model modelUrl={item.modelUrl} />
                    </Suspense>
                    <OrbitControls />
                  </Canvas>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedModel && (
        <FullscreenCard
          model={selectedModel}
          onClose={closeModal}
          assets={showcaseItems}
          onAssetClick={handleCardClick}
        />
      )}
    </section>
  );
};

export default CreativeShowcase;