import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PortalHero } from './components/PortalHero';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { CallCenterOperations } from './components/CallCenterOperations';
import { MethodologyShowcase } from './components/MethodologyShowcase';
import { GovernanceSection } from './components/GovernanceSection';
import { NewsGrid } from './components/NewsGrid';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal, QuoteMethod } from './components/QuoteModal';
import { ArticleModal } from './components/ArticleModal';
import { Article } from './data/newsData';
import { ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInitialMethod, setQuoteInitialMethod] = useState<QuoteMethod>('cati');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const openQuoteWithMethod = (method: QuoteMethod = 'cati') => {
    setQuoteInitialMethod(method);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans overflow-x-hidden">
      {/* Top Institutional Navigation */}
      <Navbar
        onExplore={onExplore}
        onOpenQuote={() => openQuoteWithMethod('cati')}
      />

      <main>
        {/* Front-Page Editorial Hero & Bulletins Rail */}
        <PortalHero
          onExplore={onExplore}
          onOpenQuote={() => openQuoteWithMethod('cati')}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* Official 2026 Survey Publication Banner */}
        <section id="eleitoral" className="py-10 bg-[#08101e] border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <p className="text-xs font-mono text-cyan-400">
                Publicação oficial · Reg. TSE CE-07550/2026
              </p>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Pesquisa Eleitoral Ceará 2026: Governador, Senado e avaliações de gestão
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono tabular-nums">
                1.225 entrevistas válidas em 34 municípios · Margem ±2,8 p.p. · Confiança 95%
              </p>
            </div>

            <button
              type="button"
              onClick={onExplore}
              className="self-start md:self-auto px-5 py-2.5 min-h-[42px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Acessar relatório completo</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Interactive Electoral 2026 Scenario Lab */}
        <InteractiveSimulator onExploreReport={onExplore} />

        {/* Dedicated Call Center & Multi-Channel Research Operations */}
        <CallCenterOperations onOpenQuote={openQuoteWithMethod} />

        {/* Methodology & Technical Specification Sheet */}
        <MethodologyShowcase />

        {/* Institutional Governance: Ethics, LGPD & Statistical Rigor */}
        <GovernanceSection />

        {/* Publications & Electoral Justice Archive */}
        <NewsGrid onSelectArticle={(article) => setSelectedArticle(article)} />

        {/* Institutional Briefing & Contact */}
        <ContactSection />
      </main>

      {/* Institutional Footer */}
      <Footer
        onExploreReport={onExplore}
        onOpenQuote={() => openQuoteWithMethod('cati')}
      />

      {/* Interactive Modal: Scope & Quote Builder */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialMethod={quoteInitialMethod}
      />

      {/* Interactive Modal: Editorial Article Reader */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onExploreReport={onExplore}
      />
    </div>
  );
};

export default LandingPage;
