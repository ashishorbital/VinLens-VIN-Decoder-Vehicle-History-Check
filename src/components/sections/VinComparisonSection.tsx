import React, { useState, useRef } from 'react';
import { Container } from '../layout/Container';
import { Check, X, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export interface VinComparisonSectionProps {
  onCheckVinClick: () => void;
}

export const VinComparisonSection: React.FC<VinComparisonSectionProps> = ({ onCheckVinClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    setDragOffset(diff);
  };

  const nextCard = () => {
    setCurrentIndex(prev => (prev + 1) % 6);
  };

  const prevCard = () => {
    setCurrentIndex(prev => (prev - 1 + 6) % 6);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (dragOffset > 50) {
      prevCard();
    } else if (dragOffset < -50) {
      nextCard();
    }
    setDragOffset(0);
    setIsDragging(false);
    touchStartX.current = null;
  };
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
    <section id="comparison" className="py-12 sm:py-14 lg:py-16 bg-theme-main transition-colors duration-200">
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

        {/* Mobile 3D Swipe Deck (Only active on mobile & tablet < 768px; Desktop table remains untouched) */}
        <div className="md:hidden space-y-6 pt-2">
          {/* 3D Stacked Container */}
          <div className="relative h-[235px] sm:h-[220px] w-full max-w-sm sm:max-w-md mx-auto touch-pan-y">
            {[2, 1, 0].map(layer => {
              const itemIndex = (currentIndex + layer) % comparisonItems.length;
              const item = comparisonItems[itemIndex];
              const isFront = layer === 0;

              let transformStyle = '';
              let opacityStyle = 1;
              let zIndexStyle = 30;

              if (isFront) {
                transformStyle = `translate3d(${dragOffset}px, 0, 0) rotate(${dragOffset * 0.04}deg)`;
                opacityStyle = 1;
                zIndexStyle = 30;
              } else if (layer === 1) {
                const shiftRatio = Math.min(Math.abs(dragOffset) / 100, 1);
                const currentTranslateY = 14 - shiftRatio * 14;
                const currentScale = 0.94 + shiftRatio * 0.06;
                transformStyle = `translate3d(0, ${currentTranslateY}px, 0) scale(${currentScale})`;
                opacityStyle = 0.75 + shiftRatio * 0.25;
                zIndexStyle = 20;
              } else {
                const shiftRatio = Math.min(Math.abs(dragOffset) / 100, 1);
                const currentTranslateY = 28 - shiftRatio * 14;
                const currentScale = 0.88 + shiftRatio * 0.06;
                transformStyle = `translate3d(0, ${currentTranslateY}px, 0) scale(${currentScale})`;
                opacityStyle = 0.45 + shiftRatio * 0.3;
                zIndexStyle = 10;
              }

              return (
                <div
                  key={`${itemIndex}-${layer}`}
                  onTouchStart={isFront ? handleTouchStart : undefined}
                  onTouchMove={isFront ? handleTouchMove : undefined}
                  onTouchEnd={isFront ? handleTouchEnd : undefined}
                  style={{
                    transform: transformStyle,
                    opacity: opacityStyle,
                    zIndex: zIndexStyle,
                    transition: isFront && isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease'
                  }}
                  className={`absolute inset-x-0 top-0 p-4 sm:p-5 rounded-2xl border border-theme-subtle bg-theme-card shadow-[0_12px_32px_-4px_rgba(15,23,42,0.12),0_4px_12px_rgba(0,152,187,0.08)] select-none ${
                    isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-theme-subtle/60 text-xs">
                    <span className="font-heading font-bold text-xs px-2.5 py-0.5 rounded-full bg-accent-primary/10 text-[#007A99] border border-accent-primary/25">
                      Feature {itemIndex + 1} of {comparisonItems.length}
                    </span>
                    <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                      <span>Swipe card</span>
                      <span className="text-accent-primary font-bold">↔</span>
                    </span>
                  </div>

                  {/* Feature Title */}
                  <h4 className="text-base sm:text-lg font-heading font-bold text-theme-primary tracking-tight mt-2.5 mb-3">
                    {item.feature}
                  </h4>

                  {/* Side-by-Side Comparison Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* Free VIN check side */}
                    <div className="p-3 rounded-xl bg-theme-secondary/80 border border-theme-subtle space-y-1">
                      <span className="text-xs uppercase font-bold text-slate-700 block tracking-wider">
                        Free VIN Check
                      </span>
                      <div className="flex items-start gap-1.5 pt-0.5">
                        {item.free === 'Not included' ? (
                          <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        )}
                        <span className={`leading-tight font-medium ${item.free === 'Not included' ? 'text-rose-600 font-semibold' : 'text-slate-700'}`}>
                          {item.free}
                        </span>
                      </div>
                    </div>

                    {/* Full report side */}
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent-primary/15 to-accent-primary/5 border border-accent-primary/30 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold text-[#007A99] block tracking-wider">
                          Full Report
                        </span>
                        <Sparkles className="w-3 h-3 text-accent-primary" />
                      </div>
                      <div className="flex items-start gap-1.5 pt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent-primary shrink-0 mt-0.5" />
                        <span className="leading-tight font-semibold text-theme-primary">
                          {item.full}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deck Navigation Controls */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={prevCard}
              aria-label="Previous feature"
              className="w-9 h-9 rounded-xl bg-theme-card border border-theme-subtle shadow-xs flex items-center justify-center text-theme-muted hover:text-accent-primary hover:border-accent-primary/40 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Step Indicators */}
            <div className="flex items-center gap-1.5">
              {comparisonItems.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Jump to feature ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 bg-accent-primary'
                      : 'w-2 bg-theme-subtle/50 hover:bg-theme-muted'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextCard}
              aria-label="Next feature"
              className="w-9 h-9 rounded-xl bg-theme-card border border-theme-subtle shadow-xs flex items-center justify-center text-theme-muted hover:text-accent-primary hover:border-accent-primary/40 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2">
              Instant online access · 100% money-back satisfaction guarantee on data errors
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
