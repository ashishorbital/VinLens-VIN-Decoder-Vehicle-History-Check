import React from 'react';
import { Container } from '../layout/Container';
import { TESTIMONIALS } from '../../data/testimonials';
import { Star, ShieldCheck } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const TestimonialsSection: React.FC = () => {
  // Duplicate testimonials for continuous seamless infinite marquee loop
  const marqueeTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-16 md:py-24 bg-theme-secondary/40 transition-colors duration-200 overflow-hidden relative">
      <Container>
        {/* Section Heading */}
        <Reveal direction="up" distance={20}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight text-theme-primary">
              What Customers Say About VinLens
            </h2>
            <p className="text-base text-theme-muted">
              Over 500,000 drivers and car shoppers use VinLens reports to negotiate fair prices and dodge salvage scams.
            </p>

            <div className="inline-flex items-center gap-2 pt-1 text-xs text-theme-muted">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="font-bold text-theme-primary">4.9 / 5 Average Rating</span>
              <span>· 12,400+ Verified User Reviews</span>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Infinite Looping Marquee Track with Edge Fade Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right gradient fade masks */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-theme-secondary via-theme-secondary/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-theme-secondary via-theme-secondary/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Marquee Track (pauses on hover so users can comfortably read) */}
        <div className="animate-marquee-slow flex items-stretch gap-5 sm:gap-6 py-4 px-4">
          {marqueeTestimonials.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[310px] sm:w-[400px] shrink-0 p-6 sm:p-7 rounded-2xl bg-theme-card border border-theme-subtle shadow-md hover:shadow-xl hover:border-accent-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-default select-none group"
            >
              <div className="space-y-4">
                {/* Header: Reviewer Avatar, Name, Location & Savings Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-theme-subtle shadow-xs"
                      />
                      <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <strong className="text-sm font-bold text-theme-primary block group-hover:text-accent-primary transition-colors">
                        {item.name}
                      </strong>
                      <span className="text-xs text-theme-muted block">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shrink-0">
                    {item.moneySaved}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-theme-primary font-medium italic leading-relaxed">
                  "{item.review}"
                </p>
              </div>

              {/* Card Footer: Vehicle checked & Date */}
              <div className="pt-4 mt-4 border-t border-theme-subtle flex items-center justify-between text-xs text-theme-muted">
                <span className="font-semibold text-theme-primary truncate max-w-[200px]">
                  {item.vehicleChecked}
                </span>
                <span className="text-theme-subtle shrink-0">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
