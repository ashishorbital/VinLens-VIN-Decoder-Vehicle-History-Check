import React from 'react';
import { Container } from '../layout/Container';
import { Reveal } from '../ui/Reveal';
import { ArrowRight } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      badge: 'Damage Check',
      title: 'Accident History',
      desc: 'Uncover collision impact severity, structural repairs, and airbag deployment records.',
      stat: 'NMVTIS Crash Data'
    },
    {
      badge: 'DMV Verified',
      title: 'Title Records',
      desc: 'Verify clean, salvage, rebuilt, flood, hail, lemon, and junk title brands across 50 states.',
      stat: '50-State Title Registry'
    },
    {
      badge: 'Odometer Audit',
      title: 'Mileage Verification',
      desc: 'Identify digital odometer rollbacks, meter swaps, and anomalous readings in service records.',
      stat: 'Odometer Rollback Shield'
    },
    {
      badge: 'History Log',
      title: 'Ownership & Usage',
      desc: 'Discover previous owner count, duration, state registration, and rental or taxi fleet history.',
      stat: 'Full Ownership Timeline'
    },
    {
      badge: 'Recall Audit',
      title: 'Safety & Recalls',
      desc: 'Monitor active safety recall campaigns, NHTSA bulletins, and open manufacturer fixes.',
      stat: 'NHTSA Official Database'
    },
    {
      badge: 'Insurance Check',
      title: 'Total Loss Claims',
      desc: 'Detect insurance write-offs, catastrophic flood damage, and salvage auction bids.',
      stat: 'Auction & Insurance Feed'
    }
  ];

  // Duplicate for seamless 0 -> -50% infinite marquee loop on small screens
  const marqueeItems = [...indicators, ...indicators];

  // High-contrast WCAG AA compliant badge styling (Dark verification cyan text #006E88 with 5.8:1 contrast on white)
  const damageCheckBadge = 'bg-[#0098BB]/10 text-[#006E88] border-[#0098BB]/35';
  const damageCheckDot = 'bg-[#0098BB]';

  return (
    <section 
      id="vehicle-history" 
      className="py-8 sm:py-10 lg:py-12 bg-theme-main transition-colors duration-200 border-y border-theme-subtle/40 scroll-mt-20 relative overflow-hidden"
    >
      {/* Section Header: Standardized 48px margin on desktop (mb-12), high contrast body text */}
      <Container>
        <Reveal direction="up" distance={16}>
          <div className="max-w-3xl space-y-2 text-left mb-6 sm:mb-8 lg:mb-12">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-theme-primary tracking-tight">
              Critical Vehicle Records Verified
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Every report cross-references real-time data across 50 state DMVs, insurance registries, and salvage auctions to catch hidden defects.
            </p>
          </div>
        </Reveal>
      </Container>

      {/* 1. SMALL SCREENS: Infinite looping marquee like previous (< 1024px) */}
      <div className="lg:hidden relative w-full overflow-hidden">
        {/* Edge gradient fade masks for smooth infinity look */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-theme-main via-theme-main/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true" 
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-theme-main via-theme-main/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true" 
        />

        {/* Marquee Track Container */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee-slow flex items-stretch gap-4 sm:gap-6 py-2">
            {marqueeItems.map((item, idx) => (
              <div
                key={`marquee-${idx}`}
                className="w-[290px] sm:w-[330px] shrink-0 p-5 sm:p-6 rounded-2xl bg-theme-card/90 backdrop-blur-md border border-theme-subtle shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(0,152,187,0.14),0_4px_12px_rgba(0,152,187,0.06)] hover:border-[#0098BB]/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between cursor-default select-none"
              >
                <div>
                  {/* Top Badge: Standardized minimum 12px (text-xs) with high-contrast text */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-2xs ${damageCheckBadge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${damageCheckDot} animate-pulse`} />
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-700 tracking-tight flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-base sm:text-lg font-bold font-heading text-theme-primary mb-2 group-hover:text-accent-primary transition-colors tracking-tight">
                    {item.title}
                  </h4>

                  {/* Description: High-contrast legible body text */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Sub-bar / Telemetry Metadata: Standardized text-xs with strong contrast */}
                <div className="pt-4 mt-4 border-t border-theme-subtle/50 flex items-center justify-between text-xs text-slate-700 font-semibold">
                  <span className="truncate">{item.stat}</span>
                  <span className="text-accent-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                    Instant Check →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. DESKTOP SCREENS: Clean Responsive Grid wrapped in Container (>= 1024px) */}
      <div className="hidden lg:block">
        <Container>
          <Reveal direction="up" distance={20} delay={60}>
            <div className="grid grid-cols-3 gap-5 lg:gap-6">
              {indicators.map((item, idx) => (
                <div
                  key={`grid-${idx}`}
                  className="p-5 sm:p-6 rounded-2xl bg-theme-card/90 backdrop-blur-md border border-theme-subtle shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(0,152,187,0.14),0_4px_12px_rgba(0,152,187,0.06)] hover:border-[#0098BB]/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between cursor-default"
                >
                  <div>
                    {/* Top Badge: Standardized minimum 12px (text-xs) with high-contrast text */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-2xs ${damageCheckBadge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${damageCheckDot} animate-pulse`} />
                        {item.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-700 tracking-tight flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Verified
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base sm:text-lg font-bold font-heading text-theme-primary mb-2 group-hover:text-accent-primary transition-colors tracking-tight">
                      {item.title}
                    </h4>

                    {/* Description: High-contrast legible body text */}
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Sub-bar / Telemetry Metadata: Standardized text-xs with strong contrast */}
                  <div className="pt-4 mt-5 border-t border-theme-subtle/50 flex items-center justify-between text-xs text-slate-700 font-semibold">
                    <span className="truncate">{item.stat}</span>
                    <span className="text-accent-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 inline-flex items-center gap-1">
                      <span>Instant Check</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
};
