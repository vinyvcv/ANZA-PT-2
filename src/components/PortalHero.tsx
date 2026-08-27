import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, ArrowUpRight, TrendingUp, 
  BarChart3, Globe, ShieldCheck, Radio, Clock, Activity 
} from 'lucide-react';
import { newsArticles, Article } from '../data/newsData';

interface PortalHeroProps {
  onExplore: () => void;
  onOpenQuote: () => void;
  onSelectArticle: (article: Article) => void;
}

export const PortalHero: React.FC<PortalHeroProps> = ({
  onExplore,
  onOpenQuote,
  onSelectArticle,
}) => {
  const [activeFeatured, setActiveFeatured] = useState(0);
  const [sideIndex, setSideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto rotate side news ticker
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setSideIndex((prev) => (prev + 1) % (newsArticles.length - 2));
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const featuredItems = [
    {
      title: 'PESQUISA EXCLUSIVA CEARÁ 2026: GOVERNADOR, SENADOR E AVALIAÇÕES',
      subtitle: 'Levantamento quantitativo com 1.225 entrevistas em 34 municípios detalha cenários espontâneos, estimulados e segundo turno.',
      img: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1400&q=80',
      badge: 'RELATÓRIO OFICIAL TSE',
      reg: 'REG. TSE CE-07550/2026',
      highlights: ['Ciro Gomes lidera estimulada com 44.0%', 'Elmano de Freitas com 35.9%', 'Aprovação do Gov. Elmano em 56.4%'],
      action: onExplore,
    },
    {
      title: 'O FUTURO DO CONSUMO: COMO A IA E A INFLAÇÃO REMOLDAM O MERCADO BRASILEIRO',
      subtitle: 'Monitoramento de comportamento de compra de 1.500 domicílios revela novas prioridades nas classes C e D.',
      img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80',
      badge: 'INTELIGÊNCIA DE MERCADO',
      reg: 'ESTUDO ANZA CONSUMER 2026',
      highlights: ['Cesta básica recua 1.2% no 1º tri', 'Avanço do comércio eletrônico regional', 'Marcas com propósito ético ganham preferência'],
      action: () => onSelectArticle(newsArticles[1]),
    },
    {
      title: 'DISPUTA AO SENADO NO CEARÁ: 4 CENÁRIOS ESTIMULADOS EM TESTE',
      subtitle: 'Simulações exclusivas colocam Capitão Wagner, Roberto Cláudio, Eunício Oliveira e Guimarães frente a frente.',
      img: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=80',
      badge: 'SENADO 2026 · 2 VAGAS',
      reg: 'MARGEM DE ERRO ±2,8%',
      highlights: ['Capitão Wagner pontua 33.9% no Cenário 1', 'Eunício pontua 15.9% a 21.1%', 'Eleitor ainda mantém alta taxa de indecisos na espontânea (74.1%)'],
      action: onExplore,
    },
  ];

  const currentHero = featuredItems[activeFeatured];

  return (
    <section id="inicio" className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 overflow-hidden bg-[#120726]">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-violet-600/15 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Hero Grid */}

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Hero Card (8 cols) */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeatured}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative min-h-[520px] md:min-h-[580px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-end p-6 md:p-12 group cursor-pointer"
                onClick={currentHero.action}
              >
                {/* Background Image */}
                <img
                  src={currentHero.img}
                  alt={currentHero.title}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Layered Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d051c] via-[#0d051c]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d051c]/90 via-transparent to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider font-mono shadow-md">
                      {currentHero.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold font-mono">
                      {currentHero.reg}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-outfit leading-[1.08] drop-shadow-md group-hover:text-amber-200 transition-colors">
                    {currentHero.title}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
                    {currentHero.subtitle}
                  </p>

                  {/* Highlight Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {currentHero.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs text-slate-300 font-medium flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>

                  {/* Buttons Row */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        currentHero.action();
                      }}
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-amber-500/25 active:scale-95 flex items-center gap-2 font-outfit"
                    >
                      <BarChart3 size={16} />
                      <span>Ver Resultados Interativos</span>
                      <ChevronRight size={16} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuote();
                      }}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Solicitar Pesquisa em Campo
                    </button>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
                  {featuredItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveFeatured(idx);
                      }}
                      className={`h-2.5 rounded-full transition-all ${
                        activeFeatured === idx ? 'w-8 bg-amber-500' : 'w-2.5 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFeatured((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
                    }}
                    className="p-2 rounded-full bg-black/50 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/10 transition-colors ml-2"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFeatured((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
                    }}
                    className="p-2 rounded-full bg-black/50 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/10 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Live Feed (4 cols) */}
          <div
            className="lg:col-span-4 flex flex-col min-h-[580px] p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Top ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/10 blur-[90px] rounded-full pointer-events-none" />

            {/* Feed Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                </span>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white font-mono flex items-center gap-2">
                  <Activity size={15} className="text-amber-400" />
                  <span>Radar de Inteligência</span>
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                <span className="text-amber-400 font-bold">{sideIndex + 1}-{Math.min(sideIndex + 3, newsArticles.length)}</span>
                <span className="text-slate-600">/</span>
                <span>{newsArticles.length}</span>
              </div>
            </div>

            {/* Live Feed List */}
            <div className="space-y-3.5 flex-1 flex flex-col justify-between relative z-10">
              <AnimatePresence mode="popLayout">
                {newsArticles.slice(sideIndex, sideIndex + 3).map((article) => (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => onSelectArticle(article)}
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-500/40 transition-all duration-300 cursor-pointer group relative overflow-hidden shadow-lg"
                  >
                    <div className="flex gap-3.5">
                      <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-white/10 relative">
                        <img
                          src={article.img}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute bottom-1 right-1 text-[8px] font-mono bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-amber-300 border border-white/10">
                          {article.readTime}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              {article.state && (
                                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[8px] font-black uppercase tracking-wider font-mono">
                                  {article.state}
                                </span>
                              )}
                              <span className="text-[9px] font-bold uppercase tracking-wider text-violet-300 font-mono">
                                {article.category}
                              </span>
                            </div>
                            <span className="text-[8px] text-slate-400 font-mono">{article.date.split(' ')[0]} {article.date.split(' ')[1]}</span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between gap-2 text-[9px] font-mono mt-2 pt-1 border-t border-white/5">
                          {article.sourceName ? (
                            <span className="text-amber-400/90 font-semibold truncate max-w-[120px]">
                              {article.sourceName}
                            </span>
                          ) : (
                            <span className="text-slate-400">ANZA Data</span>
                          )}
                          <span className="flex items-center gap-1 text-slate-300 group-hover:text-amber-400 transition-colors shrink-0">
                            <span>Ler análise</span>
                            <ArrowUpRight size={11} className="text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Quick Feed Navigator */}
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between relative z-10">
              <button
                onClick={() => setSideIndex((prev) => (prev === 0 ? newsArticles.length - 3 : prev - 1))}
                className="h-8 px-4 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[10px] font-mono font-bold flex items-center gap-1.5 border border-white/10 hover:border-amber-400 transition-all active:scale-95 shadow-sm"
              >
                <ChevronLeft size={13} /> <span>Anterior</span>
              </button>
              <button
                onClick={() => setSideIndex((prev) => (prev >= newsArticles.length - 3 ? 0 : prev + 1))}
                className="h-8 px-4 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[10px] font-mono font-bold flex items-center gap-1.5 border border-white/10 hover:border-amber-400 transition-all active:scale-95 shadow-sm"
              >
                <span>Próximas</span> <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Entrevistas Válidas', value: '1.225', sub: 'Amostra Probabilística' },
            { label: 'Municípios Cobertos', value: '34', sub: 'Todas as mesorregiões do CE' },
            { label: 'Margem de Erro', value: '±2,8%', sub: 'Confiança de 95%' },
            { label: 'Auditoria de Gravação', value: '100%', sub: 'Conformidade TSE e LGPD' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm text-center hover:border-violet-500/30 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-black text-white font-outfit mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] font-black text-amber-400 uppercase tracking-wider font-mono">
                {stat.label}
              </div>
              <div className="text-[9px] text-slate-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PortalHero;
