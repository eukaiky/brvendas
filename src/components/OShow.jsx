import { Music } from 'lucide-react';

export default function OShow() {
  return (
    <section id="o-show" className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-red mb-2 glow-text flex justify-center items-center gap-3">
          <Music size={32} /> NA PEGADA B&R <Music size={32} />
        </h2>
      </div>
      
      <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 text-white">A MELHOR ENERGIA PARA SEU EVENTO</h3>
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