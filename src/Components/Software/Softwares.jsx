import blender from "../../assets/SoftwareLogo/Blender.png";
import maya from "../../assets/SoftwareLogo/Maya.png";
import unity from "../../assets/SoftwareLogo/Unity3D.png";
import unrealEngine from "../../assets/SoftwareLogo/UnrealEngine.png";
import santer from "../../assets/SoftwareLogo/Santer.png";
import './Software.css';

export default function Softwares() {
    const software = [
        { name: "Blender", image: blender},
        { name: "Maya", image: maya },
        { name: "Unity", image: unity },
        { name: "Unreal Engine", image: unrealEngine },
        { name: "Substance Painter", image: santer },
    ];

    return (
              <div className="bg-[#030303] py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {software.map((item) => (
                        <div 
                            key={item.name}
                            className="group perspective-1000"
                        >
                            <div className="relative transform-gpu transition-all duration-500 ease-out
                                          hover:scale-105 hover:[transform:rotateX(10deg)]">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r 
                                              from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 
                                              group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative p-6 rounded-xl bg-gradient-to-b 
                                              from-white/10 to-white/5
                                              border-t border-l border-white/10
                                              shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
                                              backdrop-blur-sm">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="relative p-3">
                                            <div className="absolute inset-0 bg-cyan-500/10 rounded-full 
                                                          blur-md group-hover:bg-cyan-500/20 
                                                          transition-all duration-500"></div>
                                            <div className="relative transform transition-all duration-500 
                                                          group-hover:scale-110 group-hover:rotate-3">
                                                <img 
                                                    src={item.image} 
                                                    className="w-12 h-12 md:w-16 md:h-16 object-contain
                                                             drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" 
                                                    alt={item.name}
                                                />
                                            </div>
                                        </div>
                                        <h3 className="text-white/90 text-sm md:text-base font-medium 
                                                     tracking-wider group-hover:text-cyan-300
                                                     transition-colors duration-300">
                                            {item.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}