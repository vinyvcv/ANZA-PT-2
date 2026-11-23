import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Settings2, X, Check, Lock, ChevronDown, ChevronUp } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_STORAGE_KEY = 'algoritma_cookie_consent_v1';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user already consented
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!stored) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
      } catch {
        setIsVisible(true);
      }
    }
  }, []);

  // Listen for custom event to open preferences from footer
  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
      setIsVisible(true);
    };
    window.addEventListener('open-cookie-settings', handleOpenModal);
    return () => window.removeEventListener('open-cookie-settings', handleOpenModal);
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {/* Fixed Bottom Banner */}
      {!isModalOpen && isVisible && (
        <div 
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 lg:max-w-4xl lg:ml-auto lg:mr-6 z-50 animate-in fade-in slide-in-from-bottom-6 duration-500"
          role="region"
          aria-label="Aviso de Cookies e Privacidade"
        >
          <div className="bg-[#08101e]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-5 md:p-6 shadow-2xl shadow-black/80 ring-1 ring-white/10 text-left">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              
              {/* Left: Icon & Text */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
                  <Cookie className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                      Privacidade & LGPD
                    </span>
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      Respeitamos seus dados
                    </span>
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-white font-outfit">
                    Nós utilizamos cookies para aprimorar sua experiência
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-2xl">
                    Utilizamos cookies essenciais para o funcionamento do portal e métricas anônimas para entender a audiência das pesquisas eleitorais e relatórios estratégicos, em total conformidade com a <strong className="text-cyan-200 font-semibold">LGPD</strong>.
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-none font-outfit"
                >
                  <Settings2 size={14} className="text-slate-400" />
                  <span>Gerenciar</span>
                </button>

                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all flex-1 sm:flex-none font-outfit"
                >
                  Apenas Essenciais
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 active:scale-95 flex-1 sm:flex-none font-outfit flex items-center justify-center gap-1.5"
                >
                  <Check size={14} className="stroke-[3]" />
                  <span>Aceitar Todos</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#08101e] border border-cyan-500/30 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl shadow-black relative text-left overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-outfit uppercase">
                    Central de Preferências de Privacidade
                  </h3>
                  <p className="text-xs text-slate-400">
                    Gerencie quais tipos de cookies você autoriza a Algoritma Dados utilizar.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
                  if (stored) setIsVisible(false);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content: Cookie Categories */}
            <div className="py-6 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
              
              {/* 1. Necessary */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-white">Cookies Estritamente Necessários</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 flex items-center gap-1">
                      <Lock size={10} /> Sempre Ativos
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Essenciais para navegar pelo portal com segurança, carregar dados das pesquisas, manter preferências de sessão e segurança de requisições. Não podem ser desativados.
                  </p>
                </div>
                <div className="pt-1">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5 accent-cyan-400 rounded cursor-not-allowed opacity-70"
                  />
                </div>
              </div>

              {/* 2. Analytics */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4 hover:border-cyan-500/30 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-white">Cookies de Análise e Desempenho</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                      Recomendado
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Permitem contabilizar visualizações de relatórios, saber quais cenários do simulador são mais testados e melhorar a performance geral de carregamento sem identificar individualmente você.
                  </p>
                </div>
                <div className="pt-1">
                  <input
                    type="checkbox"
                    id="analytics-cookies"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-5 h-5 accent-cyan-400 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* 3. Marketing */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4 hover:border-cyan-500/30 transition-colors">
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-white">Cookies de Comunicação & Marketing</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Utilizados para direcionar avisos de novos relatórios, pesquisas eleitorais registradas no TSE e newsletters de acordo com o interesse corporativo ou institucional.
                  </p>
                </div>
                <div className="pt-1">
                  <input
                    type="checkbox"
                    id="marketing-cookies"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-5 h-5 accent-cyan-400 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Additional Accordion Info */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <span>{showDetails ? 'Ocultar detalhes legais sobre a LGPD' : 'O que é a LGPD e por que solicitamos sua autorização?'}</span>
                  {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {showDetails && (
                  <div className="mt-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 leading-relaxed space-y-2">
                    <p>
                      A <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)</strong> estabelece que os usuários têm direito de saber quais informações são coletadas durante a navegação e decidir sobre seu armazenamento.
                    </p>
                    <p>
                      A Algoritma Dados não comercializa dados pessoais para terceiros. Todas as preferências registradas aqui são armazenadas localmente no seu próprio navegador e podem ser alteradas a qualquer instante no rodapé do portal.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="pt-5 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all font-outfit"
              >
                Rejeitar Opcionais
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white transition-all font-outfit"
                >
                  Salvar Preferências
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all font-outfit shadow-lg shadow-cyan-500/20"
                >
                  Aceitar Todos
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
