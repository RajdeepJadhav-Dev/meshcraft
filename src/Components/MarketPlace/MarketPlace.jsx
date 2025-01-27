// import { Canvas, useFrame } from "@react-three/fiber";
// import React, { Suspense, useRef, useState } from "react";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import { motion } from "framer-motion"; // Import framer-motion
// import { SiStarship } from "react-icons/si";

// import { useMotionValue, useTransform } from "framer-motion"

// const Model = ({ modelUrl }) => {
//   const { scene } = useGLTF(modelUrl);
//   const modelRef = useRef();
//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += 0.001;
//     }
//   });
//   return (
//     <primitive ref={modelRef} object={scene} scale={8} position={[2, -5, -10]} />
//   );
// };

// const Sidebar = ({ assets, onAssetClick,selectedAsset }) => {
//   return (
//     <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto text-white rounded-r-lg">
//       <h3 className="text-lg font-bold mb-4">Other Assets</h3>
//       <ul className="space-y-4">
//         {assets.map((asset, index) => (
//           <li
//             key={index}
//             onClick={() => onAssetClick(asset)}
//             className={`cursor-pointer flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 ${
//               selectedAsset === asset ? "bg-gray-700" : ""
//             }`}

//           >
//             <img src={asset.thumbnail} alt={asset.title} className="w-12 h-12" />
//             <div>
//               <p className="font-semibold">{asset.title}</p>
//               <p className="text-sm text-gray-400">{asset.price}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const FullscreenCard = ({ model, onClose, assets, onAssetClick }) => {
//   return (
//     <motion.div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 text-white"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         className="bg-gray-900 rounded-lg shadow-lg w-11/12 max-w-6xl flex overflow-hidden"
//         initial={{ rotateY: -90, opacity: 0 }}
//         animate={{ rotateY: 0, opacity: 1 }}
//         exit={{ rotateY: -90, opacity: 0 }}
//         transition={{ duration: 0.9, ease: "easeInOut" }}
//       >
//         <div className="flex-1 flex flex-col items-center p-6">
//           <div className="relative w-full h-3/5">
//             <Canvas>
//               <ambientLight intensity={0.5} />
//               <spotLight position={[10, 15, 10]} angle={0.3} />
//               <Suspense fallback={null}>
//                 <Model modelUrl={model.modelUrl} />
//               </Suspense>
//               <OrbitControls />
//             </Canvas>
//           </div>
//           <div className="w-full mt-6">
//             <h2 className="text-2xl font-bold mb-4">{model.title}</h2>
//             <p className="text-lg mb-2">{model.description}</p>
//             <p className="text-md text-gray-400 mb-4">Price: {model.price}</p>
//             <div className="flex items-center space-x-2">
//               <img src={model.softwareLogo} alt={model.software} className="w-8 h-8" />
//               <p className="text-lg">{model.software}</p>
//             </div>
//           </div>
//           <button
//             className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//         <Sidebar assets={assets} onAssetClick={onAssetClick} />
//       </motion.div>
//     </motion.div>
//   );
// }



// const ProductCard = ({ asset, onClick }) => {
//   return (
//     <motion.div
//       onClick={() => onClick(asset)}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className="relative bg-gray-900 p-4 rounded-lg flex flex-col text-white cursor-pointer transition transform hover:scale-105 hover:shadow-2xl"
//     >
//       <div className="relative w-full overflow-hidden rounded-t-2xl h-52 bg-gray-300">
//         <Canvas>
//           <ambientLight intensity={0.7} />
//           <spotLight position={[10, 15, 10]} angle={0.4} color="#ffcc00" />
//           <Suspense fallback={null}>
//             <Model modelUrl={asset.modelUrl} />
//           </Suspense>
//           <OrbitControls />
//         </Canvas>
//       </div>
//       <div className="mt-4">
//         <p className="font-semibold">{asset.title}</p>
//         <p className="text-sm text-gray-400 mb-2">{asset.price} value</p>
//         <div className="flex items-center space-x-2">
//           <img src={asset.softwareLogo} alt={asset.software} className="w-5 h-5" />
//           <p className="text-sm text-gray-400">{asset.software}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const MarketPlace = () => {
//   const [selectedModel, setSelectedModel] = useState(null);
//   const assets = [
//     {
//       title: "Dirk (An alien creature)",
//       price: "$139.99",
//       modelUrl: "/3dfiles/Archery.gltf",
//       description: "A highly detailed alien creature ideal for sci-fi projects.",
//       software: "Maya",
//       softwareLogo: "/maya-logo.png",
//       thumbnail: "/thumbnails/dirk.png",
//     },
//     {
//       title: "Furry Felix",
//       price: "$99.99",
//       modelUrl: "/3dfiles/Hydroaptor.gltf",
//       description: "A furry animated creature suitable for games.",
//       software: "Cinema 4D",
//       softwareLogo: "/cinema4d-logo.png",
//       thumbnail: "/thumbnails/felix.png",
//     },
//     // Add more assets here
//     {
//     title:"Lion",
//     price:"$36.00",
//     modelUrl:"/3dfiles/Archery.gltf",
//     description:"A furry animated creature suitable for games.",
//     software:"Blender",
//     softwareLogo:"/blender-logo.png",
   
//     thumbnail:"/thumbnails/lion.png",
//     },
//  {
//     title:"Space Craft",
//     price:"$49.99",
//     modelUrl:"/3dfiles/Hydroaptor.gltf",
//     description:"A furry animated creature suitable for games.",
//     software:"ZBrush",
//     softwareLogo:"/zbrush-logo.png",
//     thumbnail:"/thumbnails/space-craft.png",
   
//  },
//  {
//     title:"Monster Rex",
//     price:"$75.00",
//     modelUrl:"/3dfiles/Archery.gltf",
//     description:"A furry animated creature suitable for games.",
//     software:"3ds Max",
//     softwareLogo:"/3dsmax-logo.png",
   
//    thumbnail:"/thumbnails/monster-rex.png",
//  }
//   ];

//   const handleCardClick = (asset) => {
//     setSelectedModel(asset);
//   };

//   const closeCard = () => {
//     setSelectedModel(null);
//   };

//   return (
//     <section className="bg-black py-12">
//       <div className="text-white px-8">
//         <div className="md:w-1/2 ml-10 mb-8 mt-10">
//           <div className="mb-4 py-1 px-3 bg-gray-800 rounded-full inline-flex gap-1 items-center text-sm">
//             <SiStarship color="red" size={20} /> NEW ARRIVALS
//           </div>
//           <h1 className="text-5xl font-bold mb-4">
//             Meet the new home <br /> for your digital goods
//           </h1>
//           <p className="text-xl mb-8">
//             Discover high-quality assets for your next project.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {assets.map((asset, index) => (
//             <ProductCard key={index} asset={asset} onClick={handleCardClick} />
//           ))}
//         </div>
//       </div>
//       {selectedModel && (
//         <FullscreenCard
//           model={selectedModel}
//           onClose={closeCard}
//           assets={assets}
//           onAssetClick={handleCardClick}
//           selectedAsset={selectedModel}
//         />
//       )}
//     </section>
//   );
// };

// export default MarketPlace;







import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion"; // Import framer-motion
import { SiStarship } from "react-icons/si";

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
      modelRef.current.rotation.y += 0.000;
    }
  });
  return (
    <primitive ref={modelRef} object={scene} scale={8} position={[2, -5, -10]} />
  );
};

const Fullscreen3DModel = ({ modelUrl, onClose }) => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative w-full h-full">
      <button
        className="absolute top-4 right-4 bg-red-600 text-white rounded-full px-3 py-1 z-10"
        onClick={onClose}
      >
        X
      </button>
      <Canvas>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Suspense fallback={null}>
          <Model modelUrl={modelUrl} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  </motion.div>
);

const Sidebar = ({ assets, onAssetClick, selectedAsset }) => (
  <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto text-white rounded-r-lg">
    <h3 className="text-lg font-bold mb-4">Other Assets</h3>
    <ul className="space-y-4">
      {assets.map((asset, index) => (
        <li
          key={index}
          onClick={() => onAssetClick(asset)}
          className={`cursor-pointer flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 ${
            selectedAsset === asset ? "bg-gray-700" : ""
          }`}
        >
          <img src={asset.thumbnail} alt={asset.title} className="w-12 h-12" />
          <div>
            <p className="font-semibold">{asset.title}</p>
            <p className="text-sm text-gray-400">{asset.price}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const FullscreenCard = ({ model, onClose, assets, onAssetClick }) => {
  const [show3DModel, setShow3DModel] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-gray-900 rounded-lg shadow-lg w-11/12 max-w-6xl flex overflow-hidden"
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -90, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
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
           <p className="text-md text-gray-400 mb-4">Price: {model.price}</p>
           <div className="flex items-center space-x-2">
             <img src={model.softwareLogo} alt={model.software} className="w-8 h-8" />
             <p className="text-lg">{model.software}</p>
           </div>
         </div>
           
          <button
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
            onClick={() => setShow3DModel(true)}
          >
            View Fullscreen
          </button>
          <button
            className="mt-2 bg-red-600 text-white px-6 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        
        <Sidebar assets={assets} onAssetClick={onAssetClick} />
      </motion.div>
      {show3DModel && (
        <Fullscreen3DModel
          modelUrl={model.modelUrl}
          onClose={() => setShow3DModel(false)}
        />
      )}
    </motion.div>
  );
};

const ProductCard = ({ asset, onClick }) => (
  <motion.div
    onClick={() => onClick(asset)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative bg-gray-900 p-4 rounded-lg flex flex-col text-white cursor-pointer transition transform hover:scale-105 hover:shadow-2xl"
  >
    <div className="relative w-full overflow-hidden rounded-t-2xl h-52 bg-gray-300">
      <Canvas>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 15, 10]} angle={0.4} color="#ffcc00" />
        <Suspense fallback={null}>
          <Model modelUrl={asset.modelUrl} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
    <div className="mt-4">
      <p className="font-semibold">{asset.title}</p>
      <p className="text-sm text-gray-400 mb-2">{asset.price} value</p>
    </div>
  </motion.div>
);

const MarketPlace = () => {
  const [selectedModel, setSelectedModel] = useState(null);

  const assets = [
    {
        title: "Dirk (An alien creature)",
        price: "$139.99",
        modelUrl: "/3dfiles/Archery.gltf",
        description: "A highly detailed alien creature ideal for sci-fi projects.",
        software: "Maya",
        softwareLogo: maya,
        thumbnail: "/thumbnails/dirk.png",
      },
      {
        title: "Furry Felix",
        price: "$99.99",
        modelUrl: "/3dfiles/Hydroaptor.gltf",
        description: "A furry animated creature suitable for games.",
        software: "Cinema 4D",
        softwareLogo: blender,
        thumbnail: "/thumbnails/felix.png",
      },
      {
        title: "Lion",
        price: "$36.00",
        modelUrl: "/3dfiles/Archery.gltf",
        description: "A furry animated creature suitable for games.",
        software: "Blender",
        softwareLogo: unrealEngine,
        thumbnail: "/thumbnails/lion.png",
      },
      {
        title: "Space Craft",
        price: "$49.99",
        modelUrl: "/3dfiles/Hydroaptor.gltf",
        description: "A furry animated creature suitable for games.",
        software: "ZBrush",
        softwareLogo: unity,
        thumbnail: "/thumbnails/space-craft.png",
      },
      {
        title: "Monster Rex",
        price: "$75.00",
        modelUrl: "/3dfiles/Archery.gltf",
        description: "A furry animated creature suitable for games.",
        software: "3ds Max",
        softwareLogo: santer,
        thumbnail: "/thumbnails/monster-rex.png",
      },
    ];
  const handleCardClick = (asset) => setSelectedModel(asset);

  const closeCard = () => setSelectedModel(null);

  

  return (
        <section className="bg-black py-12">
          <div className="text-white px-8">
            <div className="md:w-1/2 ml-10 mb-8 mt-10">
              <div className="mb-4 py-1 px-3 bg-gray-800 rounded-full inline-flex gap-1 items-center text-sm">
                <SiStarship color="red" size={20} /> NEW ARRIVALS
              </div>
              <h1 className="text-5xl font-bold mb-4">
                Meet the new home <br /> for your digital goods
              </h1>
              <p className="text-xl mb-8">
                Discover high-quality assets for your next project.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset, index) => (
                <ProductCard key={index} asset={asset} onClick={handleCardClick} />
              ))}
            </div>
          </div>
          {selectedModel && (
            <FullscreenCard
              model={selectedModel}
              onClose={closeCard}
              assets={assets}
              onAssetClick={handleCardClick}
              selectedAsset={selectedModel}
            />
          )}
        </section>
      );
};

export default MarketPlace;