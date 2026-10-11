import React from 'react';
import { Container } from '../layout/Container';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export interface VinComparisonSectionProps {
  onCheckVinClick: () => void;
}

export const VinComparisonSection: React.FC<VinComparisonSectionProps> = ({ onCheckVinClick }) => {
  const comparisonItems = [
    {
      feature: 'Vehicle Specifications',
      free: 'Basic details',
      full: 'Full specs & options'
    },
    {
      feature: 'Mileage & Odometer',
      free: 'Latest available reading',
      full: 'Mileage history & rollback checks'
    },
    {
      feature: 'Accident History',
      free: 'Basic accident indicators',
      full: 'Damage details & repair records'
    },
    {
      feature: 'Title & Ownership',
      free: 'Basic title & owner summary',
      full: 'Title brands & ownership history'
    },
    {
      feature: 'Theft & Recalls',
      free: 'Limited checks',
      full: 'Expanded theft & recall records'
    },
    {
      feature: 'Service & Financial Records',
      free: 'Not included',
      full: 'Service history & lien checks'
    }
  ];

  return (
    <section id="comparison" className="py-16 md:py-24 bg-theme-main transition-colors duration-200">
      <Container>
        <Reveal direction="up" distance={20}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight text-theme-primary">
              What a Free Online VIN Lookup Covers and What the Full Report Adds
            </h2>
            <p className="text-base text-theme-muted">
              See exactly how VinLens equips you with complete historical transparency before you invest in a pre-owned vehicle.
            </p>
          </div>
        </Reveal>

        {/* Desktop Comparison Table */}
        <Reveal direction="up" delay={100} distance={24}>
          <div className="hidden md:block rounded-2xl border border-theme-subtle bg-theme-card overflow-hidden shadow-lg">
            <table className="w-full text-left border-collapse font-data">
              <thead>
                <tr className="border-b border-theme-subtle">
                  <th className="p-5 text-sm sm:text-base font-bold text-theme-primary w-2/5 bg-theme-secondary/50">
                    Vehicle history feature
                  </th>
                  <th className="p-5 text-sm sm:text-base font-bold text-theme-primary w-[30%] bg-theme-secondary/20 border-x border-theme-subtle text-center">
                    Free VIN Check
                  </th>
                  <th className="p-5 text-sm sm:text-base font-bold text-white w-[30%] bg-accent-primary text-center">
                    <div className="inline-flex items-center gap-1.5 justify-center">
                      <Sparkles className="w-4 h-4" />
                      <span>Full VinLens Report</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-subtle text-sm">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-theme-secondary/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-theme-primary bg-theme-secondary/10">
                      {item.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-theme-muted border-x border-theme-subtle text-center">
                      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                        {item.free === 'Not included' ? (
                          <span className="inline-flex items-center gap-1.5 text-rose-500 font-medium">
                            <X className="w-4 h-4 text-rose-500 shrink-0" />
                            <span>Not included</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-theme-muted">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{item.free}</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-theme-primary bg-accent-primary/5 text-center">
                      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-accent-primary shrink-0" />
                        <span className="font-medium">{item.full}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile Comparison Cards */}
        <div className="md:hidden space-y-4 font-data">
          {comparisonItems.map((item, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 40} distance={15}>
              <div className="p-4 rounded-xl border border-theme-subtle bg-theme-card space-y-3">
                <h4 className="text-base font-bold text-theme-primary">{item.feature}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-theme-subtle/60">
                  <div className="p-2.5 rounded-lg bg-theme-secondary border border-theme-subtle">
                    <span className="text-[11px] uppercase font-bold text-theme-primary block mb-1">Free VIN Check</span>
                    <span className="text-theme-muted leading-tight font-normal">{item.free}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-accent-primary/10 border border-accent-primary/30">
                    <span className="text-[11px] uppercase font-bold text-accent-primary block mb-1">Full VinLens Report</span>
                    <span className="text-theme-primary font-medium leading-tight">{item.full}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Action Callout */}
        <Reveal direction="up" delay={150} distance={20}>
          <div className="mt-10 text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={onCheckVinClick}
              className="gap-2 font-heading font-bold"
            >
              <span>Run Free Check or Upgrade Report</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs text-theme-subtle mt-2">
              Instant online access · 100% money-back satisfaction guarantee on data errors
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
