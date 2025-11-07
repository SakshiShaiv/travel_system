"use client";

import React, { useState, useEffect } from "react";
import BackButton from "../component/backbutton";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/hotels") 
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching hotels:", err));
  }, []);



  
  if (loading) return <p className="text-center mt-10">Loading hotels...</p>;

  return (
    <div className="p-6 bg-gray-50">
   

  <div className="flex items-center justify-between mb-12 px-4 md:px-0">
  {/* Back Button on the left */}
  <BackButton />

  {/* Heading centered */}
  <h1 className="text-4xl font-bold text-gray-800 hover:text-gray-600 flex-1 text-center">
    Hotels & Resorts 
  </h1>

  {/* Empty div to balance spacing on the right */}
  <div className="w-24"></div>
</div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-gray-800 font-bold">{hotel.price}</p>
            <p className="text-yellow-500">⭐ {hotel.rating}</p>

            <button
              onClick={() => setSelectedHotel(hotel)}
              className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Details */}
      {selectedHotel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[600px] shadow-xl relative">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>

            <img
              src={selectedHotel.image}
              alt={selectedHotel.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold">{selectedHotel.name}</h2>
            <p className="text-gray-600">{selectedHotel.location}</p>
            <p className="text-gray-800 font-bold">{selectedHotel.price}</p>
            <p className="text-yellow-500">⭐ {selectedHotel.rating}</p>

            <p className="mt-4 text-gray-700">{selectedHotel.description}</p>

            <a
              href={selectedHotel.map_link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              📍 View on Map
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
