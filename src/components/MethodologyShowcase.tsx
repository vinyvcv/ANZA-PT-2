import React from 'react';
import { reportData } from '../data/reportData';

export const MethodologyShowcase: React.FC = () => {
  return (
    <section id="metodologia" className="py-16 sm:py-24 bg-[#050b14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-cyan-400 mb-2">
              Protocolo estatístico e ficha técnica oficial
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
              Metodologia, estratificação e auditoria
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2.5 leading-relaxed">
              Cada levantamento da Algoritma Dados segue desenho amostral probabilístico, controle de cotas oficiais e registro formal junto à Justiça Eleitoral quando destinado à divulgação pública.
            </p>
          </div>

          <div className="border border-slate-800 rounded-md px-5 py-3.5 bg-[#08101e] shrink-0">
            <div className="text-[11px] font-mono text-slate-400">
              Registro no Tribunal Superior Eleitoral
            </div>
            <div className="text-lg font-mono font-semibold text-cyan-400 tabular-nums mt-0.5">
              {reportData.header.registration}
            </div>
          </div>
        </div>

        {/* Two-Column Institutional Specification Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-10 items-start">
          {/* Left: Technical Parameters Definition List */}
          <div className="lg:col-span-6 bg-[#08101e] border border-slate-800/90 rounded-lg p-6 sm:p-8">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-semibold text-white">
                Parâmetros técnicos — Estudo Ceará 2026
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ficha técnica protocolada sob a Resolução-TSE nº 23.600/2019
              </p>
            </div>

            <dl className="divide-y divide-slate-800/80 mt-2">
              {Object.entries(reportData.methodology.technicalParams).map(([key, val]) => (
                <div
                  key={key}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 text-sm"
                >
                  <dt className="text-slate-400 font-normal shrink-0">{key}</dt>
                  <dd className="text-slate-100 font-mono text-xs sm:text-[13px] sm:text-right tabular-nums">
                    {val}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: Stratification Quotas & Compliance */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="bg-[#08101e] border border-slate-800/90 rounded-lg p-6 sm:p-8">
              <div className="pb-4 border-b border-slate-800">
                <h3 className="text-base font-semibold text-white">
                  Estratificação e variáveis de controle
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Cotas proporcionais calibradas com bases do TSE e do IBGE
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mt-4">
                {reportData.methodology.stratification.description}
              </p>

              <ul className="mt-5 divide-y divide-slate-800/70 border-t border-slate-800/70">
                {reportData.methodology.stratification.quotas.map((quota, i) => (
                  <li
                    key={i}
                    className="py-3 flex items-baseline gap-3 text-sm text-slate-200"
                  >
                    <span className="font-mono text-xs text-cyan-400 tabular-nums shrink-0">
                      0{i + 1}.
                    </span>
                    <span>{quota}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#08101e] border border-slate-800/90 rounded-lg p-5 text-xs text-slate-300 leading-relaxed">
              <div className="font-mono text-emerald-400 font-medium mb-1.5">
                Conformidade legal e proteção de dados
              </div>
              <p className="text-slate-400">
                Coleta, armazenamento e anonimização de respostas executados em conformidade integral com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e com as diretrizes de auditoria e registro do Tribunal Superior Eleitoral (Resolução-TSE nº 23.600/2019).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologyShowcase;
