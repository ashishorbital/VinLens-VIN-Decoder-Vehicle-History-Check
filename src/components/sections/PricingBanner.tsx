import React from 'react';
import { Container } from '../layout/Container';
import { VinLookupForm } from '../forms/VinLookupForm';
import { Tag } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export interface PricingBannerProps {
  onSearchVin: (vin: string) => void;
  onHelpClick: () => void;
  priceHeadline?: string;
  priceSubheadline?: string;
}

export const PricingBanner: React.FC<PricingBannerProps> = ({
  onSearchVin,
  onHelpClick,
  priceHeadline = 'Starting from $1* for a vehicle history report',
  priceSubheadline = 'Explore vehicle history information before making your next car-buying decision.'
}) => {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-theme-secondary/50 transition-colors duration-200">
      <Container>
        <Reveal direction="up" distance={24}>
          <div className="relative rounded-3xl border border-theme-subtle shadow-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Background image overlay */}
            <div className="absolute inset-0 opacity-25 mix-blend-overlay overflow-hidden rounded-3xl pointer-events-none">
              <img
                src="/images/promo-car.png"
                alt="Automotive background promo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Offer Copy & Embedded Search */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5" />
                  <span>SPECIAL INTRODUCTORY PROMOTION</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {priceHeadline}
                </h2>

                <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                  {priceSubheadline}
                </p>

                {/* Embedded VIN Input */}
                <div className="max-w-xl">
                  <VinLookupForm
                    variant="banner"
                    onSearch={onSearchVin}
                    onHelpClick={onHelpClick}
                  />
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-slate-400 max-w-lg leading-relaxed pt-1">
                  * Introductory promotional rate is illustrative for frontend demonstration. Single and discounted multi-report packages will be configurable during checkout integration.
                </p>
              </div>

              {/* Right Column: Visual smartphone report badge */}
              <div className="lg:col-span-4 hidden lg:flex justify-center items-center">
                <div className="relative w-64 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-3 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-white/15">
                    <span className="font-bold tracking-wider uppercase text-cyan-300">Instant Access</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[10px]">
                      Verified
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">Full VIN History</div>
                    <div className="text-xs text-slate-300">Complete 50-State Audit</div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> 0 Hidden Salvage Records
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Clean Odometer Audit
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Open Recall Alerts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
