import React from 'react';

interface AlgoritmaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
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
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const textColor = variant === 'dark' ? 'text-slate-950' : 'text-slate-50';
  const subColor = variant === 'dark' ? 'text-slate-600' : 'text-slate-400';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}>
      <svg
        viewBox="0 0 240 240"
        className={`${heights[size]} w-auto aspect-square text-cyan-400 shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points="120,16 212,69 212,171 120,224 28,171 28,69"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinejoin="miter"
          fill="rgba(6, 182, 212, 0.06)"
        />
        <path
          d="M120 56L174 170H146L120 112L94 170H66L120 56Z"
          fill="currentColor"
        />
        <rect x="94" y="142" width="52" height="12" fill="#10b981" />
        <circle cx="120" cy="56" r="8" fill="#f8fafc" />
      </svg>

      <div className="flex flex-col text-left leading-none">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-semibold ${textColor} ${textSizes[size]} font-heading tracking-tight lowercase`}>
            algoritma
          </span>
          <span className="font-mono font-medium text-xs tracking-wider text-cyan-400 lowercase">
            dados
          </span>
        </div>
        {withTagline && (
          <span className={`text-[11px] font-normal ${subColor} mt-1`}>
            Instituto de Pesquisa e Inteligência
          </span>
        )}
      </div>
    </div>
  );
};

export default AlgoritmaLogo;
