import { useState } from 'react';
import { Zap, Star, Crown, Check, Ticket, Calculator } from 'lucide-react';

export default function Planos() {
  const [cupom, setCupom] = useState('');
  const [desconto, setDesconto] = useState(0);
  
  // Estados do Calculador
  const [cidadeDestino, setCidadeDestino] = useState('');
  const [estadoDestino, setEstadoDestino] = useState('SP');
  const [planoLogistica, setPlanoLogistica] = useState('A');
  const [resultadoCalculo, setResultadoCalculo] = useState(null);

  const telefone = "5519994335140";

  // Preços Base para os cálculos
  const precosBase = {
    'A': 800,
    'B': 2500,
    'C': 0 // Sob consulta
  };

  const aplicarCupom = (valor) => {
    const code = valor.toUpperCase();
    setCupom(code);
    if (code === 'BARES30') setDesconto(0.30);
    else if (code === 'BARZINHO20') setDesconto(0.20);
    else if (code === 'BAR10PORCENTO') setDesconto(0.10);
    else setDesconto(0);
  };

  const calcularValorComDesconto = (valor) => valor * (1 - desconto);

  const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const calcularLogistica = async () => {
    if (!cidadeDestino) return alert("Digite a cidade de destino!");

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cidadeDestino},${estadoDestino},Brazil`);
      const data = await response.json();
      if (data.length === 0) throw new Error("Cidade não encontrada");

      const lat1 = -21.4667; // Mococa
      const lon1 = -47.0000;
      const lat2 = parseFloat(data[0].lat);
      const lon2 = parseFloat(data[0].lon);

      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distanciaKm = Math.round(R * c * 1.2); 

      let taxaKm = 2; let integrantes = 2;
      if (planoLogistica === 'B') { taxaKm = 6; integrantes = 6; }
      if (planoLogistica === 'C') { taxaKm = 8; integrantes = 12; }

      const totalLocomocao = distanciaKm * taxaKm;
      const totalHospedagem = distanciaKm > 200 ? integrantes * 200 : 0;
      const valorShowComDesconto = calcularValorComDesconto(precosBase[planoLogistica]);

      setResultadoCalculo({
        distancia: distanciaKm,
        taxaKm: taxaKm,
        locomocao: totalLocomocao,
        hospedagem: totalHospedagem,
        valorShow: valorShowComDesconto,
        totalGeral: totalLocomocao + totalHospedagem + valorShowComDesconto,
        cidade: cidadeDestino.toUpperCase()
      });
    } catch (error) {
      alert("Cidade não encontrada. Tente digitar sem acentos.");
    }
  };

  const enviarWhatsApp = (nomePlano, precoBasePlano) => {
    let mensagem = `Olá! Tenho interesse no *${nomePlano}*.`;
    
    // Se o preço base for > 0 (Planos A e B)
    if (precoBasePlano > 0) {
      const precoShow = calcularValorComDesconto(precoBasePlano);
      mensagem += `\n- Valor do Show: ${formatarMoeda(precoShow)}`;
      if (desconto > 0) mensagem += ` (Cupom ${cupom} aplicado)`;

      if (resultadoCalculo) {
        mensagem += `\n\n*Logística para ${resultadoCalculo.cidade}:*`;
        mensagem += `\n- Locomoção + Hospedagem: ${formatarMoeda(resultadoCalculo.locomocao + resultadoCalculo.hospedagem)}`;
        mensagem += `\n\n*VALOR TOTAL ESTIMADO: ${formatarMoeda(resultadoCalculo.totalGeral)}*`;
      }
    } else {
      mensagem += `\n- Gostaria de solicitar um orçamento premium corporativo.`;
    }

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="planos" className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-red mb-16 glow-text uppercase">PLANOS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {/* PLANO A */}
          <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 hover:border-brand-red/30 transition flex flex-col">
            <div className="flex items-center gap-3 text-brand-red mb-4"><Zap size={28} /><h3 className="text-2xl font-bold text-white uppercase">PLANO A</h3></div>
            <p className="text-brand-red font-semibold mb-6">Acústico</p>
            <ul className="space-y-4 mb-8 flex-grow text-gray-300 text-sm">
              <li className="flex gap-3"><Check className="text-brand-red" size={18} /> Voz, violão e cajón</li>
              <li className="flex gap-3"><Check className="text-brand-red" size={18} /> 2 a 3h de show</li>
              <li className="flex gap-3"><Check className="text-brand-red" size={18} /> PA básico incluso</li>
            </ul>
            <div className="mb-6 flex flex-col items-center">
              {desconto > 0 && <span className="text-gray-500 line-through text-sm">R$ 800,00</span>}
              <span className="text-4xl font-serif font-bold bg-gradient-to-b from-[#f7e482] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent italic tracking-tighter">{formatarMoeda(calcularValorComDesconto(800))}</span>
            </div>
            <button onClick={() => enviarWhatsApp("PLANO A (Acústico)", 800)} className="w-full py-3 rounded-lg border border-brand-red text-brand-red font-bold uppercase text-xs tracking-widest">QUERO ESSE PLANO</button>
          </div>

          {/* PLANO B */}
          <div className="bg-brand-gray border-2 border-brand-red rounded-2xl p-8 transform md:-translate-y-4 shadow-xl relative flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">MAIS PEDIDO</div>
            <div className="flex items-center gap-3 text-brand-red mb-4 mt-2"><Star size={28} /><h3 className="text-2xl font-bold text-white uppercase">PLANO B</h3></div>
            <p className="text-brand-red font-semibold mb-6">Banda Reduzida</p>
            <ul className="space-y-4 mb-8 flex-grow text-gray-300 text-sm">
              <li className="flex gap-3"><Check className="text-brand-red" size={18} /> Bateria, baixo, violão, sanfona</li>
              <li className="flex gap-3"><Check className="text-brand-red" size={18} /> Técnico de som</li>
            </ul>
            <div className="mb-6 flex flex-col items-center">
              {desconto > 0 && <span className="text-gray-500 line-through text-sm">R$ 2.500,00</span>}
              <span className="text-4xl font-serif font-bold bg-gradient-to-b from-[#f7e482] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent italic tracking-tighter">{formatarMoeda(calcularValorComDesconto(2500))}</span>
            </div>
            <button onClick={() => enviarWhatsApp("PLANO B (Banda Reduzida)", 2500)} className="w-full py-3 rounded-lg bg-brand-red text-white font-bold uppercase text-xs tracking-widest">QUERO ESSE PLANO</button>
          </div>

          {/* PLANO C */}
          <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 hover:border-brand-red/30 transition flex flex-col">
            <div className="flex items-center gap-3 text-brand-red mb-4"><Crown size={28} /><h3 className="text-2xl font-bold text-white uppercase">PLANO C</h3></div>
            <p className="text-brand-red font-semibold mb-6">Premium Corporativo</p>
            <ul className="space-y-4 mb-8 flex-grow text-gray-300 text-sm">
              <li className="flex gap-3"><Check className="text-brand-red" size={18} /> Equipe completa</li>
              <li className="flex gap-3"><Check className="text-brand-red" size={18} /> Full banda corporativa</li>
            </ul>
            <div className="mb-6 flex justify-center py-2">
              <span className="text-3xl font-serif font-bold bg-gradient-to-b from-[#f7e482] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent italic tracking-tight uppercase">Sob Consulta</span>
            </div>
            <button onClick={() => enviarWhatsApp("PLANO C (Premium)", 0)} className="w-full py-3 rounded-lg border border-brand-red text-brand-red font-bold uppercase text-xs tracking-widest">QUERO ESSE PLANO</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-gray p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-4 text-yellow-500 justify-center"><Ticket size={20} /><span className="font-bold uppercase text-sm">Cupom?</span></div>
            <input type="text" value={cupom} onChange={(e) => aplicarCupom(e.target.value)} placeholder="Código..." className="w-full bg-black/30 border border-white/20 rounded-lg py-3 text-center text-white uppercase" />
            {desconto > 0 && <p className="text-green-500 text-center text-xs mt-3 font-bold uppercase tracking-widest animate-pulse">✓ {desconto * 100}% de desconto!</p>}
          </div>

          <div className="bg-brand-gray p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-4 text-brand-red justify-center"><Calculator size={20} /><span className="font-bold uppercase text-sm">Cálculo de Logística</span></div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="text" placeholder="Cidade" className="bg-black/30 border border-white/20 rounded-lg p-2 text-sm text-white" onChange={(e) => setCidadeDestino(e.target.value)} />
              <select className="bg-black/30 border border-white/20 rounded-lg p-2 text-sm text-white" onChange={(e) => setEstadoDestino(e.target.value)}>
                <option value="SP">SP</option><option value="MG">MG</option><option value="RJ">RJ</option><option value="PR">PR</option>
              </select>
            </div>
            <select className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-sm mb-2 text-white" onChange={(e) => setPlanoLogistica(e.target.value)}>
              <option value="A">Plano A (Taxa R$ 2,00/km)</option>
              <option value="B">Plano B (Taxa R$ 6,00/km)</option>
              <option value="C">Plano C (Taxa R$ 8,00/km)</option>
            </select>
            <button onClick={calcularLogistica} className="w-full bg-brand-red py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition">Calcular</button>
            
            {resultadoCalculo && (
              <div className="mt-4 text-left border-t border-white/10 pt-4 space-y-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-2">Resumo Detalhado</p>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Show ({planoLogistica}):</span>
                  <span>{formatarMoeda(resultadoCalculo.valorShow)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Locomoção ({resultadoCalculo.distancia}km):</span>
                  <span>{formatarMoeda(resultadoCalculo.locomocao)}</span>
                </div>
                <div className="flex justify-between text-xs text-yellow-500 font-semibold">
                  <span>Hospedagem (acima de 200km):</span>
                  <span>{resultadoCalculo.hospedagem > 0 ? formatarMoeda(resultadoCalculo.hospedagem) : 'Não necessária'}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-2">
                  <span className="text-sm font-bold uppercase text-white">INVESTIMENTO TOTAL:</span>
                  <span className="text-xl font-bold text-brand-red">{formatarMoeda(resultadoCalculo.totalGeral)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}