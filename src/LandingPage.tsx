import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PortalHero } from './components/PortalHero';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { MethodologyShowcase } from './components/MethodologyShowcase';
import { NewsGrid } from './components/NewsGrid';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ArticleModal } from './components/ArticleModal';
import { Article } from './data/newsData';
import { ShieldCheck, Award, Users, CheckCircle2, ChevronRight, BarChart3, Calculator } from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-[#120726] text-white selection:bg-amber-500/30 selection:text-amber-200 font-sans overflow-x-hidden">
      
      {/* Top Fixed Navigation */}
      <Navbar 
        onExplore={onExplore} 
        onOpenQuote={() => setIsQuoteModalOpen(true)} 
      />

      <main>
        {/* Hero Section & Live Intelligence Feed */}
        <PortalHero 
          onExplore={onExplore}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* Ticker de Autoridade */}
        <div className="py-6 bg-white/[0.02] border-y border-white/5 font-mono overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 overflow-x-auto scrollbar-none opacity-70">
            {[
              'REFERÊNCIA EM CAMPO NACIONAL',
              'AUDITORIA 100% DE GRAVAÇÃO',
              'TECNOLOGIA CATI & CAPI',
              'RIGOR METODOLÓGICO TSE',
              'AMOSTRAGEM PROBABILÍSTICA',
              'ENTREGAS EM ATÉ 48 HORAS'
            ].map((item, idx) => (
              <span 
                key={idx} 
                className="font-bold text-[10px] tracking-[0.3em] uppercase whitespace-nowrap flex items-center gap-4 text-violet-300"
              >
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              </span>
            ))}
          </div>
        </div>

        {/* Callout Strip for Official 2026 Survey */}
        <section id="eleitoral" className="py-12 bg-gradient-to-r from-violet-950/40 via-violet-900/20 to-amber-950/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <BarChart3 size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest font-mono">
                  PESQUISA ELEITORAL OFICIAL
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit">
                  Eleições Ceará 2026: Governador, Senador & Avaliações
                </h3>
                <p className="text-xs text-slate-300">
                  1.225 entrevistas em 34 municípios · Margem ±2,8% · Confiança 95% · Reg. TSE CE-07550/2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={onExplore}
                className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2 font-outfit"
              >
                <span>Acessar Relatório Completo</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Simulation & Scenario Lab */}
        <InteractiveSimulator onExploreReport={onExplore} />

        {/* Methodology & Quality Assurance Protocol */}
        <MethodologyShowcase />

        {/* News & Intelligence Archive */}
        <NewsGrid onSelectArticle={(article) => setSelectedArticle(article)} />

        {/* Field Research Briefing & Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onExploreReport={onExplore} 
        onOpenQuote={() => setIsQuoteModalOpen(true)} 
      />

      {/* Interactive Modal: Quote Builder */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />

      {/* Interactive Modal: Article Reader */}
      <ArticleModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)}
        onExploreReport={onExplore}
      />

    </div>
  );
};

export default LandingPage;
