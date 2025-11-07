"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Define menuItems here
  const menuItems = [
    { name: "🏠︎ Home", href: "/" },
    { name: "🔍︎ Tourist Places", href: "/tourist_places" },
    { name: "⾕ Hotels & Stays", href: "/hotels_&_stays" },
    { name: "🍴 Food Guide", href: "/food_guide" },
    { name: "☎ Contact Us", href: "/contact_us" },
  ];


  return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <img src="/logo.jpeg" alt="Logo" className="h-15 w-30" />
       

        {/* Hamburger Icon */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        {/* Menu Items */}
        <ul
          className={`absolute  md:static top-16 left-0 w-full md:w-auto bg-[#1a2537]/95 md:bg-transparent 
          flex flex-col md:flex-row items-center md:space-x-8 
          space-y-4 md:space-y-0 py-6 md:py-0 transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible md:visible md:opacity-100"}`}
        >
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <a
                href={item.href}
                className="text-white border-1 p-2 border-gray-700 rounded-lg  shadow-sm shadow-gray-500  font-medium hover:text-blue-200  transition duration-300"
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>

  );
}
