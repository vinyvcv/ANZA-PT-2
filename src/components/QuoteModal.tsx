import React, { useState, useEffect } from 'react';
import { X, Check, Send } from 'lucide-react';

export type QuoteMethod = 'cati' | 'chat' | 'hybrid';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMethod?: QuoteMethod;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialMethod = 'cati',
}) => {
  const [methodology, setMethodology] = useState<QuoteMethod>(initialMethod);
  const [sampleSize, setSampleSize] = useState<number>(1200);
  const [urgency, setUrgency] = useState<'standard' | 'fast' | 'express'>('fast');
  const [formData, setFormData] = useState({
    organization: '',
    name: '',
    email: '',
    region: 'Ceará',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMethodology(initialMethod);
  }, [initialMethod, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const methodOptions: {
    id: QuoteMethod;
    title: string;
    subtitle: string;
    detail: string;
  }[] = [
    {
      id: 'cati',
      title: 'Call Center — Ligação (CATI)',
      subtitle: 'Central própria por voz',
      detail: 'Discagem estratificada, gravação integral de 100% das entrevistas e supervisão ativa.',
    },
    {
      id: 'chat',
      title: 'Call Center — Chat & Digital',
      subtitle: 'WhatsApp e mensageria web',
      detail: 'Coleta humanizada estruturada com validação de perfil e controle anti-duplicidade.',
    },
    {
      id: 'hybrid',
      title: 'Operação Híbrida / Presencial',
      subtitle: 'CAPI georreferenciado + Central',
      detail: 'Campo presencial com GPS integrado à central de call center para cobertura mista.',
    },
  ];

  const methodLabels: Record<QuoteMethod, string> = {
    cati: 'Call Center — Ligação (CATI)',
    chat: 'Call Center — Chat & Digital',
    hybrid: 'Operação Híbrida / Presencial (CAPI)',
  };

  const marginOfError =
    sampleSize >= 2000
      ? '±2,2 p.p.'
      : sampleSize >= 1500
      ? '±2,5 p.p.'
      : sampleSize >= 1000
      ? '±2,8 p.p.'
      : sampleSize >= 600
      ? '±4,0 p.p.'
      : '±4,9 p.p.';

  const coverage =
    sampleSize >= 2000
      ? '45+ municípios ou recorte nacional'
      : sampleSize >= 1200
      ? '25 a 40 municípios (estadual)'
      : '1 a 15 municípios (local / regional)';

  const leadTime =
    urgency === 'express'
      ? '48 horas'
      : urgency === 'fast'
      ? '4 a 5 dias úteis'
      : '7 a 10 dias úteis';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-3xl my-6 bg-[#08101e] border border-slate-800 rounded-lg p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-left">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-md border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
          aria-label="Fechar janela de orçamento"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <Check size={16} />
              <span>Solicitação registrada</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Proposta metodológica em elaboração
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-xl">
                Recebemos seu briefing e enviaremos o desenho amostral, cronograma e orçamento detalhado para{' '}
                <span className="text-white font-mono">{formData.email}</span> (ou via{' '}
                <span className="text-cyan-400 font-mono">contato@algoritmadados.com.br</span>).
              </p>
            </div>

            <dl className="border border-slate-800 rounded-md divide-y divide-slate-800 bg-[#050b14] text-sm">
              <div className="px-4 py-3 flex justify-between gap-4">
                <dt className="text-slate-400">Modalidade selecionada</dt>
                <dd className="text-white font-medium text-right">{methodLabels[methodology]}</dd>
              </div>
              <div className="px-4 py-3 flex justify-between gap-4">
                <dt className="text-slate-400">Tamanho amostral</dt>
                <dd className="text-white font-mono tabular-nums">
                  {sampleSize.toLocaleString('pt-BR')} entrevistas ({marginOfError})
                </dd>
              </div>
              <div className="px-4 py-3 flex justify-between gap-4">
                <dt className="text-slate-400">Janela de entrega</dt>
                <dd className="text-cyan-400 font-mono">{leadTime}</dd>
              </div>
              <div className="px-4 py-3 flex justify-between gap-4">
                <dt className="text-slate-400">Abrangência informada</dt>
                <dd className="text-white">{formData.region}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-5 py-2.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer"
            >
              Retornar ao portal
            </button>
          </div>
        ) : (
          <div>
            <div className="pr-10 pb-5 mb-6 border-b border-slate-800">
              <p className="text-xs font-mono text-cyan-400 mb-1">
                Dimensionamento e proposta técnica
              </p>
              <h2 id="quote-modal-title" className="text-2xl font-semibold text-white">
                Configurar estudo de pesquisa
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Selecione o canal da nossa equipe de Call Center ou operação presencial, a amostra e o prazo de entrega.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Collection Channel */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2.5">
                  1. Modalidade de coleta
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {methodOptions.map((m) => {
                    const active = methodology === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethodology(m.id)}
                        className={`p-4 rounded-md border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-cyan-500/12 border-cyan-400'
                            : 'bg-[#050b14] border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="text-xs font-semibold text-white leading-snug">
                          {m.title}
                        </div>
                        <div className="text-[11px] font-mono text-cyan-400 mt-1">
                          {m.subtitle}
                        </div>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{m.detail}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Sample Size */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2.5">
                  <label htmlFor="quote-sample-range" className="text-xs font-medium text-slate-300">
                    2. Tamanho amostral:{' '}
                    <span className="font-mono font-semibold text-white tabular-nums">
                      {sampleSize.toLocaleString('pt-BR')} entrevistas
                    </span>
                  </label>
                  <span className="text-xs font-mono text-cyan-400 tabular-nums">
                    Confiança 95% · Margem {marginOfError}
                  </span>
                </div>
                <input
                  id="quote-sample-range"
                  type="range"
                  min={400}
                  max={3000}
                  step={50}
                  value={sampleSize}
                  onChange={(e) => setSampleSize(Number(e.target.value))}
                  className="w-full editorial-range"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
                  <span>400 (Municipal)</span>
                  <span>1.200 (Estadual)</span>
                  <span>2.000 (Alta precisão)</span>
                  <span>3.000 (Nacional)</span>
                </div>
              </div>

              {/* Step 3: Delivery Window */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2.5">
                  3. Prazo de entrega
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'standard', label: 'Padrão (7 a 10 dias)' },
                    { id: 'fast', label: 'Rápido (4 a 5 dias)' },
                    { id: 'express', label: 'Expresso (48h)' },
                  ].map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUrgency(u.id as 'standard' | 'fast' | 'express')}
                      className={`py-2.5 px-3 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                        urgency === u.id
                          ? 'bg-cyan-500 text-slate-950 border-cyan-500 font-semibold'
                          : 'bg-[#050b14] text-slate-300 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Summary Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 border border-slate-800 rounded-md divide-y sm:divide-y-0 sm:divide-x divide-slate-800 bg-[#050b14] text-xs">
                <div className="p-3.5">
                  <div className="text-slate-400">Abrangência estimada</div>
                  <div className="text-slate-100 font-medium mt-0.5">{coverage}</div>
                </div>
                <div className="p-3.5">
                  <div className="text-slate-400">Prazo previsto</div>
                  <div className="text-cyan-400 font-mono font-medium mt-0.5">{leadTime}</div>
                </div>
                <div className="p-3.5">
                  <div className="text-slate-400">Governança</div>
                  <div className="text-emerald-400 font-medium mt-0.5">
                    Auditoria 100% · TSE e LGPD
                  </div>
                </div>
              </div>

              {/* Organization & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-org" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Organização / Instituição *
                  </label>
                  <input
                    id="quote-org"
                    required
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Empresa, partido, mandato ou veículo"
                    className="w-full bg-[#050b14] border border-slate-800 rounded-md px-3.5 py-2.5 min-h-[42px] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Nome completo *
                  </label>
                  <input
                    id="quote-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Responsável pela solicitação"
                    className="w-full bg-[#050b14] border border-slate-800 rounded-md px-3.5 py-2.5 min-h-[42px] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label htmlFor="quote-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                    E-mail corporativo *
                  </label>
                  <input
                    id="quote-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nome@organizacao.com.br"
                    className="w-full bg-[#050b14] border border-slate-800 rounded-md px-3.5 py-2.5 min-h-[42px] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label htmlFor="quote-region" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Estado ou região de cobertura *
                  </label>
                  <input
                    id="quote-region"
                    required
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="Ex: Ceará, Nordeste, Brasil"
                    className="w-full bg-[#050b14] border border-slate-800 rounded-md px-3.5 py-2.5 min-h-[42px] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote-notes" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Objetivos e observações técnicas (opcional)
                </label>
                <textarea
                  id="quote-notes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Cidades prioritárias, necessidade de registro no TSE, blocos temáticos ou público-alvo..."
                  className="w-full bg-[#050b14] border border-slate-800 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-xs text-slate-400">
                  Dúvidas diretas:{' '}
                  <span className="font-mono text-slate-200">contato@algoritmadados.com.br</span>
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 min-h-[44px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Send size={15} />
                  <span>Solicitar proposta técnica</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;
