import React, { useState } from 'react';
import { getMotoMarksLogoUrl, getFallbackLogoUrl } from '../../utils/motomarks';

interface BrandLogoProps {
  makeName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  makeName,
  className = '',
  size = 'md'
}) => {
  const [loadStage, setLoadStage] = useState<'motomarks' | 'fallback' | 'monogram'>('motomarks');

  const motomarksUrl = getMotoMarksLogoUrl(makeName);
  const fallbackUrl = getFallbackLogoUrl(makeName);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  }[size];

  if (loadStage === 'monogram') {
    return (
      <div className={`${sizeClasses} rounded-xl bg-theme-secondary text-theme-primary flex items-center justify-center font-heading font-black text-xs shrink-0 border border-theme-subtle ${className}`}>
        {makeName.charAt(0)}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses} flex items-center justify-center shrink-0 p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs group-hover:border-accent-primary/50 group-hover:shadow-xs transition-all ${className}`}>
      <img
        src={loadStage === 'motomarks' ? motomarksUrl : fallbackUrl}
        alt={`${makeName} official logo`}
        className="w-full h-full object-contain filter drop-shadow-2xs"
        loading="lazy"
        onError={() => {
          if (loadStage === 'motomarks') {
            setLoadStage('fallback');
          } else {
            setLoadStage('monogram');
          }
        }}
      />
    </div>
  );
};
