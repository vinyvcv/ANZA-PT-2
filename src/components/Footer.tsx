import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { AlgoritmaLogo } from './AlgoritmaLogo';
import { MethodologyGlossary } from './MethodologyGlossary';

interface FooterProps {
  onExploreReport: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onExploreReport, onOpenQuote }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="py-16 bg-[#03070e] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Subscription Bar */}
        <div className="pb-12 mb-12 border-b border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-mono text-cyan-400 mb-1">Boletim técnico</p>
            <h4 className="text-lg sm:text-xl font-semibold text-white">
              Receba novas séries eleitorais e notas metodológicas
            </h4>
            <p className="text-sm text-slate-400 mt-1">
              Envio periódico de relatórios públicos, registros no TSE e estudos de opinião da Algoritma Dados.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <Check size={16} />
                <span>Inscrição confirmada para {email}.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail corporativo"
                  aria-label="E-mail corporativo para boletim técnico"
                  className="bg-[#08101e] border border-slate-800 rounded-md px-3.5 py-2.5 min-h-[42px] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 min-h-[42px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Inscrever-se
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Editorial Methodology Glossary Reference */}
        <MethodologyGlossary variant="footer" />

        {/* Institutional Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5 space-y-4">
            <AlgoritmaLogo size="md" withTagline={true} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Instituto independente de pesquisa quantitativa e inteligência de dados com central própria de Call Center (CATI e chat digital) e operações presenciais integradas.
            </p>
            <p className="text-xs font-mono text-slate-500">
              Registro de referência: TSE CE-07550/2026
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono font-medium text-slate-300">
              Seções do portal
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#inicio" className="hover:text-cyan-400 transition-colors">
                  Capa e boletins
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onExploreReport}
                  className="text-left hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Relatório Ceará 2026
                </button>
              </li>
              <li>
                <a href="#simulador" className="hover:text-cyan-400 transition-colors">
                  Laboratório de cenários 2026
                </a>
              </li>
              <li>
                <a href="#call-center" className="hover:text-cyan-400 transition-colors">
                  Estrutura de Call Center
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-cyan-400 transition-colors">
                  Metodologia e ficha técnica
                </a>
              </li>
              <li>
                <a href="#governanca" className="hover:text-cyan-400 transition-colors">
                  Nossa governança
                </a>
              </li>
              <li>
                <a href="#noticias" className="hover:text-cyan-400 transition-colors">
                  Arquivo de publicações
                </a>
              </li>
              <li>
                <a href="#glossario" className="hover:text-cyan-400 transition-colors">
                  Glossário de metodologia
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-mono font-medium text-slate-300">
              Contato institucional
            </h5>
            <div className="space-y-2.5 text-sm text-slate-400">
              <p>Fortaleza, CE — Av. Santos Dumont</p>
              <p>São Paulo, SP — Av. Paulista</p>
              <p>
                <a
                  href="mailto:contato@algoritmadados.com.br"
                  className="text-slate-200 hover:text-cyan-400 transition-colors"
                >
                  contato@algoritmadados.com.br
                </a>
              </p>
              <p className="font-mono text-xs text-slate-500">algoritmadados.com.br</p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Solicitar orçamento de pesquisa →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-500">
          <div>
            © 2026 Algoritma Dados. Todos os direitos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
              className="hover:text-cyan-400 underline decoration-slate-700 underline-offset-4 transition-colors cursor-pointer"
            >
              Preferências de cookies
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>LGPD (Lei 13.709/2018)</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Resolução-TSE 23.600/2019</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
