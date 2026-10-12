import React, { useState, useRef } from 'react';
import { Container } from '../layout/Container';
import { TESTIMONIALS } from '../../data/testimonials';
import { 
  Star, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const TestimonialsSection: React.FC = () => {
  // Slide page index
  const [currentPage, setCurrentPage] = useState(0);

  // Responsive items per page: on desktop/tablet we show 2 cards per view, on mobile 1 card
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));

  const nextPage = () => {
    setCurrentPage((safePage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((safePage - 1 + totalPages) % totalPages);
  };

  // Touch swipe support for mobile/tablet
  const touchStartX = useRef<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      nextPage();
    } else if (diff < -45) {
      prevPage();
    }
    touchStartX.current = null;
    setIsSwiping(false);
  };

  // Render a single testimonial card
  const renderCard = (item: typeof TESTIMONIALS[0]) => (
    <div
      key={item.id}
      className="p-6 sm:p-7 rounded-2xl bg-theme-card border border-theme-subtle shadow-md hover:shadow-xl hover:border-accent-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-default select-none group h-full"
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

          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 shrink-0">
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
        <p className="text-sm text-slate-700 font-medium italic leading-relaxed">
          "{item.review}"
        </p>
      </div>

      {/* Card Footer: Vehicle checked & Date */}
      <div className="pt-4 mt-4 border-t border-theme-subtle flex items-center justify-between text-xs text-slate-700">
        <span className="font-bold text-theme-primary truncate max-w-[200px]">
          {item.vehicleChecked}
        </span>
        <span className="text-slate-600 shrink-0 font-medium">
          {item.date}
        </span>
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-theme-secondary/40 transition-colors duration-200 overflow-hidden relative">
      <Container>
        {/* Section Heading */}
        <Reveal direction="up" distance={20}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight text-theme-primary">
              What Customers Say About VinLens
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Over 500,000 drivers and car shoppers use VinLens reports to negotiate fair prices and dodge salvage scams.
            </p>

            <div className="inline-flex items-center gap-2 pt-1 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="font-bold text-theme-primary">4.9 / 5 Average Rating</span>
              <span className="text-slate-600">· 12,400+ Verified User Reviews</span>
            </div>
          </div>
        </Reveal>

        {/* Slider Controls Bar (Without view toggle) */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Status Hint */}
          <div className="text-xs sm:text-sm text-slate-700 font-semibold flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Showing {safePage * itemsPerPage + 1}–{Math.min((safePage + 1) * itemsPerPage, TESTIMONIALS.length)} of {TESTIMONIALS.length} verified reviews
            </span>
          </div>

          {/* Quick Header Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevPage}
              aria-label="Previous testimonials"
              className="w-9 h-9 rounded-xl bg-theme-card border border-theme-subtle shadow-2xs flex items-center justify-center text-slate-700 hover:text-accent-primary hover:border-accent-primary/40 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextPage}
              aria-label="Next testimonials"
              className="w-9 h-9 rounded-xl bg-theme-card border border-theme-subtle shadow-2xs flex items-center justify-center text-slate-700 hover:text-accent-primary hover:border-accent-primary/40 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slider Viewport (Contained within Container) */}
        <div className="space-y-6">
          <div
            className="relative overflow-hidden rounded-2xl touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`flex transition-transform duration-400 ease-out ${isSwiping ? 'transition-none' : ''}`}
              style={{ transform: `translateX(-${safePage * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => {
                const pageItems = TESTIMONIALS.slice(
                  pageIdx * itemsPerPage,
                  pageIdx * itemsPerPage + itemsPerPage
                );

                return (
                  <div
                    key={pageIdx}
                    className="w-full shrink-0 px-1"
                  >
                    <div className={`grid gap-5 sm:gap-6 ${itemsPerPage === 1 ? 'grid-cols-1 max-w-xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                      {pageItems.map(item => renderCard(item))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation: Step Dots and Hint */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-theme-subtle/40">
            <span className="text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-1.5">
              <span>Swipe or use arrow buttons to see more testimonials</span>
              <span className="text-accent-primary font-bold">↔</span>
            </span>

            {/* Step Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentPage(dotIdx)}
                  aria-label={`Jump to review slide ${dotIdx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    safePage === dotIdx
                      ? 'w-8 bg-accent-primary'
                      : 'w-2.5 bg-theme-subtle hover:bg-theme-muted'
                  }`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevPage}
                className="px-3.5 py-1.5 rounded-xl bg-theme-card border border-theme-subtle text-xs font-bold text-theme-primary hover:border-accent-primary hover:text-accent-primary transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                type="button"
                onClick={nextPage}
                className="px-3.5 py-1.5 rounded-xl bg-accent-primary text-white text-xs font-bold hover:bg-accent-primary/90 transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
