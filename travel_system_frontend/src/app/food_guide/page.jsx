"use client";

import React, { useState, useEffect } from "react";
import BackButton from "../component/backbutton";

export default function FoodGuide() {
  const [foodData, setFoodData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch("http://localhost:5000/food") 
      .then((res) => res.json())
      .then((data) => {
        setFoodData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching food data:", err);
        setLoading(false);
      });
  }, []);

  const foodTypes = ["All", ...new Set(foodData.map(food => food.type))];

 
  const filteredFood = foodData.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || food.type === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) return <p className="text-center mt-10">Loading food items...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
        <div className="flex items-center justify-between mb-12 px-4 md:px-0">
        {/* Back Button on the left */}
        <BackButton />
      
        {/* Heading centered */}
        <h1 className="text-4xl font-bold text-gray-800 hover:text-gray-600 flex-1 text-center">
         🍴 Taste the Flavors of Indore
        </h1>
      
        {/* Empty div to balance spacing on the right */}
        <div className="w-24"></div>
      </div>
    

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded-xl p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        >
          {foodTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredFood.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4 cursor-pointer"
            onClick={() => setSelectedFood(food)}
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900">{food.name}</h2>
            <p className="text-gray-600 mt-1 line-clamp-2">{food.description}</p>
            <p className="text-sm text-gray-500 mt-1">{food.type}</p>
          </div>
        ))}
      </div>

      {/* Modal for Details */}
      {selectedFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[600px] shadow-xl relative">
            <button
              onClick={() => setSelectedFood(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>

            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold">{selectedFood.name}</h2>
            <p className="text-gray-600 mt-2">{selectedFood.description}</p>
            <p className="text-sm text-gray-500 mt-2">Type: {selectedFood.type}</p>

            <h3 className="mt-4 font-semibold text-lg">📍 Famous Spots</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {selectedFood.spots.map((spot, idx) => (
                <li key={idx}>
                  <a
                    href={spot.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {spot.spot_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
