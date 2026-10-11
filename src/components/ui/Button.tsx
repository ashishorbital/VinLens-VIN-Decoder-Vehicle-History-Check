import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-md',
    md: 'px-5 py-2.5 text-sm font-semibold rounded-lg',
    lg: 'px-6 py-3.5 text-base font-bold rounded-lg'
  }[size];

  const variantClasses = {
    primary: 'btn-primary cursor-pointer active:scale-[0.98]',
    secondary: 'bg-theme-secondary text-theme-primary border border-theme-subtle hover:bg-theme-hover font-semibold cursor-pointer active:scale-[0.98]',
    outline: 'border border-theme-subtle text-theme-primary hover:border-theme-hover bg-transparent hover:bg-theme-hover cursor-pointer active:scale-[0.98]',
    ghost: 'text-theme-primary hover:bg-theme-hover cursor-pointer'
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none ${fullWidth ? 'w-full' : ''} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
