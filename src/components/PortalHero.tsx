import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';
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
  const [feedPage, setFeedPage] = useState(0);

  const featuredItems = [
    {
      kicker: 'Eleições 2026 · Totalização TSE e estudo Algoritma Dados',
      title: 'Balanço consolidado de 2026: Ceará, Nordeste e composição das bancadas',
      subtitle:
        'Cruzamento dos boletins oficiais do TSE de 1º e 2º turnos com a série histórica de pesquisas para Presidente, Governador, Senado, Câmara Federal e Alece.',
      img: '/urna_eletronica_brasil.jpg',
      imgCaption: 'Apuração oficial 2026 · Justiça Eleitoral',
      ctaLabel: 'Abrir relatório Ceará 2026',
      highlights: [
        { label: 'Presidencial CE (2º turno)', value: '68,93% Lula' },
        { label: 'Governo CE (1º turno)', value: '53,19% Elmano' },
        { label: 'Renovação Alece', value: '56,5% (46 vagas)' },
      ],
      action: onExplore,
    },
    {
      kicker: 'Justiça Eleitoral · Novembro 2026 · TSE',
      title: 'TSE encerra prestação de contas via CONTA+JE e inicia etapa de diplomação',
      subtitle:
        'Envio digital das contas do 2º turno foi encerrado em 16 de novembro; tribunais regionais realizam a diplomação dos eleitos até 18 de dezembro de 2026.',
      img: '/congresso_brasilia.jpg',
      imgCaption: 'Congresso Nacional, Brasília · Calendário pós-pleito',
      ctaLabel: 'Ler nota completa',
      highlights: [
        { label: 'Encerramento 2º turno', value: '16/11/2026' },
        { label: 'Limite de diplomação', value: '18/12/2026' },
        { label: 'Posse presidencial', value: '05/01/2027' },
      ],
      action: () => onSelectArticle(newsArticles[0]),
    },
    {
      kicker: 'Ceará · Novembro 2026 · TRE-CE',
      title: 'TRE-CE homologa por unanimidade a totalização definitiva do 2º turno',
      subtitle:
        'Sessão plenária de 5 de novembro concluiu o exame sem reclamações pendentes e encaminhou os autos oficiais ao TSE para proclamação e diplomação.',
      img: '/plenario_camara_brasil.jpg',
      imgCaption: 'Sessão plenária · Homologação estadual',
      ctaLabel: 'Ler nota completa',
      highlights: [
        { label: 'Sessão plenária', value: '05/11/2026' },
        { label: 'Decisão do pleno', value: 'Unânime' },
        { label: 'Pendências partidárias', value: 'Nenhuma' },
      ],
      action: () => onSelectArticle(newsArticles[1]),
    },
  ];

  const itemsPerPage = 4;
  const maxPage = Math.ceil(newsArticles.length / itemsPerPage) - 1;
  const visibleFeed = newsArticles.slice(
    feedPage * itemsPerPage,
    feedPage * itemsPerPage + itemsPerPage
  );

  const currentHero = featuredItems[activeFeatured];

  return (
    <section id="inicio" className="pt-20 pb-14 bg-[#050b14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Editorial Masthead Bar */}
        <div className="py-3.5 mb-8 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono tabular-nums">
            <span className="text-slate-200 font-medium">algoritmadados.com.br</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Edição Novembro 2026</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Reg. TSE CE-07550/2026</span>
          </div>
          <button
            type="button"
            onClick={onExplore}
            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition-colors w-fit cursor-pointer"
          >
            <span>Acessar relatório oficial Ceará 2026</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Main Front-Page Split: 8 cols Lead Story + 4 cols Editorial Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Lead Story Column */}
          <article className="lg:col-span-8 flex flex-col justify-between bg-[#08101e] border border-slate-800/90 rounded-lg overflow-hidden">
            {/* Editorial Photograph with Measured Scrim */}
            <div
              onClick={currentHero.action}
              className="relative aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden bg-slate-900 cursor-pointer group"
            >
              <img
                src={currentHero.img}
                alt={currentHero.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08101e] via-[#08101e]/45 to-transparent" />
              <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-[11px] font-mono text-slate-300/90">
                <span>{currentHero.imgCaption}</span>
                <span className="tabular-nums">
                  {String(activeFeatured + 1).padStart(2, '0')} / {String(featuredItems.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Lead Editorial Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-mono text-cyan-400">{currentHero.kicker}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFeatured((prev) =>
                          prev === 0 ? featuredItems.length - 1 : prev - 1
                        )
                      }
                      className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center rounded border border-slate-800 text-slate-300 hover:border-cyan-400 hover:text-white transition-colors cursor-pointer"
                      aria-label="Destaque anterior"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFeatured((prev) =>
                          prev === featuredItems.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center rounded border border-slate-800 text-slate-300 hover:border-cyan-400 hover:text-white transition-colors cursor-pointer"
                      aria-label="Próximo destaque"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>

                <h1
                  onClick={currentHero.action}
                  className="text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold text-white leading-[1.15] tracking-tight cursor-pointer hover:text-cyan-200 transition-colors max-w-3xl"
                >
                  {currentHero.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {currentHero.subtitle}
                </p>
              </div>

              {/* Inline Key Figures Row */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-slate-800/80">
                  {currentHero.highlights.map((item, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-xs text-slate-400">{item.label}</div>
                      <div className="text-sm font-mono font-semibold text-slate-100 tabular-nums">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary + Secondary Action */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={currentHero.action}
                    className="px-5 py-2.5 min-h-[42px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>{currentHero.ctaLabel}</span>
                    <ChevronRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenQuote}
                    className="px-5 py-2.5 min-h-[42px] rounded-md border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-medium text-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    Encomendar pesquisa
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Right Column: Clean Editorial Feed Rail */}
          <aside className="lg:col-span-4 flex flex-col justify-between bg-[#08101e] border border-slate-800/90 rounded-lg p-6">
            <div>
              <div className="flex items-baseline justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Boletins & Justiça Eleitoral
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Outubro e novembro de 2026
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400 tabular-nums">
                  {feedPage + 1}/{maxPage + 1}
                </span>
              </div>

              <div className="divide-y divide-slate-800/80">
                {visibleFeed.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => onSelectArticle(article)}
                    className="w-full text-left py-4 group focus-visible:outline-none focus-visible:bg-slate-900/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1.5">
                      {article.state && (
                        <>
                          <span className="text-cyan-400 font-medium">{article.state}</span>
                          <span aria-hidden="true">·</span>
                        </>
                      )}
                      <span>{article.sourceName || 'Algoritma Dados'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{article.date.toLowerCase()}</span>
                    </div>
                    <h3 className="text-sm font-medium text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {article.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setFeedPage((p) => (p === 0 ? maxPage : p - 1))}
                className="px-3 py-2 min-h-[38px] rounded border border-slate-800 hover:border-slate-600 text-xs font-medium text-slate-300 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span>Anterior</span>
              </button>
              <a
                href="#noticias"
                className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Ver arquivo ({newsArticles.length})
              </a>
              <button
                type="button"
                onClick={() => setFeedPage((p) => (p >= maxPage ? 0 : p + 1))}
                className="px-3 py-2 min-h-[38px] rounded border border-slate-800 hover:border-slate-600 text-xs font-medium text-slate-300 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Próximas</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </aside>
        </div>

        {/* Full-Width 4-Column Institutional Metrics Strip Below Hero Split */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 border border-slate-800/90 rounded-lg bg-[#08101e] divide-y lg:divide-y-0 lg:divide-x divide-slate-800/90">
          {[
            {
              value: '1.225',
              label: 'Entrevistas válidas',
              detail: 'Amostra estadual CE-07550/2026',
            },
            {
              value: '34',
              label: 'Municípios cobertos',
              detail: 'Capital, RMF e interior do Ceará',
            },
            {
              value: '±2,8 p.p.',
              label: 'Margem de erro máxima',
              detail: 'Nível de confiança de 95%',
            },
            {
              value: '100%',
              label: 'Auditoria da central própria',
              detail: 'Gravação CATI e validação digital',
            },
          ].map((stat, idx) => (
            <div key={idx} className="p-5 sm:p-6">
              <div className="text-2xl sm:text-3xl font-semibold text-white font-mono tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-200 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortalHero;
