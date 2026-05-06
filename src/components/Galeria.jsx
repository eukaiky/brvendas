import { useState, useRef } from 'react';

export default function Galeria() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [moved, setMoved] = useState(false);

  const itens = [
    { 
      id: 1, 
      type: 'vimeo', 
      url: 'https://player.vimeo.com/video/1189589598?badge=0&autopause=0' 
    },
    { 
      id: 2, 
      type: 'vimeo', 
      url: 'https://player.vimeo.com/video/1189588251?badge=0&autopause=0' 
    },
    { 
      id: 3, 
      type: 'vimeo', 
      url: 'https://player.vimeo.com/video/1189589371?badge=0&autopause=0' 
    },
    { 
      id: 4, 
      type: 'foto', 
      // Link da nova agenda atualizado
      img: 'https://media.discordapp.net/attachments/1501394478475251773/1501394532774711427/Agenda_BR_20260505_211317_0000.jpg.jpeg?ex=69fbea1f&is=69fa989f&hm=b2d315c9d8282bf24cbcf645087bfa87d5acdcf957d57991dd394bb0ba7c69b8&=&format=webp&width=364&height=648' 
    },
  ];

  const onMouseDown = (e) => {
    setIsDragging(true);
    setMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    if (Math.abs(x - startX) > 5) {
      setMoved(true);
      e.preventDefault();
      scrollRef.current.scrollLeft = scrollLeftState - walk;
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  };

  return (
    <section id="galeria" className="py-20 bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-red mb-12 glow-text uppercase tracking-widest">
          Galeria
        </h2>
        
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseUp}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className={`flex overflow-x-auto pb-4 gap-6 scrollbar-hide snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing select-none scroll-auto' : 'cursor-grab scroll-smooth'
          }`}
        >
          <style jsx>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {itens.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[85%] md:min-w-[300px] aspect-[3/4] rounded-xl overflow-hidden border border-white/10 snap-center bg-black relative shrink-0"
            >
              {item.type === 'vimeo' ? (
                <div className="w-full h-full relative">
                   <iframe
                    src={item.url}
                    className={`absolute top-[-35%] left-1/2 w-[150%] h-[140%] -translate-x-1/2 border-0 z-10 
                      ${isDragging && moved ? 'pointer-events-none' : 'pointer-events-auto'}`}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                  ></iframe>
                </div>
              ) : (
                <img 
                  src={item.img} 
                  alt="Agenda" 
                  className="w-full h-full object-cover pointer-events-none block" 
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center mt-10">
          <div className="relative w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-brand-red shadow-[0_0_10px_rgba(230,0,0,1)] transition-all duration-200"
              style={{ 
                width: `${100 / itens.length}%`,
                left: `${(scrollProgress * (itens.length - 1)) / itens.length}%`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}