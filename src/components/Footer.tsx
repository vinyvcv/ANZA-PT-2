import React, { useState } from 'react';
import { Globe, TrendingUp, ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';
import { AnzaLogo } from './AnzaLogo';

interface FooterProps {
  onExploreReport: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onExploreReport, onOpenQuote }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="py-20 bg-[#080214] border-t border-white/5 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Newsletter Strip */}
        <div className="p-6 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest font-mono">
              NEWSLETTER SEMANAL DE DADOS
            </span>
            <h4 className="text-xl md:text-2xl font-black text-white uppercase font-outfit mt-1">
              Receba os Próximos Snapshots Eleitorais e de Mercado
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Análises exclusivas com gráficos e insights antes da divulgação aberta à imprensa.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                <Check size={16} />
                <span>Inscrição confirmada com sucesso!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail corporativo..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider font-outfit transition-all shrink-0"
                >
                  Assinar
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <AnzaLogo size="md" withTagline={true} />
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Autoridade em dados, rigor em campo e inteligência estratégica para governos, partidos, instituições e grandes marcas em todo o território nacional.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Registro Oficial TSE CE-07550/2026</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h6 className="text-xs font-black text-white uppercase tracking-[0.25em] font-mono">
              Estudos & Portal
            </h6>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
              <a href="#inicio" className="hover:text-amber-400 transition-colors">Início & Destaques</a>
              <button onClick={onExploreReport} className="text-left hover:text-amber-400 transition-colors">
                Pesquisa Ceará 2026 (Relatório)
              </button>
              <a href="#simulador" className="hover:text-amber-400 transition-colors">Simulador de Votos</a>
              <a href="#noticias" className="hover:text-amber-400 transition-colors">Arquivo de Notícias</a>
              <a href="#metodologia" className="hover:text-amber-400 transition-colors">Ficha Técnica & Protocolos</a>
            </div>
          </div>

          <div className="space-y-4">
            <h6 className="text-xs font-black text-white uppercase tracking-[0.25em] font-mono">
              Sedes & Contato
            </h6>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
              <span>Fortaleza, CE — Av. Santos Dumont</span>
              <span>São Paulo, SP — Av. Paulista</span>
              <span>(85) 3044-8800</span>
              <span>contato@anza.com.br</span>
              <button onClick={onOpenQuote} className="text-left text-amber-400 font-bold hover:underline">
                → Solicitar Orçamento de Campo
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          <div>
            © 2026 ANZA Pesquisa e Inteligência de Dados. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <span>LGPD Compliance</span>
            <span>Auditoria 100%</span>
            <span>Resolução-TSE 23.600/2019</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
