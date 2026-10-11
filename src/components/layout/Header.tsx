import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Menu01Icon,
  Cancel01Icon,
  Search01Icon,
  SecurityCheckIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { VinLensLogo } from '../ui/VinLensLogo';
import { Button } from '../ui/Button';
import { Container } from './Container';

export interface HeaderProps {
  onQuickCheckClick: () => void;
  onAuthClick: () => void;
  currentUser?: { name: string; email: string; role: string } | null;
}

export const Header: React.FC<HeaderProps> = ({
  onQuickCheckClick,
  onAuthClick,
  currentUser = null
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 header-blur transition-colors duration-200">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-18 py-2">
          {/* Logo */}
          <VinLensLogo />

          {/* Desktop Navigation Links */}
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

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
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

          {/* Mobile Actions: Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg border border-theme-subtle bg-theme-card text-theme-primary hover:bg-theme-hover transition-colors cursor-pointer"
            >
              <HugeiconsIcon
                icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon}
                size={20}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-theme-subtle bg-theme-card/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-theme-primary hover:bg-theme-hover hover:text-accent-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-theme-subtle flex flex-col gap-2.5">
            <Button
              variant="outline"
              fullWidth
              size="lg"
              onClick={() => {
                setMobileMenuOpen(false);
                onAuthClick();
              }}
              className="gap-2"
            >
              <HugeiconsIcon icon={UserIcon} size={18} strokeWidth={1.5} />
              <span>{currentUser ? `Account (${currentUser.name})` : 'Log In / Sign Up'}</span>
            </Button>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => {
                setMobileMenuOpen(false);
                onQuickCheckClick();
              }}
              className="gap-2 font-heading font-bold"
            >
              <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={1.5} />
              <span>Check VIN Now</span>
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-theme-muted pt-1">
              <HugeiconsIcon icon={SecurityCheckIcon} size={16} strokeWidth={1.5} className="text-emerald-500" />
              <span>Official NMVTIS Data Partner Integration</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
