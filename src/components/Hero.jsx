export default function Hero() {
  return (
    <section className="relative h-[90vh] md:h-screen flex flex-col items-center overflow-hidden bg-brand-dark">
      {/* Container Principal */}
      <div className="absolute inset-0 z-10">
        
        {/* Imagem de Fundo */}
        <div 
          className="absolute inset-0 bg-cover bg-[center_20%] bg-no-repeat"
          style={{ backgroundImage: 'url("/cantores.jpeg")' }}
        />
        
        {/* Degrade escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/50 to-brand-dark" />
        
        {/* CONTEÚDO: LOGO + BOTÃO */}
        <div className="relative w-full h-full px-6 md:px-12 flex flex-col items-center md:items-start">
          
          {/* pt-60 para subir os 4% em relação ao pt-64 anterior */}
          <div className="pt-60 md:pt-16 flex flex-col items-center md:items-start">
            
            {/* LOGO */}
            <img 
              src="/logo-branca.png" 
              alt="Logo Brunno & Rodrigues" 
              className="w-60 md:w-[300px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] object-contain"
            />

            {/* BOTÃO MOBILE */}
            <div className="mt-6 md:hidden">
              <a 
                href="#planos" 
                className="bg-brand-red text-white text-[13px] px-10 py-3.5 rounded-full font-bold uppercase tracking-widest shadow-[0_10px_20px_rgba(230,0,0,0.5)] active:scale-95 transition inline-block"
              >
                Quero ver planos
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-brand-dark to-transparent z-20" />
    </section>
  );
}