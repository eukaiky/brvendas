import { Zap, Star, Crown, Check } from 'lucide-react';

export default function Planos() {
  return (
    <section id="planos" className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-red mb-16 glow-text">PLANOS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plano A */}
          <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 hover:border-brand-red/30 transition flex flex-col">
            <div className="flex items-center gap-3 text-brand-red mb-4">
              <Zap size={28} />
              <h3 className="text-2xl font-bold text-white">PLANO A</h3>
            </div>
            <p className="text-brand-red font-semibold mb-6">Acústico</p>
            <p className="text-sm text-gray-400 mb-8">Recomendado para: Bares, Pubs e Restaurantes</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Formato: Voz, Violão e Cajón</li>
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Tempo: 3h de show</li>
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Sistema de Som: PA Básico incluso</li>
            </ul>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Entre em contato para negociar taxa de locomoção e hospedagem para shows fora de Mococa-SP.
            </p>
            
            <button className="w-full py-3 rounded-lg border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition font-bold">
              QUERO ESSE PLANO
            </button>
          </div>

          {/* Plano B */}
          <div className="bg-brand-gray border-2 border-brand-red rounded-2xl p-8 transform md:-translate-y-4 shadow-[0_0_30px_rgba(230,0,0,0.15)] relative flex flex-col">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider">
              MAIS PEDIDO
            </div>
            <div className="flex items-center gap-3 text-brand-red mb-4 mt-2">
              <Star size={28} />
              <h3 className="text-2xl font-bold text-white">PLANO B</h3>
            </div>
            <p className="text-brand-red font-semibold mb-6">Banda Reduzida</p>
            <p className="text-sm text-gray-400 mb-8">Recomendado para: Festas e Casamentos</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Músicos: Bateria, Baixo, Violão, Sanfona/teclado</li>
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Tempo: 2h de show (negociavel) </li>
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Backline: Estrutura completa</li>
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Produção: Equipe no local</li>
            </ul>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Entre em contato para negociar taxa de locomoção e hospedagem para shows fora de Mococa-SP.
            </p>
            
            <button className="w-full py-3 rounded-lg bg-brand-red text-white hover:bg-red-700 transition font-bold shadow-lg">
              QUERO ESSE PLANO
            </button>
          </div>

          {/* Plano C */}
          <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 hover:border-brand-red/30 transition flex flex-col">
            <div className="flex items-center gap-3 text-brand-red mb-4">
              <Crown size={28} />
              <h3 className="text-2xl font-bold text-white">PLANO C</h3>
            </div>
            <p className="text-brand-red font-semibold mb-6">Premium Corporativo</p>
            <p className="text-sm text-gray-400 mb-8">Recomendado para: Prefeituras e Grandes Eventos</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Músicos: Bateria, Baixo, Violão Base, Violão Solo, Sanfona/teclado, Percuteria, Opcionais (escolha do contratante) </li>
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Tempo: 2h de show</li>
              <li className="flex gap-3 text-gray-300"><Check className="text-brand-red flex-shrink-0" size={20} /> Backline: Estrutura completa</li>
            </ul>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Entre em contato para negociar taxa de locomoção e hospedagem para shows fora de Mococa-SP.
            </p>
            
            <button className="w-full py-3 rounded-lg border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition font-bold">
              QUERO ESSE PLANO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}