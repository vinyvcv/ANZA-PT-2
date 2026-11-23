import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

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
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
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
      {/* Compact Institutional Bottom Bar */}
      {!isModalOpen && isVisible && (
        <div
          className="fixed bottom-3 left-3 right-3 lg:left-auto lg:right-6 lg:max-w-3xl z-40"
          role="region"
          aria-label="Aviso de cookies e privacidade"
        >
          <div className="bg-[#08101e]/98 border border-slate-700 rounded-lg px-4 py-3.5 sm:px-5 sm:py-4 shadow-2xl text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
              <div className="text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white">Privacidade e LGPD:</span>{' '}
                utilizamos cookies essenciais e métricas agregadas para aprimorar o acesso aos relatórios da Algoritma Dados.
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-2 rounded border border-slate-700 hover:border-slate-500 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  Preferências
                </button>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3 py-2 rounded border border-slate-700 hover:border-slate-500 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  Apenas essenciais
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-3.5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  Aceitar todos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
        >
          <div className="bg-[#08101e] border border-slate-800 rounded-lg max-w-xl w-full p-6 sm:p-7 shadow-2xl relative text-left">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <p className="text-xs font-mono text-cyan-400 mb-1">LGPD · Lei nº 13.709/2018</p>
                <h3 id="cookie-modal-title" className="text-lg font-semibold text-white">
                  Preferências de privacidade e cookies
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
                  if (stored) setIsVisible(false);
                }}
                className="p-2 rounded border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
                aria-label="Fechar preferências de cookies"
              >
                <X size={16} />
              </button>
            </div>

            <div className="py-5 space-y-3 max-h-[55vh] overflow-y-auto">
              <div className="p-4 rounded-md bg-[#050b14] border border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <h5 className="text-sm font-medium text-white">Estritamente necessários</h5>
                    <span className="text-[11px] font-mono text-emerald-400">Sempre ativos</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Garantem o carregamento seguro dos dados, preferências de sessão e navegação pelo portal.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  aria-label="Cookies estritamente necessários"
                  className="mt-1 w-4 h-4 accent-cyan-400 cursor-not-allowed opacity-70"
                />
              </div>

              <div className="p-4 rounded-md bg-[#050b14] border border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <h5 className="text-sm font-medium text-white">Análise e desempenho</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Medição agregada e anônima de leitura dos relatórios e uso do simulador eleitoral.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="analytics-cookies"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  aria-label="Cookies de análise e desempenho"
                  className="mt-1 w-4 h-4 accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-md bg-[#050b14] border border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <h5 className="text-sm font-medium text-white">Comunicação institucional</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Utilizados para sinalizar novas pesquisas registradas no TSE e boletins publicados pela Algoritma Dados.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="marketing-cookies"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  aria-label="Cookies de comunicação institucional"
                  className="mt-1 w-4 h-4 accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>{showDetails ? 'Ocultar base legal' : 'Consultar nota sobre a LGPD'}</span>
                  {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {showDetails && (
                  <p className="mt-2 p-3.5 rounded-md bg-[#050b14] border border-slate-800 text-xs text-slate-400 leading-relaxed">
                    A Algoritma Dados não comercializa dados pessoais. Suas escolhas ficam gravadas apenas neste navegador e podem ser revistas a qualquer momento no rodapé do portal.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2 rounded-md border border-slate-700 hover:border-slate-500 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Rejeitar opcionais
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-md border border-slate-700 hover:border-cyan-400 text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  Salvar escolhas
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Aceitar todos
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
