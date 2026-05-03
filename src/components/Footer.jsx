export default function Footer() {
  return (
    <footer className="pt-16 pb-8 border-t border-white/5 flex flex-col items-center gap-8">
      <h3 className="text-2xl font-bold text-brand-red glow-text">REDES SOCIAIS</h3>
      
      <div className="flex gap-8">
        {/* Instagram */}
        <a href="#" className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-full border border-brand-red text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition">Instagram</span>
        </a>

        {/* YouTube */}
        <a href="#" className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-full border border-brand-red text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
              <path d="m10 15 5-3-5-3z"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition">YouTube</span>
        </a>

        {/* Spotify / Música */}
        <a href="#" className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-full border border-brand-red text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition">Spotify</span>
        </a>
      </div>
      
      <div className="w-full max-w-4xl h-px bg-white/5 my-4" />
      
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Brunno & Rodrigues — Todos os direitos reservados.
      </p>
    </footer>
  );
}