import React, { useEffect } from 'react';
import { X, Share2, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { Article } from '../data/newsData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onExploreReport?: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onExploreReport,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      <article className="relative w-full max-w-3xl my-6 bg-[#08101e] border border-slate-800 rounded-lg overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col text-left">
        {/* Header Photograph */}
        <div className="relative aspect-[21/9] w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={article.img}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08101e] via-[#08101e]/40 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-md bg-[#050b14]/85 hover:bg-[#050b14] text-slate-200 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            aria-label="Fechar artigo"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Editorial Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Unboxed Metadata & Title */}
          <header className="pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-400 mb-3">
              {article.state && (
                <>
                  <span className="text-cyan-400 font-medium">{article.state}</span>
                  <span aria-hidden="true">·</span>
                </>
              )}
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{article.date.toLowerCase()}</span>
              <span aria-hidden="true">·</span>
              <span>Leitura: {article.readTime}</span>
            </div>

            <h2
              id="article-modal-title"
              className="text-2xl sm:text-3xl font-semibold text-white leading-tight"
            >
              {article.title}
            </h2>

            <p className="text-base text-slate-300 mt-3 leading-relaxed">
              {article.subtitle}
            </p>
          </header>

          {/* Key Figures Strip if available */}
          {article.stats && article.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 border border-slate-800 rounded-md divide-y sm:divide-y-0 sm:divide-x divide-slate-800 bg-[#050b14]">
              {article.stats.map((s, idx) => (
                <div key={idx} className="p-4">
                  <div className="text-xl font-mono font-semibold text-white tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-xs font-medium text-slate-300 mt-0.5">{s.label}</div>
                  {s.change && (
                    <div className="text-[11px] font-mono text-cyan-400 mt-0.5">{s.change}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Editorial Highlights */}
          {article.highlights && article.highlights.length > 0 && (
            <div className="bg-[#050b14] border border-slate-800/90 rounded-md p-5 space-y-2.5">
              <h3 className="text-xs font-mono text-cyan-400 font-medium">
                Pontos principais
              </h3>
              <ul className="space-y-2">
                {article.highlights.map((h, i) => (
                  <li key={i} className="flex items-baseline gap-2.5 text-sm text-slate-200 leading-relaxed">
                    <span className="font-mono text-xs text-slate-500 tabular-nums shrink-0">
                      0{i + 1}.
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Long-Form Prose */}
          <div className="space-y-4 text-slate-300 text-base leading-[1.7] max-w-prose">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Author & Actions Footer */}
          <footer className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="text-sm font-medium text-white">{article.author}</div>
              {article.sourceName && (
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  Fonte: {article.sourceName}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              {article.sourceUrl && (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 min-h-[38px] rounded-md border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Fonte oficial</span>
                  <ExternalLink size={13} />
                </a>
              )}

              <button
                type="button"
                onClick={handleShare}
                className="px-3.5 py-2 min-h-[38px] rounded-md border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
                <span>{copied ? 'Link copiado' : 'Compartilhar'}</span>
              </button>

              {onExploreReport && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreReport();
                  }}
                  className="px-4 py-2 min-h-[38px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Relatório completo</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default ArticleModal;
