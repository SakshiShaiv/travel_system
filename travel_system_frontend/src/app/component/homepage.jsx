export default function Hero() {
  return (
  
 
    <section
      className="relative bg-cover bg-center bg-fixed text-white h-[100vh] flex flex-col justify-center items-center text-center px-4"
      style={{ backgroundImage: "url('/Background.png')" }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
          Welcome to <span className="text-yellow-400">Indore</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-md">
          Discover Culture, Food & Heritage of Madhya Pradesh
        </p>
        <a
          href="#explore"
          className="inline-block px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-lg 
          hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
        >
          Start Exploring
        </a> */}
      </div>
    </section>

  );
}

