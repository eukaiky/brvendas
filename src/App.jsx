import Hero from './components/Hero';
import OShow from './components/OShow';
import Galeria from './components/Galeria';
import Depoimentos from './components/Depoimentos';
import Planos from './components/Planos';
import Agenda from './components/Agenda';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      {/* Estilo Global da Animação de Pulo Sincronizado */}
      <style jsx global>{`
        @keyframes delayedJump {
          0%, 80%, 100% { transform: translateY(0); }
          90% { transform: translateY(-20px); }
        }
        .animate-page-jump {
          animation: delayedJump 4.5s ease-in-out infinite;
        }
      `}</style>

      {/* Este bloco faz o Hero e o OShow pularem EXATAMENTE ao mesmo tempo */}
      <div className="animate-page-jump">
        <Hero />
        <OShow />
      </div>

      {/* As demais seções seguem o fluxo normal */}
      <Galeria />
      <Depoimentos />
      <Planos />
      <Agenda />
      <Footer />
    </div>
  );
}