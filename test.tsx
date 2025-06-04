import React from "react";

interface MascotBrandKitProps {
  title: string;
  description: string;
}

const MascotBrandKit: React.FC<MascotBrandKitProps> = ({ title, description }) => {
  return (
    <div className="flex items-center justify-between bg-[#eaf3fc] rounded-lg p-6 w-full">
      <div className="flex flex-col gap-2">
        <a href="#" className="text-xs text-[#3b82f6] font-medium mb-1">Mascot Brand Kit</a>
        <div className="text-lg font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-500 mb-3">{description}</div>
        <button className="flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-800 w-fit">
          <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect width="18" height="18" rx="9" fill="white"/><path d="M9 5v5m0 0v2m0-2h2m-2 0H7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Create Now
        </button>
      </div>
      <img src="./image.png" alt="Mascot" className="w-24 h-24 object-contain" />
    </div>
  );
};

export default MascotBrandKit;
