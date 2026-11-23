import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Share2, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { Article } from '../data/newsData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onExploreReport?: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onExploreReport }) => {
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl my-8 bg-[#08101e] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col text-left"
        >
          {/* Header Image with close button */}
          <div className="relative h-64 md:h-80 w-full shrink-0 overflow-hidden">
            <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08101e] via-[#08101e]/40 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all z-20 border border-white/10"
            >
              <X size={18} />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-2">
                {article.state && (
                  <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-widest font-mono">
                    {article.state}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-sky-500/30 backdrop-blur-md border border-sky-400/30 text-sky-200 text-[10px] font-black uppercase tracking-widest font-mono">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-300 font-mono">
                  <Calendar size={12} className="text-cyan-400" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-300 font-mono">
                  <Clock size={12} className="text-sky-400" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-outfit leading-tight">
                {article.title}
              </h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            <p className="text-base md:text-lg text-sky-200/90 font-medium leading-relaxed italic border-l-2 border-cyan-400 pl-4">
              "{article.subtitle}"
            </p>

            {/* Stats blocks if available */}
            {article.stats && article.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                {article.stats.map((s, idx) => (
                  <div key={idx} className="text-center p-2">
                    <div className="text-xl md:text-2xl font-black text-white font-outfit">{s.value}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{s.label}</div>
                    {s.change && <div className="text-[9px] font-mono text-cyan-400 mt-0.5">{s.change}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            {article.highlights && (
              <div className="space-y-2">
                <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest font-mono">
                  Destaques Metodológicos & Achados
                </h4>
                <ul className="space-y-2">
                  {article.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
              {article.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Author / Source */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-cyan-400">
                  <User size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{article.author}</div>
                  {article.sourceName && (
                    <div className="text-[10px] text-cyan-400 font-mono font-bold">
                      Fonte: {article.sourceName}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {article.sourceUrl && (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/30 text-sky-200 text-xs font-bold border border-sky-500/40 transition-all flex items-center gap-1.5"
                  >
                    <span>Fonte: {article.sourceName || 'Ver Original'}</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                <button
                  onClick={handleShare}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-all"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                  <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
                </button>

                {onExploreReport && (
                  <button
                    onClick={() => {
                      onClose();
                      onExploreReport();
                    }}
                    className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-outfit"
                  >
                    <span>Ver Relatório Completo</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ArticleModal;
