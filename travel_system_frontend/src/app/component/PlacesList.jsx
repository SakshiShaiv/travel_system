"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesList() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // API call
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/places");
        setPlaces(res.data);
      } catch (err) {
        console.error("Error fetching places:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading places...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Image */}
          <img
            src={place.image_url || "/default-place.jpg"}
            alt={place.name}
            className="w-full h-48 object-cover"
          />

          {/* Content */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
            <p className="text-gray-600">{place.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
