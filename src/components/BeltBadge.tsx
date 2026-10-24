import React from 'react';
import { BeltRank } from '../types';
import { BELT_CONFIGS } from '../utils/beltColors';

interface BeltBadgeProps {
  rank: BeltRank;
  size?: 'sm' | 'md' | 'lg';
  showKorean?: boolean;
  className?: string;
}

export const BeltBadge: React.FC<BeltBadgeProps> = ({
  rank,
  size = 'md',
  showKorean = false,
  className = '',
}) => {
  const config = BELT_CONFIGS[rank] || {
    shortLabel: rank,
    bgHex: '#334155',
    textHex: '#ffffff',
    badgeBg: 'bg-slate-700',
    badgeText: 'text-slate-100',
    badgeBorder: 'border-slate-600',
    koreanName: '',
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5 font-medium',
  };

  const beltBarHeight = {
    sm: 'h-2 w-3.5',
    md: 'h-2.5 w-5',
    lg: 'h-3.5 w-7',
  };

  return (
    <div
      className={`inline-flex items-center rounded border ${config.badgeBorder} ${config.badgeBg} ${config.badgeText} ${sizeClasses[size]} shrink-0 shadow-xs ${className}`}
      title={`${rank} · ${config.koreanName}`}
    >
      {/* Belt visual bar simulation */}
      <span
        className={`inline-block ${beltBarHeight[size]} rounded-[2px] shadow-xs relative overflow-hidden border border-black/20 shrink-0`}
        style={{
          backgroundColor: config.bgHex,
          background: config.isTwoTone
            ? 'linear-gradient(180deg, #dc2626 50%, #0f172a 50%)'
            : config.bgHex,
        }}
      >
        {config.stripeColor && (
          <span
            className="absolute right-1 inset-y-0 w-1 bg-black/80"
            style={{ backgroundColor: config.stripeColor }}
          />
        )}
      </span>

      <span className="font-semibold tracking-tight whitespace-nowrap">{config.shortLabel}</span>

      {showKorean && config.koreanName && (
        <span className="text-[10px] opacity-75 font-mono ml-0.5 whitespace-nowrap">
          {config.koreanName.split(' ')[0]}
        </span>
      )}
    </div>
  );
};
