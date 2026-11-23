import React, { useState } from 'react';
import { 
  Mail, CheckCircle2, Send, 
  Clock, Building2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    serviceType: 'Eleitoral',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#38bdf8', '#10b981'],
    });
  };

  return (
    <section id="contato" className="py-24 relative bg-[#050b14] border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-sky-500/10 blur-[180px] rounded-full" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Brand & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Building2 size={18} />
                <span className="text-xs font-black uppercase tracking-[0.3em] font-mono">
                  LIDERANÇA EM CAMPO & ATENDIMENTO
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-outfit leading-tight">
                Pesquisa de Campo com Rigor <span className="text-gradient-cyan">Exponencial.</span>
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-4">
                Atuamos em todos os municípios brasileiros com equipes próprias, infraestrutura de gravação 100% segura e entregas em tempo recorde para tomadas de decisão estratégicas.
              </p>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                'Equipes Próprias Treinadas',
                'Auditoria 100% de Gravação',
                'Geolocalização Criptografada',
                'Relatórios em até 48h',
                'Registro TSE Assistido',
                'Suporte Estratégico Contínuo',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Direct Contact Cards */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 hover:border-cyan-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Comercial & Novos Briefings</div>
                  <div className="text-base sm:text-lg font-black text-white font-outfit">contato@algoritmadados.com.br</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Briefing Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-10 rounded-3xl bg-[#08101e] border border-cyan-500/25 backdrop-blur-2xl shadow-2xl relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase font-outfit">
                    Solicitar Orçamento de Campo
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Preencha os detalhes e receba nossa proposta técnica com cronograma em até 2 horas.
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 hidden sm:block">
                  <Clock size={20} />
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-2xl font-black text-white font-outfit uppercase">
                    Briefing Enviado com Sucesso!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong className="text-white">{formState.name}</strong>. Nossa equipe técnica já iniciou o dimensionamento amostral para sua organização.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: '',
                        organization: '',
                        email: '',
                        phone: '',
                        serviceType: 'Eleitoral',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all uppercase tracking-wider font-mono"
                  >
                    Enviar Outro Briefing
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Service Type Buttons */}
                  <div>
                    <label className="block text-[10px] font-black text-cyan-300 uppercase tracking-wider mb-2">
                      Tipo de Estudo
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Eleitoral', 'Avaliação', 'Mercado', 'Tracking'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormState({ ...formState, serviceType: t })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                            formState.serviceType === t
                              ? 'bg-cyan-500 text-slate-950 font-black'
                              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        Organização / Empresa *
                      </label>
                      <input
                        required
                        type="text"
                        value={formState.organization}
                        onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                        placeholder="Nome da empresa ou partido"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        Seu Nome *
                      </label>
                      <input
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Nome completo"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        E-mail Profissional *
                      </label>
                      <input
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="contato@empresa.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="(85) 90000-0000"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      Descrição do Job & Cidades de Interesse
                    </label>
                    <textarea
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Qual o escopo, público-alvo, cidades ou prazos desejados?"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-cyan-500/25 active:scale-[0.99] flex items-center justify-center gap-2 font-outfit"
                  >
                    <Send size={15} />
                    <span>ENVIAR BRIEFING PARA ANÁLISE TÉCNICA</span>
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
