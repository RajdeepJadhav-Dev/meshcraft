
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Link } from "react-router-dom";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ modelUrl, scale, rotation }) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const modelRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    setLoading(true);

    loader.load(
      modelUrl,
      (gltf) => {
        setModel(gltf.scene);
        setLoading(false);
      },
      (xhr) => {
        // Loading progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
        setLoading(false);
      }
    );
  }, [modelUrl]);

  if (loading) {
    return null; // Or return a loading spinner component
  }

  return model ? (
    <primitive 
      ref={modelRef} 
      object={model} 
      scale={scale} 
      rotation={rotation} 
      position={[2, -5, -10]} 
    />
  ) : null;
};
const ProductCard = ({ asset, onClick }) => {
  return (
    <div 
      onClick={() => onClick(asset)} 
      className="relative bg-gray-900 p-4 md:p-6 rounded-lg flex flex-col text-white cursor-pointer"
    >
      <div className="relative w-full overflow-hidden rounded-t-2xl h-52 bg-gray-300">
        <Canvas>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <spotLight position={[10, 15, 10]} angle={0.3} intensity={1.5} />
          <Suspense fallback={null}>
            <Model 
              modelUrl={asset.modelUrl} 
              scale={asset.scale} 
              rotation={asset.rotation} 
            />
          </Suspense>
          <OrbitControls enableRotate={false} />
        </Canvas>
      </div>
      <div className="mt-6 text-center md:text-left">
        <p className="font-semibold text-lg">{asset.title}</p>
        <p className="text-sm text-gray-400">{asset.description}</p>
        <p className="text-sm text-gray-400">{asset.price}</p>
        <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
          <img src={asset.softwareLogo} alt={asset.software} className="w-6 h-6" />
          <p className="text-sm text-gray-400">{asset.software}</p>
        </div>
      </div>
    </div>
  );
};


const Sidebar = ({ assets, onAssetClick }) => {
  return (
    <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto text-white rounded-r-lg">
      <h3 className="text-lg font-bold mb-4">Other Assets</h3>
      <ul className="space-y-4">
        {assets.map((asset, index) => (
          <li key={index} onClick={() => onAssetClick(asset)} className="cursor-pointer flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-700">
            <img src={asset.softwareLogo} alt={`${asset.title} Software Logo`} className="w-12 h-12 rounded-md" />
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
      <div className="bg-gray-900 rounded-lg shadow-lg w-[48rem] h-[30rem] flex overflow-hidden">
        <div className="flex-1 flex flex-col items-center p-4">
          <div className="relative w-full h-3/5">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 15, 10]} angle={0.3} />
              <Suspense fallback={null}>
                <Model 
                  modelUrl={model.modelUrl} 
                  scale={model.scale} 
                  rotation={model.rotation} 
                />
              </Suspense>
              <OrbitControls enableRotate={true} />
            </Canvas>
          </div>
          <div className="w-full mt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">{model.title}</h2>
            <p className="text-lg mb-2">{model.description}</p>
            <p className="text-lg mb-2">Price: {model.price}</p>
            <div className="flex items-center space-x-2 mb-4">
              <img src={model.softwareLogo} alt={model.software} className="w-8 h-8" />
              <p className="text-lg">{model.software}</p>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg" onClick={onClose}>Close</button>
              <Link to={`/asset/${model.title}`} 
                   state={{ asset: model }} 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  View Asset
               </Link>

            </div>
          </div>
        </div>
        <Sidebar assets={assets} onAssetClick={onAssetClick} />
      </div>
    </div>
  );
};


const TextureCard = ({ texture }) => {
  return (
    <div className="relative bg-white bg-opacity-30 shadow-lg rounded-2xl overflow-hidden flex flex-col items-center space-y-4 p-6 w-full h-auto min-h-[300px] max-w-lg mx-auto">
      <div className="absolute top-2 left-2 right-2 flex justify-between w-full px-4">
        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md border border-white">
          {texture.format}
        </span>
        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md border border-white">
          {texture.price}
        </span>
      </div>
      <div className="w-40 h-40 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img src={texture.items} alt={texture.alt} className="w-full h-full object-cover" />
      </div>
      <div className="w-full border-t border-white my-4"></div>
      <div className="mt-4 text-center w-full">
        <p className="text-white font-semibold">{texture.text}</p>
      </div>
    </div>
  );
};

// Optional: Add a loading manager to track overall loading progress
const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
};

// Optional: Add a cache for loaded models
const modelCache = new Map();

// Optional: Preload function to load models in advance
const preloadModels = (assets) => {
  const loader = new GLTFLoader(loadingManager);
  
  assets.forEach(asset => {
    if (!modelCache.has(asset.modelUrl)) {
      loader.load(asset.modelUrl, (gltf) => {
        modelCache.set(asset.modelUrl, gltf.scene);
      });
    }
  });
};

const MarketPlace = () => {
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters ? JSON.parse(savedFilters) : [];
  });
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showTextures, setShowTextures] = useState(false);

  const assets = [
    {
      title: "Flowergirl",
      description: "A character model featuring a floral-themed fairy.",
      poly: "Low Poly",
      price: "$75.00",
      modelUrl: "/3dfiles/new/FlowerGirl.glb",
      software: "3ds Max",
      softwareLogo: "/SoftwareLogo/Unity3D.png",
      scale: [3, 3, 3],
      rotation: [0, -Math.PI / 2, 0],
    },
    {
      title: "Knife (Katar)",
      description: "A traditional dagger with a distinctive blade.",
      poly: "Low Poly",
      price: "$75.00",
      modelUrl: "/3dfiles/ImageToStl.com_knife.glb",
      software: "3ds Max",
      softwareLogo: "/SoftwareLogo/Unity3D.png",
      scale: [3, 3, 3],
      rotation: [Math.PI / 2, Math.PI / 2, 0],
    },
    {
      title: "Fox",
      description: "A stylized 3D model of a fox.",
      poly: "Low Poly",
      price: "$75.00",
      modelUrl: "/3dfiles/ImageToStl.com_fox.glb",
      software: "3ds Max",
      softwareLogo: "/SoftwareLogo/Unity3D.png",
      scale: [3, 3, 3],
      rotation: [0, 0, 0],
    },
    {
      title: "Small Barracks",
      description: "A compact military structure with a simple design.",
      poly: "Medium Poly",
      price: "$36.00",
      modelUrl: "/3dfiles/smallbarracks.glb",
      software: "Blender",
      softwareLogo: "/SoftwareLogo/Blender.png",
      scale: [1, 1, 1],
      rotation: [0, 0, 0],
    },
    {
      title: "Wood Yard",
      description: "A wooden storage area with logs and planks.",
      poly: "High Poly",
      price: "$139.99",
      modelUrl: "/3dfiles/Woodyard2356.glb",
      software: "Maya",
      softwareLogo: "/SoftwareLogo/Maya.png",
      scale: [1.5, 1.5, 1.5],
      rotation: [0, -Math.PI / 2, 0],
    },
    {
      title: "Windmill",
      description: "A traditional wind-powered structure with rotating blades.",
      poly: "High Poly",
      price: "$99.99",
      modelUrl: "/3dfiles/Windmill123.glb",
      software: "Cinema 4D",
      softwareLogo: "/SoftwareLogo/Unity3D.png",
      scale: [1, 1, 1],
      rotation: [0, -Math.PI, 0],
    },
    {
      title: "Mine",
      description: "An underground excavation site for resource extraction.",
      poly: "Medium Poly",
      price: "$49.99",
      modelUrl: "/3dfiles/MINE12.glb",
      software: "ZBrush",
      softwareLogo: "/SoftwareLogo/UnrealEngine.png",
      scale: [2, 2, 2],
      rotation: [0, Math.PI / 2, 0],
    },
    {
      title: "Duck",
      description: "A cute duck character wearing a hat and crossbody bag.",
      poly: "Low Poly",
      price: "$75.00",
      modelUrl: "/3dfiles/ImageToStl.com_ducknew.glb",
      software: "3ds Max",
      softwareLogo: "/SoftwareLogo/Unity3D.png",
      scale: [3, 3, 3],
      rotation: [0, -Math.PI / 2, 0],
    },
    {
      title: "House",
      description: "A cozy residential building with a simple design.",
      poly: "Low Poly",
      price: "$75.00",
      modelUrl: "/3dfiles/House12.glb",
      software: "3ds Max",
      softwareLogo: "/SoftwareLogo/Unity3D.png",
      scale: [2, 2, 2],
      rotation: [0, -Math.PI / 2, 0],
    },
    {
      title: "Granitor",
      description: "A mythical stone-based creature with a rugged appearance.",
      poly: "Low Poly",
      price: "$75.00",
      modelUrl: "/3dfiles/Granitor23.glb",
      software: "3ds Max",
      softwareLogo: "/SoftwareLogo/Unity3d.png",
      scale: [5, 5, 5],
      rotation: [0, Math.PI, 0],
    },
    {
      title: "Campfire",
      description: "A rustic outdoor campfire setup with logs and flames.",
      poly: "Low Poly",
      price: "$75.00",
      modelUrl: "/3dfiles/camp1fire.glb",
      software: "3ds Max",
      softwareLogo: "/SoftwareLogo/Unity3D.png",
      scale: [1, 1, 1],
      rotation: [0, Math.PI / 2, 0],
    },
];

const textures = [
  {
    text: "It's a metallic texture",
    format: "AVIF",
    items: "/Texturefiles/eaves-leaflet-texture.avif",
    alt: "Metallic Texture",
    price: "Free"
  },
  {
    text: "It's a leather texture",
    format: "JPG",
    items: "/Texturefiles/leather2-textures.jpg",
    alt: "Leather Texture",
    price: "Free"
  },
  {
    text: "It's a marble texture",
    format: "JPG",
    items: "/Texturefiles/marble-stone-texture.jpg",
    alt: "Marble Texture",
    price: "Free"
  }
];

  useEffect(() => {
    // Preload models when component mounts
    preloadModels(assets);
  }, []);

  const handleFilterClick = (filter) => {
    if (filters.includes(filter)) {
      // If filter is already selected, remove it
      const newFilters = filters.filter(f => f !== filter);
      setFilters(newFilters);
      if (filter === "Texture") {
        setShowTextures(false);
      }
    } else {
      // If filter is not selected, add it
      if (filter === "Texture") {
        setFilters(["Texture"]); // Only show textures
        setShowTextures(true);   // Enable texture mode
      } else {
        const newFilters = [...filters.filter(f => f !== "Texture"), filter];
        setFilters(newFilters);
        setShowTextures(false); // Disable texture mode when selecting other filters
      }
    }
  };

  // Update filteredAssets whenever filters change
  useEffect(() => {
    // Initialize with all assets
    let newFilteredAssets = [...assets];

    if (filters.length > 0) {
      if (filters.includes("Texture")) {
        // When Texture filter is selected, show no assets
        newFilteredAssets = [];
        setShowTextures(true);
      } else {
        // Filter assets based on selected poly types
        newFilteredAssets = assets.filter(asset => filters.includes(asset.poly));
        setShowTextures(false);
      }
    } else {
      // When no filters are selected, show all assets
      setShowTextures(false);
    }

    setFilteredAssets(newFilteredAssets);
    localStorage.setItem("filters", JSON.stringify(filters)); // Save filters to local storage
  }, [filters]);

  return (
    <>
      {selectedModel && (
        <FullscreenCard 
          model={selectedModel} 
          onClose={() => setSelectedModel(null)} 
          assets={assets} 
          onAssetClick={setSelectedModel} 
        />
      )}
      <section className="bg-black min-h-screen py-12">
        <div className="text-white px-16">
          <h1 className="text-4xl font-bold pt-10">Marketplace</h1>
          <div className="mb-6 flex items-center space-x-4">
            {["High Poly", "Medium Poly", "Low Poly", "Texture"].map((poly) => (
              <span 
                key={poly} 
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  filters.includes(poly) ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
                }`} 
                onClick={() => handleFilterClick(poly)}
              >
                {poly}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {showTextures ? (
              textures.map((texture, index) => (
                <TextureCard key={`texture-${index}`} texture={texture} />
              ))
            ) : (
              <>
                {filteredAssets.map((asset, index) => (
                  <ProductCard 
                    key={`asset-${index}`} 
                    asset={asset} 
                    onClick={() => setSelectedModel(asset)} 
                  />
                ))}
                {filters.length === 0 && textures.map((texture, index) => (
                  <TextureCard key={`texture-${index}`} texture={texture} />
                ))}
              </>
            )}
          </div>
        </div>
       
      </section>
    </>
  );
};

export default MarketPlace;