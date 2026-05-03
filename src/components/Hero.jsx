export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Imagem de Fundo (Ajuste o 20% para mais ou para menos até ficar na altura ideal) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[center_20%] bg-no-repeat"
        style={{ backgroundImage: 'url("/cantores.jpeg")' }}
      />
      
      {/* Degrade escuro */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark/30 via-brand-dark/40 to-brand-dark" />
      
      {/* LOGO (Margens aumentadas para mt-48 e md:mt-64 para descer ainda mais) */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center w-full mt-48 md:mt-64">
        <img 
          src="/logo-branca.png" 
          alt="Logo Brunno & Rodrigues" 
          className="w-56 md:w-[350px] drop-shadow-2xl object-contain"
        />
      </div>

      {/* Setinha apontando pra baixo */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <a 
          href="#o-show" 
          className="text-white/70 hover:text-brand-red transition duration-300 flex flex-col items-center cursor-pointer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="animate-bounce"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </section>
  );
}