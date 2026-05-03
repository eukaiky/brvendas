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
      <Hero />
      <OShow />
      <Galeria />
      <Depoimentos />
      <Planos />
      <Agenda />
      <Footer />
    </div>
  );
}