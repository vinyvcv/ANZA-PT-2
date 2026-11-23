import React from 'react';

interface AlgoritmaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withTagline?: boolean;
  variant?: 'light' | 'dark';
}

export const AlgoritmaLogo: React.FC<AlgoritmaLogoProps> = ({
  className = '',
  size = 'md',
  withTagline = false,
  variant = 'light',
}) => {
  const heights = {
    sm: 'h-7',
    md: 'h-9 md:h-10',
    lg: 'h-12 md:h-14',
    xl: 'h-16 md:h-20',
  };

  const textColor = variant === 'dark' ? 'text-slate-950' : 'text-white';
  const taglineColor = variant === 'dark' ? 'text-slate-600' : 'text-cyan-300/80';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Algoritma Dados Geometric Node Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 240 240"
          className={`${heights[size]} w-auto aspect-square text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Hexagonal Data Frame */}
          <polygon
            points="120,14 214,68 214,172 120,226 26,172 26,68"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinejoin="round"
            fill="rgba(6, 182, 212, 0.08)"
          />
          {/* Inner Algorithmic Triangle / A-Structure */}
          <path
            d="M120 52L178 172H148L120 110L92 172H62L120 52Z"
            fill="currentColor"
          />
          {/* Data Bridge */}
          <rect x="92" y="140" width="56" height="14" rx="7" fill="#10b981" />
          {/* Precision Nodes */}
          <circle cx="120" cy="52" r="10" fill="#ffffff" />
          <circle cx="62" cy="172" r="8" fill="#38bdf8" />
          <circle cx="178" cy="172" r="8" fill="#10b981" />
        </svg>
      </div>

      {/* Official Wordmark */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5 tracking-[-0.03em]">
          <span className={`font-black ${textColor} text-xl md:text-2xl font-heading tracking-tight lowercase`}>
            algoritma
          </span>
          <span className="font-mono font-extrabold text-[11px] md:text-xs uppercase tracking-[0.18em] text-cyan-400">
            dados
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5 animate-pulse shadow-[0_0_8px_#10b981]" />
        </div>
        {withTagline && (
          <span className={`text-[8.5px] font-extrabold uppercase tracking-[0.28em] ${taglineColor} -mt-0.5 font-mono`}>
            Pesquisa &amp; Inteligência
          </span>
        )}
      </div>
    </div>
  );
};

export default AlgoritmaLogo;
