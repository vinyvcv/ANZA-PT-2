import React from 'react';

interface AnzaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withTagline?: boolean;
  variant?: 'light' | 'dark';
}

export const AnzaLogo: React.FC<AnzaLogoProps> = ({
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
  const taglineColor = variant === 'dark' ? 'text-slate-600' : 'text-violet-300/80';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official ANZA Target Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 240 240"
          className={`${heights[size]} w-auto aspect-square text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.35)]`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Target Emblem Rings */}
          <path
            fill="currentColor"
            d="M 120,10 A 110,110 0 1 1 120,230 A 110,110 0 1 1 120,10 Z M 120,35 A 85,85 0 1 0 120,205 A 85,85 0 1 0 120,35 Z M 120,58 A 62,62 0 1 1 120,182 A 62,62 0 1 1 120,58 Z M 120,82 A 38,38 0 1 0 120,158 A 38,38 0 1 0 120,82 Z M 120,104 A 16,16 0 1 1 120,136 A 16,16 0 1 1 120,104 Z"
          />
          {/* Speech bubble pointer */}
          <path
            d="M 198,198 L 198,230 L 230,198 Z"
            fill="currentColor"
          />
          {/* Glowing central core */}
          <circle cx="120" cy="120" r="8" fill="#ffffff" />
        </svg>
      </div>

      {/* Official Wordmark */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline tracking-[-0.04em]">
          <span className={`font-black ${textColor} text-2xl md:text-3xl font-heading tracking-tight lowercase`}>
            anza
          </span>
          <span className="w-2 h-2 rounded-full bg-amber-500 ml-1 animate-pulse shadow-[0_0_8px_#f59e0b]" />
        </div>
        {withTagline && (
          <span className={`text-[8.5px] font-extrabold uppercase tracking-[0.3em] ${taglineColor} -mt-1 font-mono`}>
            Pesquisa &amp; Inteligência
          </span>
        )}
      </div>
    </div>
  );
};

export default AnzaLogo;
