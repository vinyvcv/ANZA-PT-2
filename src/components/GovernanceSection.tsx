import React from 'react';

export const GovernanceSection: React.FC = () => {
  const pillars = [
    {
      index: '01',
      label: 'Ética e independência',
      title: 'Autonomia editorial e neutralidade de questionário',
      body: 'A formulação dos instrumentos de coleta, a definição das cotas e a leitura estatística são conduzidas com total independência técnica. Não aceitamos interferências que induzam respostas ou recortes seletivos em levantamentos destinados ao debate público.',
      standard: 'Código ABEP / ESOMAR · Isenção na redação de perguntas',
    },
    {
      index: '02',
      label: 'Transparência metodológica',
      title: 'Abertura de ficha técnica, contratante e limites amostrais',
      body: 'Todos os estudos divulgados trazem de forma explícita o universo pesquisado, o número de entrevistas válidas, o período de campo, a margem de erro, o nível de confiança, a estratificação aplicada e o protocolo oficial de registro no Tribunal Superior Eleitoral.',
      standard: 'Resolução-TSE nº 23.600/2019 · Ficha técnica pública',
    },
    {
      index: '03',
      label: 'Conformidade LGPD',
      title: 'Anonimização irreversível e sigilo dos respondentes',
      body: 'Em atendimento estrito à Lei nº 13.709/2018 (LGPD), os dados coletados por ligação (CATI), chat digital ou campo presencial destinam-se exclusivamente à tabulação estatística. Identificadores de contato são desvinculados das respostas, com criptografia em repouso e descarte programado.',
      standard: 'Lei nº 13.709/2018 · Minimização e guarda segura',
    },
    {
      index: '04',
      label: 'Rigor técnico institucional',
      title: 'Responsabilidade CONRE e auditoria integral da central',
      body: 'Cada pesquisa conta com assinatura de estatístico habilitado no CONRE, supervisão ativa de 100% da central própria de Call Center, gravação integral de chamadas, rechecagem amostral independente e controles anti-duplicidade nos canais digitais.',
      standard: 'Registro CONRE · Auditoria 100% CATI e Chat Digital',
    },
  ];

  const complianceLedger = [
    {
      norm: 'Resolução-TSE nº 23.600/2019',
      scope: 'Pesquisas eleitorais públicas',
      practice: 'Registro prévio de plano amostral, questionário, contratante, valor e nota fiscal no PesqEle/TSE.',
    },
    {
      norm: 'LGPD (Lei nº 13.709/2018)',
      scope: 'Privacidade e proteção de dados',
      practice: 'Consentimento informado na abordagem, anonimização de microdados e sigilo de gravações.',
    },
    {
      norm: 'Código de Ética ABEP / ESOMAR',
      scope: 'Boas práticas de pesquisa',
      practice: 'Direito de recusa do respondente, separação entre coleta e fins comerciais e transparência de método.',
    },
    {
      norm: 'Protocolo Interno de Supervisão',
      scope: 'Central própria de Call Center',
      practice: '100% das chamadas gravadas, escuta ativa em tempo real e travas anti-bot em canais digitais.',
    },
  ];

  return (
    <section id="governanca" className="py-16 sm:py-24 bg-[#08101e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Asymmetric Editorial Header & 4 Governance Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-12 border-b border-slate-800/80">
          {/* Left Lead Manifesto */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            <p className="text-xs font-mono text-cyan-400">
              Ética, transparência, LGPD e rigor técnico
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.15]">
              Nossa governança
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              A credibilidade de um instituto de pesquisa nasce da integridade do processo. A governança da Algoritma Dados estabelece critérios objetivos de ética, transparência metodológica, proteção de dados pessoais e controle estatístico em todas as etapas de campo e análise.
            </p>
            <div className="pt-4 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
              <div className="font-mono text-slate-300">Canal de ética e privacidade (DPO)</div>
              <p className="leading-relaxed">
                Consultas sobre governança, pedidos da LGPD ou notas metodológicas:{' '}
                <a
                  href="mailto:contato@algoritmadados.com.br"
                  className="text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                >
                  contato@algoritmadados.com.br
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right 4 Institutional Pillars in a Clean Hairline 2x2 Matrix */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 border-y border-slate-800/80">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.index}
                className={`py-7 ${
                  idx % 2 === 0 ? 'md:pr-8 md:border-r md:border-slate-800/80' : 'md:pl-8'
                } ${idx < 2 ? 'border-b border-slate-800/80' : ''} ${
                  idx === 2 ? 'border-b md:border-b-0 border-slate-800/80' : ''
                } flex flex-col justify-between gap-3`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-cyan-400 tabular-nums shrink-0">
                      {pillar.index}.
                    </span>
                    <span className="text-xs font-mono text-slate-400">{pillar.label}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
                <p className="text-[11px] font-mono text-emerald-400/90 pt-2 border-t border-slate-800/60">
                  {pillar.standard}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Normative Ledger */}
        <div className="pt-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
            <h3 className="text-base font-semibold text-white">
              Quadro de conformidade e marcos regulatórios
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Aplicado integralmente aos projetos eleitorais, institucionais e de mercado
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-800/90 rounded-lg bg-[#050b14]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[660px]">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="py-3.5 px-5 font-medium">Referência normativa</th>
                  <th className="py-3.5 px-5 font-medium">Escopo</th>
                  <th className="py-3.5 px-5 font-medium">Prática adotada pela Algoritma Dados</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {complianceLedger.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-5 font-medium text-white whitespace-nowrap">
                      {item.norm}
                    </td>
                    <td className="py-4 px-5 text-slate-300 whitespace-nowrap">{item.scope}</td>
                    <td className="py-4 px-5 text-slate-300 leading-snug">{item.practice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;
