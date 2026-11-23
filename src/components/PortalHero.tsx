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
      title: 'BALANÇO ELEIÇÕES 2026: CEARÁ, NORDESTE E RESULTADOS OFICIAIS DO TSE',
      subtitle: 'Confira os números consolidados de 1º e 2º turnos para Presidente, Governador, Senado e bancadas Federal e Estadual (Alece).',
      img: '/urna_eletronica_brasil.jpg',
      badge: 'CENÁRIOS REAIS 2026',
      reg: 'TSE · ALGORITMA DADOS',
      highlights: ['Lula 68,93% no CE (2º turno)', 'Elmano reeleito no 1º turno (53,19%)', 'Bancadas de 22 Federais e 46 Estaduais'],
      action: onExplore,
    },
    {
      title: 'TSE ENCERRA PRESTAÇÃO DE CONTAS E INICIA CONTAGEM PARA DIPLOMAÇÃO',
      subtitle: 'Envio do 2º turno via CONTA+JE encerrou em 16 de novembro; cerimônias de diplomação ocorrem até 18 de dezembro de 2026.',
      img: '/congresso_brasilia.jpg',
      badge: 'JUSTIÇA ELEITORAL · NOV 2026',
      reg: 'FONTE OFICIAL · TSE',
      highlights: ['Contas 2º turno até 16/11/2026', 'Diplomação limite em 18/12/2026', 'Posse Presidencial em 05/01/2027'],
      action: () => onSelectArticle(newsArticles[0]),
    },
    {
      title: 'TRE-CE HOMOLOGA POR UNANIMIDADE TOTALIZAÇÃO DO 2º TURNO NO CEARÁ',
      subtitle: 'Sessão plenária de 5 de novembro concluiu o exame sem pendências e liberou os trâmites oficiais para a diplomação dos eleitos.',
      img: '/plenario_camara_brasil.jpg',
      badge: 'CEARÁ · TRE-CE',
      reg: 'ATUALIZADO · NOV 2026',
      highlights: ['Aprovação unânime em 05/11/2026', 'Sem reclamações partidárias pendentes', 'Encaminhamento oficial ao TSE'],
      action: () => onSelectArticle(newsArticles[1]),
    },
  ];

  const currentHero = featuredItems[activeFeatured];

  return (
    <section id="inicio" className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 overflow-hidden bg-[#050b14]">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-sky-500/15 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/10 blur-[150px] rounded-full" />
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/75 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050b14]/90 via-transparent to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 text-[10px] font-black uppercase tracking-wider font-mono shadow-md">
                      {currentHero.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold font-mono">
                      {currentHero.reg}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-outfit leading-[1.08] drop-shadow-md group-hover:text-cyan-200 transition-colors">
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
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
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
                      className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-cyan-500/25 active:scale-95 flex items-center gap-2 font-outfit"
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
                        activeFeatured === idx ? 'w-8 bg-cyan-400' : 'w-2.5 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFeatured((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
                    }}
                    className="p-2 rounded-full bg-black/50 hover:bg-cyan-500 hover:text-slate-950 text-white border border-white/10 transition-colors ml-2"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFeatured((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
                    }}
                    className="p-2 rounded-full bg-black/50 hover:bg-cyan-500 hover:text-slate-950 text-white border border-white/10 transition-colors"
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
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/10 blur-[90px] rounded-full pointer-events-none" />

            {/* Feed Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white font-mono flex items-center gap-2">
                  <Activity size={15} className="text-cyan-400" />
                  <span>Radar de Inteligência</span>
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                <span className="text-cyan-400 font-bold">{sideIndex + 1}-{Math.min(sideIndex + 3, newsArticles.length)}</span>
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
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group relative overflow-hidden shadow-lg"
                  >
                    <div className="flex gap-3.5">
                      <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-white/10 relative">
                        <img
                          src={article.img}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute bottom-1 right-1 text-[8px] font-mono bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-cyan-300 border border-white/10">
                          {article.readTime}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              {article.state && (
                                <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 text-[8px] font-black uppercase tracking-wider font-mono">
                                  {article.state}
                                </span>
                              )}
                              <span className="text-[9px] font-bold uppercase tracking-wider text-sky-300 font-mono">
                                {article.category}
                              </span>
                            </div>
                            <span className="text-[8px] text-slate-400 font-mono">{article.date.split(' ')[0]} {article.date.split(' ')[1]}</span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between gap-2 text-[9px] font-mono mt-2 pt-1 border-t border-white/5">
                          {article.sourceName ? (
                            <span className="text-cyan-400/90 font-semibold truncate max-w-[120px]">
                              {article.sourceName}
                            </span>
                          ) : (
                            <span className="text-slate-400">Algoritma Dados</span>
                          )}
                          <span className="flex items-center gap-1 text-slate-300 group-hover:text-cyan-400 transition-colors shrink-0">
                            <span>Ler análise</span>
                            <ArrowUpRight size={11} className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
                className="h-8 px-4 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-[10px] font-mono font-bold flex items-center gap-1.5 border border-white/10 hover:border-cyan-400 transition-all active:scale-95 shadow-sm"
              >
                <ChevronLeft size={13} /> <span>Anterior</span>
              </button>
              <button
                onClick={() => setSideIndex((prev) => (prev >= newsArticles.length - 3 ? 0 : prev + 1))}
                className="h-8 px-4 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-[10px] font-mono font-bold flex items-center gap-1.5 border border-white/10 hover:border-cyan-400 transition-all active:scale-95 shadow-sm"
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
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm text-center hover:border-cyan-500/30 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-black text-white font-outfit mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] font-black text-cyan-400 uppercase tracking-wider font-mono">
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
