import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  CartesianGrid,
} from 'recharts';
import { ArrowLeft, Download, Share2, Check } from 'lucide-react';
import { reportData, SurveyRow } from '../data/reportData';
import { AlgoritmaLogo } from './AlgoritmaLogo';
import { MethodologyGlossary } from './MethodologyGlossary';

const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

interface ReportTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: SurveyRow;
  }>;
}

const ReportTooltip: React.FC<ReportTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const row = payload[0].payload;
  return (
    <div className="bg-[#050b14] border border-slate-700 rounded-md px-3 py-2 shadow-xl text-left">
      <div className="text-xs font-medium text-white">{row.name}</div>
      <div className="text-sm font-mono font-semibold text-cyan-400 tabular-nums mt-0.5">
        {Number(row.value).toFixed(1)}%
      </div>
      {row.n !== undefined && (
        <div className="text-[11px] font-mono text-slate-400 tabular-nums">
          n = {row.n.toLocaleString('pt-BR')}
        </div>
      )}
    </div>
  );
};

interface SectionHeaderProps {
  kicker: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ kicker, subtitle }) => (
  <div className="pb-5 mb-6 border-b border-slate-800/80">
    <p className="text-xs font-mono text-cyan-400 mb-1.5">{kicker}</p>
    <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">{subtitle}</h2>
  </div>
);

interface DataTableProps {
  columns: string[];
  data: SurveyRow[];
  total?: { n: number; value: number };
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, total }) => {
  const hasCountColumn = columns.length === 3;

  return (
    <div className="w-full overflow-x-auto border border-slate-800/90 rounded-md mt-6 bg-[#050b14]">
      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
            {columns.map((col, i) => (
              <th
                key={i}
                className={`py-3 px-4 font-medium ${i === 0 ? 'text-left' : 'text-right'}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/70">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-slate-900/40 transition-colors">
              <td className="py-3 px-4 text-slate-200 font-medium">{row.name}</td>
              {hasCountColumn && (
                <td className="py-3 px-4 text-right font-mono text-slate-400 tabular-nums">
                  {row.n !== undefined ? row.n.toLocaleString('pt-BR') : '—'}
                </td>
              )}
              <td className="py-3 px-4 text-right font-mono font-semibold text-white tabular-nums">
                {row.value.toFixed(1)}%
              </td>
            </tr>
          ))}
          {total && (
            <tr className="bg-slate-900/80 border-t border-slate-700 font-semibold">
              <td className="py-3 px-4 text-cyan-300">Total geral</td>
              {hasCountColumn && (
                <td className="py-3 px-4 text-right font-mono text-cyan-300 tabular-nums">
                  {total.n.toLocaleString('pt-BR')}
                </td>
              )}
              <td className="py-3 px-4 text-right font-mono text-cyan-300 tabular-nums">
                {total.value.toFixed(1)}%
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

interface QuestionBoxProps {
  id: string;
  question: string;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ id, question }) => (
  <div className="mb-6 p-5 rounded-md bg-[#08101e] border border-slate-800/90 text-left">
    <div className="text-[11px] font-mono text-cyan-400 mb-1.5">Enunciado · {id}</div>
    <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
      &ldquo;{question.replace(/^"|"$/g, '')}&rdquo;
    </p>
  </div>
);

interface DataSectionProps {
  id: string;
  kicker: string;
  subtitle: string;
  questionId: string;
  questionText: string;
  chartTitle: string;
  chartData: SurveyRow[];
  columns: string[];
  total?: { n: number; value: number };
}

const DataSection: React.FC<DataSectionProps> = ({
  id,
  kicker,
  subtitle,
  questionId,
  questionText,
  chartTitle,
  chartData,
  columns,
  total,
}) => {
  const [mounted, setMounted] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const chartHeight = Math.max(220, chartData.length * 42 + 40);

  return (
    <section id={id} className="py-12 sm:py-16 border-b border-slate-800/80 scroll-mt-20 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker={kicker} subtitle={subtitle} />
        <QuestionBox id={questionId} question={questionText} />

        <div className="p-5 sm:p-8 bg-[#08101e] border border-slate-800/90 rounded-lg">
          <h3 className="text-xs font-mono text-slate-400 mb-5">{chartTitle}</h3>

          <div style={{ height: chartHeight }} className="w-full relative">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ top: 4, right: 54, left: 0, bottom: 4 }}
                >
                  <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(v) => `${v}%`}
                    axisLine={{ stroke: '#1e293b' }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={size.width < 640 ? 125 : 225}
                    tick={{ fill: '#e2e8f0', fontSize: size.width < 640 ? 10 : 12, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ReportTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={22}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color || '#06b6d4'} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="right"
                      content={({ x, y, width, height, value }: any) => (
                        <text
                          x={Number(x || 0) + Number(width || 0) + 8}
                          y={Number(y || 0) + Number(height || 0) / 2}
                          fill="#f8fafc"
                          textAnchor="start"
                          dominantBaseline="middle"
                          className="text-xs font-mono font-semibold"
                        >
                          {Number(value).toFixed(1)}%
                        </text>
                      )}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <DataTable columns={columns} data={chartData} total={total} />
        </div>
      </div>
    </section>
  );
};

interface EvaluationBlockProps {
  id: string;
  kicker: string;
  subtitle: string;
  questionId: string;
  questionText: string;
  approvalData: { title: string; data: SurveyRow[] };
  qualitativeData: { title: string; data: SurveyRow[] };
}

const EvaluationBlock: React.FC<EvaluationBlockProps> = ({
  id,
  kicker,
  subtitle,
  questionId,
  questionText,
  approvalData,
  qualitativeData,
}) => {
  const [mounted, setMounted] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id={id} className="py-12 sm:py-16 border-b border-slate-800/80 scroll-mt-20 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker={kicker} subtitle={subtitle} />
        <QuestionBox id={questionId} question={questionText} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[approvalData, qualitativeData].map((chart, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-[#08101e] border border-slate-800/90 rounded-lg"
            >
              <h3 className="text-xs font-mono text-slate-400 mb-5">{chart.title}</h3>

              <div className="h-[200px] w-full relative">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart
                      layout="vertical"
                      data={chart.data}
                      margin={{ top: 4, right: 50, left: 0, bottom: 4 }}
                    >
                      <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        domain={[0, 70]}
                        tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                        tickFormatter={(v) => `${v}%`}
                        axisLine={{ stroke: '#1e293b' }}
                        tickLine={false}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={size.width < 640 ? 110 : 145}
                        tick={{ fill: '#e2e8f0', fontSize: size.width < 640 ? 10 : 12, fontWeight: 500 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<ReportTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                      <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={24}>
                        {chart.data.map((entry, i) => (
                          <Cell key={i} fill={entry.color || '#06b6d4'} />
                        ))}
                        <LabelList
                          dataKey="value"
                          position="right"
                          content={({ x, y, width, height, value }: any) => (
                            <text
                              x={Number(x || 0) + Number(width || 0) + 8}
                              y={Number(y || 0) + Number(height || 0) / 2}
                              fill="#f8fafc"
                              textAnchor="start"
                              dominantBaseline="middle"
                              className="text-xs font-mono font-semibold"
                            >
                              {Number(value).toFixed(1)}%
                            </text>
                          )}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              <DataTable columns={['Resposta', '%']} data={chart.data} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const ReportView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans overflow-x-hidden text-left">
      {/* Sticky Top Publication Bar */}
      <header className="sticky top-0 z-40 bg-[#050b14]/96 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Voltar ao portal</span>
            </button>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-xs font-mono text-slate-400 truncate hidden sm:inline">
              Relatório Oficial · TSE {reportData.header.registration}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-2 min-h-[38px] rounded-md border border-slate-800 hover:border-slate-600 text-xs font-medium text-slate-300 hover:text-white inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              <span className="hidden sm:inline">{copiedLink ? 'Link copiado' : 'Compartilhar'}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 min-h-[38px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download size={14} />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Publication Cover */}
      <section id="hero-report" className="py-12 sm:py-16 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-mono text-cyan-400 mb-3">
              Pesquisa eleitoral · Ceará 2026 · Reg. TSE {reportData.header.registration}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12]">
              Relatório geral: Governador, Senador e avaliações de gestão
            </h1>
            <p className="text-base text-slate-300 mt-4 leading-relaxed">
              {reportData.header.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-400 mt-4">
              <span>Período de campo: {reportData.header.period}</span>
              <span aria-hidden="true">·</span>
              <span>Contratante: {reportData.header.contractor}</span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border border-slate-800/90 rounded-lg bg-[#08101e] divide-y lg:divide-y-0 lg:divide-x divide-slate-800/90">
            {[
              { value: reportData.header.sampleSize, label: 'Entrevistas válidas', sub: 'Amostra quantitativa' },
              { value: reportData.header.municipalities, label: 'Municípios', sub: 'Cobertura estadual' },
              { value: reportData.header.marginOfError, label: 'Margem de erro', sub: 'Pontos percentuais' },
              { value: reportData.header.confidence, label: 'Nível de confiança', sub: 'Intervalo estatístico' },
            ].map((stat, idx) => (
              <div key={idx} className="p-5">
                <div className="text-2xl sm:text-3xl font-mono font-semibold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-200 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section id="index" className="py-12 sm:py-16 border-b border-slate-800/80 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader kicker="Sumário do documento" subtitle="Índice geral de blocos" />

          <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-800/90 rounded-lg bg-[#08101e] divide-y divide-slate-800/80">
            {[
              ...reportData.index.items,
              { id: '12', label: 'Glossário de Metodologia', page: '15', anchor: 'glossary' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.anchor)}
                className="flex items-baseline justify-between gap-4 px-5 py-4 text-left hover:bg-slate-900/60 transition-colors cursor-pointer md:odd:border-r md:odd:border-slate-800/80"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-mono text-xs text-cyan-400 tabular-nums shrink-0">
                    {item.id}.
                  </span>
                  <span className="text-sm font-medium text-slate-200 hover:text-white truncate">
                    {item.label}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                  p. {item.page}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology & Technical Specs */}
      <section id="methodology" className="py-12 sm:py-16 border-b border-slate-800/80 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader kicker="Bloco 01 · Ficha técnica" subtitle="Metodologia e controle de qualidade" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-[#08101e] border border-slate-800/90 rounded-lg">
              <h3 className="text-base font-semibold text-white pb-3 border-b border-slate-800">
                Parâmetros técnicos registrados
              </h3>
              <dl className="divide-y divide-slate-800/70 mt-2 text-sm">
                {Object.entries(reportData.methodology.technicalParams).map(([key, val]) => (
                  <div key={key} className="py-3 flex justify-between gap-4">
                    <dt className="text-slate-400">{key}</dt>
                    <dd className="text-slate-100 font-mono text-xs sm:text-sm text-right tabular-nums">
                      {val}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="p-6 bg-[#08101e] border border-slate-800/90 rounded-lg flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-base font-semibold text-white pb-3 border-b border-slate-800">
                  Estratificação da amostra
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mt-4">
                  {reportData.methodology.stratification.description}
                </p>
                <ul className="mt-4 divide-y divide-slate-800/70 border-t border-slate-800/70 text-sm text-slate-200">
                  {reportData.methodology.stratification.quotas.map((q, idx) => (
                    <li key={q} className="py-2.5 flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-cyan-400 tabular-nums">0{idx + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                Responsável técnico: Equipe de Estatística Algoritma Dados · Registro CONRE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governor Scenarios */}
      <DataSection
        id="gov-spont"
        kicker="Bloco 02 · Governador do Ceará"
        subtitle="Intenção de voto espontânea"
        questionId="Q5 · Espontânea"
        questionText={reportData.governor.spontaneous.question}
        chartTitle={reportData.governor.spontaneous.title}
        chartData={reportData.governor.spontaneous.data}
        columns={['Candidato / Resposta', 'n', '%']}
        total={reportData.governor.spontaneous.total}
      />
      <DataSection
        id="gov-stim"
        kicker="Bloco 03 · Governador do Ceará"
        subtitle="Cenário estimulado — 1º turno"
        questionId="Q6 · Estimulada"
        questionText={reportData.governor.stimulated.question}
        chartTitle={reportData.governor.stimulated.title}
        chartData={reportData.governor.stimulated.data}
        columns={['Candidato / Resposta', 'n', '%']}
        total={reportData.governor.stimulated.total}
      />
      <DataSection
        id="gov-2"
        kicker="Bloco 04 · Governador do Ceará"
        subtitle="Cenário de segundo turno"
        questionId="Q7 · 2º Turno"
        questionText={reportData.governor.secondTurn.question}
        chartTitle={reportData.governor.secondTurn.title}
        chartData={reportData.governor.secondTurn.data}
        columns={['Candidato / Resposta', 'n', '%']}
        total={reportData.governor.secondTurn.total}
      />

      {/* Senate Scenarios */}
      <DataSection
        id="sen-spont"
        kicker="Bloco 05 · Senado Federal"
        subtitle="Intenção de voto espontânea (1º nome)"
        questionId="Q8 · Espontânea"
        questionText={reportData.senator.spontaneous.question}
        chartTitle={reportData.senator.spontaneous.title}
        chartData={reportData.senator.spontaneous.data}
        columns={['Candidato / Resposta', 'n', '%']}
        total={reportData.senator.spontaneous.total}
      />
      <DataSection
        id="sen-1"
        kicker="Bloco 06 · Senado Federal"
        subtitle="Cenário estimulado 01"
        questionId="Q9 · Estimulada 01"
        questionText={reportData.senator.stimulated_01.question}
        chartTitle={reportData.senator.stimulated_01.title}
        chartData={reportData.senator.stimulated_01.data}
        columns={['Candidato / Resposta', 'n', '%']}
        total={reportData.senator.stimulated_01.total}
      />
      <DataSection
        id="sen-2"
        kicker="Bloco 07 · Senado Federal"
        subtitle="Cenário estimulado 02"
        questionId="Q10 · Estimulada 02"
        questionText={reportData.senator.stimulated_02.question}
        chartTitle={reportData.senator.stimulated_02.title}
        chartData={reportData.senator.stimulated_02.data}
        columns={['Candidato / Resposta', 'n', '%']}
        total={reportData.senator.stimulated_02.total}
      />
      <DataSection
        id="sen-3"
        kicker="Bloco 08 · Senado Federal"
        subtitle="Cenário estimulado 03"
        questionId="Q11 · Estimulada 03"
        questionText={reportData.senator.stimulated_03.question}
        chartTitle={reportData.senator.stimulated_03.title}
        chartData={reportData.senator.stimulated_03.data}
        columns={['Candidato / Resposta', 'n', '%']}
        total={reportData.senator.stimulated_03.total}
      />
      <DataSection
        id="sen-4"
        kicker="Bloco 09 · Senado Federal"
        subtitle="Cenário estimulado 04"
        questionId="Q12 · Estimulada 04"
        questionText={reportData.senator.stimulated_04.question}
        chartTitle={reportData.senator.stimulated_04.title}
        chartData={reportData.senator.stimulated_04.data}
        columns={['Candidato / Resposta', 'n', '%']}
        total={reportData.senator.stimulated_04.total}
      />

      {/* Evaluations */}
      <EvaluationBlock
        id="eval-fed"
        kicker="Bloco 10 · Avaliação federal"
        subtitle="Administração do Presidente Lula"
        questionId="Q13 / Q14 · Avaliação"
        questionText={reportData.evaluations.federal.question}
        approvalData={reportData.evaluations.federal.approval}
        qualitativeData={reportData.evaluations.federal.qualitative}
      />
      <EvaluationBlock
        id="eval-state"
        kicker="Bloco 11 · Avaliação estadual"
        subtitle="Administração do Governador Elmano de Freitas"
        questionId="Q15 / Q16 · Avaliação"
        questionText={reportData.evaluations.state.question}
        approvalData={reportData.evaluations.state.approval}
        qualitativeData={reportData.evaluations.state.qualitative}
      />

      {/* Methodology Glossary */}
      <MethodologyGlossary variant="section" />

      {/* Report Footer */}
      <footer className="py-12 bg-[#03070e] border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-xl">
            <AlgoritmaLogo size="sm" withTagline={true} />
            <p className="text-xs text-slate-400 leading-relaxed">
              {reportData.index.disclaimer}
            </p>
            <p className="text-xs font-mono text-slate-500">
              contato@algoritmadados.com.br · algoritmadados.com.br · Reg. TSE {reportData.header.registration}
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 rounded-md border border-slate-700 hover:border-cyan-400 text-xs font-medium text-slate-200 hover:text-white inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Retornar ao portal</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ReportView;
