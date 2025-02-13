
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";


const Model = ({ modelUrl, scale, rotation }) => {
  const { scene } = useGLTF(modelUrl);
  const modelRef = useRef();
  return <primitive ref={modelRef} object={scene} scale={scale} rotation={rotation} position={[2, -5, -10]} />;
};

const ProductCard = ({ asset, onClick }) => {
  return (
    <div onClick={() => onClick(asset)} className="relative bg-gray-900 p-6 rounded-lg flex flex-col text-white cursor-pointer">
      <div className="relative w-full overflow-hidden rounded-t-2xl h-52 bg-gray-300">
        <Canvas>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <spotLight position={[10, 15, 10]} angle={0.3} intensity={1.5} />
          <Suspense fallback={null}>
            <Model modelUrl={asset.modelUrl} scale={asset.scale} rotation={asset.rotation} />
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

const FullscreenCard = ({ model, onClose, assets, onAssetClick, filteredAssets }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 text-white">
      <div className="bg-gray-900 rounded-lg shadow-lg w-[48rem] h-[30rem] flex overflow-hidden">
        <div className="flex-1 flex flex-col items-center p-4">
          <div className="relative w-full h-2/5">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 15, 10]} angle={0.3} />
              <Suspense fallback={null}>
                <Model modelUrl={model.modelUrl} scale={model.scale} rotation={model.rotation} />
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
              <button className="bg-red-600 text-white px-4 py-1 rounded-lg" onClick={onClose}>Close</button>
              <Link to={`/asset/${model.title}`} 
      state={{ asset: model, showFullscreen: true }} 
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



const MarketPlace = () => {
  const location = useLocation();
const [fullscreenAsset, setFullscreenAsset] = useState(
  location.state?.showFullscreen && sessionStorage.getItem("returnToFullscreen") === "true"
    ? location.state.asset
    : null
);

// Reset sessionStorage on page load to prevent fullscreen from opening on refresh
useEffect(() => {
  if (performance.navigation.type === 1) {
    sessionStorage.removeItem("returnToFullscreen"); // Clears fullscreen persistence on refresh
  }
}, []);


  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters ? JSON.parse(savedFilters) : [];
  });
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  const assets = [
    {
      title: "Flowergirl",
      description: "A character model featuring a floral-themed fairy.",
      poly: "Low Poly",
      price: "$75.00",
      modelUrl: "/3dfiles/new/FlowerGirl.glb",
      software: "3ds Max",
      softwareLogo: "/SoftwareLogo/new5.png",
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
      softwareLogo: "/SoftwareLogo/new5.png",
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
      softwareLogo: "/SoftwareLogo/new5.png",
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
      softwareLogo: "/SoftwareLogo/new3.png",
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
      softwareLogo: "/SoftwareLogo/new1.png",
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
      softwareLogo: "/SoftwareLogo/new2.png",
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
      softwareLogo: "/SoftwareLogo/new4.png",
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
      softwareLogo: "/SoftwareLogo/new5.png",
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
      softwareLogo: "/SoftwareLogo/new5.png",
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
      softwareLogo: "/SoftwareLogo/new5.png",
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
      softwareLogo: "/SoftwareLogo/new5.png",
      scale: [1, 1, 1],
      rotation: [0, Math.PI / 2, 0],
    },
];


  useEffect(() => {
    const updatedFilteredAssets = filters.length ? assets.filter((asset) => filters.includes(asset.poly)) : assets;
    setFilteredAssets(updatedFilteredAssets);
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const handleFilterClick = (filter) => {
    setFilters(filters.includes(filter) ? filters.filter((f) => f !== filter) : [...filters, filter]);
  };

  return (
    <>
      {fullscreenAsset && (
  <FullscreenCard 
    model={fullscreenAsset} 
    onClose={() => setFullscreenAsset(null)} 
    assets={assets} 
    onAssetClick={setFullscreenAsset} 
    filteredAssets={filteredAssets} 
  />
)}

      <section className="bg-black min-h-screen py-12">
        <div className="text-white px-16">
          <h1 className="text-4xl font-bold pt-10">Marketplace</h1>
          <div className="mb-6 flex items-center space-x-4">
            {["High Poly", "Medium Poly", "Low Poly"].map((poly) => (
              <span 
                key={poly} 
                className={`px-4 py-2 rounded-lg cursor-pointer ${filters.includes(poly) ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`} 
                onClick={() => handleFilterClick(poly)}
              >
                {poly}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredAssets.map((asset, index) => (
              <ProductCard key={index} asset={asset} onClick={() => setFullscreenAsset(asset)} />

            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketPlace;
