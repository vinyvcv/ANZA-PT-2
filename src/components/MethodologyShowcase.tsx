import React from 'react';
import { 
  ShieldCheck, CheckCircle2, FileText, Activity, 
  Crosshair, Layers, KeyRound, ArrowUpRight, Cpu, Award
} from 'lucide-react';
import { reportData } from '../data/reportData';

export const MethodologyShowcase: React.FC = () => {
  const pillars = [
    {
      code: 'AUD-01',
      tag: 'SUPERVISÃO ATIVA',
      icon: Activity,
      title: 'Auditoria 100% em Áudio',
      spec: 'Gravação CATI & Rechecagem 20%',
      desc: 'Todas as coletas telefônicas (CATI) são gravadas integralmente e 20% passam por rechecagem por supervisores independentes.',
    },
    {
      code: 'GEO-02',
      tag: 'RASTREIO CRIPTOGRAFADO',
      icon: Crosshair,
      title: 'Georreferenciamento Presencial',
      spec: 'GPS CAPI & Timestamp Imutável',
      desc: 'Pesquisas de campo (CAPI) utilizam dispositivos móveis com GPS criptografado e carimbo de tempo à prova de adulteração.',
    },
    {
      code: 'EST-03',
      tag: 'MODELAGEM PROBABILÍSTICA',
      icon: Layers,
      title: 'Estratificação TSE & IBGE',
      spec: 'Cotas Multivariadas 2026',
      desc: 'Cotas rigorosas de gênero, idade, escolaridade, renda e mesorregião baseadas nos dados consolidados do eleitorado 2026.',
    },
    {
      code: 'SEC-04',
      tag: 'SEGURANÇA & PRIVACIDADE',
      icon: KeyRound,
      title: 'Sigilo & Conformidade LGPD',
      spec: 'Criptografia Assimétrica AES-256',
      desc: 'Anonimização de dados pessoais e guarda sob servidores com certificado de segurança e chaves assimétricas.',
    },
  ];

  return (
    <section id="metodologia" className="py-24 bg-[#050b14] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <ShieldCheck size={16} />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] font-mono">
                PROTOCOLO DE RIGOR CIENTÍFICO
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-outfit">
              Confiabilidade Metodológica
            </h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mt-2 leading-relaxed">
              Cada ponto percentual divulgado pela Algoritma Dados é respaldado por controle de qualidade em tempo real, amostragem probabilística e conformidade legal estrita.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 shrink-0">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Registro no Tribunal Superior Eleitoral</div>
            <div className="text-xl font-bold text-cyan-400 font-mono mt-0.5 tracking-wider">CE-07550/2026</div>
          </div>
        </div>

        {/* 4 Pillars Grid - Clean Institutional Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all space-y-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <span className="font-mono text-xs font-bold text-cyan-400/90 tracking-wider">
                      [{p.code}]
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                      {p.tag}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Icon size={16} className="text-cyan-400 shrink-0" />
                      <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wide">
                        {p.spec}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white uppercase font-outfit tracking-wide pt-1">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mt-3">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>PADRÃO ALGORITMA QA</span>
                  <span className="text-emerald-400 font-semibold">100% VERIFICADO</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Specs Split Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Box 1: Technical Parameters */}
          <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider font-mono">
              <Cpu size={15} className="text-cyan-400" />
              <span>Parâmetros Técnicos do Estudo Ceará 2026</span>
            </div>
            
            <div className="divide-y divide-white/5 space-y-3 pt-2">
              {Object.entries(reportData.methodology.technicalParams).map(([key, val]) => (
                <div key={key} className="pt-3 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium uppercase tracking-wide">{key}</span>
                  <span className="text-white font-mono font-bold text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Box 2: Stratification & Quotas */}
          <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider font-mono mb-3">
                <Award size={15} className="text-cyan-400" />
                <span>Estratificação da Amostra Probabilística</span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {reportData.methodology.stratification.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {reportData.methodology.stratification.quotas.map((q, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {q}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-300 leading-relaxed font-mono">
              <strong className="text-cyan-400 font-bold">NOTA LEGAL:</strong> Pesquisa realizada em estrita conformidade com a Resolução-TSE nº 23.600/2019 e Lei Geral de Proteção de Dados (Lei 13.709/2018).
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MethodologyShowcase;
