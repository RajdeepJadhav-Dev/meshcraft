import React, { useContext, useEffect, useRef, useState, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaArrowCircleLeft } from "react-icons/fa";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import authContext from "../context/authContext";

const Model = ({ idleModelUrl, walkModelUrl, rotation, isAnimating, isAnimatingWalk }) => {
  const [model, setModel] = useState(null);
  const mixer = useRef();
  const [currentUrl, setCurrentUrl] = useState(idleModelUrl);

  useEffect(() => {
    const loader = new GLTFLoader();
    // Use walkModelUrl if walk animation is active, otherwise use idleModelUrl
    const url = isAnimatingWalk ? walkModelUrl : idleModelUrl;
    setCurrentUrl(url);

    loader.load(
      url,
      (gltf) => {
        setModel(gltf.scene);
        mixer.current = new THREE.AnimationMixer(gltf.scene);
        if (gltf.animations && gltf.animations.length > 0) {
          const action = mixer.current.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );
  }, [idleModelUrl, walkModelUrl, isAnimating, isAnimatingWalk]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return model ? <primitive object={model} rotation={rotation} scale={1} /> : null;
};

const ModelViewer = ({
  idleModelUrl,
  walkModelUrl,
  modelHeight,
  rotation,
  cameraPosition,
  isAnimating,
  isAnimatingWalk,
  setIsAnimating,
  setIsAnimatingWalk
}) => {
  const [view, setView] = useState("front");
  const rotationMap = {
    front: rotation,
    back: [rotation[0], rotation[1] + Math.PI, rotation[2]],
    left: [rotation[0], rotation[1] + Math.PI / 2, rotation[2]],
    right: [rotation[0], rotation[1] - Math.PI / 2, rotation[2]],
    top: [Math.PI / 2, rotation[1], rotation[2]],
    bottom: [-Math.PI / 2, rotation[1], rotation[2]]
  };

  return (
    <div className="relative w-full bg-gray-800 shadow-lg rounded-lg">
      <div className="relative w-full" style={{ height: modelHeight }}>
        <Canvas camera={{ position: cameraPosition, fov: 50 }}>
          <Suspense fallback={null}>
            <Model
              idleModelUrl={idleModelUrl}
              walkModelUrl={walkModelUrl}
              rotation={rotationMap[view]}
              isAnimating={isAnimating}
              isAnimatingWalk={isAnimatingWalk}
            />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
          </Suspense>
        </Canvas>
      </div>
      <div className="invisible sm:flex absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-900 p-1 rounded-lg">
        {Object.keys(rotationMap).map((key) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className="bg-gray-700 text-white p-1 rounded w-16 h-12 flex items-center justify-center"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
          className="bg-gray-700 text-white p-1 rounded w-16 h-12 flex items-center justify-center"
        >
          Full
        </button>
      </div>
      <p className="absolute text-3xl bg-gray-400 top-0 right-0 text-black px-2 py-1">
        <b>360° Rotatable 3D Model</b>
      </p>
    </div>
  );
};

const AssetDetailPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("Id");
  const navigate = useNavigate();
  const detailsRef = useRef(null);
  const [modelHeight, setModelHeight] = useState(790);

  // Get assets from context and find the asset with matching _id
  const { editAssetData } = useContext(authContext);
  const asset = editAssetData.find((a) => a._id === id);
  const previousPath = "/marketplace";

  // For zombie asset animation toggles
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingWalk, setIsAnimatingWalk] = useState(false);

  useEffect(() => {
    if (detailsRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setModelHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(detailsRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [asset]);

  if (!asset) return <p className="text-white text-center mt-10">Asset not found</p>;

  const { title, extendedDescription, price, modelUrl, walkModelUrl, rotation = [0, 0, 0], technical } = asset;

  // Determine camera position based on title
  let cameraPosition = [0, 7, 11];
  if (title === "Windmill") cameraPosition = [0, 7, 30];
  else if (title === "Small Barracks") cameraPosition = [0, 7, 40];
  else if (title === "Wood Yard") cameraPosition = [0, 7, 20];
  else if (title === "Mine") cameraPosition = [0, 7, 20];
  else if (title === "Duck") cameraPosition = [0, 7, 23];
  else if (title === "Granitor") cameraPosition = [0, 7, 1];
  else if (title === "Campfire") cameraPosition = [0, 7, 50];
  else if (title === "Zombie") cameraPosition = [0, 0.1, 6];

  return (
    <div className="bg-black min-h-screen text-white pt-20">
      <div className="relative flex flex-col lg:flex-row items-start justify-between gap-8 p-6">
        {/* Left Column: 3D Model */}
        <div className="w-full lg:w-2/3 flex flex-col items-start">
          <ModelViewer
            idleModelUrl={modelUrl}
            walkModelUrl={walkModelUrl}
            modelHeight={modelHeight}
            rotation={rotation}
            cameraPosition={cameraPosition}
            isAnimating={isAnimating}
            isAnimatingWalk={isAnimatingWalk}
            setIsAnimating={setIsAnimating}
            setIsAnimatingWalk={setIsAnimatingWalk}
          />

          {/* Show animation toggles if the asset supports a walk model (e.g. Zombie) */}
          {walkModelUrl && (
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => {
                  setIsAnimating(!isAnimating);
                  setIsAnimatingWalk(false);
                }}
                className="bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] text-xl text-black px-4 py-2 rounded-lg flex items-center shadow-lg hover:bg-gray-600 transition"
              >
                {isAnimating ? "Stop Idle Animation" : "Start Idle Animation"}
              </button>
              <button
                onClick={() => {
                  setIsAnimatingWalk(!isAnimatingWalk);
                  setIsAnimating(false);
                }}
                className="bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] text-xl text-black px-4 py-2 rounded-lg flex items-center shadow-lg hover:bg-gray-600 transition"
              >
                {isAnimatingWalk ? "Stop Walk Animation" : "Start Walk Animation"}
              </button>
            </div>
          )}

          <div className="mt-4 self-start ml-0">
            <button
              onClick={() => navigate(previousPath)}
              className="bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] text-xl text-black px-4 py-2 rounded-lg flex items-center shadow-lg hover:bg-gray-600 transition"
            >
              <FaArrowCircleLeft className="mr-2" /> GO BACK
            </button>
          </div>
        </div>

        {/* Right Column: Asset Details */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start" ref={detailsRef}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full text-center mb-4">
            <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
            <div
              className="text-base text-gray-300 leading-relaxed mb-4 space-y-2"
              dangerouslySetInnerHTML={{ __html: extendedDescription || "No extended description provided." }}
            />
            <p className="text-xl font-semibold bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg shadow-md inline-block">
              Price: {price || "N/A"}
            </p>
          </div>

          {technical && (
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full mt-4">
              <h2 className="text-xl font-bold text-gray-300 mb-2">Technical Details</h2>
              <ul className="text-l text-gray-400 list-disc list-inside mt-2">
                <li>Objects: {technical.objects ?? "N/A"}</li>
                <li>Vertices: {technical.vertices ?? "N/A"}</li>
                <li>Edges: {technical.edges ?? "N/A"}</li>
                <li>Faces: {technical.faces ?? "N/A"}</li>
                <li>Triangles: {technical.triangles ?? "N/A"}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetDetailPage;
