import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect, useContext } from "react";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { Link, useLocation } from "react-router-dom";
import authContext from "../context/authContext";

// -- Model Component
const Model = ({ modelUrl, scale, rotation }) => {
  const defaultScale = scale && scale.length ? scale : [1, 1, 1];
  const defaultRotation = rotation && rotation.length ? rotation : [0, 0, 0];
  const fileExtension = modelUrl.split(".").pop().toLowerCase();

  if (["glb", "fbx"].includes(fileExtension)) {
    const { scene } = useGLTF(modelUrl);
    return (
      <primitive
        object={scene}
        scale={defaultScale}
        rotation={defaultRotation}
        position={[2, -5, -10]}
      />
    );
  } else {
    // For textures, load using useTexture and apply it to a plane
    const texture = useTexture(modelUrl);
    return (
      <mesh scale={defaultScale} rotation={defaultRotation} position={[2, -5, -10]}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    );
  }
};

// -- ProductCard Component for model assets
const ProductCard = ({ asset, onClick }) => {
  return (
    <div
      onClick={() => onClick(asset)}
      className="relative bg-gray-900 p-6 rounded-lg flex flex-col text-white cursor-pointer"
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

// -- TextureCard Component for texture assets
const TextureCard = ({ asset, onClick }) => {
  return (
    <div
      className="relative bg-white bg-opacity-30 shadow-lg rounded-2xl overflow-hidden flex flex-col items-center space-y-4 p-6 w-full h-auto min-h-[300px] max-w-lg mx-auto cursor-pointer"
    >
      <div className="absolute top-2 left-2 right-2 flex justify-between w-full px-4">
        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md border border-white">
          {asset.modelUrl.split('.').pop().toUpperCase()}
        </span>
        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md border border-white">
          {asset.price === '0' ? "Free" : asset.price}
        </span>
      </div>
      <div className="w-40 h-40 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          src={asset.modelUrl}
          alt={asset.alt || asset.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full border-t border-white my-4"></div>
      <div className="mt-4 text-center w-full">
        <p className="text-white font-semibold">{asset.title}</p>
      </div>
    </div>
  );
};

// -- Sidebar Component
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

// -- FullscreenCard Component
const FullscreenCard = ({ asset, onClose, filteredAssets, onAssetClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 text-white p-4">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl h-auto max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 flex flex-col items-center p-4">
          <div className="relative w-full h-48 md:h-64">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 15, 10]} angle={0.3} />
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
          <div className="w-full mt-4 text-center">
            <h2 className="text-xl font-bold mb-2">{asset.title}</h2>
            <p className="text-sm mb-1">{asset.description}</p>
            <p className="text-lg mb-1">Price: {asset.price}</p>
            <div className="flex items-center justify-center space-x-2 mb-2">
              {asset.softwareLogo && (
                <img src={asset.softwareLogo} alt={asset.software} className="w-6 h-6" />
              )}
              <p className="text-sm">{asset.software}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <button
                className="bg-red-600 text-white px-4 py-1 rounded-lg"
                onClick={onClose}
              >
                Close
              </button>
              <Link
                to={`/asset/${asset.title}?Id=${asset._id}`}
                state={{ asset: asset, showFullscreen: true }}
                className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-500 transition"
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
      <section className="bg-black min-h-screen py-12">
        <div className="text-white px-16">
          <h1 className="text-4xl font-bold pt-10">Marketplace</h1>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {["High Poly", "Medium Poly", "Low Poly", "Texture"].map((filter) => (
              <span
                key={filter}
                className={`px-2 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-lg cursor-pointer ${
                  filters.includes(filter)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300"
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
