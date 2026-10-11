import React from 'react';

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

  // Duplicate for seamless 0 -> -50% infinite marquee loop
  const marqueeItems = [...indicators, ...indicators];

  // Uniform Damage Check color styling for all cards
  const damageCheckBadge = 'bg-[#0098BB]/10 text-[#0098BB] border-[#0098BB]/25';
  const damageCheckDot = 'bg-[#0098BB]';

  return (
    <section id="vehicle-history" className="py-8 sm:py-12 bg-theme-main transition-colors duration-200 overflow-hidden relative border-y border-theme-subtle/40 scroll-mt-20">
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
          {marqueeItems.map((item, idx) => {
            return (
              <div
                key={idx}
                className="w-[290px] sm:w-[330px] shrink-0 p-5 sm:p-6 rounded-2xl bg-theme-card/90 backdrop-blur-md border border-theme-subtle shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(0,152,187,0.14),0_4px_12px_rgba(0,152,187,0.06)] hover:border-[#0098BB]/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between cursor-default select-none"
              >
                <div>
                  {/* Top Badge with Pulsing Status Indicator (Damage Check Cyan Scheme) */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-2xs ${damageCheckBadge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${damageCheckDot} animate-pulse`} />
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-theme-subtle tracking-tight">
                      Verified
                    </span>
                  </div>

                  {/* Clean Typography Title */}
                  <h4 className="text-base sm:text-lg font-bold font-heading text-theme-primary mb-2 group-hover:text-accent-primary transition-colors tracking-tight">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Sub-bar / Telemetry Metadata */}
                <div className="pt-4 mt-4 border-t border-theme-subtle/50 flex items-center justify-between text-[11px] text-theme-subtle">
                  <span className="font-medium truncate">{item.stat}</span>
                  <span className="text-accent-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                    Instant Check →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
