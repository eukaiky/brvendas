import { MessageCircle } from 'lucide-react';

export default function Depoimentos() {
  const depoimentos = [
    { name: "Fernanda & Lucas", role: "Noivos", text: "Contratar a dupla para o nosso casamento foi a melhor decisão! O show foi incrível, todos os convidados dançaram do começo ao fim. Energia surreal!" },
    { name: "Ricardo Almeida", role: "Diretor Comercial", text: "Fizemos a confraternização da empresa e foi um sucesso absoluto. Já quero deixar fechado para o ano que vem. Profissionalismo e diversão garantidos." },
    { name: "Ana Carolina", role: "Fã", text: "Melhor show sertanejo da região! Fui no último e foi a melhor experiência. Repertório atualizado e a interação com o público é sensacional." }
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-red mb-12 glow-text">DEPOIMENTOS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {depoimentos.map((dep, index) => (
          <div key={index} className="bg-brand-gray border border-white/10 p-6 rounded-2xl flex flex-col gap-4 hover:border-brand-red/50 transition">
            <div className="flex items-center gap-3">
              <div className="bg-brand-red/20 p-2 rounded-full text-brand-red">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold">{dep.name}</h4>
                <span className="text-sm text-gray-400">{dep.role}</span>
              </div>
            </div>
            <p className="text-gray-300 italic">"{dep.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}