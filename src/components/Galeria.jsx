export default function Galeria() {
  return (
    <section id="galeria" className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-red mb-12 glow-text">GALERIA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-brand-red transition duration-300">
              <img 
                src={`https://images.unsplash.com/photo-1501281668745-f7f5792203b2?q=80&w=800&auto=format&fit=crop&sig=${item}`} 
                alt={`Show Brunno e Rodrigues ${item}`}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}