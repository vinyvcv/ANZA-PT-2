import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import {
  Sliders, Award, UserCheck, Landmark, RotateCcw,
  ChevronRight, BarChart3, Globe, Users,
} from 'lucide-react';
import { electoral2026Data } from '../data/electoral2026Data';

interface InteractiveSimulatorProps {
  onExploreReport: () => void;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({ onExploreReport }) => {
  const [activeTab, setActiveTab] = useState<'president' | 'governor' | 'senate' | 'deputies'>('governor');

  // Sub-selectors
  const [presView, setPresView] = useState<'ce-2nd' | 'ce-1st' | 'br-2nd'>('ce-2nd');
  const [govView, setGovView] = useState<'official-1st' | 'polls-1st' | 'sim-2nd'>('official-1st');
  const [undecidedShift, setUndecidedShift] = useState<number>(50);
  const [senateSource, setSenateSource] = useState<'datafolha' | 'quaest' | 'atlas' | 'parana'>('datafolha');
  const [deputyHouse, setDeputyHouse] = useState<'federal' | 'stateAlece'>('federal');

  // Interactive 2nd Turn Simulator (based on Algoritma Dados CE-07550/2026)
  const baseCiro = 49.2;
  const baseElmano = 37.2;
  const baseUndecided = 5.6;
  const baseNull = 8.0;
  const distributedToCiro = (baseUndecided * undecidedShift) / 100;
  const distributedToElmano = baseUndecided - distributedToCiro;
  const simCiro = (baseCiro + distributedToCiro).toFixed(1);
  const simElmano = (baseElmano + distributedToElmano).toFixed(1);

  const currentPres =
    presView === 'ce-2nd'
      ? electoral2026Data.president.ceSecondTurn
      : presView === 'ce-1st'
      ? electoral2026Data.president.ceFirstTurn
      : electoral2026Data.president.brSecondTurn;

  const currentSenate = electoral2026Data.senatorCE[senateSource];
  const currentDeputies = electoral2026Data.deputiesCE[deputyHouse];

  return (
    <section id="simulador" className="py-20 bg-[#08101e] relative border-t border-white/5">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Sliders size={18} />
              <span className="text-xs font-black uppercase tracking-[0.3em] font-mono">
                CENÁRIOS REAIS 2026 · BRASIL, NORDESTE & CEARÁ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-outfit">
              Laboratório de Cenários Eleitorais
            </h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mt-2">
              Explore os dados oficiais do TSE e dos principais institutos (Datafolha, Quaest, AtlasIntel e Paraná Pesquisas) para 1º e 2º turnos com foco no Nordeste e Ceará.
            </p>
          </div>

          <button
            onClick={onExploreReport}
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-200 border border-sky-500/30 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 hover:border-sky-400 shrink-0 font-outfit"
          >
            <BarChart3 size={16} />
            <span>Ver Relatório Oficial Completo</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Main Tab Selector */}
        <div className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-8 max-w-4xl">
          {[
            { id: 'president', label: 'Presidente (BR · NE · CE)', icon: Globe },
            { id: 'governor', label: 'Governador CE (1º & 2º Turno)', icon: Landmark },
            { id: 'senate', label: 'Senador CE (2 Vagas)', icon: UserCheck },
            { id: 'deputies', label: 'Deputados CE (Fed. & Alece)', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-outfit ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRESIDENTE (BRASIL, NORDESTE & CEARÁ) */}
        {activeTab === 'president' && (
          <div className="space-y-8">
            <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest font-mono">
                    ELEIÇÃO PRESIDENCIAL 2026 · DADOS OFICIAIS TSE
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit">
                    {currentPres.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{currentPres.subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'ce-2nd', label: 'Ceará · 2º Turno' },
                    { id: 'ce-1st', label: 'Ceará · 1º Turno' },
                    { id: 'br-2nd', label: 'Brasil · 2º Turno' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setPresView(v.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all ${
                        presView === v.id
                          ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[220px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={currentPres.data} margin={{ right: 60, left: 10 }}>
                    <XAxis type="number" domain={[0, 80]} hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={175}
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
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={36}>
                      {currentPres.data.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="right"
                        content={({ x, y, width, height, value }: any) => (
                          <text
                            x={(x || 0) + (width || 0) + 10}
                            y={(y || 0) + (height || 0) / 2}
                            fill="#fff"
                            textAnchor="start"
                            dominantBaseline="middle"
                            className="text-xs font-black font-outfit"
                          >
                            {Number(value).toFixed(2)}%
                          </text>
                        )}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {currentPres.data.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white uppercase font-outfit">{c.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{c.votes}</div>
                    </div>
                    <div className="text-2xl font-black font-outfit" style={{ color: c.color }}>
                      {c.value.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Northeast Regional Overview */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">
                      DESTAQUE REGIONAL · NORDESTE
                    </span>
                    <h4 className="text-base font-black text-white uppercase font-outfit">
                      {electoral2026Data.president.northeastOverview.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{currentPres.turnout}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {electoral2026Data.president.northeastOverview.highlights.map((h, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-black/30 border border-white/5 text-center">
                      <div className="text-xl font-black text-cyan-400 font-outfit">{h.value}</div>
                      <div className="text-[10px] font-bold text-white uppercase mt-1">{h.label}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">{h.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GOVERNADOR CEARÁ (1º & 2º TURNO) */}
        {activeTab === 'governor' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'official-1st', label: 'Resultado Oficial 1º Turno (TSE)' },
                { id: 'polls-1st', label: 'Pesquisas de Véspera (1º Turno)' },
                { id: 'sim-2nd', label: 'Simulações & Laboratório 2º Turno' },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setGovView(v.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all ${
                    govView === v.id
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {govView === 'official-1st' && (
              <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">
                      ELEITO NO 1º TURNO · 100% DAS URNAS
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit">
                      {electoral2026Data.governorCE.officialFirstTurn.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {electoral2026Data.governorCE.officialFirstTurn.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Brancos: 2,88% · Nulos: 5,57%
                  </span>
                </div>

                <div className="h-[300px] w-full mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={electoral2026Data.governorCE.officialFirstTurn.data} margin={{ right: 60, left: 10 }}>
                      <XAxis type="number" domain={[0, 65]} hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={195}
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
                        {electoral2026Data.governorCE.officialFirstTurn.data.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
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
                              {Number(value).toFixed(2)}%
                            </text>
                          )}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {electoral2026Data.governorCE.officialFirstTurn.data.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                      <div className="text-lg font-black text-white font-outfit">{item.value.toFixed(2)}%</div>
                      <div className="text-[10px] text-slate-300 font-bold truncate mt-0.5">{item.name}</div>
                      <div className="text-[9px] text-slate-400 font-mono">{item.votes}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {govView === 'polls-1st' && (
              <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                <div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest font-mono">
                    RETA FINAL · VOTOS VÁLIDOS
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit">
                    {electoral2026Data.governorCE.evePollsFirstTurn.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {electoral2026Data.governorCE.evePollsFirstTurn.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {electoral2026Data.governorCE.evePollsFirstTurn.institutes.map((inst, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-cyan-400 font-mono uppercase">{inst.institute}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{inst.note}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-white">Elmano de Freitas (PT)</span>
                            <span className="text-red-400 font-black">{inst.elmano.toFixed(1)}%</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: `${inst.elmano}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-white">Ciro Gomes (PSDB)</span>
                            <span className="text-blue-400 font-black">{inst.ciro.toFixed(1)}%</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${inst.ciro}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {govView === 'sim-2nd' && (
              <div className="space-y-6">
                {/* Real 2nd Turn Polls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {electoral2026Data.governorCE.secondTurnPolls.institutes.map((inst, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-cyan-400 font-mono uppercase">{inst.institute}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{inst.note}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase">Elmano (PT)</div>
                          <div className="text-2xl font-black text-red-400 font-outfit">{inst.elmano}%</div>
                        </div>
                        <div className="text-xs font-mono text-slate-500">vs</div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-400 uppercase">Ciro (PSDB)</div>
                          <div className="text-2xl font-black text-blue-400 font-outfit">{inst.ciro}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Undecided Redistribution Simulator */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest font-mono">
                          PROJEÇÃO DINÂMICA · CE-07550/2026
                        </span>
                        <button
                          onClick={() => setUndecidedShift(50)}
                          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                        >
                          <RotateCcw size={12} /> Redefinir (50/50)
                        </button>
                      </div>

                      <h3 className="text-xl font-black text-white uppercase font-outfit mb-3">
                        Redistribuição de Indecisos (5,6%)
                      </h3>
                      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                        Simule a migração dos votos indecisos em um cenário hipotético de 2º turno no Ceará.
                      </p>

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
                          className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>100% Elmano</span>
                          <span>50 / 50</span>
                          <span>100% Ciro</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-center">
                          <div className="text-3xl font-black text-blue-400 font-outfit">{simCiro}%</div>
                          <div className="text-xs font-black text-white uppercase mt-1">Ciro Gomes</div>
                          <div className="text-[10px] text-slate-400 font-mono">Base: 49.2%</div>
                        </div>

                        <div className="p-4 rounded-2xl bg-red-600/10 border border-red-500/30 text-center">
                          <div className="text-3xl font-black text-red-400 font-outfit">{simElmano}%</div>
                          <div className="text-xs font-black text-white uppercase mt-1">Elmano de Freitas</div>
                          <div className="text-[10px] text-slate-400 font-mono">Base: 37.2%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">
                          SIMULAÇÃO DE 2º TURNO (CENÁRIO HIPOTÉTICO)
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                          DIFERENÇA: {(Number(simCiro) - Number(simElmano)).toFixed(1)} p.p.
                        </span>
                      </div>

                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={[
                              { name: 'Ciro Gomes (PSDB)', value: Number(simCiro), color: '#3b82f6' },
                              { name: 'Elmano de Freitas (PT)', value: Number(simElmano), color: '#ef4444' },
                              { name: 'Branco / Nulo', value: baseNull, color: '#64748b' },
                            ]}
                            margin={{ right: 45, left: 10 }}
                          >
                            <XAxis type="number" domain={[0, 60]} hide />
                            <YAxis
                              dataKey="name"
                              type="category"
                              width={165}
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
                      <span>Base: Levantamento Algoritma Dados (Reg. TSE CE-07550/2026)</span>
                      <span className="font-mono text-white font-bold">N = 1.225</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SENADO CEARÁ 2026 (2 VAGAS) */}
        {activeTab === 'senate' && (
          <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest font-mono">
                  SENADO FEDERAL · CEARÁ · 2 VAGAS EM DISPUTA
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit">
                  {currentSenate.institute} ({currentSenate.date})
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Critério: {currentSenate.metric}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'datafolha', label: 'Datafolha (03/10)' },
                  { id: 'quaest', label: 'Quaest (03/10)' },
                  { id: 'atlas', label: 'AtlasIntel (30/09)' },
                  { id: 'parana', label: 'Paraná Pesq. (26/09)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSenateSource(s.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all ${
                      senateSource === s.id
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/25'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[320px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={currentSenate.data} margin={{ right: 55, left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={205}
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
                    {currentSenate.data.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
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

        {/* TAB 4: DEPUTADOS CEARÁ (FEDERAL 22 VAGAS & ALECE 46 VAGAS) */}
        {activeTab === 'deputies' && (
          <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest font-mono">
                  PROPORCIONAL · COMPOSIÇÃO PARTIDÁRIA TSE 2026
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit">
                  {currentDeputies.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{currentDeputies.subtitle}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setDeputyHouse('federal')}
                  className={`px-4 py-2 rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all ${
                    deputyHouse === 'federal'
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  Federais (22)
                </button>
                <button
                  onClick={() => setDeputyHouse('stateAlece')}
                  className={`px-4 py-2 rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all ${
                    deputyHouse === 'stateAlece'
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  Estaduais · Alece (46)
                </button>
              </div>
            </div>

            <div className="h-[340px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={currentDeputies.data} margin={{ right: 55, left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="party"
                    type="category"
                    width={195}
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
                  <Bar dataKey="seats" radius={[0, 8, 8, 0]} barSize={26}>
                    {currentDeputies.data.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="seats"
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
                          {value} {Number(value) === 1 ? 'vaga' : 'vagas'}
                        </text>
                      )}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 font-medium">
              <strong className="text-cyan-400 font-mono uppercase mr-2">Destaque:</strong>
              {currentDeputies.topHighlight}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveSimulator;
