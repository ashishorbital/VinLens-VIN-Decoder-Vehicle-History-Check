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
    <section className="py-16 md:py-24 bg-theme-secondary/60 transition-colors duration-200">
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
              <span className="text-xs font-bold text-theme-primary">
                Trusted by 500,000+ car buyers & verified dealers
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight text-theme-primary leading-tight">
              Save Thousands of Dollars Before You Sign Any Deal
            </h2>

            <p className="text-base sm:text-lg text-theme-muted max-w-xl mx-auto leading-relaxed mt-4">
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

          {/* Security Features */}
          <Reveal direction="up" delay={250} distance={16}>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-theme-muted">
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>Bank-Grade 256-Bit Encryption</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Official 50-State Title Database</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant Digital Access in Seconds</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
