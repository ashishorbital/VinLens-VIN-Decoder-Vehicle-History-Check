import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Menu01Icon,
  Cancel01Icon,
  Search01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { VinLensLogo } from '../ui/VinLensLogo';
import { Button } from '../ui/Button';
import { Container } from './Container';

export interface HeaderProps {
  onQuickCheckClick: () => void;
  onAuthClick: () => void;
  onSearchVin?: (vin: string) => void;
  currentUser?: { name: string; email: string; role: string } | null;
}

export const Header: React.FC<HeaderProps> = ({
  onQuickCheckClick,
  onAuthClick,
  onSearchVin,
  currentUser = null
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerVin, setDrawerVin] = useState('');

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Vehicle History', href: '#vehicle-history' },
    { label: 'VIN Decoder', href: '#comparison' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDrawerSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = drawerVin.trim().toUpperCase();
    setMobileMenuOpen(false);
    if (clean.length > 0 && onSearchVin) {
      onSearchVin(clean);
    } else {
      onQuickCheckClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 header-blur transition-colors duration-200">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-18 py-2">
          {/* Left Group: Mobile Hamburger + Logo (Desktop: Logo only) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Mobile Hamburger Button: strictly hidden on desktop (lg:hidden) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-1.5 -ml-1 text-theme-primary hover:text-accent-primary transition-colors cursor-pointer rounded-lg hover:bg-theme-secondary/80 focus:outline-none"
            >
              <HugeiconsIcon
                icon={Menu01Icon}
                size={22}
                strokeWidth={2}
              />
            </button>

            {/* Logo */}
            <VinLensLogo />
          </div>

          {/* Desktop Navigation Links (Desktop only, untouched) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-sm font-semibold text-theme-muted hover:text-accent-primary transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action Area (Desktop only, untouched) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Login / Sign Up Demo Button */}
            {currentUser ? (
              <button
                type="button"
                onClick={onAuthClick}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary hover:bg-theme-card border border-theme-subtle text-xs font-bold text-theme-primary transition-colors cursor-pointer shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-accent-primary text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="truncate max-w-[110px]">{currentUser.name}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onAuthClick}
                className="text-xs sm:text-sm font-bold text-theme-muted hover:text-accent-primary transition-colors cursor-pointer px-3 py-2 rounded-xl hover:bg-theme-secondary flex items-center gap-1.5"
              >
                <HugeiconsIcon icon={UserIcon} size={16} strokeWidth={1.5} className="text-theme-subtle" />
                <span>Log In</span>
              </button>
            )}

            {/* Check VIN CTA */}
            <Button
              variant="primary"
              size="md"
              onClick={onQuickCheckClick}
              className="gap-2 shadow-sm font-heading font-bold"
            >
              <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={1.5} />
              <span>Check VIN</span>
            </Button>
          </div>

          {/* Mobile Right Action Area: Login Button matching requested order */}
          <div className="flex lg:hidden items-center">
            {currentUser ? (
              <button
                type="button"
                onClick={onAuthClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-secondary border border-theme-subtle text-xs font-bold text-theme-primary transition-colors shadow-2xs"
              >
                <div className="w-4 h-4 rounded-full bg-accent-primary text-white flex items-center justify-center text-[9px] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="truncate max-w-[80px]">{currentUser.name}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onAuthClick}
                className="px-4 py-1.5 rounded-full border border-accent-primary text-accent-primary hover:bg-accent-primary/10 active:scale-95 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer shadow-2xs"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Side Drawer Navigation rendered in portal to escape header containing block */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop with click-to-close */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container spanning full screen height */}
          <div className="fixed inset-y-0 left-0 w-[84vw] max-w-[320px] h-[100dvh] bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-250 z-[10000]">
            {/* Floating Close Button outside drawer over dark backdrop */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 -right-12 w-9 h-9 rounded-full bg-slate-900/85 text-white flex items-center justify-center border border-white/20 hover:bg-slate-900 active:scale-95 transition-all cursor-pointer shadow-xl z-20"
              aria-label="Close Navigation"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={2} />
            </button>

            {/* Top Container: Header with close cross & Search Pill */}
            <div>
              <div className="bg-[#EDF4F9] p-3.5 pb-4 border-b border-slate-200/80">
                {/* Header row with Title and Cross Mark to close */}
                <div className="flex items-center justify-between pb-2.5">
                  <VinLensLogo />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 active:scale-95 transition-all cursor-pointer"
                    aria-label="Close Menu"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={2} />
                  </button>
                </div>

                {/* Enter VIN Number search pill (no camera scan) */}
                <form
                  onSubmit={handleDrawerSearchSubmit}
                  className="relative flex items-center bg-white rounded-full py-1.5 pl-4 pr-1.5 shadow-sm border border-slate-200 focus-within:border-accent-primary"
                >
                  <input
                    type="text"
                    value={drawerVin}
                    onChange={e => setDrawerVin(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                    placeholder="Enter VIN Number"
                    maxLength={17}
                    aria-label="Enter VIN Number"
                    className="w-full text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none uppercase"
                  />
                  {/* Search circle button */}
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center shrink-0 transition-all shadow-2xs cursor-pointer ml-1"
                    aria-label="Search VIN"
                  >
                    <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2.2} />
                  </button>
                </form>
              </div>

              {/* Menu Items List strictly in requested order */}
              <nav className="flex flex-col divide-y divide-slate-100 bg-white">
                {/* 1. Home */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full px-5 py-3.5 text-left text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-accent-primary transition-colors cursor-pointer"
                >
                  Home
                </button>

                {/* 2. VIN Decoder */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById('comparison') || document.getElementById('hero-search');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full px-5 py-3.5 text-left text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-accent-primary transition-colors cursor-pointer"
                >
                  VIN Decoder
                </button>

                {/* 3. License Plate Lookup */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onQuickCheckClick();
                  }}
                  className="w-full px-5 py-3.5 text-left text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-accent-primary transition-colors cursor-pointer"
                >
                  License Plate Lookup
                </button>

                {/* 4. Price */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById('pricing');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full px-5 py-3.5 text-left text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-accent-primary transition-colors cursor-pointer"
                >
                  Price
                </button>
              </nav>
            </div>

            {/* Bottom Section: Clean branding footer */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAuthClick();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-accent-primary/30 text-accent-primary hover:bg-accent-primary/10 active:scale-98 font-bold text-xs sm:text-sm transition-all text-center cursor-pointer"
              >
                {currentUser ? `Account (${currentUser.name})` : 'Log In / Sign Up'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
