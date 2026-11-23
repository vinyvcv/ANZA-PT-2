import React, { useState, useEffect } from 'react';
import { AlgoritmaLogo } from './AlgoritmaLogo';
import { BarChart3, Calculator, Menu, X, ShieldCheck, Search, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onExplore: () => void;
  onOpenQuote: () => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onExplore, onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Eleitoral', href: '#eleitoral' },
    { label: 'Mercado', href: '#noticias' },
    { label: 'Simulador', href: '#simulador' },
    { label: 'Metodologia', href: '#metodologia' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050b14]/95 backdrop-blur-xl border-b border-cyan-500/25 shadow-2xl shadow-slate-950/80 py-3'
          : 'bg-[#050b14]/85 backdrop-blur-lg border-b border-white/10 py-4'
      }`}
    >
      {/* Top subtle accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-4 cursor-pointer shrink-0 py-1 transition-opacity hover:opacity-90" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <AlgoritmaLogo size="md" withTagline={true} />
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-xs font-semibold text-slate-300 hover:text-cyan-400 uppercase tracking-widest transition-colors relative py-1.5 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300 rounded-full" />
            </button>
          ))}
        </div>

        {/* Right Action CTAs */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0 ml-4">
          <button
            onClick={onExplore}
            className="h-8 px-3 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-200 border border-sky-500/35 text-[10px] font-extrabold uppercase tracking-wide transition-all flex items-center gap-1.5 hover:border-sky-400 active:scale-95 shrink-0"
          >
            <BarChart3 size={13} className="text-sky-400" />
            <span>Relatório Ceará</span>
          </button>

          <button
            onClick={onOpenQuote}
            className="h-8 px-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-[10px] uppercase tracking-wide transition-all shadow-sm shadow-cyan-500/20 active:scale-95 font-outfit flex items-center gap-1.5 shrink-0"
          >
            <Calculator size={13} />
            <span>Orçamento</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenQuote}
            className="h-9 px-3 rounded-lg bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider"
          >
            Orçamento
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050b14]/98 backdrop-blur-2xl border-b border-cyan-500/30 px-6 py-6 space-y-5 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-xs font-bold text-slate-300 hover:text-cyan-400 uppercase tracking-widest py-2.5 border-b border-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExplore();
              }}
              className="w-full h-11 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <BarChart3 size={16} />
              <span>Ver Relatório Ceará 2026</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full h-11 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Calculator size={16} />
              <span>Solicitar Orçamento de Campo</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
