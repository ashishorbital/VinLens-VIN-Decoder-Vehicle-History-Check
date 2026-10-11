import React from 'react';
import { Container } from '../layout/Container';
import { Headphones } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const SupportSection: React.FC = () => {
  const pillars = [
    {
      step: '01',
      tag: 'Expert Guidance',
      title: 'Clear Guidance',
      desc: 'Expert assistance decoding complex salvage brand histories, insurance total losses, and state DMV transfer paperwork.',
      meta: 'DMV & Title Specialists'
    },
    {
      step: '02',
      tag: 'Dedicated Help',
      title: 'Helpful Responses',
      desc: 'Knowledgeable vehicle specialists ready to answer questions about any record, lien, or damage flag shown on your report.',
      meta: 'Direct Vehicle Analysts'
    },
    {
      step: '03',
      tag: 'Instant Access',
      title: 'Convenient Access',
      desc: 'Live chat and ticketing support designed to help you right when you are standing in a dealership lot or private sale.',
      meta: '< 2 Min Avg. Response'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-theme-main transition-colors duration-200">
      <Container>
        <Reveal direction="up" distance={20}>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            {/* Dedicated Customer Support Icon */}
            <div className="flex items-center justify-center mb-3">
              <div className="w-13 h-13 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-lg shadow-accent-primary/25">
                <Headphones className="w-6 h-6" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight text-theme-primary">
              Dedicated Customer Support: We're Here to Help
            </h2>
            <p className="text-base text-theme-muted leading-relaxed">
              Have questions about a salvage brand, NMVTIS database interpretation, or an odometer reading anomaly? Our automotive specialists are always available.
            </p>
          </div>
        </Reveal>

        {/* 3 Pillars - Icon-free, matching website Damage Check cyan aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 110} distance={20}>
              <div
                className="p-6 sm:p-7 rounded-2xl border border-theme-subtle bg-theme-card/90 backdrop-blur-md shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(0,152,187,0.14),0_4px_12px_rgba(0,152,187,0.06)] hover:border-[#0098BB]/40 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between group cursor-default select-none"
              >
                <div>
                  {/* Top Badge with Pulsing Live Dot & Step Counter */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-2xs bg-[#0098BB]/10 text-[#0098BB] border-[#0098BB]/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0098BB] animate-pulse" />
                      {pillar.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-theme-subtle group-hover:text-accent-primary transition-colors">
                      {pillar.step}
                    </span>
                  </div>

                  {/* Clean Typography Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-theme-primary mb-2.5 group-hover:text-accent-primary transition-colors tracking-tight">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Sub-bar / Telemetry Metadata */}
                <div className="pt-4 mt-5 border-t border-theme-subtle/50 flex items-center justify-between text-xs text-theme-subtle">
                  <span className="font-medium text-theme-muted">{pillar.meta}</span>
                  <span className="text-accent-primary font-bold text-[11px] opacity-80 group-hover:opacity-100 transition-opacity">
                    Active
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
