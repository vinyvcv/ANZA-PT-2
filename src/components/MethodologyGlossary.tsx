import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface GlossaryEntry {
  term: string;
  reference: string;
  shortDefinition: string;
  definition: string;
  readingNote: string;
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    term: 'Margem de erro',
    reference: 'Ex.: ±2,8 p.p. (n = 1.225)',
    shortDefinition:
      'Variação estatística máxima esperada para mais ou para menos em torno dos percentuais da amostra total, sob o nível de confiança adotado.',
    definition:
      'É o limite máximo de variação estatística esperado para mais ou para menos em torno dos percentuais observados na amostra total, considerando o nível de confiança adotado. Quanto maior a amostra probabilística, menor tende a ser a margem de erro.',
    readingNote:
      'Nota de leitura: a margem de ±2,8 pontos percentuais vale para o total de 1.225 entrevistas; subgrupos menores (por região, idade ou renda) possuem margens superiores.',
  },
  {
    term: 'Nível de confiança',
    reference: 'Padrão adotado: 95%',
    shortDefinition:
      'Probabilidade de o procedimento amostral gerar intervalos que contenham o valor real do universo em 95 de cada 100 repetições independentes.',
    definition:
      'Indica a probabilidade estatística de que o procedimento amostral produza um intervalo que contenha o parâmetro real da população. Um nível de confiança de 95% significa que, se o estudo fosse repetido 100 vezes em condições idênticas com novas amostras, em 95 delas o valor real permaneceria dentro da margem de erro.',
    readingNote:
      'Nota de leitura: refere-se à precisão do método de estimação, não à probabilidade isolada de vitória de uma candidatura.',
  },
  {
    term: 'Amostragem estratificada',
    reference: 'Cotas oficiais IBGE e TSE',
    shortDefinition:
      'Divisão proporcional do universo em estratos demográficos e geográficos (sexo, idade, escolaridade, renda e região) conforme dados do IBGE e do TSE.',
    definition:
      'Técnica em que o universo pesquisado é dividido em subgrupos homogêneos (estratos) definidos por variáveis demográficas e geográficas — como gênero, idade, escolaridade, renda e mesorregião. As entrevistas são alocadas proporcionalmente ao peso oficial de cada estrato.',
    readingNote:
      'Nota de leitura: reduz o viés de seleção e garante que capital, região metropolitana e interior tenham representação fiel ao eleitorado.',
  },
  {
    term: 'Empate técnico',
    reference: 'Sobreposição de intervalos',
    shortDefinition:
      'Situação em que a diferença entre duas candidaturas fica igual ou inferior ao dobro da margem de erro, impedindo afirmar liderança estatística.',
    definition:
      'Ocorre quando a diferença numérica entre duas candidaturas não supera o limite de sobreposição das margens de erro — em geral, até o dobro da margem de erro da pesquisa. Nessa situação, não é possível afirmar estatisticamente qual nome está à frente.',
    readingNote:
      'Nota de leitura: com margem de ±2,8 p.p., candidaturas com 44% e 40% apresentam intervalos sobrepostos e encontram-se tecnicamente empatadas.',
  },
  {
    term: 'Espontânea vs. estimulada',
    reference: 'Abordagem de questionário',
    shortDefinition:
      'Na espontânea o entrevistado cita um nome livremente; na estimulada escolhe a partir de cartela estruturada com ordem rotacionada.',
    definition:
      'Na pergunta espontânea, o entrevistador não cita nomes e registra a lembrança livre do eleitor — medindo recall e consolidação de voto. Na estimulada, apresenta-se um conjunto estruturado de candidaturas em ordem rotacionada, simulando o cenário de urna.',
    readingNote:
      'Nota de leitura: taxas altas de "não sabe" na espontânea são normais fora do período de campanha e caem acentuadamente na estimulada.',
  },
  {
    term: 'Votos totais vs. votos válidos',
    reference: 'Critério de apuração TSE',
    shortDefinition:
      'Votos totais incluem brancos, nulos e indecisos; votos válidos excluem esses grupos, reproduzindo a regra oficial de totalização do TSE.',
    definition:
      'Nos votos totais, o denominador inclui todos os entrevistados (inclusive brancos, nulos e indecisos). Nos votos válidos, excluem-se esses segmentos e recalculam-se os percentuais apenas sobre declarações nominais, reproduzindo o critério constitucional do TSE.',
    readingNote:
      'Nota de leitura: para vencer no 1º turno em eleições majoritárias, a candidatura precisa superar 50% dos votos válidos.',
  },
  {
    term: 'CATI, Chat Digital e CAPI',
    reference: 'Canais próprios de coleta',
    shortDefinition:
      'CATI é entrevista telefônica gravada em central própria; Chat Digital opera via WhatsApp/web com filtro anti-duplicidade; CAPI é coleta presencial com GPS.',
    definition:
      'CATI (Computer-Assisted Telephone Interviewing) refere-se à entrevista telefônica assistida por computador em central própria, com gravação integral. A coleta via Chat Digital aplica questionários humanizados por WhatsApp e web com filtros anti-bot. CAPI designa entrevistas presenciais em dispositivos móveis georreferenciados.',
    readingNote:
      'Nota de leitura: o canal — ou desenho híbrido — é definido conforme a cobertura geográfica, o perfil do público e a janela de entrega.',
  },
];

interface MethodologyGlossaryProps {
  variant?: 'section' | 'footer';
}

export const MethodologyGlossary: React.FC<MethodologyGlossaryProps> = ({ variant = 'section' }) => {
  const [expandedInFooter, setExpandedInFooter] = useState(false);

  if (variant === 'footer') {
    const displayedEntries = expandedInFooter ? glossaryEntries : glossaryEntries.slice(0, 3);

    return (
      <div id="glossario" className="py-10 mb-12 border-b border-slate-800/80 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800/70">
          <div>
            <p className="text-xs font-mono text-cyan-400 mb-1">
              Referência editorial técnica
            </p>
            <h4 className="text-lg font-semibold text-white">
              Glossário de metodologia
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Definições objetivas para leitura técnica de pesquisas eleitorais e levantamentos de opinião pública.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setExpandedInFooter((prev) => !prev)}
            aria-expanded={expandedInFooter}
            aria-controls="footer-glossary-list"
            className="self-start sm:self-auto px-3.5 py-2 min-h-[38px] rounded-md border border-slate-700 hover:border-cyan-400 text-xs font-medium text-slate-200 hover:text-white inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>
              {expandedInFooter
                ? 'Mostrar apenas essenciais (3)'
                : `Ver glossário completo (${glossaryEntries.length})`}
            </span>
            {expandedInFooter ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <dl
          id="footer-glossary-list"
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6"
        >
          {displayedEntries.map((entry, idx) => (
            <div
              key={entry.term}
              className="space-y-1.5 pb-4 md:pb-0 border-b md:border-b-0 border-slate-800/60 last:border-b-0"
            >
              <dt className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-white">
                  <span className="font-mono text-xs text-cyan-400 mr-1.5 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  {entry.term}
                </span>
              </dt>
              <div className="text-[11px] font-mono text-slate-500">{entry.reference}</div>
              <dd className="text-xs text-slate-300 leading-relaxed pt-0.5">
                {entry.shortDefinition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  // Full technical editorial glossary section for ReportView
  return (
    <section id="glossary" className="py-12 sm:py-16 border-b border-slate-800/80 scroll-mt-20 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-5 mb-8 border-b border-slate-800/80">
          <p className="text-xs font-mono text-cyan-400 mb-1.5">
            Bloco 12 · Guia técnico para imprensa e analistas
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Glossário de metodologia
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Definições curtas e notas técnicas para interpretação rigorosa dos intervalos estatísticos, cotas e resultados apresentados neste relatório.
          </p>
        </div>

        <dl className="divide-y divide-slate-800/80 border border-slate-800/90 rounded-lg bg-[#08101e]">
          {glossaryEntries.map((entry, idx) => (
            <div
              key={entry.term}
              className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
            >
              <dt className="md:col-span-4 space-y-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs text-cyan-400 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="text-base font-semibold text-white">{entry.term}</span>
                </div>
                <div className="text-xs font-mono text-slate-400 pl-6">{entry.reference}</div>
              </dt>
              <dd className="md:col-span-8 space-y-2">
                <p className="text-sm text-slate-200 leading-relaxed max-w-prose">
                  {entry.definition}
                </p>
                <p className="text-xs font-mono text-slate-400 leading-relaxed">
                  {entry.readingNote}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default MethodologyGlossary;
