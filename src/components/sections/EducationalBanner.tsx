import React from 'react';
import { Container } from '../layout/Container';
import { ArrowRight, Database } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export interface EducationalBannerProps {
  onLearnMoreClick: () => void;
}

export const EducationalBanner: React.FC<EducationalBannerProps> = ({ onLearnMoreClick }) => {
  return (
    <section className="py-6 sm:py-7 lg:py-8 bg-theme-secondary/60 transition-colors duration-200">
      <Container>
        <Reveal direction="up" distance={18}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-theme-card border border-theme-subtle shadow-sm hover:border-theme-hover transition-colors">
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-2.5 rounded-xl bg-accent-primary/10 text-accent-primary shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-theme-primary">
                  A Car's Past May Hold More Than You Think.
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  From hidden title issues to mileage discrepancies and reported accidents, discover the records that could change your buying decision.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLearnMoreClick}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#007A99] hover:underline shrink-0 cursor-pointer self-start md:self-auto"
            >
              <span>Explore full report breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
