import React, { useState, useEffect } from 'react';
import { AlgoritmaLogo } from './AlgoritmaLogo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onExplore: () => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onExplore, onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portal', href: '#inicio' },
    { label: 'Cenários 2026', href: '#simulador' },
    { label: 'Call Center', href: '#call-center' },
    { label: 'Metodologia', href: '#metodologia' },
    { label: 'Publicações', href: '#noticias' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#050b14]/96 backdrop-blur-md border-b border-slate-800/90'
          : 'bg-[#050b14]/90 backdrop-blur-sm border-b border-slate-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm py-1 shrink-0"
          aria-label="Algoritma Dados — Voltar ao topo"
        >
          <AlgoritmaLogo size="sm" withTagline={false} />
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-cyan-400 focus-visible:outline-none focus-visible:text-cyan-300 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="hidden lg:flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenQuote}
            className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b14]"
          >
            Solicitar orçamento
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenQuote}
            className="px-3.5 py-2 min-h-[40px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            Orçamento
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md border border-slate-800 text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#08101e] border-b border-slate-800 px-4 sm:px-6 py-4 space-y-2">
          <nav className="flex flex-col divide-y divide-slate-800/70" aria-label="Menu móvel">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="text-left text-sm font-medium text-slate-200 hover:text-cyan-300 py-3.5 min-h-[44px] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onExplore();
              }}
              className="w-full py-3 min-h-[44px] rounded-md border border-slate-700 text-slate-100 hover:border-cyan-400 text-sm font-medium transition-colors cursor-pointer"
            >
              Abrir relatório Ceará 2026
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 min-h-[44px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold transition-colors cursor-pointer"
            >
              Solicitar orçamento
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
