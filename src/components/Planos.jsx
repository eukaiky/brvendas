import { useState } from 'react';
import { Zap, Star, Crown, Check, Ticket, Calculator } from 'lucide-react';

export default function Planos() {
  const [cupom, setCupom] = useState('');
  
  const [precosAtuais, setPrecosAtuais] = useState({
    'A': 800,
    'B': 2500,
    'C': 5000
  });

  const [cidadeDestino, setCidadeDestino] = useState('');
  const [estadoDestino, setEstadoDestino] = useState('SP');
  const [planoLogistica, setPlanoLogistica] = useState('A');
  const [resultadoCalculo, setResultadoCalculo] = useState(null);

  const telefone = "5519994335140";

  const estados = [
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "AC", nome: "Acre" },
    { sigla: "AL", nome: "Alagoas" },
    { sigla: "AP", nome: "Amapá" },
    { sigla: "AM", nome: "Amazonas" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" },
    { sigla: "MT", nome: "Mato Grosso" },
    { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "RN", nome: "Rio Grande do Norte" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" },
    { sigla: "RR", nome: "Roraima" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "TO", nome: "Tocantins" }
  ];

  const aplicarCupom = (valor) => {
    const code = valor.toUpperCase();
    setCupom(code);

    if (code === 'MOCOCA') {
      setPrecosAtuais({ 'A': 500, 'B': 1800, 'C': 4000 });
    } else if (code === '50KM') {
      setPrecosAtuais({ 'A': 550, 'B': 1900, 'C': 4300 });
    } else if (code === '100KM') {
      setPrecosAtuais({ 'A': 650, 'B': 2100, 'C': 4500 });
    } else {
      setPrecosAtuais({ 'A': 800, 'B': 2500, 'C': 5000 });
    }
  };

  const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const calcularLogistica = async () => {
    if (!cidadeDestino) return alert("Digite a cidade de destino!");

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cidadeDestino},${estadoDestino},Brazil`);
      const data = await response.json();
      if (data.length === 0) throw new Error("Cidade não encontrada");

      const lat1 = -21.4667; 
      const lon1 = -47.0000;
      const lat2 = parseFloat(data[0].lat);
      const lon2 = parseFloat(data[0].lon);

      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distanciaKm = Math.round(R * c * 1.2); 

      if (distanciaKm > 600) {
        setResultadoCalculo({ 
          erro: "Limite de km excedido.",
          distancia: distanciaKm,
          cidade: cidadeDestino.toUpperCase()
        });
        return;
      }

      let taxaKm = 2; let integrantes = 2;
      if (planoLogistica === 'B') { taxaKm = 6; integrantes = 6; }
      if (planoLogistica === 'C') { taxaKm = 10; integrantes = 12; }

      const totalLocomocao = distanciaKm * taxaKm;
      const totalHospedagem = distanciaKm > 200 ? integrantes * 200 : 0;
      const valorShowAtual = precosAtuais[planoLogistica];

      setResultadoCalculo({
        distancia: distanciaKm,
        taxaKm: taxaKm,
        locomocao: totalLocomocao,
        hospedagem: totalHospedagem,
        valorShow: valorShowAtual,
        totalGeral: totalLocomocao + totalHospedagem + valorShowAtual,
        cidade: cidadeDestino.toUpperCase(),
        estado: estadoDestino
      });
    } catch (error) {
      alert("Cidade não encontrada. Tente digitar sem acentos.");
    }
  };

  const enviarWhatsAppErro = () => {
    const msg = `Olá! Tentei calcular a logística para ${resultadoCalculo.cidade}, mas excedeu o limite de 600km (Deu ${resultadoCalculo.distancia}km). Gostaria de negociar a contratação diretamente.`;
    window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const enviarWhatsApp = (nomePlano, idPlano) => {
    const precoShow = precosAtuais[idPlano];
    let mensagem = `Olá! Tenho interesse no *${nomePlano}*.`;
    
    if (precoShow > 0) {
      mensagem += `\n- Valor do Show: ${formatarMoeda(precoShow)}`;
      if (precosAtuais[idPlano] < (idPlano === 'A' ? 800 : idPlano === 'B' ? 2500 : 5000)) {
          mensagem += ` (Cupom ${cupom} aplicado)`;
      }

      if (resultadoCalculo && !resultadoCalculo.erro) {
        mensagem += `\n\n*Logística para ${resultadoCalculo.cidade}-${resultadoCalculo.estado}:*`;
        mensagem += `\n- Locomoção + Hospedagem: ${formatarMoeda(resultadoCalculo.locomocao + resultadoCalculo.hospedagem)}`;
        mensagem += `\n\n*VALOR TOTAL ESTIMADO: ${formatarMoeda(resultadoCalculo.totalGeral)}*`;
      }
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
          <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 hover:border-brand-red/30 transition flex flex-col text-center">
            <div className="flex items-center justify-center gap-3 text-brand-red mb-4"><Zap size={28} /><h3 className="text-2xl font-bold text-white uppercase">PLANO A</h3></div>
            <p className="text-brand-red font-semibold mb-2">Acústico</p>
            <p className="text-xs text-gray-400 mb-6">Recomendado para: Bares, Pubs e Restaurantes</p>
            <ul className="space-y-4 mb-8 flex-grow text-gray-300 text-sm text-left">
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Formato: Voz, violão e cajón</li>
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Tempo: 2 a 3h de show</li>
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Som: PA básico incluso</li>
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Backline: Estrutura completa</li>
            </ul>
            <div className="mb-6 flex flex-col items-center">
              {precosAtuais['A'] < 800 && <span className="text-gray-500 line-through text-sm">R$ 800,00</span>}
              <span className="text-4xl font-serif font-bold bg-gradient-to-b from-[#f7e482] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent tracking-tighter">{formatarMoeda(precosAtuais['A'])}</span>
            </div>
            {/* AVISO LOGÍSTICA */}
            <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-wider leading-relaxed">
              Taxas de locomoção e hospedagem (se necessário) não inclusas. Verifique o valor na calculadora de logística abaixo.
            </p>
            <button onClick={() => enviarWhatsApp("PLANO A (Acústico)", 'A')} className="w-full py-3 rounded-lg border border-brand-red text-brand-red font-bold uppercase text-xs tracking-widest hover:bg-brand-red hover:text-white transition">QUERO ESSE PLANO</button>
          </div>

          {/* PLANO B */}
          <div className="bg-brand-gray border-2 border-brand-red rounded-2xl p-8 transform md:-translate-y-4 shadow-xl relative flex flex-col text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-center">MAIS PEDIDO</div>
            <div className="flex items-center justify-center gap-3 text-brand-red mb-4 mt-2"><Star size={28} /><h3 className="text-2xl font-bold text-white uppercase">PLANO B</h3></div>
            <p className="text-brand-red font-semibold mb-2">Banda Reduzida</p>
            <p className="text-xs text-gray-400 mb-6">Recomendado para: Festas e pequenos casamentos</p>
            <ul className="space-y-4 mb-8 flex-grow text-gray-300 text-sm text-left">
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Músicos: Bateria, baixo, violão, sanfona/teclado</li>
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Tempo: 2h a 3h de show</li>
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Backline: Estrutura completa</li>
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Equipe: Técnico de som</li>
            </ul>
            <div className="mb-6 flex flex-col items-center">
              {precosAtuais['B'] < 2500 && <span className="text-gray-500 line-through text-sm">R$ 2.500,00</span>}
              <span className="text-4xl font-serif font-bold bg-gradient-to-b from-[#f7e482] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent tracking-tighter">{formatarMoeda(precosAtuais['B'])}</span>
            </div>
            {/* AVISO LOGÍSTICA */}
            <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-wider leading-relaxed">
              Taxas de locomoção e hospedagem (se necessário) não inclusas. Verifique o valor na calculadora de logística abaixo.
            </p>
            <button onClick={() => enviarWhatsApp("PLANO B (Banda Reduzida)", 'B')} className="w-full py-3 rounded-lg bg-brand-red text-white font-bold uppercase text-xs tracking-widest hover:bg-red-700 transition">QUERO ESSE PLANO</button>
          </div>

          {/* PLANO C */}
          <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 hover:border-brand-red/30 transition flex flex-col text-center">
            <div className="flex items-center justify-center gap-3 text-brand-red mb-4"><Crown size={28} /><h3 className="text-2xl font-bold text-white uppercase">PLANO C</h3></div>
            <p className="text-brand-red font-semibold mb-2">Premium Corporativo</p>
            <p className="text-xs text-gray-400 mb-6">Recomendado para: prefeituras, grandes casamentos e grandes eventos</p>
            <ul className="space-y-4 mb-8 flex-grow text-gray-300 text-sm text-left">
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Músicos: Bateria, baixo, violão base/solo, sanfona, percuteria</li>
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Backline: Estrutura completa</li>
              <li className="flex gap-3"><Check className="text-brand-red flex-shrink-0" size={18} /> Produção: Equipe completa</li>
            </ul>
            <div className="mb-6 flex flex-col items-center">
              {precosAtuais['C'] < 5000 && <span className="text-gray-500 line-through text-sm">R$ 5.000,00</span>}
              <span className="text-4xl font-serif font-bold bg-gradient-to-b from-[#f7e482] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent tracking-tighter">{formatarMoeda(precosAtuais['C'])}</span>
            </div>
            {/* AVISO LOGÍSTICA */}
            <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-wider leading-relaxed">
              Taxas de locomoção e hospedagem (se necessário) não inclusas. Verifique o valor na calculadora de logística abaixo.
            </p>
            <button onClick={() => enviarWhatsApp("PLANO C (Premium)", 'C')} className="w-full py-3 rounded-lg border border-brand-red text-brand-red font-bold uppercase text-xs tracking-widest hover:bg-brand-red hover:text-white transition">QUERO ESSE PLANO</button>
          </div>
        </div>

        {/* CUPOM E CALCULADORA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-gray p-6 rounded-2xl border border-white/10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4 text-yellow-500 justify-center"><Ticket size={20} /><span className="font-bold uppercase text-sm">Cupom?</span></div>
            <input type="text" value={cupom} onChange={(e) => aplicarCupom(e.target.value)} placeholder="Código..." className="w-full bg-black/30 border border-white/20 rounded-lg py-3 text-center text-white uppercase outline-none focus:border-brand-red transition" />
            {(precosAtuais['A'] < 800 || precosAtuais['B'] < 2500 || precosAtuais['C'] < 5000) && <p className="text-green-500 text-center text-xs mt-3 font-bold uppercase tracking-widest animate-pulse">✓ Cupom {cupom} aplicado!</p>}
          </div>

          <div className="bg-brand-gray p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-4 text-brand-red justify-center"><Calculator size={20} /><span className="font-bold uppercase text-sm">Cálculo de Logística</span></div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input type="text" placeholder="Cidade" className="bg-black/30 border border-white/20 rounded-lg p-2 text-sm text-white outline-none focus:border-brand-red" onChange={(e) => setCidadeDestino(e.target.value)} />
              <select 
                className="bg-black/30 border border-white/20 rounded-lg p-2 text-sm text-white outline-none" 
                onChange={(e) => setEstadoDestino(e.target.value)}
                value={estadoDestino}
              >
                <optgroup label="Mais frequentes">
                  <option value="SP">São Paulo (SP)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                </optgroup>
                <optgroup label="Outros Estados">
                  {estados.filter(e => e.sigla !== 'SP' && e.sigla !== 'MG').map(e => (
                    <option key={e.sigla} value={e.sigla}>{e.nome} ({e.sigla})</option>
                  ))}
                </optgroup>
              </select>
            </div>
            <select className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-sm mb-2 text-white outline-none" onChange={(e) => setPlanoLogistica(e.target.value)}>
              <option value="A">Plano A (Taxa R$ 2,00/km)</option>
              <option value="B">Plano B (Taxa R$ 6,00/km)</option>
              <option value="C">Plano C (Taxa R$ 10,00/km)</option>
            </select>
            <button onClick={calcularLogistica} className="w-full bg-brand-red py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition">Calcular</button>
            
            {resultadoCalculo && (
              <div className="mt-4 text-left border-t border-white/10 pt-4 space-y-2">
                {resultadoCalculo.erro ? (
                  <div className="text-center p-2">
                    <p className="text-brand-red font-bold text-xs uppercase mb-2">{resultadoCalculo.erro}</p>
                    <button 
                      onClick={enviarWhatsAppErro}
                      className="text-green-500 font-bold text-xs underline uppercase hover:text-green-400 transition"
                    >
                      CLIQUE AQUI PARA FALAR COM A PRODUÇÃO VIA WHATSAPP
                    </button>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}