import React, { useState, useRef } from 'react';
import { Container } from '../layout/Container';
import { Headphones, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const SupportSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const scrollToCard = (index: number) => {
    const targetIndex = Math.max(0, Math.min(pillars.length - 1, index));
    const card = cardRefs.current[targetIndex];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveIndex(targetIndex);
    }
  };

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDiff = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(containerCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-theme-main transition-colors duration-200">
      <Container>
        <Reveal direction="up" distance={20}>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-10 lg:mb-12">
            {/* Dedicated Customer Support Icon */}
            <div className="flex items-center justify-center mb-3">
              <div className="w-13 h-13 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-lg shadow-accent-primary/25">
                <Headphones className="w-6 h-6" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight text-theme-primary">
              Dedicated Customer Support: We're Here to Help
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Have questions about a salvage brand, NMVTIS database interpretation, or an odometer reading anomaly? Our automotive specialists are always available.
            </p>
          </div>
        </Reveal>

        {/* 1. Desktop 3-Column Grid (Untouched, visible on md and up) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 110} distance={20}>
              <div
                className="p-6 sm:p-7 rounded-2xl border border-theme-subtle bg-theme-card/90 backdrop-blur-md shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(0,152,187,0.14),0_4px_12px_rgba(0,152,187,0.06)] hover:border-[#0098BB]/40 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between group cursor-default select-none"
              >
                <div>
                  {/* Top Badge: Standardized text-xs with high contrast */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-2xs bg-[#0098BB]/10 text-[#006E88] border-[#0098BB]/35">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0098BB] animate-pulse" />
                      {pillar.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700 group-hover:text-accent-primary transition-colors">
                      {pillar.step}
                    </span>
                  </div>

                  {/* Clean Typography Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-theme-primary mb-2.5 group-hover:text-accent-primary transition-colors tracking-tight">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                {/* Sub-bar / Telemetry Metadata */}
                <div className="pt-4 mt-5 border-t border-theme-subtle/50 flex items-center justify-between text-xs text-slate-700 font-semibold">
                  <span className="truncate">{pillar.meta}</span>
                  <span className="text-accent-primary font-bold text-xs opacity-90 group-hover:opacity-100 transition-opacity">
                    Active
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 2. Mobile Horizontal Snap Carousel with Edge Peek (< 768px) */}
        <div className="md:hidden space-y-5">
          {/* Snap Track */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth px-4 py-2 -mx-4"
          >
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                ref={el => { cardRefs.current[idx] = el; }}
                className={`w-[84%] shrink-0 snap-center p-6 rounded-2xl border border-theme-subtle bg-theme-card/95 backdrop-blur-md shadow-[0_10px_28px_-6px_rgba(0,152,187,0.12),0_4px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-all duration-300 ${
                  activeIndex === idx ? 'border-[#0098BB]/40 scale-[1.01]' : 'opacity-85'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-2xs bg-[#0098BB]/10 text-[#006E88] border-[#0098BB]/35">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0098BB] animate-pulse" />
                      {pillar.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-accent-primary">
                      {pillar.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-theme-primary mb-2.5 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-theme-subtle/50 flex items-center justify-between text-xs text-slate-700 font-semibold">
                  <span className="truncate">{pillar.meta}</span>
                  <span className="text-accent-primary font-bold text-xs">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Controls: Prev, Indicator Dots, Next */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => scrollToCard(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous support pillar"
              className="w-9 h-9 rounded-xl bg-theme-card border border-theme-subtle shadow-xs flex items-center justify-center text-theme-muted hover:text-accent-primary disabled:opacity-25 disabled:pointer-events-none active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {pillars.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to card ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 bg-accent-primary'
                      : 'w-2 bg-theme-subtle/50 hover:bg-theme-muted'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToCard(activeIndex + 1)}
              disabled={activeIndex === pillars.length - 1}
              aria-label="Next support pillar"
              className="w-9 h-9 rounded-xl bg-theme-card border border-theme-subtle shadow-xs flex items-center justify-center text-theme-muted hover:text-accent-primary disabled:opacity-25 disabled:pointer-events-none active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
