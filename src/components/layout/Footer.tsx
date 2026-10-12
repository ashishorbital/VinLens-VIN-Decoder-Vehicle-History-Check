import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SecurityCheckIcon, SecurityLockIcon, HelpCircleIcon } from '@hugeicons/core-free-icons';
import { VinLensLogo } from '../ui/VinLensLogo';
import { Container } from './Container';

export interface FooterProps {
  onVinHelpClick: () => void;
  onSampleReportClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onVinHelpClick,
  onSampleReportClick
}) => {
  return (
    <footer className="bg-theme-secondary/70 transition-colors duration-200 pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-theme-subtle">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <VinLensLogo size="lg" />
            <p className="text-sm text-theme-muted max-w-sm leading-relaxed">
              VinLens gives vehicle buyers, owners, and automotive dealers transparent, instant vehicle history insights. Protect your investment against hidden accident damage, odometer fraud, and salvage title brands.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-theme-muted">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-card border border-theme-subtle font-medium">
                <HugeiconsIcon icon={SecurityLockIcon} size={14} strokeWidth={1.5} className="text-emerald-500" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-card border border-theme-subtle font-medium">
                <HugeiconsIcon icon={SecurityCheckIcon} size={14} strokeWidth={1.5} className="text-cyan-600" />
                <span>NMVTIS Data Source</span>
              </div>
            </div>

          </div>

          {/* Column 1: VIN Lookup */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-primary">
              VIN Lookup
            </h4>
            <ul className="space-y-2 text-sm text-theme-muted">
              <li>
                <a
                  href="#hero-search"
                  className="hover:text-accent-primary transition-colors cursor-pointer"
                >
                  Free VIN Check
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onSampleReportClick}
                  className="hover:text-accent-primary transition-colors text-left cursor-pointer"
                >
                  Sample Vehicle Report
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onVinHelpClick}
                  className="hover:text-accent-primary transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  <span>Where is my VIN?</span>
                  <HugeiconsIcon icon={HelpCircleIcon} size={14} strokeWidth={1.5} className="text-accent-primary" />
                </button>
              </li>
              <li>
                <a href="#comparison" className="hover:text-accent-primary transition-colors">
                  Report Features Comparison
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-accent-primary transition-colors">
                  Single & Multi-Pack Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Vehicle History */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-primary">
              Vehicle History
            </h4>
            <ul className="space-y-2 text-sm text-theme-muted">
              <li>
                <a href="#vehicle-history" className="hover:text-accent-primary transition-colors">
                  Accident & Damage Records
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-accent-primary transition-colors">
                  Title Brand & Salvage Check
                </a>
              </li>
              <li>
                <a href="#vehicle-history" className="hover:text-accent-primary transition-colors">
                  Odometer Rollback Fraud
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-accent-primary transition-colors">
                  Ownership & Lease History
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-accent-primary transition-colors">
                  Open Safety Recalls
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Makes & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-primary">
              Popular Makes & FAQ
            </h4>
            <ul className="space-y-2 text-sm text-theme-muted">
              <li>
                <a href="#makes" className="hover:text-accent-primary transition-colors">
                  Ford VIN Check
                </a>
              </li>
              <li>
                <a href="#makes" className="hover:text-accent-primary transition-colors">
                  Toyota VIN Lookup
                </a>
              </li>
              <li>
                <a href="#makes" className="hover:text-accent-primary transition-colors">
                  Chevrolet VIN Search
                </a>
              </li>
              <li>
                <a href="#makes" className="hover:text-accent-primary transition-colors">
                  BMW & Audi Decoder
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent-primary transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onVinHelpClick}
                  className="hover:text-accent-primary transition-colors text-left cursor-pointer"
                >
                  VIN Verification Guide
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 space-y-4 text-xs text-theme-subtle">
          <p className="leading-relaxed">
            * Promotional report pricing starting from $1 is illustrative for demonstration purposes. VinLens reports compile data aggregated from official state DMVs, insurance providers, auto auctions, and the National Motor Vehicle Title Information System (NMVTIS). Data availability may vary based on vehicle age and state jurisdiction.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-theme-subtle/50 text-theme-muted">
            <p>
              &copy; {new Date().getFullYear()} <strong className="text-theme-primary font-semibold">VinLens</strong>. All rights reserved.
            </p>

            <div className="flex flex-nowrap sm:flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-5 text-[11px] sm:text-xs whitespace-nowrap overflow-x-auto no-scrollbar w-full sm:w-auto">
              <a href="#" onClick={e => e.preventDefault()} className="hover:text-theme-primary transition-colors shrink-0">
                Privacy Policy
              </a>
              <span className="text-theme-subtle shrink-0">·</span>
              <a href="#" onClick={e => e.preventDefault()} className="hover:text-theme-primary transition-colors shrink-0">
                <span className="sm:hidden">Terms</span>
                <span className="hidden sm:inline">Terms of Service</span>
              </a>
              <span className="text-theme-subtle shrink-0">·</span>
              <a href="#" onClick={e => e.preventDefault()} className="hover:text-theme-primary transition-colors shrink-0">
                <span className="sm:hidden">Data Sources</span>
                <span className="hidden sm:inline">Data Sources & NMVTIS</span>
              </a>
              <span className="text-theme-subtle shrink-0">·</span>
              <a href="#" onClick={e => e.preventDefault()} className="hover:text-theme-primary transition-colors shrink-0">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
