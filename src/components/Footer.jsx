export default function Footer() {
  return (
    <footer className="pt-16 pb-8 border-t border-white/5 flex flex-col items-center gap-8">
      <h3 className="text-2xl font-bold text-brand-red glow-text uppercase tracking-widest">REDES SOCIAIS</h3>
      
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {/* Instagram */}
        <a 
          href="https://www.instagram.com/brunnoerodrigues" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-14 h-14 rounded-full border border-brand-red text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition">Instagram</span>
        </a>

        {/* TikTok */}
        <a 
          href="https://www.tiktok.com/@brunnoerodrigues" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-14 h-14 rounded-full border border-brand-red text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition">TikTok</span>
        </a>

        {/* YouTube */}
        <a 
          href="https://www.youtube.com/@brunnoerodrigues" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-14 h-14 rounded-full border border-brand-red text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
              <path d="m10 15 5-3-5-3z"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition">YouTube</span>
        </a>

        {/* Facebook */}
        <a 
          href="https://www.facebook.com/brunnoerodrigues" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-14 h-14 rounded-full border border-brand-red text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition">Facebook</span>
        </a>

        {/* Spotify - LOGO OFICIAL */}
        <a 
          href="https://open.spotify.com/search/brunnoerodrigues" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-14 h-14 rounded-full border border-brand-red text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.496 17.302c-.216.354-.672.464-1.026.248-2.85-1.742-6.438-2.136-10.665-1.17a.75.75 0 1 1-.334-1.462c4.63-1.058 8.6-.6 11.777 1.35.354.216.464.672.248 1.034zm1.468-3.258c-.272.443-.847.585-1.29.313-3.262-2.004-8.235-2.586-12.092-1.415a.938.938 0 1 1-.546-1.794c4.41-1.338 9.904-.683 13.615 1.602.443.272.585.847.313 1.294zm.126-3.414C15.228 8.243 8.784 8.03 5.034 9.167a1.125 1.125 0 0 1-.652-2.155c4.298-1.303 11.413-1.055 16.035 1.688a1.125 1.125 0 1 1-1.127 1.964z"/>
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