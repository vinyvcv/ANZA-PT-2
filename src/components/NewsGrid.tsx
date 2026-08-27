import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ArrowUpRight, ChevronRight, Filter, BookOpen, 
  Calendar, Clock, Sparkles, Tag 
} from 'lucide-react';
import { newsArticles, Article } from '../data/newsData';

interface NewsGridProps {
  onSelectArticle: (article: Article) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({ onSelectArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Todos', 'Eleitoral', 'Mercado', 'Opinião', 'Tecnologia', 'Agro', 'Finanças', 'Cidades'];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="noticias" className="py-24 bg-[#120726] relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[170px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <BookOpen size={18} />
              <span className="text-xs font-black uppercase tracking-[0.3em] font-mono">
                ARQUIVO DE INTELIGÊNCIA & ESTUDOS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-outfit">
              Pesquisas & Tendências
            </h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mt-2">
              Acesse análises aprofundadas sobre o comportamento do eleitor, consumo, inflação e opinião pública com a assinatura de rigor do Instituto ANZA.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[280px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema, candidato ou cidade..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
            <Filter size={32} className="text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Nenhum resultado encontrado</h3>
            <p className="text-xs text-slate-400">Tente buscar por outro termo ou selecione a categoria "Todos".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer p-5 sm:p-6 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Article Image */}
                  <div className="relative h-52 rounded-2xl overflow-hidden mb-5 border border-white/10">
                    <img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120726] via-transparent to-transparent opacity-80" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 max-w-[85%]">
                      {article.state && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider font-mono shadow-sm">
                          {article.state}
                        </span>
                      )}
                      {article.officeTag && (
                        <span className="px-2.5 py-0.5 rounded-full bg-violet-600/90 text-white text-[9px] font-black uppercase tracking-wider font-mono border border-violet-400/30">
                          {article.officeTag}
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-slate-300 text-[9px] font-bold uppercase tracking-wider font-mono">
                        {article.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {article.readTime}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-amber-500" />
                      <span>{article.date}</span>
                    </div>
                    {article.sourceName && (
                      <span className="text-amber-400/90 font-bold">
                        Fonte: {article.sourceName}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-tight font-outfit leading-snug mb-3">
                    {article.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {article.subtitle}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                    Ler Análise Completa
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition-all">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default NewsGrid;
