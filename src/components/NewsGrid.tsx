import React, { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { newsArticles, Article } from '../data/newsData';

interface NewsGridProps {
  onSelectArticle: (article: Article) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({ onSelectArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Todos', 'Eleitoral', 'Institucional', 'Serviços'];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      article.title.toLowerCase().includes(query) ||
      article.subtitle.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      (article.sourceName && article.sourceName.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const showLeadSplit = selectedCategory === 'Todos' && searchQuery.trim() === '' && filteredArticles.length > 1;
  const leadArticle = showLeadSplit ? filteredArticles[0] : null;
  const remainingArticles = showLeadSplit ? filteredArticles.slice(1) : filteredArticles;

  return (
    <section id="noticias" className="py-16 sm:py-24 bg-[#050b14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-cyan-400 mb-2">
              Arquivo de publicações · Outubro e novembro de 2026
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
              Estudos Algoritma Dados e notas da Justiça Eleitoral
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2.5 leading-relaxed">
              Análises eleitorais próprias da Algoritma Dados e atualizações oficiais do TSE e do TRE-CE sobre totalização, prestação de contas e diplomação.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tema, órgão ou estado..."
              aria-label="Buscar publicações"
              className="w-full pl-10 pr-4 py-2.5 min-h-[42px] rounded-md bg-[#08101e] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 py-5 border-b border-slate-800/80 mb-8">
          <div className="inline-flex items-center p-1 bg-[#08101e] border border-slate-800 rounded-md gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-slate-400 tabular-nums">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'publicação' : 'publicações'}
          </span>
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 ? (
          <div className="py-16 px-6 text-center border border-slate-800/80 rounded-lg bg-[#08101e]">
            <h3 className="text-base font-semibold text-white">Nenhuma publicação encontrada</h3>
            <p className="text-sm text-slate-400 mt-1">
              Ajuste o termo pesquisado ou retorne para a categoria &ldquo;Todos&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-md border border-slate-700 hover:border-cyan-400 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Editorial Lead Feature (breaks repetitive grid monotony) */}
            {leadArticle && (
              <article
                onClick={() => onSelectArticle(leadArticle)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-[#08101e] border border-slate-800/90 hover:border-slate-700 rounded-lg overflow-hidden cursor-pointer group transition-colors"
              >
                <div className="lg:col-span-6 aspect-[16/10] lg:aspect-auto min-h-[240px] overflow-hidden bg-slate-900">
                  <img
                    src={leadArticle.img}
                    alt={leadArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-400 mb-3">
                      {leadArticle.state && (
                        <>
                          <span className="text-cyan-400 font-medium">{leadArticle.state}</span>
                          <span aria-hidden="true">·</span>
                        </>
                      )}
                      <span>{leadArticle.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{leadArticle.date.toLowerCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span>{leadArticle.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {leadArticle.title}
                    </h3>

                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                      {leadArticle.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">
                      Fonte: {leadArticle.sourceName || 'Algoritma Dados'}
                    </span>
                    <span className="text-cyan-400 font-medium inline-flex items-center gap-1 group-hover:text-cyan-300">
                      <span>Ler nota completa</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            )}

            {/* Secondary Editorial Archive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="bg-[#08101e] border border-slate-800/90 hover:border-slate-700 rounded-lg overflow-hidden flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={article.img}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] font-mono text-slate-400 mb-2.5">
                        {article.state && (
                          <>
                            <span className="text-cyan-400 font-medium">{article.state}</span>
                            <span aria-hidden="true">·</span>
                          </>
                        )}
                        <span>{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{article.date.toLowerCase()}</span>
                      </div>

                      <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">
                      {article.sourceName || 'Algoritma Dados'} · {article.readTime}
                    </span>
                    <span className="text-cyan-400 font-medium inline-flex items-center gap-1">
                      <span>Ler</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsGrid;
