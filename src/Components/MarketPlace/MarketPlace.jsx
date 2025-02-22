import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect, useContext } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Link, useLocation } from "react-router-dom";
import authContext from "../context/authContext";

// -- Model Component
const Model = ({ modelUrl, scale, rotation }) => {
  const { scene } = useGLTF(modelUrl);
  const modelRef = useRef();
  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      rotation={rotation}
      position={[2, -5, -10]}
    />
  );
};

// -- ProductCard Component
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
        <p className=" text-gray-400 mb-2 text-xl">{asset.price} value</p>
        <div className="flex items-center space-x-2">
          <img src={asset.softwareLogo} alt={asset.software} className="w-5 h-5" />
          <p className="text-sm text-gray-400">{asset.software}</p>
        </div>
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

// -- FullscreenCard Component
const FullscreenCard = ({ model, onClose, filteredAssets, onAssetClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 text-white">
      <div className="bg-gray-900 rounded-lg shadow-lg w-[48rem] h-[30rem] flex overflow-hidden">
        <div className="flex-1 flex flex-col items-center p-4">
          <div className="relative w-full h-2/5">
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
              <OrbitControls enableRotate={false} />
            </Canvas>
          </div>
          <div className="w-full mt-4 text-center">
            <h2 className="text-xl font-bold mb-2">{model.title}</h2>
            <p className="text-sm mb-1">{model.description}</p>
            <p className="text-lg mb-1">Price: {model.price}</p>
            <div className="flex items-center space-x-2 mb-2">
              <img src={model.softwareLogo} alt={model.software} className="w-6 h-6" />
              <p className="text-sm">{model.software}</p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="bg-red-600 text-white px-4 py-1 rounded-lg"
                onClick={onClose}
              >
                Close
              </button>
              <Link
                to={`/asset/${model.title}?Id=${model._id}`}
                state={{ asset: model, showFullscreen: true }}
                className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-500 transition"
                
              >
                View Asset
              </Link>
            </div>
          </div>
        </div>
        {/* Reuse the Sidebar for "Other Assets" */}
        <Sidebar assets={filteredAssets} onAssetClick={onAssetClick} />
      </div>
    </div>
  );
};

// -- Main Marketplace Component
const MarketPlace = () => {
  const location = useLocation();
  const { editAssetData } = useContext(authContext);

  // For the fullscreen overlay
  const [fullscreenAsset, setFullscreenAsset] = useState(
    location.state?.showFullscreen &&
    sessionStorage.getItem("returnToFullscreen") === "true"
      ? location.state.asset
      : null
  );

  // Clear the sessionStorage if the user refreshes
  useEffect(() => {
    if (performance.navigation.type === 1) {
      sessionStorage.removeItem("returnToFullscreen");
    }
  }, []);

  // Local states
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters ? JSON.parse(savedFilters) : [];
  });
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [assets, setAssets] = useState(editAssetData);

  // Whenever editAssetData changes, update local assets
  useEffect(() => {
    console.log("editAssetData from context:", editAssetData); // Debug log
    setAssets(editAssetData);
  }, [editAssetData]);

  // Re-filter whenever "filters" or "assets" changes
  useEffect(() => {
    const updatedFilteredAssets = filters.length
      ? assets.filter((asset) => filters.includes(asset.poly))
      : assets;
    setFilteredAssets(updatedFilteredAssets);

    // Persist filters in localStorage
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters, assets]);

  // Add or remove filters
  const handleFilterClick = (filter) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <>
      {fullscreenAsset && (
        <FullscreenCard
          model={fullscreenAsset}
          onClose={() => setFullscreenAsset(null)}
          filteredAssets={filteredAssets}
          onAssetClick={setFullscreenAsset}
        />
      )}

      <section className="bg-black min-h-screen py-12">
        <div className="text-white px-16">
          <h1 className="text-4xl font-bold pt-10">Marketplace</h1>
          <div className="mb-6 flex items-center space-x-4">
            {["High Poly", "Medium Poly", "Low Poly"].map((poly) => (
              <span
                key={poly}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  filters.includes(poly)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
                onClick={() => handleFilterClick(poly)}
              >
                {poly}
              </span>
            ))}
          </div>

          {/* Grid of filtered assets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredAssets.map((asset, index) => (
              <ProductCard
                key={index}
                asset={asset}
                onClick={() => setFullscreenAsset(asset)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketPlace;
