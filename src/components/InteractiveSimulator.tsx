import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, PieChart, Pie 
} from 'recharts';
import { 
  Sliders, ArrowRight, Award, UserCheck, Landmark, CheckCircle2, 
  RotateCcw, TrendingUp, HelpCircle, ChevronRight, BarChart3 
} from 'lucide-react';
import { reportData } from '../data/reportData';

interface InteractiveSimulatorProps {
  onExploreReport: () => void;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({ onExploreReport }) => {
  const [activeTab, setActiveTab] = useState<'gov-2nd' | 'gov-stim' | 'senate' | 'approval'>('gov-2nd');
  const [undecidedShift, setUndecidedShift] = useState<number>(50); // 0 = all to Elmano, 100 = all to Ciro
  const [selectedSenateScenario, setSelectedSenateScenario] = useState<'1' | '2' | '3' | '4'>('1');

  // Governor 2nd turn calculations with redistribution
  const baseCiro = 49.2;
  const baseElmano = 37.2;
  const baseUndecided = 5.6;
  const baseNull = 8.0;

  const distributedToCiro = (baseUndecided * undecidedShift) / 100;
  const distributedToElmano = baseUndecided - distributedToCiro;

  const simCiro = (baseCiro + distributedToCiro).toFixed(1);
  const simElmano = (baseElmano + distributedToElmano).toFixed(1);

  // Senate data for selected scenario
  const getSenateData = () => {
    switch (selectedSenateScenario) {
      case '1': return reportData.senator.stimulated_01;
      case '2': return reportData.senator.stimulated_02;
      case '3': return reportData.senator.stimulated_03;
      case '4': return reportData.senator.stimulated_04;
      default: return reportData.senator.stimulated_01;
    }
  };

  const currentSenate = getSenateData();

  return (
    <section id="simulador" className="py-20 bg-[#0d051c] relative border-t border-white/5">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Sliders size={18} />
              <span className="text-xs font-black uppercase tracking-[0.3em] font-mono">
                SIMULADOR INTERATIVO DE DADOS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-outfit">
              Laboratório de Cenários Eleitorais
            </h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mt-2">
              Teste hipóteses em tempo real: redistribua indecisos no 2º turno, compare os 4 cenários ao Senado e analise o saldo de aprovação dos governos.
            </p>
          </div>

          <button
            onClick={onExploreReport}
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-200 border border-violet-500/30 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 hover:border-violet-400 shrink-0 font-outfit"
          >
            <BarChart3 size={16} />
            <span>Ver Relatório Oficial Completo</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-8 max-w-3xl">
          {[
            { id: 'gov-2nd', label: '2º Turno Governador', icon: Landmark },
            { id: 'gov-stim', label: '1º Turno Estimulado', icon: Award },
            { id: 'senate', label: 'Simulações Senado (4 Cenários)', icon: UserCheck },
            { id: 'approval', label: 'Aprovações Lula vs Elmano', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[150px] py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-outfit ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: 2nd Turn Simulator with Undecided Redistribution */}
        {activeTab === 'gov-2nd' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Simulation Interactive Controls */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest font-mono">
                    PROJEÇÃO DINÂMICA
                  </span>
                  <button
                    onClick={() => setUndecidedShift(50)}
                    className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                  >
                    <RotateCcw size={12} /> Redefinir (50/50)
                  </button>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit mb-3">
                  Redistribuição de Indecisos (5,6%)
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Arraste o cursor abaixo para simular como a migração de votos dos indecisos e não respondentes impacta o resultado final entre os dois líderes.
                </p>

                {/* Slider */}
                <div className="space-y-3 p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-red-400">Elmano (+{distributedToElmano.toFixed(1)}%)</span>
                    <span className="text-blue-400">Ciro (+{distributedToCiro.toFixed(1)}%)</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={undecidedShift}
                    onChange={(e) => setUndecidedShift(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>100% pró Elmano</span>
                    <span>Divisão Neutra</span>
                    <span>100% pró Ciro</span>
                  </div>
                </div>

                {/* Projected Standings */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-center">
                    <div className="text-3xl font-black text-blue-400 font-outfit">{simCiro}%</div>
                    <div className="text-xs font-black text-white uppercase mt-1">Ciro Gomes</div>
                    <div className="text-[10px] text-slate-400 font-mono">PSDB (Base: 49.2%)</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-red-600/10 border border-red-500/30 text-center">
                    <div className="text-3xl font-black text-red-400 font-outfit">{simElmano}%</div>
                    <div className="text-xs font-black text-white uppercase mt-1">Elmano de Freitas</div>
                    <div className="text-[10px] text-slate-400 font-mono">PT (Base: 37.2%)</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Brancos / Nulos Fixos</div>
                  <div className="text-[10px] text-slate-400">Sem alteração na simulação</div>
                </div>
                <div className="text-lg font-black text-slate-400 font-outfit">{baseNull.toFixed(1)}%</div>
              </div>
            </div>

            {/* Right: Visual Bar Chart */}
            <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">
                    COMPARAÇÃO GRÁFICA SIMULADA vs OFICIAL
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    DIFERENÇA: {(Number(simCiro) - Number(simElmano)).toFixed(1)} p.p.
                  </span>
                </div>

                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: 'Ciro Gomes (PSDB)', value: Number(simCiro), color: '#3b82f6', base: baseCiro },
                        { name: 'Elmano de Freitas (PT)', value: Number(simElmano), color: '#ef4444', base: baseElmano },
                        { name: 'Branco / Nulo', value: baseNull, color: '#64748b', base: baseNull },
                        { name: 'Indecisos Restantes', value: 0, color: '#94a3b8', base: baseUndecided },
                      ]}
                      margin={{ right: 40, left: 10 }}
                    >
                      <XAxis type="number" domain={[0, 60]} hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={160}
                        tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 700 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#334155',
                          borderRadius: '12px',
                          color: '#fff',
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                        <Cell fill="#3b82f6" />
                        <Cell fill="#ef4444" />
                        <Cell fill="#64748b" />
                        <Cell fill="#94a3b8" />
                        <LabelList
                          dataKey="value"
                          position="right"
                          content={({ x, y, width, height, value }: any) => (
                            <text
                              x={(x || 0) + (width || 0) + 8}
                              y={(y || 0) + (height || 0) / 2}
                              fill="#fff"
                              textAnchor="start"
                              dominantBaseline="middle"
                              className="text-xs font-black font-outfit"
                            >
                              {Number(value).toFixed(1)}%
                            </text>
                          )}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Pergunta: "Em um eventual segundo turno para Governador, no Ceará, em quem o(a) Sr(a) votaria?"</span>
                <span className="font-mono text-white font-bold">N = 1.225</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Governor Stimulated 1st Turn */}
        {activeTab === 'gov-stim' && (
          <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest font-mono">
                  DISPUTA MAJORITÁRIA · 1º TURNO
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit">
                  Intenção de Voto Estimulada para Governador
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
                1.225 Entrevistas · ±2,8%
              </span>
            </div>

            <div className="h-[340px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={reportData.governor.stimulated.data} margin={{ right: 50, left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={200}
                    tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 700 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
                    {reportData.governor.stimulated.data.map((entry, i) => (
                      <Cell key={i} fill={entry.color || '#8b5cf6'} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="right"
                      content={({ x, y, width, height, value }: any) => (
                        <text
                          x={(x || 0) + (width || 0) + 8}
                          y={(y || 0) + (height || 0) / 2}
                          fill="#fff"
                          textAnchor="start"
                          dominantBaseline="middle"
                          className="text-xs font-black font-outfit"
                        >
                          {Number(value).toFixed(1)}%
                        </text>
                      )}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick table metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {reportData.governor.stimulated.data.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <div className="text-lg font-black text-white font-outfit">{item.value.toFixed(1)}%</div>
                  <div className="text-[10px] text-slate-300 font-bold truncate mt-0.5">{item.name}</div>
                  <div className="text-[9px] text-slate-500 font-mono">N = {item.n}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Senate 4 Scenarios Switcher */}
        {activeTab === 'senate' && (
          <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest font-mono">
                  SENADO FEDERAL · 2 VAGAS EM DISPUTA
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit">
                  Comparativo dos 4 Cenários Estimulados
                </h3>
              </div>

              {/* Scenario pills */}
              <div className="flex gap-2">
                {(['1', '2', '3', '4'] as const).map((sc) => (
                  <button
                    key={sc}
                    onClick={() => setSelectedSenateScenario(sc)}
                    className={`px-4 py-2 rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all ${
                      selectedSenateScenario === sc
                        ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/25'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    Cenário {sc}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-6 text-xs text-slate-300 italic">
              {currentSenate.question}
            </div>

            <div className="h-[360px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={currentSenate.data} margin={{ right: 50, left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={220}
                    tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 700 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={26}>
                    {currentSenate.data.map((entry, i) => (
                      <Cell key={i} fill={entry.color || '#8b5cf6'} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="right"
                      content={({ x, y, width, height, value }: any) => (
                        <text
                          x={(x || 0) + (width || 0) + 8}
                          y={(y || 0) + (height || 0) / 2}
                          fill="#fff"
                          textAnchor="start"
                          dominantBaseline="middle"
                          className="text-xs font-black font-outfit"
                        >
                          {Number(value).toFixed(1)}%
                        </text>
                      )}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 4: Evaluations Lula vs Elmano */}
        {activeTab === 'approval' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Federal Block */}
            <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">
                    GOVERNO FEDERAL
                  </span>
                  <h3 className="text-xl font-black text-white uppercase font-outfit">
                    Presidente Lula
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400 font-outfit">55.2%</div>
                  <div className="text-[9px] text-slate-400 font-mono uppercase">Aprovação Geral</div>
                </div>
              </div>

              {/* Mini visual bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-400">Aprova (55.2%)</span>
                    <span className="text-red-400">Desaprova (37.9%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: '55.2%' }} />
                    <div className="h-full bg-slate-500" style={{ width: '6.9%' }} />
                    <div className="h-full bg-red-500" style={{ width: '37.9%' }} />
                  </div>
                  <div className="text-[9px] text-slate-500 text-right mt-1 font-mono">Não sabe / Não opinou: 6.9%</div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3">
                    Avaliação Qualitativa:
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20">
                      <div className="text-base font-black text-blue-400">42.8%</div>
                      <div className="text-[10px] text-slate-300">Ótima / Boa</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-600/10 border border-amber-500/20">
                      <div className="text-base font-black text-amber-400">21.4%</div>
                      <div className="text-[10px] text-slate-300">Regular</div>
                    </div>
                    <div className="p-3 rounded-xl bg-red-600/10 border border-red-500/20">
                      <div className="text-base font-black text-red-400">33.1%</div>
                      <div className="text-[10px] text-slate-300">Ruim / Péssima</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* State Block */}
            <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">
                    GOVERNO DO ESTADO DO CEARÁ
                  </span>
                  <h3 className="text-xl font-black text-white uppercase font-outfit">
                    Gov. Elmano de Freitas
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400 font-outfit">56.4%</div>
                  <div className="text-[9px] text-slate-400 font-mono uppercase">Aprovação Geral</div>
                </div>
              </div>

              {/* Mini visual bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-400">Aprova (56.4%)</span>
                    <span className="text-red-400">Desaprova (34.8%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: '56.4%' }} />
                    <div className="h-full bg-slate-500" style={{ width: '8.8%' }} />
                    <div className="h-full bg-red-500" style={{ width: '34.8%' }} />
                  </div>
                  <div className="text-[9px] text-slate-500 text-right mt-1 font-mono">Não sabe / Não opinou: 8.8%</div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3">
                    Avaliação Qualitativa:
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20">
                      <div className="text-base font-black text-blue-400">34.2%</div>
                      <div className="text-[10px] text-slate-300">Ótima / Boa</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-600/10 border border-amber-500/20">
                      <div className="text-base font-black text-amber-400">31.1%</div>
                      <div className="text-[10px] text-slate-300">Regular</div>
                    </div>
                    <div className="p-3 rounded-xl bg-red-600/10 border border-red-500/20">
                      <div className="text-base font-black text-red-400">28.0%</div>
                      <div className="text-[10px] text-slate-300">Ruim / Péssima</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default InteractiveSimulator;
