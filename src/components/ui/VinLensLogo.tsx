import React from 'react';

export interface VinLensLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VinLensLogo: React.FC<VinLensLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-10 md:h-11',
    lg: 'h-11 sm:h-13'
  }[size];

  return (
    <a
      href="#"
      className={`inline-flex items-center select-none group cursor-pointer transition-transform duration-200 hover:opacity-95 ${className}`}
      aria-label="VinLens — Vehicle History Reports"
    >
      <img
        src="/images/vinlens-logo.png"
        alt="VinLens Logo"
        className={`${sizeMap} w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] mix-blend-multiply`}
        loading="eager"
      />
    </a>
  );
};
