import blender from "../../assets/SoftwareLogo/Blender.png";
import maya from "../../assets/SoftwareLogo/Maya.png";
import unity from "../../assets/SoftwareLogo/Unity3D.png";
import unrealEngine from "../../assets/SoftwareLogo/UnrealEngine.png";
import santer from "../../assets/SoftwareLogo/Santer.png";

export default function Softwares() {
  const software = [
    { name: "Blender", image: blender },
    { name: "Maya", image: maya },
    { name: "Unity", image: unity },
    { name: "Unreal Engine", image: unrealEngine },
    { name: "Substance Painter", image: santer },
  ];

  // Create four copies of the software array to ensure there's always content on screen
  const fullSoftwareList = [...software, ...software, ...software, ...software];

  return (
    <div>
    <div className="bg-[#030303] py-20 relative overflow-hidden">
      {/* First row with left-to-right scrolling */}
      <div className="flex overflow-hidden relative">
        <div className="animate-marquee flex">
          {fullSoftwareList.map((item, index) => (
            <div key={index} className="flex flex-col items-center px-8 w-40 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              />
              <p className="text-white/80 text-sm ">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-${software.length} * 160px));
          }
        }
      `}</style>
    </div>
    </div>
  );
}