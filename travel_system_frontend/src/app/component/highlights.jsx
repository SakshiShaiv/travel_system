export default function Highlights() {
  return (
    <section id="explore" className="py-10 text-center">
      <h2 className="text-2xl font-bold mb-6">Highlights</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {["🏛️ Historical Places", "🍲 Street Food & Restaurants", "🛍️ Shopping & Local Markets", "🏨 Hotels & Stay"].map((item, i) => (
          <div
            key={i}
            className="bg-white px-6 py-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 cursor-pointer transition flex-1 min-w-[200px] text-lg font-medium"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
