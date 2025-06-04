import React, { useState } from "react";

interface TemplateItem {
  templateImageUrl: string;
  templateName: string;
}

interface CommunityTemplatesProps {
  data: {
    [key: string]: TemplateItem[];
  };
}

const tabNames = ["recommend", "poster", "emoji", "posture", "stylings", "store design", "likes"];

const displayTabName = (tab: string) => {
  switch (tab.toLowerCase()) {
    case "recommend":
      return "Recommend";
    case "poster":
      return "Poster";
    case "emoji":
      return "Emoji";
    case "posture":
      return "Posture";
    case "stylings":
      return "Stylings";
    case "store design":
      return "Store Design";
    case "likes":
      return "Likes";
    default:
      return tab;
  }
};

const CommunityTemplates: React.FC<CommunityTemplatesProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("recommend");

  const handleFilterClick = () => {
    console.log("Filter button clicked");
  };

  const templates = data[activeTab] || [];

  return (
    <div className="w-full px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">From the Community</div>
        <button
          className="flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition"
          onClick={handleFilterClick}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M3.75 5.25h10.5M6.75 9h4.5m-2.25 3.75h0" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span className="text-sm font-medium">Filter</span>
        </button>
      </div>
      <div className="flex gap-4 mb-6">
        {tabNames.map((tab) => (
          <button
            key={tab}
            className={`capitalize px-3 py-1 rounded-full text-sm font-medium transition-all ${activeTab === tab ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            onClick={() => setActiveTab(tab)}
          >
            {displayTabName(tab)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4 min-h-[400px]">
        {templates.length === 0 ? (
          <div className="col-span-4 flex items-center justify-center text-gray-400 text-lg h-64">No templates</div>
        ) : (
          templates.map((item, idx) => (
            <div key={idx} className="relative group rounded-2xl overflow-hidden bg-gray-100 aspect-[1/1.1] flex items-center justify-center">
              <img
                src={item.templateImageUrl}
                alt={item.templateName}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <div className="text-white text-base font-semibold mb-2">{item.templateName || "Template name"}</div>
                <button className="bg-white/80 hover:bg-white text-gray-900 font-medium px-4 py-1 rounded-full text-sm w-fit self-end shadow">Make Same</button>
              </div>
            </div>
          ))
        )}
        {/* 占位卡片，保持布局 */}
        {templates.length < 4 && Array.from({ length: 4 - templates.length }).map((_, i) => (
          <div key={"placeholder-" + i} className="rounded-2xl bg-gray-50 aspect-[1/1.1]" />
        ))}
      </div>
    </div>
  );
};

export default CommunityTemplates;
