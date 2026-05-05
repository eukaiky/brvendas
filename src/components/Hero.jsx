export default function Hero() {
  return (
    <section className="relative h-[90vh] md:h-screen flex flex-col items-center overflow-hidden bg-brand-dark">
      {/* Estilo para a animação de "pulinho" com intervalo de 3s */}
      <style jsx global>{`
        @keyframes delayedJump {
          0%, 80%, 100% { transform: translateY(0); }
          90% { transform: translateY(-20px); }
        }
        .animate-jump-delayed {
          animation: delayedJump 4.5s ease-in-out infinite;
        }
      `}</style>

      {/* Container que pula inteiro (Imagem + Logo + Botão) */}
      <div className="absolute inset-0 z-10 animate-jump-delayed">
        {/* Imagem de Fundo */}
        <div 
          className="absolute inset-0 bg-cover bg-[center_20%] bg-no-repeat"
          style={{ backgroundImage: 'url("/cantores.jpeg")' }}
        />
        
        {/* Degrade escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/50 to-brand-dark" />
        
        {/* CONTEÚDO CENTRALIZADO */}
        <div className="relative w-full h-full px-6 md:px-12 flex flex-col items-center md:items-start">
          
          {/* LOGO */}
          <div className="pt-52 md:pt-16">
            <img 
              src="/logo-branca.png" 
              alt="Logo Brunno & Rodrigues" 
              className="w-60 md:w-[300px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] object-contain"
            />
          </div>

          {/* BOTÃO MOBILE: mt-6 para subir os 8% solicitados */}
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

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-brand-dark to-transparent z-20" />
    </section>
  );
}