"use client";

import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react"; // from lucide-react icons

export default function ScrollButton() {
  const [isAtTop, setIsAtTop] = useState(true);

  // --- Detect scroll position ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;

      // Check if near top
      setIsAtTop(scrollY < 200);

      // Optional: If you want to hide when at very bottom
      if (scrollY + winHeight >= docHeight - 50) {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Scroll actions ---
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={isAtTop ? scrollToBottom : scrollToTop}
      className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg 
                 hover:bg-black transition-all duration-300 z-50 flex items-center justify-center"
    >
      {isAtTop ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
    </button>
  );
}
