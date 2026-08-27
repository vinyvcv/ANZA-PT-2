import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Cell, LabelList 
} from 'recharts';
import { 
  Landmark, ListOrdered, Settings, Search, UserCheck, 
  Activity, Award, ClipboardList, BookOpen, ChevronRight, 
  ChevronLeft, MessageSquare, Quote, ArrowLeft, Download, 
  Share2, Check, ArrowUpRight, Filter 
} from 'lucide-react';
import { reportData, SurveyRow } from '../data/reportData';
import { AnzaLogo } from './AnzaLogo';

const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, sub }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center min-w-[140px] md:min-w-[170px] flex-1 md:flex-none shadow-xl"
  >
    <div className="text-2xl md:text-4xl font-black text-white mb-1 font-outfit">{value}</div>
    <div className="text-[9px] md:text-[10px] font-black text-amber-400 uppercase tracking-widest font-mono">{label}</div>
    {sub && <div className="text-[8px] text-slate-400 mt-0.5">{sub}</div>}
  </motion.div>
);

interface SectionHeaderProps {
  icon?: any;
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title, subtitle }) => (
  <div className="flex flex-col mb-8 md:mb-12 border-l-4 border-amber-500 pl-4 md:pl-6 py-1">
    <div className="flex items-center gap-2.5 text-amber-400 mb-1">
      {Icon && <Icon size={18} className="md:w-[20px] md:h-[20px]" />}
      <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] font-mono">{title}</span>
    </div>
    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight font-outfit">{subtitle}</h2>
  </div>
);

interface DataTableProps {
  columns: string[];
  data: SurveyRow[];
  total?: { n: number; value: number };
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, total }) => (
  <div className="w-full overflow-hidden rounded-2xl border border-white/10 mt-6 md:mt-8 shadow-2xl">
    <table className="w-full text-left text-[11px] md:text-[12px] font-bold uppercase tracking-tight">
      <thead className="bg-[#180d33] text-amber-300 border-b border-white/10 uppercase font-mono text-[10px]">
        <tr>
          {columns.map((col, i) => (
            <th key={i} className={`px-4 md:px-6 py-3.5 ${i === 0 ? 'text-left' : 'text-center'}`}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-[#0e061e]/60 backdrop-blur-md divide-y divide-white/5">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-white/[0.04] transition-colors">
            <td className="px-4 md:px-6 py-3 md:py-4 text-slate-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color || '#8b5cf6' }} />
              <span>{row.name}</span>
            </td>
            <td className="px-4 md:px-6 py-3 md:py-4 text-violet-300 font-mono text-center">{row.n ? row.n.toLocaleString() : '-'}</td>
            <td className="px-4 md:px-6 py-3 md:py-4 text-white font-black font-outfit text-center text-sm">{row.value.toFixed(1)}%</td>
          </tr>
        ))}
        {total && (
          <tr className="bg-amber-500/10 text-white font-black border-t border-amber-500/30">
            <td className="px-4 md:px-6 py-3.5 text-amber-300">TOTAL GERAL</td>
            <td className="px-4 md:px-6 py-3.5 text-amber-300 text-center font-mono">{total.n.toLocaleString()}</td>
            <td className="px-4 md:px-6 py-3.5 text-amber-300 text-center font-outfit">{total.value.toFixed(1)}%</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

interface QuestionBoxProps {
  id: string;
  question: string;
  colorClass?: string;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ id, question, colorClass = "amber" }) => {
  const [qId, ...labelParts] = id.split(' · ');
  const label = labelParts.join(' · ');

  return (
    <div className="relative mb-10 group">
      <div className="relative flex flex-col md:flex-row items-start gap-6 p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-2xl shadow-xl overflow-hidden">
        
        {/* Identity Badge */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="relative px-5 py-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 flex flex-col items-center justify-center min-w-[90px] shadow-lg">
             <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] mb-1 font-mono">ENUNCIADO</span>
             <span className="text-xl font-black text-white tracking-tight font-outfit">{qId}</span>
             <div className="mt-2 p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <MessageSquare size={14} />
             </div>
          </div>
        </div>

        {/* Question Text Content */}
        <div className="flex-grow space-y-3 pt-1 text-left">
          <div className="flex items-center gap-3">
             <div className="h-[1px] w-6 bg-amber-500/50" />
             <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] font-mono">
                {label || "PERGUNTA APLICADA AO ELEITOR"}
             </span>
          </div>
          
          <div className="relative">
            <Quote size={36} className="absolute -left-3 -top-5 opacity-10 text-amber-400 pointer-events-none transform -scale-x-100" />
            <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed tracking-tight max-w-4xl relative z-10 italic">
               {question.replace(/^"|"$/g, '')}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DataSectionProps {
  id: string;
  icon?: any;
  title: string;
  subtitle: string;
  questionId: string;
  questionText: string;
  questionColor?: string;
  chartTitle: string;
  chartData: SurveyRow[];
  columns: string[];
  total?: { n: number; value: number };
}

const DataSection: React.FC<DataSectionProps> = ({
  id, icon, title, subtitle, questionId, questionText, questionColor, chartTitle, chartData, columns, total
}) => {
  const [mounted, setMounted] = useState(false);
  const size = useWindowSize();
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id={id} className="py-8 md:py-14 px-4 border-b border-white/5 last:border-0 relative scroll-mt-24 text-left">
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        <SectionHeader icon={icon} title={title} subtitle={subtitle} />
        <QuestionBox id={questionId} question={questionText} colorClass={questionColor} />
        
        <div className="p-4 md:p-8 bg-white/[0.01] border border-white/10 rounded-3xl min-h-[380px]">
          <h4 className="text-center text-[10px] font-black text-amber-400 uppercase tracking-widest mb-6 font-mono">
            {chartTitle}
          </h4>
          
          <div className="h-[280px] md:h-[340px] w-full relative">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart layout="vertical" data={chartData} margin={{ right: 45, left: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={size.width < 768 ? 110 : 220} 
                    stroke="#64748b" 
                    fontSize={size.width < 768 ? 9 : 11} 
                    tick={{ fontWeight: 700, fill: '#cbd5e1' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#0f172a', 
                      borderColor: '#1e293b', 
                      borderRadius: '12px',
                      color: '#fff' 
                    }} 
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                    {chartData.map((entry, i) => (<Cell key={i} fill={entry.color || '#8b5cf6'} />))}
                    <LabelList 
                      dataKey="value" 
                      position="right" 
                      content={(props: any) => {
                        const { x, y, width, height, value } = props;
                        return (
                          <text x={x + width + 8} y={y + height / 2} fill="#cbd5e1" textAnchor="start" dominantBaseline="middle" className="text-[11px] font-black font-outfit">
                            {Number(value).toFixed(1)}%
                          </text>
                        );
                      }}
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
  icon?: any;
  title: string;
  subtitle: string;
  questionId: string;
  questionText: string;
  questionColor?: string;
  approvalData: { title: string; data: SurveyRow[] };
  qualitativeData: { title: string; data: SurveyRow[] };
}

const EvaluationBlock: React.FC<EvaluationBlockProps> = ({
  id, icon, title, subtitle, questionId, questionText, questionColor, approvalData, qualitativeData
}) => {
  const [mounted, setMounted] = useState(false);
  const size = useWindowSize();
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id={id} className="py-8 md:py-14 px-4 border-b border-white/5 last:border-0 relative scroll-mt-24 text-left">
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        <SectionHeader icon={icon} title={title} subtitle={subtitle} />
        <QuestionBox id={questionId} question={questionText} colorClass={questionColor} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {[approvalData, qualitativeData].map((chart, idx) => (
            <div key={idx} className="p-4 md:p-6 bg-white/[0.01] border border-white/10 rounded-3xl min-h-[320px]">
              <h4 className="text-center text-[10px] font-black text-amber-400 uppercase tracking-widest mb-6 font-mono">
                {chart.title}
              </h4>
              
              <div className="h-[180px] md:h-[220px] w-full relative">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart layout="vertical" data={chart.data} margin={{ right: 45, left: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={size.width < 768 ? 95 : 140} 
                        stroke="#64748b" 
                        fontSize={size.width < 768 ? 9 : 11} 
                        tick={{ fontWeight: 700, fill: '#cbd5e1' }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          background: '#0f172a', 
                          borderColor: '#1e293b', 
                          borderRadius: '12px',
                          color: '#fff' 
                        }} 
                      />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={26}>
                        {chart.data.map((entry, i) => (<Cell key={i} fill={entry.color || '#8b5cf6'} />))}
                        <LabelList 
                          dataKey="value" 
                          position="right" 
                          content={(props: any) => {
                            const { x, y, width, height, value } = props;
                            return (
                              <text x={x + width + 8} y={y + height / 2} fill="#cbd5e1" textAnchor="start" dominantBaseline="middle" className="text-[10px] font-black font-outfit">
                                {Number(value).toFixed(1)}%
                              </text>
                            );
                          }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              
              <DataTable columns={["Resposta", "%"]} data={chart.data} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SECTIONS = [
  'hero-report',
  'index',
  'methodology',
  'gov-spont',
  'gov-stim',
  'gov-2',
  'sen-spont',
  'sen-1',
  'sen-2',
  'sen-3',
  'sen-4',
  'eval-fed',
  'eval-state'
];

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
    <div className="min-h-screen bg-[#0d051c] text-[#fafafa] selection:bg-amber-500/30 font-sans pb-40 overflow-x-hidden scroll-smooth text-left">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
         <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-violet-600/5 blur-[180px] rounded-full" />
         <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      {/* Floating Controls Overlay */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 pointer-events-none">
         <motion.button 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           onClick={onBack}
           className="p-4 px-5 rounded-2xl bg-amber-500 text-slate-950 font-black pointer-events-auto transition-all shadow-2xl hover:bg-amber-400 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group font-outfit"
           title="Retornar ao Hub"
         >
           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
           <span className="text-[11px] uppercase tracking-[0.2em]">Retornar ao Hub Principal</span>
         </motion.button>
         
         <div className="flex gap-2">
            <button 
              onClick={() => {
                window.scrollBy({ top: -window.innerHeight * 0.75, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-violet-600 pointer-events-auto transition-all shadow-2xl backdrop-blur-3xl"
              title="Seção Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => {
                window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-violet-600 pointer-events-auto transition-all shadow-2xl backdrop-blur-3xl"
              title="Próxima Seção"
            >
              <ChevronRight size={20} />
            </button>
         </div>
      </div>

      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-[#0d051c]/95 border-b border-white/10 backdrop-blur-xl py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={onBack}>
            <AnzaLogo size="sm" withTagline={true} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-all"
            >
              {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copiado' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/40 border border-violet-500/40 text-xs font-bold text-violet-200 flex items-center gap-1.5 transition-all"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>

            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition-all font-outfit"
            >
              Fechar Relatório
            </button>
          </div>
        </div>
      </header>

      {/* CAPA / HERO REPORT */}
      <div id="hero-report" className="relative min-h-[50vh] flex flex-col pt-10 px-4">
        <div className="max-w-7xl mx-auto w-full px-2 md:px-6 flex flex-col items-center text-center">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-amber-500" />
            <span className="text-[10px] md:text-xs font-bold text-amber-400 uppercase tracking-[0.25em] font-mono">
              {reportData.header.badge}
            </span>
            <div className="w-8 h-[2px] bg-amber-500" />
          </div>

          <h1 className="text-3xl md:text-6xl font-black text-white mb-2 tracking-tight leading-tight uppercase font-outfit">
            {reportData.header.title}
          </h1>

          <h2 className="text-2xl md:text-5xl font-black text-violet-400 mb-6 tracking-tight leading-tight uppercase font-outfit">
            {reportData.header.subtitle}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed mb-8 font-medium">
            {reportData.header.description}
          </p>

          <div className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center gap-3 md:gap-5 w-full">
            <StatCard label="Entrevistas" value={reportData.header.sampleSize} sub="Amostra quantitativa" />
            <StatCard label="Municípios" value={reportData.header.municipalities} sub="Cobertura estadual" />
            <StatCard label="Margem de Erro" value={reportData.header.marginOfError} sub="Intervalo de confiança" />
            <StatCard label="Confiança" value={reportData.header.confidence} sub="Padrão estatístico" />
          </div>
        </div>
      </div>

      {/* ÍNDICE GERAL DE NAVEGAÇÃO */}
      <section id="index" className="py-12 md:py-16 px-4 border-b border-white/5 relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-2 md:px-6">
          <SectionHeader icon={ListOrdered} title="SUMÁRIO EXECUTIVO" subtitle={reportData.index.title} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {reportData.index.items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => scrollToSection(item.anchor)} 
                className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-violet-600/10 hover:border-amber-500/30 transition-all group cursor-pointer shadow-lg"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-violet-950/80 border border-violet-500/30 flex items-center justify-center text-[10px] md:text-[11px] font-black text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all font-mono">
                    {item.id}
                  </span>
                  <span className="text-[11px] md:text-[12px] font-bold text-slate-300 group-hover:text-white flex flex-col">
                    {item.label}
                    <span className="text-[8px] opacity-50 uppercase font-bold font-mono mt-0.5">Seção {item.id}</span>
                  </span>
                </div>
                <span className="text-[9px] font-black text-slate-500 group-hover:text-amber-400 font-mono">PÁG.{item.page}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK: FICHA TÉCNICA */}
      <section id="methodology" className="py-12 md:py-16 px-4 border-b border-white/5 relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-2 md:px-6">
          <SectionHeader icon={BookOpen} title="METODOLOGIA E CONTROLE" subtitle={reportData.methodology.title} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="p-6 md:p-8 bg-white/[0.01] border border-white/10 rounded-3xl">
              <h4 className="text-white text-sm md:text-base font-black uppercase tracking-tight mb-6 flex items-center gap-2 font-outfit">
                <Settings size={16} className="text-amber-500"/> 
                Parâmetros Técnicos Registrados
              </h4>
              <div className="space-y-3">
                {Object.entries(reportData.methodology.technicalParams).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-white/5 pb-2.5 text-xs">
                    <span className="text-slate-400 font-bold uppercase">{key}</span>
                    <span className="text-white font-mono font-bold text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 bg-white/[0.01] border border-white/10 rounded-3xl flex flex-col justify-between">
              <div>
                <h4 className="text-white text-sm md:text-base font-black uppercase tracking-tight mb-4 font-outfit">
                  Estratificação da Amostra
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {reportData.methodology.stratification.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {reportData.methodology.stratification.quotas.map(q => (
                    <span key={q} className="px-3 py-1.5 rounded-xl bg-violet-600/10 border border-violet-500/20 text-[9px] md:text-[10px] font-black text-violet-300 uppercase font-mono">
                      {q}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
                Responsável Técnico: Equipe de Estatística ANZA Pesquisa · Registro CONRE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK: GOVERNADOR */}
      <DataSection id="gov-spont" icon={Landmark} title="GOVERNADOR DO CEARÁ" subtitle="Cenário Espontâneo" questionId="Q5 · ESPONTÂNEA" questionText={reportData.governor.spontaneous.question} questionColor="amber" chartTitle={reportData.governor.spontaneous.title} chartData={reportData.governor.spontaneous.data} columns={["Candidato / Resposta", "N", "%"]} total={reportData.governor.spontaneous.total} />
      <DataSection id="gov-stim" icon={Landmark} title="GOVERNADOR DO CEARÁ" subtitle="Cenário Estimulado 1º Turno" questionId="Q6 · ESTIMULADA" questionText={reportData.governor.stimulated.question} questionColor="blue" chartTitle={reportData.governor.stimulated.title} chartData={reportData.governor.stimulated.data} columns={["Candidato / Resposta", "N", "%"]} total={reportData.governor.stimulated.total} />
      <DataSection id="gov-2" icon={Landmark} title="GOVERNADOR DO CEARÁ" subtitle="Cenário de Segundo Turno" questionId="Q7 · 2º TURNO" questionText={reportData.governor.secondTurn.question} questionColor="indigo" chartTitle={reportData.governor.secondTurn.title} chartData={reportData.governor.secondTurn.data} columns={["Candidato / Resposta", "N", "%"]} total={reportData.governor.secondTurn.total} />

      {/* BLOCK: SENADOR */}
      <DataSection id="sen-spont" icon={UserCheck} title="SENADO FEDERAL" subtitle="Espontânea (1º Nome)" questionId="Q8 · ESPONTÂNEA" questionText={reportData.senator.spontaneous.question} questionColor="purple" chartTitle={reportData.senator.spontaneous.title} chartData={reportData.senator.spontaneous.data} columns={["Candidato / Resposta (1º Nome)", "N", "%"]} total={reportData.senator.spontaneous.total} />
      <DataSection id="sen-1" icon={UserCheck} title="SENADO FEDERAL" subtitle="Cenário Estimulado 01" questionId="Q9 · ESTIMULADA 01" questionText={reportData.senator.stimulated_01.question} questionColor="violet" chartTitle={reportData.senator.stimulated_01.title} chartData={reportData.senator.stimulated_01.data} columns={["Candidato / Resposta", "N", "%"]} total={reportData.senator.stimulated_01.total} />
      <DataSection id="sen-2" icon={UserCheck} title="SENADO FEDERAL" subtitle="Cenário Estimulado 02" questionId="Q10 · ESTIMULADA 02" questionText={reportData.senator.stimulated_02.question} questionColor="cyan" chartTitle={reportData.senator.stimulated_02.title} chartData={reportData.senator.stimulated_02.data} columns={["Candidato / Resposta", "N", "%"]} total={reportData.senator.stimulated_02.total} />
      <DataSection id="sen-3" icon={UserCheck} title="SENADO FEDERAL" subtitle="Cenário Estimulado 03" questionId="Q11 · ESTIMULADA 03" questionText={reportData.senator.stimulated_03.question} questionColor="rose" chartTitle={reportData.senator.stimulated_03.title} chartData={reportData.senator.stimulated_03.data} columns={["Candidato / Resposta", "N", "%"]} total={reportData.senator.stimulated_03.total} />
      <DataSection id="sen-4" icon={UserCheck} title="SENADO FEDERAL" subtitle="Cenário Estimulado 04" questionId="Q12 · ESTIMULADA 04" questionText={reportData.senator.stimulated_04.question} questionColor="emerald" chartTitle={reportData.senator.stimulated_04.title} chartData={reportData.senator.stimulated_04.data} columns={["Candidato / Resposta", "N", "%"]} total={reportData.senator.stimulated_04.total} />

      {/* BLOCK: EVALUATIONS */}
      <EvaluationBlock id="eval-fed" icon={Activity} title="AVALIAÇÃO FEDERAL" subtitle="Presidente Lula" questionId="Q13 / Q14 · AVALIAÇÃO" questionText={reportData.evaluations.federal.question} questionColor="green" approvalData={reportData.evaluations.federal.approval} qualitativeData={reportData.evaluations.federal.qualitative} />
      <EvaluationBlock id="eval-state" icon={Award} title="AVALIAÇÃO ESTADUAL" subtitle="Gov. Elmano de Freitas" questionId="Q15 / Q16 · AVALIAÇÃO" questionText={reportData.evaluations.state.question} questionColor="sky" approvalData={reportData.evaluations.state.approval} qualitativeData={reportData.evaluations.state.qualitative} />

      {/* FINAL FOOTER */}
      <footer className="py-16 bg-[#080214] text-center border-t border-white/5 px-6 backdrop-blur-3xl">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col items-center gap-3">
             <AnzaLogo size="md" withTagline={true} />
             <div className="text-[10px] font-black text-amber-400 uppercase tracking-[0.4em] font-mono">
               Pesquisa e Inteligência de Dados
             </div>
          </div>
          
          <div className="h-0.5 w-24 bg-amber-500/30 mx-auto" />
          
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto italic">
            {reportData.index.disclaimer}
          </p>
          
          <div className="flex justify-center gap-8 text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-4">
             <span>MARÇO 2026</span>
             <span>•</span>
             <span>CEARÁ</span>
             <span>•</span>
             <span>BRASIL</span>
             <span>•</span>
             <span>REGISTRO TSE CE-07550/2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default ReportView;
