// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import BackButton from "../component/backbutton";

// export default function TouristPage() {
//   const [places, setPlaces] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [showFull, setShowFull] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   // Store refs and active indexes for each category
//   const carouselRefs = useRef({});
//   const [activeIndexes, setActiveIndexes] = useState({});

//   useEffect(() => {
//     const fetchPlaces = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:5000/places");
//         const data = await res.json();
//         setPlaces(data);
//       } catch (err) {
//         console.error("Error fetching places:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlaces();
//   }, []);

//   const categories = [...new Set(places.map((p) => p.category))];

//   const placesByCategory = categories.map((cat) => ({
//     category: cat,
//     places: places.filter((p) => p.category === cat),
//   }));


//     // const placesByCategory = filteredCategories.map((cat) => ({
//   //   category: cat,
//   //   places: filteredPlaces.filter((p) => p.category === cat),
//   // }));

//   if (loading) return <p className="text-center p-6">Loading places...</p>;

//   // --- Handle Scroll ---
//   const handleScroll = (category) => {
//     const ref = carouselRefs.current[category];
//     if (!ref) return;

//     const scrollLeft = ref.scrollLeft;
//     const itemWidth = ref.firstChild?.offsetWidth + 16 || 1;
//     const index = Math.round(scrollLeft / itemWidth);

//     setActiveIndexes((prev) => ({ ...prev, [category]: index }));
//   };

//   // --- Scroll to Index ---
//   const scrollToIndex = (category, index) => {
//     const ref = carouselRefs.current[category];
//     if (!ref) return;

//     const itemWidth = ref.firstChild?.offsetWidth + 16 || 1;
//     ref.scrollTo({
//       left: index * itemWidth,
//       behavior: "smooth",
//     });
//     setActiveIndexes((prev) => ({ ...prev, [category]: index }));
//   };

//    // --- Category List ---
//  // const categories = ["All", ...new Set(places.map((p) => p.category))];

//   // --- Filtered Data ---
//   const filteredPlaces =
//     selectedCategory === "All"
//       ? places
//       : places.filter((p) => p.category === selectedCategory);

//   const filteredCategories =
//     selectedCategory === "All"
//       ? [...new Set(filteredPlaces.map((p) => p.category))]
//       : [selectedCategory];



//   // // --- Scroll Handlers ---
//   // const handleScroll = (category) => {
//   //   const ref = carouselRefs.current[category];
//   //   if (!ref) return;
//   //   const scrollLeft = ref.scrollLeft;
//   //   const itemWidth = ref.firstChild?.offsetWidth + 16 || 1;
//   //   const index = Math.round(scrollLeft / itemWidth);
//   //   setActiveIndexes((prev) => ({ ...prev, [category]: index }));
//   // };

//   // const scrollToIndex = (category, index) => {
//   //   const ref = carouselRefs.current[category];
//   //   if (!ref) return;
//   //   const itemWidth = ref.firstChild?.offsetWidth + 16 || 1;
//   //   ref.scrollTo({ left: index * itemWidth, behavior: "smooth" });
//   //   setActiveIndexes((prev) => ({ ...prev, [category]: index }));
//   // };

//   return (
//     <section className="px-6 py-12 bg-gray-50">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-12 px-4 md:px-0">
//         <BackButton />
//         <h1 className="text-4xl font-bold text-gray-800 hover:text-gray-600 flex-1 text-center">
//           Explore Indore
//         </h1>
//         <div className="w-24"></div>
//       </div>

//       {/* --- Dynamic Category Filter Bar --- */}
//       <div className="flex flex-wrap justify-center gap-3 mb-12">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//               selectedCategory === cat
//                 ? "bg-black-700 text-white shadow-md scale-105"
//                 : "bg-gray-200 hover:bg-gray-300 text-gray-700"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Category Sections */}
//       {placesByCategory.map(({ category, places }) => (
//         <div key={category} className="mb-12">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">{category}</h2>

//           {/* Carousel */}
//           <div
//             ref={(el) => (carouselRefs.current[category] = el)}
//             onScroll={() => handleScroll(category)}
//             className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
//           >
//             {places.map((place) => (
//               <div
//                 key={place.id}
//                 className="flex-none min-w-[250px] bg-white rounded-xl shadow-lg cursor-pointer transform transition hover:scale-105 snap-start"
//                 onClick={() => {
//                   setSelectedPlace(place);
//                   setShowFull(false);
//                 }}
//               >
//                 <img
//                   src={place.image_url}
//                   alt={place.name}
//                   className="w-full h-84 object-cover rounded-t-xl"
//                 />
//                 <div className="p-3">
//                   <h3 className="font-semibold text-lg">{place.name}</h3>
//                   <p className="text-gray-600 text-sm mt-1">{place.short_description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>



//           {/* Dots for this category */}
//           <div className="flex justify-center mt-2 gap-2">
//             {places.map((_, idx) => (
//               <button
//                 key={idx}
//                 className={`w-3 h-3 rounded-full transition ${
//                   idx === (activeIndexes[category] || 0)
//                     ? "bg-black-700"
//                     : "bg-gray-300"
//                 }`}
//                 onClick={() => scrollToIndex(category, idx)}
//               />
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Modal */}
//       {selectedPlace && (
//         <div className="fixed inset-0 flex justify-center items-center z-50">
//           <div
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={() => setSelectedPlace(null)}
//           ></div>

//           <div className="bg-white rounded-2xl max-w-2xl w-full relative p-6 z-10 shadow-2xl">
//             <button
//               onClick={() => setSelectedPlace(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
//             >
//               ✖
//             </button>

//             <img
//               src={selectedPlace.image_url}
//               alt={selectedPlace.name}
//               className="w-full h-84 object-cover rounded-xl"
//             />

//             <h2 className="text-2xl font-bold mt-4">{selectedPlace.name}</h2>
//             <p className="mt-3 text-gray-700 leading-relaxed">
//               {showFull
//                 ? selectedPlace.long_description
//                 : selectedPlace.long_description.substring(0, 150) + "..."}
//             </p>

//             {selectedPlace.long_description.length > 150 && (
//               <button
//                 onClick={() => setShowFull(!showFull)}
//                 className="mt-2 text-blue-600 hover:underline"
//               >
//                 {showFull ? "Show less" : "Show more"}
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


"use client";

import React, { useState, useEffect, useRef } from "react";
import BackButton from "../component/backbutton";
import ScrollButton from "../component/ScrollButton";

export default function TouristPage() {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showFull, setShowFull] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const carouselRefs = useRef({});
  const [activeIndexes, setActiveIndexes] = useState({});

  // --- Fetch data ---
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/places");
        const data = await res.json();
        setPlaces(data);
      } catch (err) {
        console.error("Error fetching places:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (loading) return <p className="text-center p-6">Loading places...</p>;

  // --- Dynamic category list ---
  const categories = ["All", ...new Set(places.map((p) => p.category))];

  // --- Filtered places by category ---
  const filteredPlaces =
    selectedCategory === "All"
      ? places
      : places.filter((p) => p.category === selectedCategory);

  const filteredCategories =
    selectedCategory === "All"
      ? [...new Set(filteredPlaces.map((p) => p.category))]
      : [selectedCategory];

  const placesByCategory = filteredCategories.map((cat) => ({
    category: cat,
    places: filteredPlaces.filter((p) => p.category === cat),
  }));

  // --- Scroll Handlers ---
  const handleScroll = (category) => {
    const ref = carouselRefs.current[category];
    if (!ref) return;

    const scrollLeft = ref.scrollLeft;
    const itemWidth = ref.firstChild?.offsetWidth + 16 || 1;
    const index = Math.round(scrollLeft / itemWidth);

    setActiveIndexes((prev) => ({ ...prev, [category]: index }));
  };

  const scrollToIndex = (category, index) => {
    const ref = carouselRefs.current[category];
    if (!ref) return;

    const itemWidth = ref.firstChild?.offsetWidth + 16 || 1;
    ref.scrollTo({ left: index * itemWidth, behavior: "smooth" });
    setActiveIndexes((prev) => ({ ...prev, [category]: index }));
  };

  return (
    <section className="px-6 py-12 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 px-4 md:px-0">
        <BackButton />
        <h1 className="text-4xl font-bold text-gray-800 hover:text-gray-600 flex-1 text-center">
          Explore Indore
        </h1>
        <div className="w-24"></div>
      </div>

      {/* --- Category Filter Bar --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 ">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2  cursor-pointer rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-black text-white shadow-md scale-105"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- Category Sections --- */}
      {placesByCategory.map(({ category, places }) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">{category}</h2>

          {/* --- Carousel --- */}
          <div
            ref={(el) => (carouselRefs.current[category] = el)}
            onScroll={() => handleScroll(category)}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          >
            {places.map((place) => (
              <div
                key={place.id}
                className="flex-none min-w-[250px] bg-white rounded-xl shadow-lg cursor-pointer transform transition hover:scale-105 snap-start"
                onClick={() => {
                  setSelectedPlace(place);
                  setShowFull(false);
                }}
              >
                <img
                  src={place.image_url}
                  alt={place.name}
                  className="w-full h-84 object-cover rounded-t-xl"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {place.short_description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- Dots --- */}
          <div className="flex justify-center mt-2 gap-2">
            {places.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition ${
                  idx === (activeIndexes[category] || 0)
                    ? "bg-gray-700"
                    : "bg-gray-300"
                }`}
                onClick={() => scrollToIndex(category, idx)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* --- Modal --- */}
      {selectedPlace && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPlace(null)}
          ></div>

          <div className="bg-white rounded-2xl max-w-2xl w-full relative p-6 z-10 shadow-2xl">
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              ✖
            </button>

            <img
              src={selectedPlace.image_url}
              alt={selectedPlace.name}
              className="w-full h-64 object-cover rounded-xl"
            />

            <h2 className="text-2xl font-bold mt-4">{selectedPlace.name}</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              {showFull
                ? selectedPlace.long_description
                : selectedPlace.long_description.substring(0, 150) + "..."}
            </p>

            {selectedPlace.long_description.length > 150 && (
              <button
                onClick={() => setShowFull(!showFull)}
                className="mt-2 text-blue-600 hover:underline"
              >
                {showFull ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>
      )}
       <ScrollButton/>
    </section>
  );
}
