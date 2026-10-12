import React, { useState } from 'react';
import { Container } from '../layout/Container';
import type { VehicleMake } from '../../data/vehicleMakes';
import { SUPPORTED_MAKES } from '../../data/vehicleMakes';
import { Search } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { BrandLogo } from '../ui/BrandLogo';

export interface VehicleMakesSectionProps {
  onSelectMakeVin: (vin: string, makeName: string) => void;
}

export const VehicleMakesSection: React.FC<VehicleMakesSectionProps> = ({
  onSelectMakeVin
}) => {
  const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions = ['All', 'USA', 'Germany', 'Japan', 'South Korea', 'UK'];

  const filteredMakes = SUPPORTED_MAKES.filter(make => {
    const matchesRegion = activeRegion === 'All' || make.country === activeRegion;
    const matchesSearch = make.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      make.popularModels.some(model => model.toLowerCase().includes(searchQuery.toLowerCase().trim()));
    return matchesRegion && matchesSearch;
  });

  const handleMakeClick = (make: VehicleMake) => {
    setSelectedMake(make);
    onSelectMakeVin(make.sampleVin, make.name);
  };

  // Split 32 makes evenly for the dual opposing mobile marquees (16 in each row, duplicated for seamless loop)
  const row1Makes = SUPPORTED_MAKES.slice(0, 16);
  const row2Makes = SUPPORTED_MAKES.slice(16, 32);
  const marqueeRow1 = [...row1Makes, ...row1Makes];
  const marqueeRow2 = [...row2Makes, ...row2Makes];

  return (
    <section id="makes" className="py-16 md:py-24 bg-theme-main transition-colors duration-200">
      <Container size="wide">
        {/* Section Heading */}
        <Reveal direction="up" distance={20}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight text-theme-primary">
              We Provide VIN Decoding for the Following Makes
            </h2>
            <p className="text-base text-theme-muted">
              Select any car brand to autofill a validated manufacturer VIN and preview the decoder specifications.
            </p>
          </div>
        </Reveal>

        {/* 1. Mobile & Tablet Dual-Row Opposing Marquee (< 1024px; Desktop grid untouched) */}
        <div className="lg:hidden space-y-3.5 relative overflow-hidden py-2">
          {/* Edge Gradient Fade Masks */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-theme-main via-theme-main/80 to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-theme-main via-theme-main/80 to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Row 1: Moves Left */}
          <div className="relative w-full overflow-hidden flex items-center">
            <div className="animate-marquee-slow flex items-center gap-3 py-1">
              {marqueeRow1.map((make, idx) => {
                const isSelected = selectedMake?.name === make.name;
                return (
                  <button
                    key={`r1-${make.name}-${idx}`}
                    type="button"
                    onClick={() => handleMakeClick(make)}
                    className={`w-[170px] sm:w-[190px] shrink-0 p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 text-left flex items-center gap-2.5 group cursor-pointer relative overflow-hidden select-none active:scale-95 ${
                      isSelected
                        ? 'bg-accent-primary/10 border-accent-primary shadow-[0_8px_20px_rgba(0,152,187,0.18)] ring-1 ring-accent-primary'
                        : 'bg-theme-card/95 backdrop-blur-md border-theme-subtle hover:border-[#0098BB]/50 shadow-xs'
                    }`}
                  >
                    <BrandLogo makeName={make.name} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-bold text-theme-primary group-hover:text-accent-primary transition-colors truncate">
                        {make.name}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-theme-muted font-medium truncate">
                        {make.country}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Moves Right */}
          <div className="relative w-full overflow-hidden flex items-center">
            <div className="animate-marquee-reverse flex items-center gap-3 py-1">
              {marqueeRow2.map((make, idx) => {
                const isSelected = selectedMake?.name === make.name;
                return (
                  <button
                    key={`r2-${make.name}-${idx}`}
                    type="button"
                    onClick={() => handleMakeClick(make)}
                    className={`w-[170px] sm:w-[190px] shrink-0 p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 text-left flex items-center gap-2.5 group cursor-pointer relative overflow-hidden select-none active:scale-95 ${
                      isSelected
                        ? 'bg-accent-primary/10 border-accent-primary shadow-[0_8px_20px_rgba(0,152,187,0.18)] ring-1 ring-accent-primary'
                        : 'bg-theme-card/95 backdrop-blur-md border-theme-subtle hover:border-[#0098BB]/50 shadow-xs'
                    }`}
                  >
                    <BrandLogo makeName={make.name} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-bold text-theme-primary group-hover:text-accent-primary transition-colors truncate">
                        {make.name}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-theme-muted font-medium truncate">
                        {make.country}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Desktop View: Search/Filters + 8x4 Grid (Untouched, lg and above) */}
        <div className="hidden lg:block">
          {/* Larger Filter Bar & Search Section */}
          <Reveal direction="up" delay={50} distance={15}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-6xl mx-auto">
              {/* Country / Region Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-theme-secondary/80 border border-theme-subtle shadow-xs">
                {regions.map(region => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setActiveRegion(region)}
                    className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-150 cursor-pointer ${
                      activeRegion === region
                        ? 'bg-accent-primary text-white shadow-xs'
                        : 'text-theme-muted hover:text-theme-primary hover:bg-theme-card/70'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Quick Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="w-4.5 h-4.5 text-theme-subtle absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search makes or models..."
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 text-xs sm:text-sm font-medium rounded-2xl bg-theme-card border border-theme-subtle shadow-xs text-theme-primary placeholder:text-theme-subtle focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all"
                />
              </div>
            </div>
          </Reveal>

          {/* 8x4 Grid of Car Makes (32 Makes across 8 Columns x 4 Rows on desktop) */}
          <Reveal direction="up" delay={100} distance={24}>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
              {filteredMakes.map(make => {
                const isSelected = selectedMake?.name === make.name;
                return (
                  <button
                    key={make.name}
                    type="button"
                    onClick={() => handleMakeClick(make)}
                    className={`p-3 rounded-2xl border transition-all duration-300 text-left flex items-center gap-2.5 group cursor-pointer relative overflow-hidden select-none ${
                      isSelected
                        ? 'bg-accent-primary/10 border-accent-primary shadow-[0_8px_20px_rgba(0,152,187,0.18)] ring-1 ring-accent-primary'
                        : 'bg-theme-card/90 backdrop-blur-md border-theme-subtle hover:border-[#0098BB]/50 hover:shadow-[0_10px_24px_-6px_rgba(0,152,187,0.15)] hover:-translate-y-1'
                    }`}
                  >
                    {/* Official Car Brand Logo Badge with Solid White Background */}
                    <BrandLogo makeName={make.name} size="md" />

                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-bold text-theme-primary group-hover:text-accent-primary transition-colors truncate">
                        {make.name}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-theme-muted font-medium truncate">
                        {make.country}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredMakes.length === 0 && (
              <div className="py-12 text-center text-sm text-theme-muted">
                No vehicle makes found matching "{searchQuery}" in {activeRegion}.
              </div>
            )}
          </Reveal>
        </div>

        {/* Selected Make Action Card */}
        {selectedMake && (
          <Reveal direction="up" distance={15}>
            <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-theme-card border border-accent-primary/40 shadow-lg shadow-accent-primary/10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
              <div className="text-center sm:text-left flex items-center gap-3.5">
                <BrandLogo makeName={selectedMake.name} size="lg" />
                <div>
                  <span className="font-bold text-theme-primary block text-sm sm:text-base">
                    {selectedMake.name} Decoder Ready
                  </span>
                  <span className="text-xs text-theme-muted font-mono">
                    Sample VIN: <strong className="text-accent-primary font-semibold">{selectedMake.sampleVin}</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectMakeVin(selectedMake.sampleVin, selectedMake.name)}
                className="btn-cta-3d px-5 py-2.5 rounded-xl font-heading font-bold text-sm text-white flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
              >
                <span>Check {selectedMake.name} Now</span>
                <span>→</span>
              </button>
            </div>
          </Reveal>
        )}

        {/* MotoMarks Attribution Link (Required for free-tier domain verification) */}
        <div className="text-center mt-10">
          <p className="text-[11px] text-theme-subtle">
            Car brand logos powered by{' '}
            <a
              href="https://motomarks.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:underline font-semibold"
            >
              MotoMarks.io
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
};
