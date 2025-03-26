import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect, useContext } from "react";
import { OrbitControls, useGLTF, useTexture, Environment } from "@react-three/drei";
import { Link, useLocation } from "react-router-dom";
import authContext from "../context/authContext";

// -- Model Component with improved background and lighting
const Model = ({ modelUrl, scale, rotation }) => {
  const defaultScale = scale && scale.length ? scale : [1, 1, 1];
  const defaultRotation = rotation && rotation.length ? rotation : [0, 0, 0];
  const fileExtension = modelUrl.split(".").pop().toLowerCase();

  if (["glb", "fbx"].includes(fileExtension)) {
    const { scene } = useGLTF(modelUrl);
    return (
      <>
        <primitive
          object={scene}
          scale={defaultScale}
          rotation={defaultRotation}
          position={[2, -5, -10]}
        />
        {/* Add environment for better lighting and reflections */}
        <Environment preset="sunset" />
      </>
    );
  } else {
    // For textures, load using useTexture and apply it to a plane
    const texture = useTexture(modelUrl);
    return (
      <>
        <mesh scale={defaultScale} rotation={defaultRotation} position={[2, -5, -10]}>
          <planeGeometry args={[5, 5]} />
          <meshBasicMaterial map={texture} />
        </mesh>
        {/* Add environment for better lighting */}
        <Environment preset="sunset" />
      </>
    );
  }
};

// -- ProductCard Component with click effect
const ProductCard = ({ asset, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <div
      onClick={() => onClick(asset)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`relative bg-gray-900 p-6 rounded-lg flex flex-col text-white cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 ${
        isPressed ? "scale-95 shadow-inner" : "hover:scale-102"
      }`}
    >
      <div className="relative w-full overflow-hidden rounded-t-2xl h-52 bg-gradient-to-b from-gray-800 to-gray-900">
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
      <div className="mt-8">
        <p className="font-semibold">{asset.title}</p>
        <p className="text-sm text-gray-400 mb-2">{asset.description}</p>
        <p className="text-gray-400 mb-2 text-xl">{asset.price} value</p>
        <div className="flex items-center space-x-2">
          {asset.softwareLogo && (
            <img src={asset.softwareLogo} alt={asset.software} className="w-5 h-5" />
          )}
          <p className="text-sm text-gray-400">{asset.software}</p>
        </div>
      </div>
    </div>
  );
};

// -- TextureCard Component with click effect
const TextureCard = ({ asset, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <div
      onClick={() => onClick(asset)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`relative bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg rounded-2xl overflow-hidden flex flex-col items-center space-y-4 p-6 w-full h-auto min-h-[300px] max-w-lg mx-auto cursor-pointer transform transition-all duration-200 ${
        isPressed ? "scale-95 shadow-inner" : "hover:scale-102 hover:shadow-blue-500/30"
      }`}
    >
      <div className="absolute top-2 left-2 right-2 flex justify-between w-full px-4">
        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md border border-blue-400">
          {asset.modelUrl.split('.').pop().toUpperCase()}
        </span>
        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md border border-blue-400">
          {asset.price === '0' ? "Free" : asset.price}
        </span>
      </div>
      <div className="w-40 h-40 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-2 border-blue-400">
        <img
          src={asset.modelUrl}
          alt={asset.alt || asset.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full border-t border-blue-400 my-4"></div>
      <div className="mt-4 text-center w-full">
        <p className="text-white font-semibold">{asset.title}</p>
      </div>
    </div>
  );
};

// -- Sidebar Component
const Sidebar = ({ assets, onAssetClick }) => {
  return (
    <div className="w-full md:w-1/3 bg-gradient-to-b from-gray-800 to-gray-900 p-4 overflow-y-auto text-white rounded-r-lg">
      <h3 className="text-lg font-bold mb-4">Other Assets</h3>
      <ul className="space-y-4">
        {assets.map((asset, index) => (
          <li
            key={index}
            onClick={() => onAssetClick(asset)}
            className="cursor-pointer flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-transparent hover:border-blue-500"
          >
            {asset.softwareLogo && (
              <img
                src={asset.softwareLogo}
                alt={`${asset.title} Software Logo`}
                className="w-12 h-12 rounded-md"
              />
            )}
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

// -- FullscreenCard Component with improved background and styling
const FullscreenCard = ({ asset, onClose, filteredAssets, onAssetClick }) => {
  console.log("Asset data:", asset);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 text-white p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-gray-800 to-gray-950 rounded-lg shadow-lg shadow-blue-500/20 w-full max-w-4xl h-auto max-h-[90vh] flex flex-col md:flex-row overflow-hidden border border-blue-500/30">
        <div className="flex-1 flex flex-col items-center p-4">
          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden border border-blue-500/30 bg-gradient-to-b from-gray-900 to-black">
            <Canvas>
              <ambientLight intensity={0.8} />
              <spotLight position={[10, 15, 10]} angle={0.3} intensity={1.5} />
              <directionalLight position={[-5, 5, -5]} intensity={0.5} />
              <Suspense fallback={null}>
                <Model
                  modelUrl={asset.modelUrl}
                  scale={asset.scale}
                  rotation={asset.rotation}
                />
              </Suspense>
              <OrbitControls enableRotate={true} />
              <Environment preset="sunset" />
            </Canvas>
          </div>
          <div className="w-full mt-6 text-center">
            <h2 className="text-2xl font-bold mb-2 text-blue-300">{asset.title}</h2>
            <p className="text-sm mb-3 text-gray-300">{asset.description}</p>
            <p className="text-lg mb-3 font-semibold">Price: <span className="text-blue-300">{asset.price}</span></p>
            <div className="flex items-center justify-center space-x-2 mb-4">
              {asset.softwareLogo && (
                <img src={asset.softwareLogo} alt={asset.software} className="w-6 h-6 border border-blue-400 rounded-full p-1" />
              )}
              <p className="text-sm text-gray-300">{asset.software}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg transform transition-transform duration-200 hover:bg-red-700 active:scale-95 hover:shadow-lg"
                onClick={onClose}
              >
                Close
              </button>
              <Link
                to={`/asset/${asset.title}?Id=${asset._id}`}
                state={{ asset: asset, showFullscreen: true }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transform transition-transform duration-200 active:scale-95 hover:shadow-lg"
              >
                View Asset
              </Link>
            </div>
          </div>
        </div>
        <Sidebar assets={filteredAssets} onAssetClick={onAssetClick} />
      </div>
    </div>
  );
};

// -- Main Marketplace Component
const MarketPlace = () => {
  const location = useLocation();
  const { editAssetData } = useContext(authContext);

  // For fullscreen overlay
  const [fullscreenAsset, setFullscreenAsset] = useState(
    location.state?.showFullscreen &&
      sessionStorage.getItem("returnToFullscreen") === "true"
      ? location.state.asset
      : null
  );

  // Clear session storage on refresh
  useEffect(() => {
    if (performance.navigation.type === 1) {
      sessionStorage.removeItem("returnToFullscreen");
    }
  }, []);

  // Local states
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem("filters");
    return saved ? JSON.parse(saved) : [];
  });
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [assets, setAssets] = useState(editAssetData || []);
  const [showTextures, setShowTextures] = useState(false);

  // Update assets from context
  useEffect(() => {
    console.log("editAssetData from context:", editAssetData);
    setAssets(editAssetData || []);
  }, [editAssetData]);

  // Separate assets into models and textures based on the poly field
  const modelAssets = assets.filter((asset) => asset.poly !== "Texture");
  const textureAssets = assets.filter((asset) => asset.poly === "Texture");

  // Update filtered assets when filters change
  useEffect(() => {
    if (filters.length > 0) {
      if (filters.includes("Texture")) {
        // Only show texture assets when Texture filter is active
        setFilteredAssets(textureAssets);
        setShowTextures(true);
      } else {
        // Filter model assets by selected poly types
        const newFiltered = modelAssets.filter((asset) =>
          filters.includes(asset.poly)
        );
        setFilteredAssets(newFiltered);
        setShowTextures(false);
      }
    } else {
      // No filters selected: show all model assets; textures will also be rendered separately
      setFilteredAssets(modelAssets);
      setShowTextures(false);
    }
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters, assets]);

  const handleFilterClick = (filter) => {
    if (filter === "Texture") {
      if (filters.includes("Texture")) {
        setFilters(filters.filter((f) => f !== "Texture"));
        setShowTextures(false);
      } else {
        setFilters(["Texture"]);
        setShowTextures(true);
      }
    } else {
      // For model filters, remove Texture filter if present
      const newFilters = filters.filter((f) => f !== "Texture");
      if (newFilters.includes(filter)) {
        setFilters(newFilters.filter((f) => f !== filter));
      } else {
        setFilters([...newFilters, filter]);
      }
      setShowTextures(false);
    }
  };

  const handleCardClick = (asset) => {
    setFullscreenAsset(asset);
  };

  const closeCard = () => {
    setFullscreenAsset(null);
  };

  return (
    <>
      {fullscreenAsset && (
        <FullscreenCard
          asset={fullscreenAsset}
          onClose={closeCard}
          filteredAssets={assets} // Sidebar gets all assets
          onAssetClick={setFullscreenAsset}
        />
      )}
      <section className="bg-gradient-to-b from-gray-950 to-black min-h-screen py-12">
        <div className="text-white px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold pt-10 text-blue-300">Marketplace</h1>
          <div className="mb-6 flex flex-wrap items-center gap-2 mt-4">
            {["High Poly", "Medium Poly", "Low Poly", "Texture"].map((filter) => (
              <span
                key={filter}
                className={`px-2 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-lg cursor-pointer transform transition-all duration-200 active:scale-95 ${
                  filters.includes(filter)
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/50"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {showTextures ? (
              filteredAssets.map((asset, index) => (
                <TextureCard key={`texture-${index}`} asset={asset} onClick={handleCardClick} />
              ))
            ) : (
              <>
                {filteredAssets.map((asset, index) => (
                  <ProductCard key={`asset-${index}`} asset={asset} onClick={handleCardClick} />
                ))}
                {filters.length === 0 &&
                  textureAssets.map((asset, index) => (
                    <TextureCard key={`texture-${index}`} asset={asset} onClick={handleCardClick} />
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