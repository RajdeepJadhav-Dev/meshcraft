import { useLocation, useNavigate } from "react-router-dom"; 
import { useEffect, useRef, useState } from "react"; 
import { Canvas, useFrame } from "@react-three/fiber"; 
import { OrbitControls } from "@react-three/drei"; 
import { FaArrowCircleLeft } from "react-icons/fa"; 

import Footer from "../Footer/Footer"; 
import { Suspense } from "react"; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ modelUrl, rotation, isAnimated }) => {
  const [model, setModel] = useState(null);
  const modelRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      setModel(gltf.scene);
    }, undefined, (error) => {
      console.error('Error loading model:', error);
    });
  }, [modelUrl]);

  // Animation logic
  useFrame(() => {
    if (isAnimated && modelRef.current) {
      modelRef.current.position.x += 0.01; // Move right
      if (modelRef.current.position.x > 5) { // Reset position when it goes off screen
        modelRef.current.position.x = -5;
      }
    }
  });

  return model ? (
    <primitive
      ref={modelRef}
      object={model}
      rotation={rotation}
      scale={1}
    />
  ) : null;
};

const ModelViewer = ({ modelUrl, modelHeight, rotation, cameraPosition }) => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('front');
  const [isAnimated, setIsAnimated] = useState(false); // State for animation

  const rotationMap = {
    front: rotation,
    back: [rotation[0], rotation[1] + Math.PI, rotation[2]],
    left: [rotation[0], rotation[1] + Math.PI / 2, rotation[2]],
    right: [rotation[0], rotation[1] - Math.PI / 2, rotation[2]],
    top: [Math.PI / 2, rotation[1], rotation[2]],
    bottom: [-Math.PI / 2, rotation[1], rotation[2]],
  };

  return (
    <div className="relative w-full bg-gray-800 shadow-lg rounded-lg flex items-center justify-center mb-0">
      <div className="relative w-full" style={{ height: modelHeight }}>
        <Canvas camera={{ position: cameraPosition, fov: 50 }}>
          <Suspense fallback={null}>
            <Model modelUrl={modelUrl} rotation={rotationMap[view]} isAnimated={isAnimated} />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-900 p-1 rounded-lg"> {/* Adjusted padding */}
        {Object.keys(rotationMap).map((key) => (
          <button key={key} onClick={() => setView(key)} className="bg-gray-700 text-white p-1 rounded w-16 h-12 flex items-center justify-center"> {/* Set fixed width and height */}
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
          className="bg-gray-700 text-white p-1 rounded w-16 h-12 flex items-center justify-center" // Set fixed width and height
        >
          Full
        </button>
      </div>
      <p className="absolute text-3xl bg-gray-400 top-0 right-0 text-black">
        <b>360° Rotatable 3D Model</b>
      </p>
    </div>
  );
};

const Assets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const asset = location.state?.asset;
  const previousPath = location.state?.previousPath || "/marketplace";
  const detailsRef = useRef(null);
  const [modelHeight, setModelHeight] = useState(790); 

  useEffect(() => {
    if (!asset) navigate(previousPath);
  }, [asset, navigate, previousPath]);

  useEffect(() => {
    if (detailsRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newHeight = entry.contentRect.height;
          setModelHeight(newHeight); 
        }
      });

      resizeObserver.observe(detailsRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [asset]);

  if (!asset) return <p className="text-white text-center mt-10">Asset not found</p>;

  const title = asset.title;
  const cameraPosition = 
    title === "Windmill" ? [0, 7, 30] : 
    title === "Small Barracks" ? [0, 7, 40] : 
    title === "Wood Yard" ? [0, 7, 20] :
    title === "Mine" ? [0, 7, 20] :  
    title === "Duck" ? [0, 7, 23] : 
    title === "Granitor" ? [0, 7, 1] : 
    title === "Campfire" ? [0, 7, 50] : 
    [0, 7, 11];

    const assetExtendedDescriptions = {
      "Flowergirl": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This is a beautifully crafted <b>3D character</b> model of a <b>Flower Girl</b>, blending nature and fantasy aesthetics.
        </p>
        <p className="text-l font-semibold">
          With petal-like garments and an insect-inspired headpiece, this character is ideal for:
        </p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Fantasy-themed games and animations</li>
          <li>VR/AR storytelling and interactive experiences</li>
          <li>Concept art and world-building for enchanted settings</li>
        </ul>
    
        <p className=" text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> GLB</li>
          <li><strong>Textures:</strong> High-resolution floral textures with soft shading</li>
          <li><strong>Rigging:</strong> Fully rigged for animation</li>
          <li><strong>Compatibility:</strong> Optimized for Blender, Unity, Unreal Engine</li>
          <li><strong>Scale:</strong> Adjustable to fit project needs</li>
        </ul>
      </div>
    ),
    
       "Campfire": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This 3D model captures a realistic campfire setup in an outdoor environment.
        </p>
        <p className="text-l font-semibold">
          The scene includes a detailed campfire structure with a hanging cooking pot system supported by wooden posts, surrounded by a natural grass and tree setting.
        </p>
        <p className="text-l font-semibold">Designed with a focus on realism and usability, this asset is perfect for:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Outdoor-themed games</li>
          <li>Animations</li>
          <li>Architectural visualizations</li>
        </ul>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> GLB</li>
          <li><strong>Features:</strong> Complete environment setup with grass, trees, and campfire, along with editable mesh and materials</li>
          <li><strong>Potential Uses:</strong> Game development, cinematic scenes, virtual simulations</li>
          <li><strong>Customization:</strong> Grass density, tree placement, and campfire setup can be modified to suit project needs</li>
          <li><strong>Compatibility:</strong> Native Blender file, easily exportable to FBX, OBJ, or other formats for Unity, Unreal Engine</li>
        </ul>
      </div>
    ),
    
        "Small Barracks": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This 3D model features a small, stylized barrack, complete with a stone-textured exterior, wooden fencing, and a training dummy in the yard.
        </p>
        <p className="text-l font-semibold">
          The design is accented by crossed swords and golden horns on the roof, emphasizing its role as a military or training structure.
        </p>
        <p className="text-l font-semibold">This compact yet detailed asset is perfect for:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Strategy games</li>
          <li>RPGs</li>
          <li>Medieval-themed visualizations</li>
        </ul>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> GLB</li>
          <li><strong>Features:</strong> Stone-textured walls, wooden fencing, decorative roof elements with crossed swords and golden horns, includes a training dummy,optimized for real-time rendering in game engines</li>
          <li><strong>Potential Uses:</strong>Game development, medieval animations, or virtual environments
          </li>
          <li><strong>Compatibility:</strong> Compatible with Blender and exportable to FBX, OBJ, and other formats for Unity, Unreal Engine, and more</li>
          <li><strong>Customization:</strong> Textures, materials, and props can be modified to fit project needs</li>
        </ul>
      </div>
    ),
    
    "Knife (Katar)": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This model presents a stylized interpretation of a Katar—a traditionally short, push-dagger style weapon.
        </p>
        <p className="text-l font-semibold">
          Its elongated, tapered blade and unique handle geometry provide a dramatic, fantasy aesthetic.
        </p>
        <p className="text-l font-semibold">This Katar is suitable for:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Games</li>
          <li>Animations</li>
          <li>Concept art with a distinctive and edgy blade</li>
        </ul>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> GLB</li>
          <li><strong>Potential Uses:</strong> Game development, VR/AR weapon props, cinematic scenes</li>
          <li><strong>Textures/Rigging:</strong> No textures included; no rigging required for static mesh usage</li>
          <li><strong>Compatibility:</strong> Blender, Unity, Unreal Engine</li>
          <li><strong>Scale:</strong> Adjustable to fit project needs</li>
        </ul>
      </div>
    ),
    
    "Granitor": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This 3D model showcases "Granitor," a stylized creature with a robust, muscular build and an intimidating horned design.
        </p>
        <p className="text-l font-semibold">
          The model exudes strength and menace, making it ideal for use as a boss or enemy character in fantasy or action-themed games and animations.
        </p>
        <p className="text-l font-semibold">
         The sculpted details emphasize its dynamic and powerful stance, ready for rigging and animation.
        </p>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> GLB</li>
          <li><strong>Features:</strong> Detailed sculpted geometry with a smooth finish, unique design suitable for fantasy or sci-fi projects, posed in a dynamic stance, ready for further rigging</li>
          <li><strong>Potential Uses:</strong> Game development, cinematic animations, concept art, or collectible renders</li>
          <li><strong>Compatibility:</strong>Native Blender file, exportable to FBX, OBJ, or other formats for use in game engines like Unity or Unreal Engine</li>
          <li><strong>Customization:</strong> Materials, textures, and rigging can be added or modified based on project needs</li>
        </ul>
      </div>
    ),
    
    "House": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This 3D model represents a charming, stylized wooden house with a slanted blue roof, a prominent chimney, and detailed wooden features such as stairs, a deck, and railings.
        </p>
        <p className="text-l font-semibold">Perfect for use in:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Casual games</li>
          <li>Animated scenes</li>
          <li>Virtual environments</li>
        </ul>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> FBX</li>
          <li><strong>Potential Uses:</strong> Game development, architectural visualizations, or animations with a cozy or rustic theme</li>
          <li><strong>Features:</strong> Detailed wooden architecture with a stylized aesthetic, includes functional elements like windows, doors, stairs, and a chimney optimized for real-time rendering and smooth integration into projects</li>
          <li><strong>Compatibility:</strong> Compatible with 3D software (Blender, Maya) and game engines (Unity, Unreal Engine)</li>
          <li><strong>Customization:</strong> Materials, textures, and color schemes can be modified to align with specific project requirements</li>
        </ul>
      </div>
    ),
    
        "Duck": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This 3D model features a cute, stylized duck character complete with a wide-brim hat and a crossbody bag.
        </p>
        <p className="text-l font-semibold">
          The simple, low-poly design and playful aesthetic make it ideal for casual games, animations, or educational projects.
        </p>
        <p className="text-l font-semibold">The duck’s accessories give it a fun, whimsical look suitable for:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Lighthearted environments</li>
          <li>Cartoon-themed scenes</li>
        </ul>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> GLB</li>
          <li><strong>Potential Uses:</strong> Game development, AR/VR experiences, short animations</li>
          <li><strong>Textures/Rigging:</strong> No textures included; no rigging required for static mesh usage</li>
          <li><strong>Compatibility:</strong> Easily imported into Blender, Unity, and Unreal Engine</li>
          <li><strong>Customization:</strong> Can be re-textured, scaled, or rigged as needed</li>
        </ul>
      </div>
    ),
    
    "Fox": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This 3D model features a highly stylized anthropomorphic fox character, complete with exaggerated proportions and a unique outfit design.
        </p>
        <p className="text-l font-semibold">
          The character is presented in a T-pose, ideal for rigging and animation.
        </p>
        <p className="text-l font-semibold">Perfect for:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Fantasy games</li>
          <li>Animations</li>
          <li>Artistic projects</li>
        </ul>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> GLB</li>
          <li><strong>Potential Uses:</strong> Game development, cinematic animations, VR/AR experiences, concept art</li>
          <li><strong>Features:</strong> Stylized anthropomorphic design with detailed geometry,T-pose for easy rigging and animation,optimized topology for efficient use in games or rendering</li>
          <li><strong>Compatibility:</strong> Blender-native file, exportable to FBX, OBJ, Unity, and Unreal Engine</li>
          <li><strong>Customization:</strong> Textures, materials, and rigging can be modified as needed</li>
        </ul>
      </div>
    ),
    
    "Mine": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This 3D model depicts a stylized low-poly mine entrance, featuring rocky terrain, a wooden support structure, and railway tracks leading into the mine.
        </p>
        <p className="text-l font-semibold">Designed with a clean and simple aesthetic, ideal for:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Games</li>
          <li>Animations</li>
          <li>Simulations with mining or industrial themes</li>
        </ul>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> GLB</li>
          <li><strong>Potential Uses:</strong> Game development, Unity, Unreal Engine</li>
          <li><strong>Features:</strong> Low-poly rocky terrain, wooden support structure and railway tracks for added detail,optimized for real-time rendering and efficient performance</li>
          <li><strong>Customization:</strong> Textures, materials, and additional elements can be modified to fit the specific needs of the project</li>
          <li><strong>Compatibility:</strong> Native Blender file, easily exportable to FBX, OBJ, or other formats for game engines like Unity or Unreal Engine</li>
        </ul>
      </div>
    ),
    
    "Windmill": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This 3D model depicts a stylized windmill with a cylindrical tower, large rotating blades, and a stone base.
        </p>
        <p className="text-l font-semibold"> The structure features charming details such as windows and a peaked roof, making it a versatile asset</p>
        <p className="text-l font-semibold">Perfect for:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Games</li>
          <li>Animations</li>
          <li>Architectural visualizations</li>
        </ul>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> FBX</li>
          <li><strong>Potential Uses:</strong> Game development, virtual environments, rural/fantasy scene visualizations</li>
          <li><strong>Features:</strong> Detailed windmill design with functional blades,stone-textured base and tower elements optimized for real-time rendering and seamless integration</li>
          <li><strong>Customization:</strong> Textures, materials, and environmental settings can be modified</li>
          <li><strong>Compatibility:</strong> Compatible with Blender and exportable to FBX, OBJ, and other formats for game engines like Unity or Unreal Engine</li>
        </ul>
      </div>
    ),
    
    "Wood Yard": (
      <div className="text-left space-y-2">
        <p className="text-l font-semibold">
          This 3D model showcases a stylized woodyard, featuring a cozy wooden building with a red roof, log storage, and a fenced area.
        </p>
        <p className="text-l font-semibold">The scene includes detailed elements such as:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li>Chopped wood</li>
          <li>A saw setup</li>
          <li>Stone pathways</li>
        </ul>
    
        <p className="text-gray-300 text-xl font-bold">Additional Information:</p>
        <ul className="list-disc list-inside ml-4 text-l font-semibold">
          <li><strong>File Format:</strong> FBX</li>
          <li><strong>Potential Uses:</strong> Game development, rural or fantasy-themed animations, virtual environment creation</li>
          <li><strong>Features:</strong> Rustic wooden building with log storage and chopping area, detailed props such as chopped logs, tools, and fences, optimized for real-time rendering in game engines</li>
          <li><strong>Customization:</strong> Textures, colors, and props can be adjusted as needed</li>
          <li><strong>Compatibility:</strong>Compatible with 3D software like Blender, Maya, and game engines like Unity or Unreal Engine</li>
        </ul>
      </div>
    ),
      };
      // Technical Details for Asset Page only
      const assetTechDetails = {
        "Campfire": "Objects: 41/67, Vertices:4259430 /4450674, Edges:  5841624/6371976, Faces: 2564760/2904276, Triangles: 2564760/2904276",
        "Flowergirl": "Objects: 1/1, Vertices:  101, Edges:  200, Faces:  100, Triangles:  100",
        "Small Barracks": "Objects: 129/130, Vertices: 6276/6279, Edges: 9296/9299, Faces: 4370/4371, Triangles: 4370/4371",
        "Knife (Katar)": "Objects: 4/30, Vertices: 3892/195136, Edges: 7907/538259, Faces: 4334/343850, Triangles: 4334/343850",
        "Granitor": "Objects: 13/39",
        "House": "Objects: 58/84, Vertices: 3400/194644, Edges: 5583/535935, Faces: 2652/342168, Triangles: 2652/342168",
        "Duck": "Objects: 14/40, Vertices: 760/192004, Edges: 1821/532173, Faces: 1082/340598, Triangles: 1082/340598",
        "Fox": "Objects: 4/30",
        "Mine": "Objects: 59/85, Vertices: 22034/213278, Edges: 23112/553464, Faces: 8108/347624, Triangles: 8108/347624",
        "Windmill": "Objects: 38/39, Vertices: 5521/5524, Edges: 8518/8521, Faces: 3928/3929, Triangles: 3928/3929",
        "Wood Yard": "Objects: 114/115, Vertices: 17328/17331, Edges: 25623/25626, Faces: 11803/11804, Triangles: 11803/11804"
      };

  return (
    <div className="bg-black min-h-screen text-white pt-20">
     

      <div className="relative flex flex-col lg:flex-row items-start justify-between gap-8 p-6">
        {/* 3D Model Display */}
        <div className="w-full lg:w-2/3 flex flex-col items-start">
          <ModelViewer modelUrl={asset.modelUrl} modelHeight={modelHeight} rotation={asset.rotation} cameraPosition={cameraPosition} />

          {/* GO BACK Button */}
          <div className="mt-4 self-start ml-0">
            <button
              onClick={() => {
                sessionStorage.setItem("returnToFullscreen", "true"); // Ensures fullscreen state is saved
                navigate(previousPath, { state: { asset, showFullscreen: true } });
              }}
              className="bg-gradient-to-r from-[#fbb040] via-[#f46728] to-[#ed1c24] text-xl text-black px-4 py-2 rounded-lg flex items-center shadow-lg hover:bg-gray-600 transition"
            >
              <FaArrowCircleLeft className="mr-2" /> GO BACK
            </button>
          </div>
        </div>

        {/* Asset Details (Measured Height) */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start" ref={detailsRef}>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full text-center">
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="text-l text-gray-400 mb-2">
              {assetExtendedDescriptions[title] || "No extended description available."}
            </div>
            <p className="text-xl font-semibold">Price: {asset.price}</p>
          </div>

          {/* Technical Details */}
          {assetTechDetails[title] && (
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full mt-4">
              <h2 className="text-xl font-bold text-gray-300">Technical Details</h2>
              <ul className="text-l text-gray-400 list-disc list-inside mt-2">
                {assetTechDetails[title].split(', ').map((detail, index) => (
                  <li key={index} className="ml-4">{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default AssetDetailPage;