import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    organization: '',
    email: '',
    serviceType: 'Eleitoral',
    collectionChannel: 'Call Center Telefônico (CATI)',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const studyTypes = ['Eleitoral', 'Avaliação de Gestão', 'Mercado & Consumo', 'Tracking Contínuo'];
  const channels = [
    'Call Center Telefônico (CATI)',
    'Call Center via Chat & Digital',
    'Operação Híbrida / Presencial',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contato" className="py-16 sm:py-24 bg-[#08101e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Institutional Overview & Email Channel */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-mono text-cyan-400 mb-2">
                Atendimento institucional e propostas técnicas
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.15]">
                Desenho amostral sob medida para sua decisão
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-4">
                Atuamos em todo o país com central própria de Call Center (CATI e coleta via chat digital) e operações presenciais integradas para governos, partidos, entidades setoriais e empresas.
              </p>
            </div>

            <ul className="divide-y divide-slate-800/80 border-y border-slate-800/80 text-sm text-slate-200">
              {[
                'Equipe própria de Call Center — sem terceirização da coleta',
                'Coleta telefônica (CATI), chat digital (WhatsApp/web) e presencial (CAPI)',
                'Gravação integral de chamadas e supervisão ativa em tempo real',
                'Amostragem estratificada por cotas oficiais do IBGE e do TSE',
                'Registro eleitoral assistido e conformidade integral com a LGPD',
              ].map((item, idx) => (
                <li key={idx} className="py-3 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-cyan-400 tabular-nums shrink-0">
                    0{idx + 1}.
                  </span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-5 rounded-lg bg-[#050b14] border border-slate-800/90 flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#08101e] border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-slate-400">
                  Canal oficial de briefings e imprensa
                </div>
                <a
                  href="mailto:contato@algoritmadados.com.br"
                  className="text-base sm:text-lg font-semibold text-white hover:text-cyan-300 transition-colors break-all inline-block mt-0.5"
                >
                  contato@algoritmadados.com.br
                </a>
                <div className="text-xs text-slate-400 mt-1">
                  Portal oficial: algoritmadados.com.br · Atendimento exclusivamente por e-mail e formulário técnico.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Briefing Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-lg bg-[#050b14] border border-slate-800/90">
              <div className="pb-5 mb-6 border-b border-slate-800">
                <h3 className="text-xl font-semibold text-white">
                  Solicitar proposta metodológica
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Informe o escopo desejado para receber o dimensionamento amostral, canal de coleta recomendado e cronograma de entrega.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-10 text-left space-y-5">
                  <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs">
                    <Check size={16} />
                    <span>Briefing registrado com sucesso</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-white">
                    Recebemos sua solicitação, {formState.name}.
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
                    Nossa diretoria técnica analisará o escopo informado ({formState.serviceType} · {formState.collectionChannel}) e enviará a proposta metodológica diretamente para{' '}
                    <span className="text-white font-mono">{formState.email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: '',
                        organization: '',
                        email: '',
                        serviceType: 'Eleitoral',
                        collectionChannel: 'Call Center Telefônico (CATI)',
                        message: '',
                      });
                    }}
                    className="px-4 py-2.5 rounded-md border border-slate-700 hover:border-cyan-400 text-xs font-medium text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    Enviar nova solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Study Type */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Natureza do estudo
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {studyTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormState({ ...formState, serviceType: type })}
                          className={`py-2.5 px-3 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                            formState.serviceType === type
                              ? 'bg-cyan-500 text-slate-950 border-cyan-500 font-semibold'
                              : 'bg-[#08101e] text-slate-300 border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Collection Channel */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Modalidade de operação desejada
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {channels.map((ch) => (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => setFormState({ ...formState, collectionChannel: ch })}
                          className={`py-2.5 px-3 rounded-md text-xs font-medium border text-left transition-colors cursor-pointer ${
                            formState.collectionChannel === ch
                              ? 'bg-cyan-500/15 text-cyan-200 border-cyan-400 font-semibold'
                              : 'bg-[#08101e] text-slate-300 border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-org" className="block text-xs font-medium text-slate-300 mb-1.5">
                        Organização ou instituição *
                      </label>
                      <input
                        id="contact-org"
                        required
                        type="text"
                        value={formState.organization}
                        onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                        placeholder="Empresa, partido, órgão ou veículo"
                        className="w-full bg-[#08101e] border border-slate-800 rounded-md px-3.5 py-2.5 min-h-[42px] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                        Nome completo *
                      </label>
                      <input
                        id="contact-name"
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Nome do responsável técnico"
                        className="w-full bg-[#08101e] border border-slate-800 rounded-md px-3.5 py-2.5 min-h-[42px] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                      E-mail corporativo *
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="nome@organizacao.com.br"
                      className="w-full bg-[#08101e] border border-slate-800 rounded-md px-3.5 py-2.5 min-h-[42px] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Escopo, municípios e prazo estimado
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Indique o universo pesquisado, municípios ou estados de interesse e a janela de entrega."
                      className="w-full bg-[#08101e] border border-slate-800 rounded-md px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 min-h-[44px] rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={15} />
                    <span>Enviar briefing para análise técnica</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
