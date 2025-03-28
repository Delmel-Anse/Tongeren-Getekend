import React, { useEffect, useState } from "react";

function GalleryPage() {
  const [buildingData, setBuildingData] = useState([]);

  useEffect(() => {
    fetch("/Buildings.json")
      .then((response) => response.json())
      .then((data) => setBuildingData(data));
  }, []);

  // Function to truncate description
  const truncateDescription = (text, maxLength = 125) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-purple-700 to-orange-400 py-8 px-4 pb-24">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Gebouwen</h1>

      {/* Responsive Vertical Layout */}
      <div className="flex flex-col gap-6 w-full max-w-2xl sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
        {buildingData.map((building) => (
          <div
            key={building.key}
            className="bg-purple-200 rounded-xl shadow-lg overflow-hidden w-full sm:w-[375px] lg:w-[400px] xl:w-[450px] mx-auto cursor-pointer"
            onClick={() => {
              window.location.href = `/details/${building.key}`;
            }}
          >
            <div className="w-full h-60 bg-purple-300 flex items-center justify-center overflow-hidden">
              <img
                src={building.images}
                alt={building.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 flex flex-col text-center">
              <h2 className="text-2xl font-bold text-purple-900">{building.name}</h2>
              <p className="text-gray-700 mt-2">{truncateDescription(building.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;
