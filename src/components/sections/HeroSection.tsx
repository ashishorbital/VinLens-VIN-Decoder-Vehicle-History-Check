import React from 'react';
import { Container } from '../layout/Container';
import { VinLookupForm } from '../forms/VinLookupForm';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  StarIcon,
  SecurityCheckIcon,
  CheckmarkCircle02Icon,
  DashboardSpeed01Icon,
  Alert01Icon,
  Alert02Icon,
  SecurityWarningIcon,
} from '@hugeicons/core-free-icons';
import { Reveal } from '../ui/Reveal';
import { VehicleInspectReveal } from '../ui/VehicleInspectReveal';

export interface HeroSectionProps {
  onSearchVin: (vin: string) => void;
  onHelpClick: () => void;
  onExploreReportClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchVin,
  onHelpClick,
  onExploreReportClick: _onExploreReportClick
}) => {
  // Typing animation for "Showroom Shine." after page loads
  const [typedText, setTypedText] = React.useState('');

  // Hover / inspection state for dynamic diagnostic badges
  const [isInspectingCar, setIsInspectingCar] = React.useState(false);
  const [isHoveringBadge, setIsHoveringBadge] = React.useState(false);
  const isInspecting = isInspectingCar || isHoveringBadge;

  React.useEffect(() => {
    const fullPhrase = 'Showroom Shine.';
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    timer = setTimeout(() => {
      interval = setInterval(() => {
        charIdx++;
        setTypedText(fullPhrase.slice(0, charIdx));
        if (charIdx >= fullPhrase.length) {
          clearInterval(interval);
        }
      }, 75);
    }, 380);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="hero-search" className="relative pt-2 sm:pt-4 md:pt-8 pb-8 sm:pb-10 md:pb-12 overflow-hidden bg-theme-secondary/40 transition-colors duration-200 scroll-mt-20">
      {/* Background subtle radial gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-2 sm:gap-y-4 lg:gap-y-6 lg:gap-x-8 items-center">
          {/* 1. Headline & Subtitle: Mobile 1st, Desktop Left Column (Top) */}
          <Reveal direction="up" distance={16} duration={600} className="order-1 lg:order-none lg:col-span-7">
            <div className="space-y-1.5 sm:space-y-3 lg:space-y-6 text-left">
              {/* Headline with typing animation */}
              <h1 
                aria-label="See Beyond the Showroom Shine."
                className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-bold tracking-tight text-theme-primary leading-[1.14] sm:leading-[1.12]"
              >
                See Beyond the{' '}
                <span className="text-accent-primary">
                  {typedText}
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base lg:text-lg text-theme-muted max-w-2xl leading-normal sm:leading-relaxed">
                Explore a car's available history before you commit, with insights into reported accidents, mileage, and ownership.
              </p>
            </div>
          </Reveal>

          {/* 2. Right Column (Desktop): Hero Vehicle with Floating Diagnostic Badges & Tech Glow (Desktop Right, Mobile 2nd) */}
          <Reveal direction="up" distance={16} delay={60} duration={650} className="order-2 lg:order-none lg:col-span-5 lg:row-span-2 relative flex justify-center items-center overflow-visible self-center">
            <div className="relative w-full max-w-[270px] sm:max-w-md lg:max-w-none overflow-visible py-0 lg:py-6 mx-auto">
              {/* Soft Tech Radial Glow Backdrop - Desktop Only */}
              <div 
                className={`hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] max-w-[540px] max-h-[540px] rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-500 ${
                  isInspecting
                    ? 'bg-gradient-to-tr from-rose-500/15 via-amber-500/10 to-transparent'
                    : 'bg-gradient-to-tr from-accent-primary/12 via-cyan-500/5 to-transparent'
                }`}
                aria-hidden="true"
              />

              {/* Concentric Telemetry Calibration Rings (Automotive HUD feel) - Desktop Only */}
              <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[430px] h-[340px] sm:h-[430px] pointer-events-none -z-10 items-center justify-center">
                <div
                  className={`w-full h-full rounded-full border border-dashed animate-[spin_60s_linear_infinite] transition-colors duration-500 ${
                    isInspecting ? 'border-rose-400/25' : 'border-accent-primary/15'
                  }`}
                />
                <div
                  className={`absolute w-[76%] h-[76%] rounded-full border transition-colors duration-500 ${
                    isInspecting ? 'border-amber-400/20' : 'border-accent-primary/10'
                  }`}
                />
              </div>

              {/* Floating Badge 1: Top-Right (Title Status: Clean vs Salvage) - Desktop Only */}
              <div
                onMouseEnter={() => setIsHoveringBadge(true)}
                onMouseLeave={() => setIsHoveringBadge(false)}
                className={`hidden lg:flex absolute -top-3 sm:-top-5 -right-2 sm:-right-4 items-center gap-2.5 p-2.5 px-3.5 rounded-2xl backdrop-blur-md border select-none animate-float-badge-1 transition-all duration-300 z-30 cursor-pointer ${
                  isInspecting
                    ? 'bg-rose-50/95 border-rose-300/80 shadow-[0_10px_25px_-4px_rgba(244,63,94,0.2),0_16px_32px_-8px_rgba(225,29,72,0.15)] ring-1 ring-rose-500/25 scale-[1.02]'
                    : 'bg-white/95 border-[#D5E4F0] shadow-[0_8px_20px_-4px_rgba(15,23,42,0.08),0_16px_32px_-8px_rgba(0,152,187,0.12)]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    isInspecting ? 'bg-rose-500/15 text-rose-600' : 'bg-emerald-500/15 text-emerald-600'
                  }`}
                >
                  <HugeiconsIcon
                    icon={isInspecting ? SecurityWarningIcon : SecurityCheckIcon}
                    size={18}
                    strokeWidth={1.5}
                    className={isInspecting ? 'animate-pulse' : ''}
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold font-heading flex items-center gap-1.5 transition-colors duration-300">
                    <span className={isInspecting ? 'text-rose-700' : 'text-theme-primary'}>
                      {isInspecting ? 'Salvage Title Brand' : 'Clean Title Verified'}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isInspecting ? 'bg-rose-500 animate-ping' : 'bg-emerald-500 animate-pulse'
                      }`}
                    />
                  </div>
                  <div
                    className={`text-xs font-medium transition-colors duration-300 ${
                      isInspecting ? 'text-rose-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {isInspecting ? 'Total Loss Auction Record' : '0 Salvage, Flood, or Junk Brands'}
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom-Left (Mileage: Verified vs Rollback Discrepancy) - Desktop Only */}
              <div
                onMouseEnter={() => setIsHoveringBadge(true)}
                onMouseLeave={() => setIsHoveringBadge(false)}
                className={`hidden lg:flex absolute -bottom-3 sm:-bottom-5 -left-2 sm:-left-5 items-center gap-2.5 p-2.5 px-3.5 rounded-2xl backdrop-blur-md border select-none animate-float-badge-2 transition-all duration-300 z-30 cursor-pointer ${
                  isInspecting
                    ? 'bg-amber-50/95 border-amber-300/80 shadow-[0_10px_25px_-4px_rgba(245,158,11,0.2),0_16px_32px_-8px_rgba(217,119,6,0.15)] ring-1 ring-amber-500/25 scale-[1.02]'
                    : 'bg-white/95 border-[#D5E4F0] shadow-[0_8px_20px_-4px_rgba(15,23,42,0.08),0_16px_32px_-8px_rgba(0,152,187,0.12)]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    isInspecting ? 'bg-amber-500/15 text-amber-600' : 'bg-accent-primary/15 text-accent-primary'
                  }`}
                >
                  <HugeiconsIcon
                    icon={isInspecting ? Alert02Icon : DashboardSpeed01Icon}
                    size={18}
                    strokeWidth={1.5}
                    className={isInspecting ? 'animate-pulse' : ''}
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold font-heading transition-colors duration-300">
                    {isInspecting ? (
                      <span className="text-amber-800">
                        <span className="font-mono font-bold text-rose-600">118,400 mi</span> · Rollback Alert
                      </span>
                    ) : (
                      <span className="text-theme-primary">
                        <span className="font-mono font-semibold">42,180 mi</span> · Verified
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-xs font-medium transition-colors duration-300 ${
                      isInspecting ? 'text-amber-700 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {isInspecting ? 'Discrepancy: -76,220 mi Detected' : 'No Rollback Discrepancies'}
                  </div>
                </div>
              </div>

              {/* Floating Badge 3: Bottom-Right (Accidents: 0 vs 2 Reported) - Desktop Only */}
              <div
                onMouseEnter={() => setIsHoveringBadge(true)}
                onMouseLeave={() => setIsHoveringBadge(false)}
                className={`hidden lg:flex absolute -bottom-2 sm:-bottom-4 -right-1 sm:-right-3 items-center gap-2 p-2 px-3 rounded-xl backdrop-blur-md border select-none transition-all duration-300 z-30 cursor-pointer ${
                  isInspecting
                    ? 'bg-rose-50/95 border-rose-300/80 shadow-[0_8px_20px_-4px_rgba(244,63,94,0.18)] ring-1 ring-rose-500/25 scale-[1.02]'
                    : 'bg-white/95 border-[#D5E4F0] shadow-[0_6px_16px_-4px_rgba(15,23,42,0.06)]'
                }`}
              >
                <HugeiconsIcon
                  icon={isInspecting ? Alert01Icon : CheckmarkCircle02Icon}
                  size={15}
                  strokeWidth={1.5}
                  className={`shrink-0 ${isInspecting ? 'text-rose-600 animate-bounce' : 'text-emerald-500'}`}
                />
                <span
                  className={`text-xs transition-colors duration-300 ${
                    isInspecting ? 'font-bold text-rose-700' : 'font-semibold text-theme-primary'
                  }`}
                >
                  {isInspecting ? '2 Severe Accidents Reported' : '0 Severe Accidents Reported'}
                </span>
              </div>

              {/* Vehicle Inspection Reveal: Only clean car on mobile/tabs */}
              <VehicleInspectReveal
                cleanSrc="/images/hero-car.png"
                damagedSrc="/images/hero-car-damaged.png"
                alt="Audi A4 vehicle inspection comparison"
                isInspecting={isInspecting}
                onInspectChange={setIsInspectingCar}
              />
            </div>
          </Reveal>

          {/* 3. Search Form & Social Proof: Mobile 3rd, Desktop Left Column (Bottom) */}
          <Reveal direction="up" distance={16} delay={120} duration={600} className="order-3 lg:order-none lg:col-span-7">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-left">
              {/* VIN Lookup Form */}
              <div id="first-search-bar" className="pt-0 sm:pt-1 scroll-mt-28">
                <VinLookupForm
                  variant="hero"
                  onSearch={onSearchVin}
                  onHelpClick={onHelpClick}
                />
              </div>


              {/* Trust and Social Proof Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <HugeiconsIcon
                        key={i}
                        icon={StarIcon}
                        size={16}
                        strokeWidth={1.5}
                        className="fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <span className="font-bold text-theme-primary text-sm">4.9 / 5</span>
                  <span className="text-slate-600">(12,400+ reviews)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={SecurityCheckIcon} size={16} strokeWidth={1.5} className="text-emerald-500" />
                  <span className="font-medium text-theme-primary">Official NMVTIS Partner</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={1.5} className="text-cyan-600" />
                  <span className="font-medium text-theme-primary">50-State Records</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
