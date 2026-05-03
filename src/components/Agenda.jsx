import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function Agenda() {
  const numeroWhatsApp = "5519994335140";

  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Fala, tudo certo? Aqui é da produção da dupla Brunno & Rodrigues. 🎤' },
    { id: 2, sender: 'bot', text: 'Você já está organizando um evento para contratar a dupla ou ainda está avaliando ideias?' }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const [step, setStep] = useState(0); 
  const [dadosEvento, setDadosEvento] = useState({
    cidade: '',
    data: '',
    horario: '',
    plano: ''
  });

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const botReply = (text, nextStep = null, isFinal = false) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text }]);
      
      if (nextStep !== null) setStep(nextStep);

      if (isFinal) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { id: Date.now() + 1, sender: 'bot', isLink: true, text: '📲 ENVIAR DADOS VIA WHATSAPP' }
          ]);
        }, 800);
      }
    }, 1200);
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
    setInputValue('');
    setShowOptions(false);

    // Lógica para "Só Pesquisando"
    if (text === "Estou só pesquisando valores por enquanto.") {
      botReply("Ok, fique à vontade! Abaixo está nosso número caso mude de ideia ou precise de algo específico.");
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, sender: 'bot', isLink: true, text: '📲 CHAMAR NO WHATSAPP' }
        ]);
      }, 1500);
      setStep(5); // Finaliza o fluxo
      return;
    }

    // Fluxo do Chatbot para Contratação
    if (step === 0) {
      botReply("Show! Para eu verificar a agenda, em qual cidade será o evento?", 1);
    } 
    else if (step === 1) {
      setDadosEvento(prev => ({ ...prev, cidade: text }));
      botReply("Entendido. E que dia será o evento? (Ex: 15/12/2026)", 2);
    } 
    else if (step === 2) {
      setDadosEvento(prev => ({ ...prev, data: text }));
      botReply("Beleza! Que horas o evento está previsto para começar?", 3);
    } 
    else if (step === 3) {
      setDadosEvento(prev => ({ ...prev, horario: text }));
      botReply("Para finalizar: Em qual plano você se interessou? (A, B ou C)", 4);
    } 
    else if (step === 4) {
      setDadosEvento(prev => ({ ...prev, plano: text.toUpperCase() }));
      botReply("Perfeito! Já organizei os detalhes aqui. Clique no botão abaixo para me enviar tudo no WhatsApp e fecharmos os detalhes!", 5, true);
    }
  };

  const openWhatsApp = () => {
    // Mensagem formatada com tópicos (-) em vez de emojis
    let msg = "";
    
    if (step === 5 && dadosEvento.cidade) {
      msg = `Olá! Gostaria de falar sobre a contratação de um show. Seguem os detalhes:
- Cidade: ${dadosEvento.cidade}
- Data: ${dadosEvento.data}
- Horário: ${dadosEvento.horario}
- Plano: ${dadosEvento.plano}`;
    } else {
      msg = "Olá, gostaria de tirar algumas dúvidas sobre os shows da dupla!";
    }

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contato" className="py-20 px-4 max-w-3xl mx-auto w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-red mb-12 glow-text">AGENDA DE SHOWS</h2>
      
      <div className="bg-brand-gray border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-black/80">
          <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center font-bold text-lg text-white">B&R</div>
          <div>
            <h4 className="font-bold flex items-center gap-2">
              Produção Brunno & Rodrigues
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
            </h4>
            <p className="text-xs text-gray-400">Online agora</p>
          </div>
        </div>
        
        <div 
          ref={chatContainerRef}
          className="p-6 flex flex-col gap-4 bg-[#0a0a0a] h-[450px] overflow-y-auto scroll-smooth"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && !msg.isLink && (
                <div className="bg-brand-gray border border-white/5 rounded-2xl rounded-tl-none p-4 max-w-[85%] text-gray-200">
                  {msg.text}
                </div>
              )}

              {msg.sender === 'bot' && msg.isLink && (
                <button 
                  onClick={openWhatsApp}
                  className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl p-4 w-full transition transform hover:scale-[1.02] shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
                >
                  {msg.text}
                </button>
              )}

              {msg.sender === 'user' && (
                <div className="bg-brand-red text-white rounded-2xl rounded-tr-none p-4 max-w-[85%]">
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="bg-brand-gray border border-white/5 rounded-2xl rounded-tl-none p-4 w-16 self-start text-gray-400 flex gap-1">
              <span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span>
            </div>
          )}
          
          {showOptions && (
            <div className="flex gap-3 mt-2 flex-wrap">
              <button 
                onClick={() => handleSend("Quero contratar para o meu evento!")}
                className="px-6 py-2 rounded-full border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition text-sm font-bold"
              >
                QUERO CONTRATAR
              </button>
              <button 
                onClick={() => handleSend("Estou só pesquisando valores por enquanto.")}
                className="px-6 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 transition text-sm font-bold"
              >
                SÓ PESQUISANDO
              </button>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-black/80 border-t border-white/10 flex gap-3">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder={step === 5 ? "Tudo pronto!" : "Digite sua resposta..."}
            className="flex-1 bg-brand-gray border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-brand-red transition disabled:opacity-50"
            disabled={step === 5}
          />
          <button 
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim() || step === 5}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${inputValue.trim() && step !== 5 ? 'bg-brand-red hover:bg-red-700 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
          >
            <Send size={20} className="ml-[-2px] mt-[2px]" />
          </button>
        </div>
      </div>
    </section>
  );
}