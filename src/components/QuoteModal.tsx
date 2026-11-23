import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Calculator, Send, ShieldCheck, MapPin, Users, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [methodology, setMethodology] = useState<'phone' | 'field' | 'hybrid'>('phone');
  const [sampleSize, setSampleSize] = useState<number>(1200);
  const [urgency, setUrgency] = useState<'standard' | 'fast' | 'express'>('fast');
  const [formData, setFormData] = useState({
    organization: '',
    name: '',
    email: '',
    phone: '',
    state: 'Ceará',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const calculateEstimate = () => {
    let base = methodology === 'phone' ? 18 : methodology === 'field' ? 38 : 28;
    let multiplier = urgency === 'express' ? 1.4 : urgency === 'fast' ? 1.15 : 1.0;
    const est = Math.round(sampleSize * base * multiplier);
    return {
      days: urgency === 'express' ? '48 horas' : urgency === 'fast' ? '4 a 5 dias úteis' : '8 a 10 dias úteis',
      confidence: sampleSize >= 1500 ? '95% (±2,5%)' : sampleSize >= 1000 ? '95% (±2,8%)' : '95% (±3,5%)',
      coverage: sampleSize >= 1500 ? 'Até 45 municípios' : sampleSize >= 1000 ? 'Até 35 municípios' : 'Até 15 municípios',
    };
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#38bdf8', '#10b981', '#ffffff'],
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl my-8 bg-[#08101e] border border-cyan-500/30 rounded-3xl p-6 md:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="text-3xl font-black text-white uppercase font-outfit">
                  Briefing Recebido com Sucesso!
                </h3>
                <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                  Nossa diretoria técnica entrará em contato em até <strong className="text-cyan-400">2 horas comerciais</strong> com a proposta metodológica e cronograma de campo detalhado.
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Metodologia:</span>
                    <strong className="text-white uppercase">{methodology === 'phone' ? 'Telefônica (CATI)' : methodology === 'field' ? 'Presencial (CAPI)' : 'Híbrida'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amostra:</span>
                    <strong className="text-white">{sampleSize.toLocaleString()} entrevistas</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Prazo Estimado:</span>
                    <strong className="text-cyan-400">{estimate.days}</strong>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest transition-all"
                >
                  Concluir
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 text-cyan-400 mb-2">
                  <Calculator size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.3em] font-mono">
                    SIMULADOR & ORÇAMENTO DE CAMPO
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-outfit mb-2">
                  Configure seu Estudo de Inteligência
                </h2>
                <p className="text-xs md:text-sm text-slate-400 mb-8">
                  Estruture o escopo de coleta presencial ou telefônica com garantia de auditoria e registro TSE.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Methodology */}
                  <div>
                    <label className="block text-[11px] font-black text-cyan-300 uppercase tracking-wider mb-3">
                      1. Modalidade de Coleta
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'phone', label: 'Telefônica (CATI)', desc: 'Ágil e custo-eficiente com gravação 100%' },
                        { id: 'field', label: 'Presencial (CAPI)', desc: 'Face a face em pontos de fluxo e domiciliar' },
                        { id: 'hybrid', label: 'Híbrida Multi-canal', desc: 'Combinação robusta com máxima abrangência' },
                      ].map((m) => (
                        <div
                          key={m.id}
                          onClick={() => setMethodology(m.id as any)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            methodology === m.id
                              ? 'bg-sky-500/20 border-cyan-400 shadow-lg shadow-cyan-500/15'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="text-xs font-black text-white uppercase mb-1">{m.label}</div>
                          <div className="text-[10px] text-slate-400 leading-tight">{m.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Sample Size Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[11px] font-black text-cyan-300 uppercase tracking-wider">
                        2. Tamanho Amostral: <span className="text-cyan-400 font-bold">{sampleSize.toLocaleString()} Entrevistas</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">Margem: {estimate.confidence}</span>
                    </div>
                    <input
                      type="range"
                      min={400}
                      max={3000}
                      step={50}
                      value={sampleSize}
                      onChange={(e) => setSampleSize(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                      <span>400 (Municipal)</span>
                      <span>1.200 (Estadual Padrão)</span>
                      <span>2.000 (Alta Precisão)</span>
                      <span>3.000 (Nacional)</span>
                    </div>
                  </div>

                  {/* Step 3: Urgency */}
                  <div>
                    <label className="block text-[11px] font-black text-cyan-300 uppercase tracking-wider mb-2">
                      3. Prazo de Entrega do Relatório
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'standard', label: 'Padrão (7-10d)' },
                        { id: 'fast', label: 'Rápido (4-5d)' },
                        { id: 'express', label: 'Express (48h)' },
                      ].map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => setUrgency(u.id as any)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                            urgency === u.id
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                              : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/25 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-emerald-400" size={24} />
                      <div>
                        <div className="text-[11px] font-black text-white uppercase">Garantias Metodológicas Algoritma Dados</div>
                        <div className="text-[10px] text-slate-400">100% gravado / Checagem por supervisão / Auditoria e TSE</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">Abrangência Estimada</span>
                      <span className="text-xs font-black text-cyan-400">{estimate.coverage}</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        Organização / Empresa / Mandato *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Ex: Partido / Agência / Prefeitura"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Dra. Mariana Vasconcelos"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        E-mail Corporativo *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contato@organizacao.com.br"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(85) 99999-0000"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      Objetivos & Detalhes do Estudo (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Descreva as cidades de interesse, hipóteses a testar ou cargos em disputa..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-cyan-500/25 active:scale-[0.99] flex items-center justify-center gap-3 font-outfit"
                  >
                    <Send size={16} />
                    SOLICITAR PROPOSTA METODOLÓGICA & CRONOGRAMA
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
