export default function OShow() {
  return (
    /* pt-0 garante que a seção comece no topo */
    <section id="o-show" className="pt-0 pb-20 px-4 max-w-5xl mx-auto">
      
      {/* Container da Imagem: -mt-6 sobe o bordão em aproximadamente 10% */}
      <div className="flex justify-center items-center mb-8 -mt-6">
        <img 
          src="/bordao-brancoc.png" 
          alt="Na Pegada B&R" 
          /* Mantendo a redução de 30% anterior */
          className="w-44 md:w-[315px] object-contain drop-shadow-[0_0_15px_rgba(230,0,0,0.2)]"
        />
      </div>
      
      <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight">A MELHOR ENERGIA PARA SEU EVENTO</h3>
        <p className="text-gray-300 leading-relaxed mb-6 text-lg">
          Show animado que abrange os melhores estilos para não deixar ninguém parado. Trazemos o melhor do <span className="text-brand-red font-bold">SERTANEJO UNIVERSITÁRIO, MODÃO, POP ROCK E MPB</span>. Temos flexibilidade de repertório para se adaptar perfeitamente ao clima do seu evento.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg">
          Equipe extremamente profissional e educada cujo único objetivo é fazer a entrega do melhor show da sua vida. Nossa produção é treinada para trazer soluções e garantir que tudo ocorra perfeitamente.
        </p>
      </div>
    </section>
  );
}