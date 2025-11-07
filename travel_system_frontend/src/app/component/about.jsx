// export default function About() {
//   return (
//     <section className="py-10 bg-gray-100 text-center px-6">
//       <h2 className="text-2xl font-bold mb-4">About Indore</h2>
//       <p className="max-w-2xl mx-auto text-lg text-gray-700">
//         Indore is known for its rich heritage, delicious food, and vibrant markets.  
//         From Rajwada Palace to Sarafa Bazaar, explore the charm of Central India.
//       </p>
//     </section>
//   );
// }


import { FaLandmark, FaUtensils, FaMusic, FaMapMarkedAlt } from "react-icons/fa";

export default function About() {
  return (
    <section className="py-16  text-gray-800 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6">About Indore</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
          Indore, also known as "Mini Mumbai", "Cleanest City" or "Poha-Paglu City" is the heart of India, known for its fast-paced lifestyle, and affectionately called the "Street Food Capital" for its tantalizing cuisine. Its rich heritage is woven from the influences of the Maratha, Mughal, and Holkar dynasties, most notably represented by the stunning Rajwada Palace and the ornate Lal Bagh Palace. This diverse history is mirrored in its people, the welcoming and friendly "Indoris," whose social nature makes newcomers feel right at home. Indore's culture is a vibrant mix, with Hindu, Jain, and Marathi traditions evident in its festivals, language, and architectural gems like the glass-adorned Kanch Mandir. The city is famous for its delicious and varied vegetarian street food, with the late-night Sarafa Bazaar and the bustling Chappan Dukan offering specialties like poha-jalebi, khopra patties, and garadu. Above all, Indore is celebrated for its cleanliness, having been consistently ranked the cleanest city in India.

        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {/* Heritage */}
          <div className="bg-white border-1 border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaLandmark size={40} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Heritage</h3>
            <p className="text-gray-600 text-sm">
              Discover historic landmarks like Rajwada Palace, Lal Bagh Palace, and the architectural marvels of Indore.
            </p>
          </div>

          {/* Food */}
          <div className="bg-white border-1 border-gray-200  rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaUtensils size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Food</h3>
            <p className="text-gray-600 text-sm">
              Indore is famous for its street food, snacks, and local delicacies like Poha, Jalebi, and Sarafa Bazaar treats.
            </p>
          </div>

          {/* Culture */}
          <div className="bg-white border-1 border-gray-200  rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaMusic size={40} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Culture</h3>
            <p className="text-gray-600 text-sm">
              Experience the vibrant culture with festivals, art exhibitions, music, and traditional performances across the city.
            </p>
          </div>

          {/* Tourism */}
          <div className="bg-white border-1 border-gray-200  rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FaMapMarkedAlt size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tourism</h3>
            <p className="text-gray-600 text-sm">
              Explore popular attractions, guided tours, nearby temples, gardens, and vibrant shopping areas for an unforgettable experience.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <a
            href="#"
            className="text-white bg-black  hover:text-lg border-1 p-4 border-gray-700 rounded-lg  shadow-sm shadow-gray-500  font-medium hover:text-blue-200  transition duration-300"
          >
            Explore Indore Now
          </a>
        </div>
      </div>
    </section>
  );
}
