import React from 'react';
import { ChevronRight } from 'lucide-react';
import callCenterImg from '../assets/images/call_center_research_ops_1795459784978.jpg';

interface CallCenterOperationsProps {
  onOpenQuote: (defaultMethod?: 'cati' | 'chat' | 'hybrid') => void;
}

export const CallCenterOperations: React.FC<CallCenterOperationsProps> = ({ onOpenQuote }) => {
  const operationalPillars = [
    {
      index: '01',
      title: 'Pesquisa Telefônica (CATI)',
      channel: 'Central própria · Voz',
      description:
        'Operação interna com entrevistadores treinados em pesquisa quantitativa, discagem inteligente sobre base estratificada, gravação integral de 100% das chamadas e acompanhamento por supervisores em tempo real.',
      controls: 'Gravação total de áudio · Escuta ativa · Rechecagem amostral',
      methodKey: 'cati' as const,
    },
    {
      index: '02',
      title: 'Pesquisa via Chat & Mensageria Digital',
      channel: 'Central própria · WhatsApp e Web',
      description:
        'Coleta estruturada e humanizada conduzida via chat e canais digitais, combinando roteiros adaptativos com validação de perfil demográfico, travas anti-bot, bloqueio de duplicidade e elevada taxa de conclusão.',
      controls: 'Validação de perfil · Controle anti-duplicidade · Alta conversão',
      methodKey: 'chat' as const,
    },
    {
      index: '03',
      title: 'Operação Presencial (CAPI) & Híbrida',
      channel: 'Campo georreferenciado + Central',
      description:
        'Integração entre central própria de call center e equipes presenciais com tablets georreferenciados sempre que o desenho amostral exigir cobertura domiciliar ou mista entre regiões urbanas e rurais.',
      controls: 'Coleta GPS com timestamp · Integração de base única',
      methodKey: 'hybrid' as const,
    },
    {
      index: '04',
      title: 'Auditoria e Controle de Qualidade',
      channel: 'Governança estatística · IBGE, TSE e LGPD',
      description:
        'Planejamento amostral estratificado por cotas oficiais do IBGE e do TSE, supervisão ativa sobre 100% dos postos de call center, auditoria de consistência interna e conformidade com a LGPD e a Resolução-TSE nº 23.600/2019.',
      controls: 'Supervisão 100% · Registro TSE assistido · Anonimização LGPD',
      methodKey: 'cati' as const,
    },
  ];

  const comparisonRows = [
    {
      channel: 'Call Center Telefônico (CATI)',
      application: 'Tracking contínuo, avaliação de gestão, pesquisas estaduais e municipais rápidas',
      control: '100% das ligações gravadas + supervisão simultânea',
      leadTime: '48h a 4 dias úteis',
    },
    {
      channel: 'Call Center via Chat & Digital',
      application: 'Públicos jovens, estudos de mercado/consumo, testes de mensagem e alta capilaridade',
      control: 'Validação de perfil, filtro anti-bot e controle de unicidade',
      leadTime: '48h a 5 dias úteis',
    },
    {
      channel: 'Operação Presencial (CAPI) / Híbrida',
      application: 'Cobertura domiciliar completa, áreas com baixa conectividade e amostras complexas',
      control: 'Georreferenciamento GPS, registro de horário e checagem por telefone',
      leadTime: '5 a 10 dias úteis',
    },
  ];

  return (
    <section id="call-center" className="py-16 sm:py-24 bg-[#08101e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Asymmetric Editorial Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-mono text-cyan-400 mb-2">
                Estrutura própria de coleta · Sem terceirização
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.15]">
                Central própria de Call Center especializada em pesquisas
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
                A Algoritma Dados opera estrutura interna de Call Center dedicada exclusivamente à coleta de pesquisas eleitorais, opinião pública e estudos de mercado — atuando por ligação telefônica (CATI), chat e mensageria digital, ou integrada a campo presencial.
              </p>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Manter a equipe dentro de casa garante controle direto sobre o treinamento de entrevistadores, ritmo de preenchimento de cotas e auditabilidade integral de cada entrevista entregue ao contratante.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenQuote('cati')}
                className="px-5 py-2.5 min-h-[42px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Dimensionar operação</span>
                <ChevronRight size={16} />
              </button>
              <span className="text-xs font-mono text-slate-400">
                CATI · Chat Digital · CAPI Híbrido
              </span>
            </div>
          </div>

          {/* Documentary Editorial Photograph */}
          <figure className="lg:col-span-7 flex flex-col justify-between bg-[#050b14] border border-slate-800/90 rounded-lg overflow-hidden">
            <div className="relative aspect-[16/9] lg:aspect-auto lg:flex-1 min-h-[260px] w-full overflow-hidden bg-slate-900">
              <img
                src={callCenterImg}
                alt="Central própria de Call Center e supervisão de qualidade da Algoritma Dados"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/70 via-transparent to-transparent" />
            </div>
            <figcaption className="px-5 py-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>Operação própria CATI e coleta digital com supervisão de qualidade em sala dedicada</span>
              <span className="font-mono text-emerald-400">Supervisão ativa 100%</span>
            </figcaption>
          </figure>
        </div>

        {/* 4 Operational Pillars — Editorial Hairline 2x2 Matrix (No Card Clutter) */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-800/80">
          {operationalPillars.map((pillar, idx) => (
            <div
              key={pillar.index}
              className={`py-8 ${
                idx % 2 === 0 ? 'md:pr-10 md:border-r md:border-slate-800/80' : 'md:pl-10'
              } ${idx < 2 ? 'border-b border-slate-800/80' : ''} ${
                idx === 2 ? 'border-b md:border-b-0 border-slate-800/80' : ''
              } flex flex-col justify-between gap-4`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <span className="font-mono text-xs text-cyan-400 tabular-nums">
                    {pillar.index}. {pillar.channel}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-slate-400">{pillar.controls}</span>
                <button
                  type="button"
                  onClick={() => onOpenQuote(pillar.methodKey)}
                  className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Orçar canal</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparative Channel Specification Table */}
        <div className="pt-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
            <h3 className="text-base font-semibold text-white">
              Quadro comparativo de modalidades de coleta
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Todos os canais seguem estratificação IBGE/TSE e LGPD
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-800/90 rounded-lg bg-[#050b14]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="py-3.5 px-5 font-medium">Modalidade</th>
                  <th className="py-3.5 px-5 font-medium">Aplicação principal</th>
                  <th className="py-3.5 px-5 font-medium">Controle e auditoria</th>
                  <th className="py-3.5 px-5 font-medium text-right">Prazo típico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-5 font-medium text-white whitespace-nowrap">
                      {row.channel}
                    </td>
                    <td className="py-4 px-5 text-slate-300 leading-snug">{row.application}</td>
                    <td className="py-4 px-5 text-slate-300 leading-snug">{row.control}</td>
                    <td className="py-4 px-5 text-right font-mono text-cyan-400 tabular-nums whitespace-nowrap">
                      {row.leadTime}
                    </td>
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

export default CallCenterOperations;
