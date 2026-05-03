export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Imagem de Fundo */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[center_20%] bg-no-repeat"
        style={{ backgroundImage: 'url("/cantores.jpeg")' }}
      />
      
      {/* Degrade escuro */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark/30 via-brand-dark/40 to-brand-dark" />
      
      {/* LOGO: Posicionada com porcentagem para não tampar o rosto nem bater na seta */}
      <div className="relative z-10 text-center px-4 mt-[-10%] md:mt-20">
        <img 
          src="/logo-branca.png" 
          alt="Logo Brunno & Rodrigues" 
          className="w-52 md:w-[350px] drop-shadow-2xl object-contain"
        />
      </div>

      {/* RODAPÉ: Seta e Botão */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center w-full px-6 gap-5">
        
        {/* Setinha: Sem margem extra aqui para não embolar */}
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

        {/* Botão: Apenas Mobile */}
        <a 
          href="#planos" 
          className="flex md:hidden bg-brand-red text-white text-xs px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-red-700 transition active:scale-95 shadow-[0_0_20px_rgba(230,0,0,0.4)]"
        >
          Quero ver planos
        </a>
      </div>
    </section>
  );
}