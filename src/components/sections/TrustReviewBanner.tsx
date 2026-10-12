import React from 'react';
import { Container } from '../layout/Container';
import { VinLookupForm } from '../forms/VinLookupForm';
import { Star, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export interface TrustReviewBannerProps {
  onSearchVin: (vin: string) => void;
  onHelpClick: () => void;
}

export const TrustReviewBanner: React.FC<TrustReviewBannerProps> = ({
  onSearchVin,
  onHelpClick
}) => {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-theme-secondary/60 transition-colors duration-200">
      <Container size="narrow">
        <div className="text-center space-y-6">
          {/* Trust Stars Pill & Heading */}
          <Reveal direction="up" distance={20}>
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 p-2 px-4 rounded-2xl bg-theme-card border border-theme-subtle shadow-sm mx-auto mb-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-theme-primary">
                Trusted by 500,000+ car buyers & verified dealers
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-theme-primary leading-tight">
              Save Thousands of Dollars Before You Sign Any Deal
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mt-4 font-normal">
              Don't take the seller's word for it. Run an instant VIN lookup now to verify the vehicle's true mechanical and ownership pedigree.
            </p>
          </Reveal>

          {/* VIN Form */}
          <Reveal direction="up" delay={150} distance={20}>
            <div className="max-w-2xl mx-auto pt-2">
              <VinLookupForm
                variant="hero"
                onSearch={onSearchVin}
                onHelpClick={onHelpClick}
              />
            </div>
          </Reveal>

          {/* Security Features (Single line on mobile, desktop layout untouched) */}
          <Reveal direction="up" delay={250} distance={16}>
            <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-6 pt-4 text-xs sm:text-sm text-slate-700 font-medium whitespace-nowrap overflow-x-auto no-scrollbar w-full">
              <div className="flex items-center gap-1.5 shrink-0">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                <span>
                  <span className="sm:hidden font-medium">256-Bit Encrypted</span>
                  <span className="hidden sm:inline">Bank-Grade 256-Bit Encryption</span>
                </span>
              </div>
              <span className="text-theme-subtle sm:hidden shrink-0">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 shrink-0" />
                <span>
                  <span className="sm:hidden font-medium">50-State Titles</span>
                  <span className="hidden sm:inline">Official 50-State Title Database</span>
                </span>
              </div>
              <span className="text-theme-subtle sm:hidden shrink-0">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                <span>
                  <span className="sm:hidden font-medium">Instant Access</span>
                  <span className="hidden sm:inline">Instant Digital Access in Seconds</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
