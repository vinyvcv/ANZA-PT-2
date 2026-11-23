import React, { useState } from 'react';
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
import { RotateCcw, ArrowUpRight } from 'lucide-react';
import { electoral2026Data } from '../data/electoral2026Data';

interface InteractiveSimulatorProps {
  onExploreReport: () => void;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      name?: string;
      party?: string;
      votes?: string;
      highlights?: string;
      seats?: number;
    };
  }>;
  unit?: '%' | 'vagas';
}

const EditorialTooltip: React.FC<ChartTooltipProps> = ({ active, payload, unit = '%' }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  const val = payload[0].value;
  const title = item.name || item.party || '';

  return (
    <div className="bg-[#050b14] border border-slate-700 rounded-md px-3.5 py-2.5 shadow-xl text-left max-w-[260px]">
      <div className="text-xs font-semibold text-white">{title}</div>
      <div className="text-sm font-mono font-semibold text-cyan-400 tabular-nums mt-0.5">
        {unit === '%'
          ? `${Number(val).toFixed(2)}%`
          : `${val} ${Number(val) === 1 ? 'vaga' : 'vagas'}`}
      </div>
      {item.votes && (
        <div className="text-[11px] font-mono text-slate-400 tabular-nums mt-1">{item.votes}</div>
      )}
      {item.highlights && (
        <div className="text-[11px] text-slate-300 mt-1 leading-snug">{item.highlights}</div>
      )}
    </div>
  );
};

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({ onExploreReport }) => {
  const [activeTab, setActiveTab] = useState<'president' | 'governor' | 'senate' | 'deputies'>('governor');

  const [presView, setPresView] = useState<'ce-2nd' | 'ce-1st' | 'br-2nd'>('ce-2nd');
  const [govView, setGovView] = useState<'official-1st' | 'polls-1st' | 'sim-2nd'>('official-1st');
  const [undecidedShift, setUndecidedShift] = useState<number>(50);
  const [senateSource, setSenateSource] = useState<'datafolha' | 'quaest' | 'atlas' | 'parana'>('datafolha');
  const [deputyHouse, setDeputyHouse] = useState<'federal' | 'stateAlece'>('federal');

  // Interactive 2nd Turn Simulator (Algoritma Dados CE-07550/2026)
  const baseCiro = 49.2;
  const baseElmano = 37.2;
  const baseUndecided = 5.6;
  const baseNull = 8.0;
  const distributedToCiro = (baseUndecided * undecidedShift) / 100;
  const distributedToElmano = baseUndecided - distributedToCiro;
  const simCiro = Number((baseCiro + distributedToCiro).toFixed(1));
  const simElmano = Number((baseElmano + distributedToElmano).toFixed(1));

  const currentPres =
    presView === 'ce-2nd'
      ? electoral2026Data.president.ceSecondTurn
      : presView === 'ce-1st'
      ? electoral2026Data.president.ceFirstTurn
      : electoral2026Data.president.brSecondTurn;

  const currentSenate = electoral2026Data.senatorCE[senateSource];
  const currentDeputies = electoral2026Data.deputiesCE[deputyHouse];

  const mainTabs: { id: 'president' | 'governor' | 'senate' | 'deputies'; label: string }[] = [
    { id: 'president', label: 'Presidente (BR · NE · CE)' },
    { id: 'governor', label: 'Governador CE (1º e 2º turnos)' },
    { id: 'senate', label: 'Senado CE (2 vagas)' },
    { id: 'deputies', label: 'Deputados CE (Federal e Alece)' },
  ];

  return (
    <section id="simulador" className="py-16 sm:py-20 bg-[#050b14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-cyan-400 mb-2">
              Base eleitoral 2026 · Brasil, Nordeste e Ceará
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
              Laboratório de cenários eleitorais
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2.5 leading-relaxed">
              Séries consolidadas com totalização oficial do TSE e levantamentos de Datafolha, Quaest, AtlasIntel, Paraná Pesquisas e Algoritma Dados.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreReport}
            className="self-start lg:self-auto px-4 py-2.5 min-h-[42px] rounded-md border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white text-sm font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Relatório completo Ceará 2026</span>
            <ArrowUpRight size={15} className="text-cyan-400" />
          </button>
        </div>

        {/* Editorial Underline Tab Navigation */}
        <div
          className="flex items-center gap-1 overflow-x-auto border-b border-slate-800 mt-6 mb-8"
          role="tablist"
          aria-label="Cargos em análise"
        >
          {mainTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-cyan-400 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRESIDENTE */}
        {activeTab === 'president' && (
          <div className="bg-[#08101e] border border-slate-800/90 rounded-lg p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div>
                <p className="text-xs font-mono text-slate-400 mb-1">
                  Eleição Presidencial 2026 · Dados oficiais TSE
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {currentPres.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">{currentPres.subtitle}</p>
              </div>

              <div className="inline-flex items-center p-1 bg-[#050b14] border border-slate-800 rounded-md shrink-0 flex-wrap gap-1">
                {[
                  { id: 'ce-2nd', label: 'Ceará · 2º turno' },
                  { id: 'ce-1st', label: 'Ceará · 1º turno' },
                  { id: 'br-2nd', label: 'Brasil · 2º turno' },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setPresView(v.id as 'ce-2nd' | 'ce-1st' | 'br-2nd')}
                    className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      presView === v.id
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 h-[190px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={currentPres.data}
                    margin={{ top: 8, right: 64, left: 0, bottom: 8 }}
                  >
                    <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      domain={[0, 80]}
                      tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                      tickFormatter={(v) => `${v}%`}
                      axisLine={{ stroke: '#1e293b' }}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={150}
                      tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<EditorialTooltip unit="%" />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={32}>
                      {currentPres.data.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="right"
                        content={({ x, y, width, height, value }: any) => (
                          <text
                            x={Number(x || 0) + Number(width || 0) + 10}
                            y={Number(y || 0) + Number(height || 0) / 2}
                            fill="#f8fafc"
                            textAnchor="start"
                            dominantBaseline="middle"
                            className="text-xs font-mono font-semibold"
                          >
                            {Number(value).toFixed(2)}%
                          </text>
                        )}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Clean Tabular Breakdown */}
              <div className="lg:col-span-5 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      <th className="py-2.5 pr-3 font-medium">Candidatura</th>
                      <th className="py-2.5 px-3 font-medium text-right">Votos nominais</th>
                      <th className="py-2.5 pl-3 font-medium text-right">Válidos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {currentPres.data.map((c, idx) => (
                      <tr key={idx}>
                        <td className="py-3 pr-3 font-medium text-slate-100">{c.name}</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-300 tabular-nums">
                          {c.votes?.replace(' votos', '')}
                        </td>
                        <td className="py-3 pl-3 text-right font-mono font-semibold text-white tabular-nums">
                          {c.value.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] font-mono text-slate-400 mt-3 tabular-nums">
                  {currentPres.turnout}
                </p>
              </div>
            </div>

            {/* Northeast Regional Summary Table */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="mb-4">
                <p className="text-xs font-mono text-emerald-400">Recorte regional · Nordeste</p>
                <h4 className="text-base font-semibold text-white mt-0.5">
                  {electoral2026Data.president.northeastOverview.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {electoral2026Data.president.northeastOverview.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 border border-slate-800/80 rounded-md divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80 bg-[#050b14]">
                {electoral2026Data.president.northeastOverview.highlights.map((h, idx) => (
                  <div key={idx} className="p-4">
                    <div className="text-lg font-mono font-semibold text-cyan-400 tabular-nums">
                      {h.value}
                    </div>
                    <div className="text-xs font-medium text-slate-200 mt-1">{h.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{h.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GOVERNADOR CEARÁ */}
        {activeTab === 'governor' && (
          <div className="space-y-6">
            <div className="inline-flex items-center p-1 bg-[#08101e] border border-slate-800 rounded-md flex-wrap gap-1">
              {[
                { id: 'official-1st', label: 'Resultado oficial 1º turno (TSE)' },
                { id: 'polls-1st', label: 'Pesquisas de véspera (1º turno)' },
                { id: 'sim-2nd', label: 'Simulações e laboratório 2º turno' },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setGovView(v.id as 'official-1st' | 'polls-1st' | 'sim-2nd')}
                  className={`px-3.5 py-2 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    govView === v.id
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {govView === 'official-1st' && (
              <div className="bg-[#08101e] border border-slate-800/90 rounded-lg p-6 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-5 border-b border-slate-800/80">
                  <div>
                    <p className="text-xs font-mono text-emerald-400 mb-1">
                      Eleito no 1º turno · 100% das seções totalizadas
                    </p>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      {electoral2026Data.governorCE.officialFirstTurn.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {electoral2026Data.governorCE.officialFirstTurn.subtitle}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-400 tabular-nums">
                    Brancos: 2,88% · Nulos: 5,57%
                  </div>
                </div>

                <div className="h-[290px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={electoral2026Data.governorCE.officialFirstTurn.data}
                      margin={{ top: 8, right: 68, left: 0, bottom: 8 }}
                    >
                      <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        domain={[0, 60]}
                        tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                        tickFormatter={(v) => `${v}%`}
                        axisLine={{ stroke: '#1e293b' }}
                        tickLine={false}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={175}
                        tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 500 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<EditorialTooltip unit="%" />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                      <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={24}>
                        {electoral2026Data.governorCE.officialFirstTurn.data.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                        <LabelList
                          dataKey="value"
                          position="right"
                          content={({ x, y, width, height, value }: any) => (
                            <text
                              x={Number(x || 0) + Number(width || 0) + 10}
                              y={Number(y || 0) + Number(height || 0) / 2}
                              fill="#f8fafc"
                              textAnchor="start"
                              dominantBaseline="middle"
                              className="text-xs font-mono font-semibold"
                            >
                              {Number(value).toFixed(2)}%
                            </text>
                          )}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="overflow-x-auto pt-2 border-t border-slate-800/80">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="py-2.5 pr-4 font-medium">Candidatura</th>
                        <th className="py-2.5 px-4 font-medium">Partido</th>
                        <th className="py-2.5 px-4 font-medium text-right">Votos nominais</th>
                        <th className="py-2.5 pl-4 font-medium text-right">% Válidos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {electoral2026Data.governorCE.officialFirstTurn.data.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-3 pr-4 font-medium text-slate-100">{item.name}</td>
                          <td className="py-3 px-4 font-mono text-slate-400">{item.party}</td>
                          <td className="py-3 px-4 text-right font-mono text-slate-300 tabular-nums">
                            {item.votes?.replace(' votos', '')}
                          </td>
                          <td className="py-3 pl-4 text-right font-mono font-semibold text-white tabular-nums">
                            {item.value.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {govView === 'polls-1st' && (
              <div className="bg-[#08101e] border border-slate-800/90 rounded-lg p-6 sm:p-8 space-y-6">
                <div className="pb-5 border-b border-slate-800/80">
                  <p className="text-xs font-mono text-cyan-400 mb-1">
                    Reta final · Votos válidos (03/10/2026)
                  </p>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    {electoral2026Data.governorCE.evePollsFirstTurn.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {electoral2026Data.governorCE.evePollsFirstTurn.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 border border-slate-800/80 rounded-md bg-[#050b14]">
                  {electoral2026Data.governorCE.evePollsFirstTurn.institutes.map((inst, idx) => (
                    <div key={idx} className="p-5 space-y-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold text-white">{inst.institute}</span>
                        <span className="text-[11px] font-mono text-slate-400">{inst.note}</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-slate-300">Elmano de Freitas (PT)</span>
                            <span className="font-mono font-semibold text-white tabular-nums">
                              {inst.elmano.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-xs overflow-hidden">
                            <div
                              className="h-full bg-red-500"
                              style={{ width: `${inst.elmano}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-slate-300">Ciro Gomes (PSDB)</span>
                            <span className="font-mono font-semibold text-white tabular-nums">
                              {inst.ciro.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-xs overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${inst.ciro}%` }}
                            />
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
                {/* Real 2nd Turn Polls Table Strip */}
                <div className="bg-[#08101e] border border-slate-800/90 rounded-lg p-6">
                  <div className="mb-4">
                    <p className="text-xs font-mono text-slate-400">
                      {electoral2026Data.governorCE.secondTurnPolls.subtitle}
                    </p>
                    <h3 className="text-base font-semibold text-white mt-0.5">
                      {electoral2026Data.governorCE.secondTurnPolls.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 border border-slate-800/80 rounded-md bg-[#050b14]">
                    {electoral2026Data.governorCE.secondTurnPolls.institutes.map((inst, idx) => (
                      <div key={idx} className="p-4 flex flex-col justify-between gap-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-200">{inst.institute}</span>
                          <span className="text-[11px] font-mono text-slate-400">{inst.note}</span>
                        </div>
                        <div className="flex items-end justify-between pt-1">
                          <div>
                            <div className="text-[11px] text-slate-400">Elmano (PT)</div>
                            <div className="text-xl font-mono font-semibold text-red-400 tabular-nums">
                              {inst.elmano.toFixed(1)}%
                            </div>
                          </div>
                          <span className="text-xs font-mono text-slate-600 pb-1">×</span>
                          <div className="text-right">
                            <div className="text-[11px] text-slate-400">Ciro (PSDB)</div>
                            <div className="text-xl font-mono font-semibold text-blue-400 tabular-nums">
                              {inst.ciro.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Undecided Redistribution Lab */}
                <div className="bg-[#08101e] border border-slate-800/90 rounded-lg p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-mono text-cyan-400">
                            Projeção dinâmica · CE-07550/2026
                          </span>
                          <button
                            type="button"
                            onClick={() => setUndecidedShift(50)}
                            className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <RotateCcw size={12} />
                            <span>Redefinir 50/50</span>
                          </button>
                        </div>

                        <h3 className="text-xl font-semibold text-white">
                          Redistribuição dos indecisos (5,6%)
                        </h3>
                        <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                          Ajuste a repartição do segmento indeciso registrado no levantamento estadual de março de 2026 para estimar o deslocamento no 2º turno hipotético.
                        </p>
                      </div>

                      <div className="p-4 rounded-md bg-[#050b14] border border-slate-800 space-y-3">
                        <div className="flex justify-between text-xs font-mono tabular-nums">
                          <span className="text-red-400">Elmano (+{distributedToElmano.toFixed(1)} p.p.)</span>
                          <span className="text-blue-400">Ciro (+{distributedToCiro.toFixed(1)} p.p.)</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={undecidedShift}
                          onChange={(e) => setUndecidedShift(Number(e.target.value))}
                          aria-label="Percentual de indecisos atribuídos a Ciro Gomes"
                          className="w-full editorial-range"
                        />
                        <div className="flex justify-between text-[11px] font-mono text-slate-500">
                          <span>100% Elmano</span>
                          <span>50 / 50</span>
                          <span>100% Ciro</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 border border-slate-800 rounded-md divide-x divide-slate-800 bg-[#050b14]">
                        <div className="p-4">
                          <div className="text-xs text-slate-400">Ciro Gomes (PSDB)</div>
                          <div className="text-2xl font-mono font-semibold text-blue-400 tabular-nums mt-0.5">
                            {simCiro.toFixed(1)}%
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                            Base: 49,2%
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="text-xs text-slate-400">Elmano de Freitas (PT)</div>
                          <div className="text-2xl font-mono font-semibold text-red-400 tabular-nums mt-0.5">
                            {simElmano.toFixed(1)}%
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                            Base: 37,2%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-between lg:border-l lg:border-slate-800/80 lg:pl-8">
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                          <h4 className="text-sm font-semibold text-white">
                            Cenário simulado — 2º turno estadual
                          </h4>
                          <span className="text-xs font-mono text-cyan-400 tabular-nums">
                            Diferença projetada: {(simCiro - simElmano).toFixed(1)} p.p.
                          </span>
                        </div>

                        <div className="h-[230px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              layout="vertical"
                              data={[
                                { name: 'Ciro Gomes (PSDB)', value: simCiro, color: '#3b82f6' },
                                { name: 'Elmano de Freitas (PT)', value: simElmano, color: '#ef4444' },
                                { name: 'Branco / Nulo', value: baseNull, color: '#64748b' },
                              ]}
                              margin={{ top: 8, right: 56, left: 0, bottom: 8 }}
                            >
                              <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                              <XAxis
                                type="number"
                                domain={[0, 60]}
                                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                                tickFormatter={(v) => `${v}%`}
                                axisLine={{ stroke: '#1e293b' }}
                                tickLine={false}
                              />
                              <YAxis
                                dataKey="name"
                                type="category"
                                width={160}
                                tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 500 }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <Tooltip content={<EditorialTooltip unit="%" />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                              <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={28}>
                                <Cell fill="#3b82f6" />
                                <Cell fill="#ef4444" />
                                <Cell fill="#64748b" />
                                <LabelList
                                  dataKey="value"
                                  position="right"
                                  content={({ x, y, width, height, value }: any) => (
                                    <text
                                      x={Number(x || 0) + Number(width || 0) + 10}
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
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                        <span>Fonte: Levantamento Algoritma Dados (Reg. TSE CE-07550/2026)</span>
                        <span className="font-mono text-slate-200 tabular-nums">n = 1.225 · ±2,8 p.p.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SENADO CEARÁ */}
        {activeTab === 'senate' && (
          <div className="bg-[#08101e] border border-slate-800/90 rounded-lg p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-slate-800/80">
              <div>
                <p className="text-xs font-mono text-cyan-400 mb-1">
                  Senado Federal · Ceará · 2 vagas em disputa
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {currentSenate.institute} ({currentSenate.date})
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Critério metodológico: {currentSenate.metric}
                </p>
              </div>

              <div className="inline-flex items-center p-1 bg-[#050b14] border border-slate-800 rounded-md flex-wrap gap-1">
                {[
                  { id: 'datafolha', label: 'Datafolha (03/10)' },
                  { id: 'quaest', label: 'Quaest (03/10)' },
                  { id: 'atlas', label: 'AtlasIntel (30/09)' },
                  { id: 'parana', label: 'Paraná Pesq. (26/09)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSenateSource(s.id as 'datafolha' | 'quaest' | 'atlas' | 'parana')}
                    className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      senateSource === s.id
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={currentSenate.data}
                  margin={{ top: 8, right: 60, left: 0, bottom: 8 }}
                >
                  <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    domain={[0, 55]}
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(v) => `${v}%`}
                    axisLine={{ stroke: '#1e293b' }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={185}
                    tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<EditorialTooltip unit="%" />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={24}>
                    {currentSenate.data.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="right"
                      content={({ x, y, width, height, value }: any) => (
                        <text
                          x={Number(x || 0) + Number(width || 0) + 10}
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
            </div>
          </div>
        )}

        {/* TAB 4: DEPUTADOS CEARÁ */}
        {activeTab === 'deputies' && (
          <div className="bg-[#08101e] border border-slate-800/90 rounded-lg p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-slate-800/80">
              <div>
                <p className="text-xs font-mono text-cyan-400 mb-1">
                  Eleição proporcional · Composição partidária TSE 2026
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {currentDeputies.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">{currentDeputies.subtitle}</p>
              </div>

              <div className="inline-flex items-center p-1 bg-[#050b14] border border-slate-800 rounded-md gap-1">
                <button
                  type="button"
                  onClick={() => setDeputyHouse('federal')}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    deputyHouse === 'federal'
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Câmara Federal (22)
                </button>
                <button
                  type="button"
                  onClick={() => setDeputyHouse('stateAlece')}
                  className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    deputyHouse === 'stateAlece'
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Alece — Estaduais (46)
                </button>
              </div>
            </div>

            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={currentDeputies.data}
                  margin={{ top: 8, right: 72, left: 0, bottom: 8 }}
                >
                  <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    axisLine={{ stroke: '#1e293b' }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="party"
                    type="category"
                    width={175}
                    tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<EditorialTooltip unit="vagas" />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="seats" radius={[0, 3, 3, 0]} barSize={22}>
                    {currentDeputies.data.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="seats"
                      position="right"
                      content={({ x, y, width, height, value }: any) => (
                        <text
                          x={Number(x || 0) + Number(width || 0) + 10}
                          y={Number(y || 0) + Number(height || 0) / 2}
                          fill="#f8fafc"
                          textAnchor="start"
                          dominantBaseline="middle"
                          className="text-xs font-mono font-semibold"
                        >
                          {value} {Number(value) === 1 ? 'vaga' : 'vagas'}
                        </text>
                      )}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-mono text-cyan-400 mr-2">Nota da apuração:</span>
              {currentDeputies.topHighlight}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveSimulator;
