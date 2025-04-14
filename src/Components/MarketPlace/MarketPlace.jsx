import { Canvas, extend, useLoader } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect, useContext, useMemo, useCallback } from "react";
import { OrbitControls, useGLTF, useTexture, Environment } from "@react-three/drei";
import { Link, useLocation } from "react-router-dom";
import authContext from "../context/authContext";

extend({});

const Model = ({ modelUrl, scale, rotation }) => {
  if (!modelUrl) return null;

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
        <Environment preset="sunset" />
      </>
    );
  } else {
    const texture = useTexture(modelUrl);
    return (
      <>
        <mesh scale={defaultScale} rotation={defaultRotation} position={[2, -5, -10]}>
          <planeGeometry args={[5, 5]} />
          <meshBasicMaterial map={texture} />
        </mesh>
        <Environment preset="sunset" />
      </>
    );
  }
};

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

const ProductCard = ({ asset, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const thumbnailSrc = asset.image || asset.modelUrl;

  return (
    <div
      onClick={() => onClick(asset)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`relative bg-gray-900 p-6 rounded-lg flex flex-col text-white cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 ${
        isPressed ? "scale-95 shadow-inner" : "hover:scale-102"
      } w-full`}
    >
      <div className="relative w-full overflow-hidden rounded-t-2xl h-52 bg-gradient-to-b from-gray-800 to-gray-900">
        {thumbnailSrc ? (
           <img
             src={thumbnailSrc}
             alt={asset.title || 'Asset thumbnail'}
             className="object-cover w-full h-full"
           />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <span className="text-gray-500">No preview</span>
          </div>
        )}
      </div>
      <div className="mt-8">
        <p className="font-semibold">{asset.title}</p>
        <p className="text-sm text-gray-400 mb-2">{asset.description}</p>
        <p className="text-gray-400 mb-2 text-xl">{asset.price} value</p>
        <div className="flex items-center space-x-2">
          {asset.softwareLogo && (
            <img
              src={asset.softwareLogo}
              alt={asset.software}
              className="w-5 h-5"
            />
          )}
          <p className="text-sm text-gray-400">{asset.software}</p>
        </div>
      </div>
    </div>
  );
};

const TextureCard = ({ asset, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const thumbnailSrc = asset.image || asset.modelUrl;

  return (
    <div
      onClick={() => onClick(asset)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`relative bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg rounded-2xl overflow-hidden flex flex-col items-center space-y-4 p-6 w-full h-auto min-h-[300px] cursor-pointer transform transition-all duration-200 ${
        isPressed ? "scale-95 shadow-inner" : "hover:scale-102 hover:shadow-blue-500/30"
      }`}
    >
      <div className="absolute top-2 left-2 right-2 flex justify-between w-full px-4">
        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md border border-blue-400">
          {asset.modelUrl?.split('.').pop().toUpperCase() || 'FILE'}
        </span>
        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md border border-blue-400">
          {asset.price === '0' ? "Free" : asset.price}
        </span>
      </div>
      <div className="w-40 h-40 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-2 border-blue-400">
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={asset.alt || asset.title || 'Texture thumbnail'}
            className="w-full h-full object-cover"
          />
         ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
             <span className="text-gray-500 text-sm">No preview</span>
          </div>
         )}
      </div>
      <div className="w-full border-t border-blue-400 my-4"></div>
      <div className="mt-4 text-center w-full">
        <p className="text-white font-semibold">{asset.title}</p>
      </div>
    </div>
  );
};

const FullscreenCard = ({ asset, onClose, filteredAssets, onAssetClick }) => {
  const thumbnailSrc = asset.image || asset.modelUrl;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 text-white p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-gray-800 to-gray-950 rounded-lg shadow-lg shadow-blue-500/20 w-full max-w-4xl h-auto max-h-[90vh] flex flex-col md:flex-row overflow-hidden border border-blue-500/30">
        <div className="flex-1 flex flex-col items-center p-4">
          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden border border-blue-500/30 bg-gradient-to-b from-gray-900 to-black">
            {thumbnailSrc ? (
               <img
                 src={thumbnailSrc}
                 alt={asset.title || 'Asset full view'}
                 className="object-contain w-full h-full"
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center bg-gray-700">
                 <span className="text-gray-500">No preview available</span>
               </div>
             )}
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

const MarketPlace = () => {
  const location = useLocation();
  const { editAssetData } = useContext(authContext);

  const [fullscreenAsset, setFullscreenAsset] = useState(() => {
      if (typeof window !== 'undefined') {
          const savedAsset = sessionStorage.getItem("fullscreenAsset");
          if (location.state?.showFullscreen && sessionStorage.getItem("returnToFullscreen") === "true" && savedAsset) {
              try {
                  return JSON.parse(savedAsset);
              } catch (e) {
                  console.error("Error parsing fullscreen asset from session storage", e);
                  sessionStorage.removeItem("fullscreenAsset");
                  sessionStorage.removeItem("returnToFullscreen");
              }
          } else if (location.state?.asset && location.state?.showFullscreen) {
             return location.state.asset;
          }
          sessionStorage.removeItem("fullscreenAsset");
          sessionStorage.removeItem("returnToFullscreen");
      }
      return null;
  });

  const [filters, setFilters] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem("filters");
      try {
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error("Error parsing filters from local storage", e);
        localStorage.removeItem("filters");
        return [];
      }
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState(true);
  const [visibleAssets, setVisibleAssets] = useState(12);
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [showTextures, setShowTextures] = useState(false);

  useEffect(() => {
     setIsLoading(true);
     const timeoutId = setTimeout(() => {
       const initialData = editAssetData || [];
       console.log("Marketplace: Received editAssetData:", initialData.length, "items");
       setAssets(initialData);
       setIsLoading(false);
     }, 100);

     return () => clearTimeout(timeoutId);
  }, [editAssetData]);

  const { modelAssets, textureAssets } = useMemo(() => {
    if (!assets || assets.length === 0) {
      return { modelAssets: [], textureAssets: [] };
    }
    return {
      modelAssets: assets.filter((asset) => asset && asset.poly !== "Texture"),
      textureAssets: assets.filter((asset) => asset && asset.poly === "Texture")
    };
  }, [assets]);

  useEffect(() => {
    let currentlyShowingTextures = false;
    if (filters.length > 0) {
      if (filters.includes("Texture")) {
        setFilteredAssets(textureAssets);
        currentlyShowingTextures = true;
      } else {
        const newFiltered = modelAssets.filter((asset) => filters.includes(asset.poly));
        setFilteredAssets(newFiltered);
        currentlyShowingTextures = false;
      }
    } else {
      setFilteredAssets(modelAssets);
       currentlyShowingTextures = false;
    }
    setShowTextures(currentlyShowingTextures);

    if (typeof window !== 'undefined' && window.localStorage) {
        try{
           localStorage.setItem("filters", JSON.stringify(filters));
        } catch(e){
            console.error("Error saving filters to local storage", e);
        }
    }
     setVisibleAssets(12);
  }, [filters, modelAssets, textureAssets]);

  const handleFilterClick = useCallback((filter) => {
    if (filter === "Texture") {
      if (filters.length === 1 && filters.includes("Texture")) {
        setFilters([]);
      } else {
        setFilters(["Texture"]);
      }
    } else {
      const otherFilters = filters.filter((f) => f !== "Texture");
      if (otherFilters.includes(filter)) {
        setFilters(otherFilters.filter((f) => f !== filter));
      } else {
        setFilters([...otherFilters, filter]);
      }
    }
  }, [filters]);

  const assetsToDisplay = useMemo(() => {
      if(showTextures) {
          return filteredAssets.slice(0, visibleAssets);
      } else if (filters.length > 0) {
          return filteredAssets.slice(0, visibleAssets);
      } else {
          const modelsToShow = modelAssets.slice(0, visibleAssets);
          const remainingSlots = visibleAssets - modelsToShow.length;
          const texturesToShow = remainingSlots > 0 ? textureAssets.slice(0, remainingSlots) : [];
          return [...modelsToShow, ...texturesToShow];
      }
  }, [filteredAssets, modelAssets, textureAssets, visibleAssets, showTextures, filters]);

  const totalAssetsAvailable = useMemo(() => {
      if (showTextures) return textureAssets.length;
      if (filters.length > 0) return filteredAssets.length;
      return modelAssets.length + textureAssets.length;
  }, [showTextures, filters, filteredAssets, modelAssets, textureAssets]);

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined' && document &&
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
        visibleAssets < totalAssetsAvailable && !isLoading)
     {
      setVisibleAssets(prev => prev + 12);
    }
  }, [visibleAssets, totalAssetsAvailable, isLoading]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handleCardClick = useCallback((asset) => {
    setFullscreenAsset(asset);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
         sessionStorage.setItem("returnToFullscreen", "true");
         sessionStorage.setItem("fullscreenAsset", JSON.stringify(asset));
      } catch (e) {
          console.error("Error saving fullscreen state to session storage", e);
      }
    }
  }, []);

   const closeCard = useCallback(() => {
     setFullscreenAsset(null);
     if (typeof window !== 'undefined' && window.sessionStorage) {
       sessionStorage.removeItem("returnToFullscreen");
       sessionStorage.removeItem("fullscreenAsset");
     }
   }, []);

  return (
    <>
      {fullscreenAsset && (
        <FullscreenCard
          asset={fullscreenAsset}
          onClose={closeCard}
          filteredAssets={assets.filter(a => a._id !== fullscreenAsset._id).slice(0, 10)}
          onAssetClick={handleCardClick}
        />
      )}

      <section className="bg-gradient-to-b from-gray-950 to-black min-h-screen py-12">
        <div className="text-white px-4 sm:px-8 md:px-16">
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

          {isLoading && assets.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <p className="ml-4 text-lg text-gray-300">Loading assets...</p>
            </div>
          ) : (
             <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                 {assetsToDisplay.length > 0 ? (
                      assetsToDisplay.map((asset, index) =>
                        asset.poly === "Texture" ? (
                           <TextureCard key={`texture-${asset._id || index}`} asset={asset} onClick={handleCardClick} />
                        ) : (
                           <ProductCard key={`asset-${asset._id || index}`} asset={asset} onClick={handleCardClick} />
                        )
                     )
                 ) : (
                    !isLoading &&  <>
                    <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <p className="ml-2 text-gray-400">Please wait while we load your assets...</p>
                  </>
                 )}
               </div>

               {visibleAssets < totalAssetsAvailable && (
                 <div className="flex justify-center items-center mt-8 pb-8 h-16">
                   {!isLoading && (
                     <>
                       <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                       <p className="ml-2 text-gray-400">Loading more assets...</p>
                     </>
                    )}
                 </div>
               )}
             </>
           )}
        </div>
      </section>
    </>
  );
};

export default MarketPlace;