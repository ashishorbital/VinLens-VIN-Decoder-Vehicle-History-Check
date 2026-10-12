import React, { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  HelpCircleIcon,
  ArrowRight01Icon,
  ArrowDown01Icon,
} from '@hugeicons/core-free-icons';
import { validateVin, SAMPLE_VINS } from '../../utils/validateVin';
import { US_STATES, SAMPLE_PLATES } from '../../utils/usStates';
import { Button } from '../ui/Button';

interface StatePickerProps {
  value: string;
  onChange: (state: string) => void;
}

const StatePicker: React.FC<StatePickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside and determine if should open upwards
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        // If limited space below (< 320px) and more room above, flip upwards
        if (spaceBelow < 320 && rect.top > spaceBelow) {
          setOpenUpwards(true);
        } else {
          setOpenUpwards(false);
        }
      }

      document.addEventListener('pointerdown', handleOutsideClick);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isOpen]);

  const filteredStates = US_STATES.filter(st =>
    st.toLowerCase().includes(searchFilter.toLowerCase().trim())
  );

  return (
    <div ref={containerRef} className="relative flex items-center shrink-0 sm:w-48 pl-2 pr-1 py-1">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between text-left py-2 px-3 rounded-xl transition-all duration-150 cursor-pointer ${
          isOpen
            ? 'bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/30'
            : 'hover:bg-theme-secondary/70 text-theme-primary'
        }`}
      >
        <span className={`text-base sm:text-lg font-medium truncate ${value ? 'text-theme-primary' : 'text-theme-subtle'}`}>
          {value || 'State'}
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={18}
          strokeWidth={1.5}
          className={`shrink-0 ml-1.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-accent-primary' : 'text-theme-muted'
          }`}
        />
      </button>

      {/* Themed Dropdown Card */}
      {isOpen && (
        <div className={`absolute right-0 sm:left-auto sm:right-0 w-64 z-50 bg-white/95 dark:bg-theme-card/95 backdrop-blur-xl border border-[#D1E1EE] dark:border-theme-subtle rounded-2xl shadow-[0_16px_40px_-4px_rgba(15,23,42,0.18),0_6px_18px_rgba(0,152,187,0.12)] p-2 animate-in fade-in zoom-in-95 duration-150 ${
          openUpwards ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
        }`}>
          {/* Quick Filter Search Bar */}
          <div className="relative mb-1.5 px-1 pt-0.5">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-theme-secondary/80 border border-theme-subtle text-xs">
              <HugeiconsIcon icon={Search01Icon} size={14} className="text-theme-muted shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search US state..."
                className="w-full bg-transparent text-theme-primary placeholder:text-theme-subtle text-xs focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Scrollable State List - Displays 6+ state listings */}
          <div className="max-h-64 overflow-y-auto pr-1 space-y-0.5">
            {filteredStates.length > 0 ? (
              filteredStates.map((st) => {
                const isSelected = value === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      onChange(st);
                      setIsOpen(false);
                      setSearchFilter('');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-accent-primary/15 text-accent-primary font-bold'
                        : 'text-theme-primary hover:bg-theme-secondary hover:text-accent-primary font-medium'
                    }`}
                  >
                    <span>{st}</span>
                    {isSelected && (
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        size={15}
                        strokeWidth={2}
                        className="text-accent-primary shrink-0"
                      />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-4 text-center text-xs text-theme-muted">
                No states found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export interface VinLookupFormProps {
  onSearch: (query: string) => void;
  onHelpClick?: () => void;
  variant?: 'hero' | 'banner' | 'compact';
  className?: string;
}

export const VinLookupForm: React.FC<VinLookupFormProps> = ({
  onSearch,
  onHelpClick,
  variant = 'hero',
  className = ''
}) => {
  // Mode toggle: 'vin' or 'plate'
  const [searchMode, setSearchMode] = useState<'vin' | 'plate'>('vin');

  // VIN state
  const [vinInput, setVinInput] = useState('');
  const [vinTouched, setVinTouched] = useState(false);

  // License Plate state
  const [plateInput, setPlateInput] = useState('');
  const [stateInput, setStateInput] = useState('California');
  const [plateTouched, setPlateTouched] = useState(false);

  // Focus states for animated placeholder marquee
  const [isVinFocused, setIsVinFocused] = useState(false);
  const [isPlateFocused, setIsPlateFocused] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const vinValidation = validateVin(vinInput);

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.toUpperCase().replace(/\s+/g, '');
    setVinInput(cleanValue);
    if (!vinTouched) setVinTouched(true);
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    setPlateInput(cleanValue);
    if (!plateTouched) setPlateTouched(true);
  };

  const isPlateValid = plateInput.trim().length >= 2;
  const isStateValid = Boolean(stateInput);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchMode === 'vin') {
      setVinTouched(true);
      if (!vinValidation.isValid) return;

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onSearch(vinValidation.cleanVin);
      }, 400);
    } else {
      setPlateTouched(true);
      if (!isPlateValid || !isStateValid) return;

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onSearch(`PLATE: ${plateInput.trim()} (${stateInput})`);
      }, 400);
    }
  };

  const handleSelectSampleVin = (sampleVin: string) => {
    setVinInput(sampleVin);
    setVinTouched(true);
  };

  const handleSelectSamplePlate = (sample: { plate: string; state: string }) => {
    setPlateInput(sample.plate);
    setStateInput(sample.state);
    setPlateTouched(true);
  };

  const isHero = variant === 'hero';

  return (
    <div className={`w-full ${className}`}>
      {/* Tactile 3D Search Mode Tab Switcher */}
      <div className="flex items-center justify-center mb-3">
        <div className="inline-flex items-center p-1 rounded-2xl bg-theme-card/95 border border-theme-subtle shadow-[inset_0_1.5px_3px_rgba(15,23,42,0.06),0_2px_8px_rgba(0,152,187,0.06)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => setSearchMode('vin')}
            className={`relative px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              searchMode === 'vin'
                ? 'bg-gradient-to-b from-[#1E2638] to-[#121824] text-white shadow-[0_3px_10px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.2)]'
                : 'text-theme-muted hover:text-theme-primary'
            }`}
          >
            <span>by VIN</span>
          </button>

          <button
            type="button"
            onClick={() => setSearchMode('plate')}
            className={`relative px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              searchMode === 'plate'
                ? 'bg-gradient-to-b from-[#1E2638] to-[#121824] text-white shadow-[0_3px_10px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.2)]'
                : 'text-theme-muted hover:text-theme-primary'
            }`}
          >
            <span>by US License Plate</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-2.5 relative group">
        {/* Atmospheric Cyan Depth Glow Halo to attract instant attention */}
        <div 
          className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-r from-accent-primary/25 via-cyan-400/20 to-accent-primary/25 rounded-3xl blur-xl opacity-70 pointer-events-none group-hover:opacity-100 transition-opacity duration-300" 
          aria-hidden="true" 
        />

        {/* Tactile 3D Search Bar Floating Slab */}
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl search-bar-3d">
          {searchMode === 'plate' ? (
            /* License Plate Input Mode */
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center min-w-0">
              {/* Plate Text Input */}
              <div className="relative flex-1 flex items-center min-w-0">
                <input
                  id={isHero ? 'plate-input-hero' : undefined}
                  type="text"
                  value={plateInput}
                  onChange={handlePlateChange}
                  onFocus={() => setIsPlateFocused(true)}
                  onBlur={() => setIsPlateFocused(false)}
                  maxLength={8}
                  aria-label="License Plate"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full pl-3 sm:pl-4 pr-3 py-3 sm:py-3.5 text-base sm:text-lg font-mono font-medium tracking-wider bg-transparent text-theme-primary focus:outline-none uppercase relative z-10"
                />

                {/* Animated Marquee Placeholder (both screens) */}
                {!plateInput && (
                  <div
                    className={`absolute inset-y-0 left-3 sm:left-4 right-3 flex items-center overflow-hidden pointer-events-none select-none marquee-mask transition-opacity duration-200 ${
                      isPlateFocused ? 'opacity-25' : 'opacity-75'
                    }`}
                  >
                    <div className="animate-placeholder-marquee flex shrink-0 items-center">
                      {/* Set 1 */}
                      <div className="flex shrink-0 items-center gap-6 pr-6">
                        <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider text-theme-subtle uppercase">
                          LICENSE PLATE
                        </span>
                        <span className="text-accent-primary/60 text-xs">✦</span>
                        <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider text-theme-subtle uppercase">
                          LICENSE PLATE
                        </span>
                        <span className="text-accent-primary/60 text-xs">✦</span>
                      </div>
                      {/* Set 2 (Identical duplicate for seamless loop) */}
                      <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
                        <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider text-theme-subtle uppercase">
                          LICENSE PLATE
                        </span>
                        <span className="text-accent-primary/60 text-xs">✦</span>
                        <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider text-theme-subtle uppercase">
                          LICENSE PLATE
                        </span>
                        <span className="text-accent-primary/60 text-xs">✦</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Thin Vertical Divider */}
              <div className="hidden sm:block w-px h-8 bg-theme-subtle shrink-0 self-center mx-1" />

              {/* Themed Custom State Picker Dropdown */}
              <StatePicker
                value={stateInput}
                onChange={(val) => {
                  setStateInput(val);
                  if (!plateTouched) setPlateTouched(true);
                }}
              />
            </div>
          ) : (
            /* Preserved VIN Input Mode with 3D Search Badge */
            <div className="relative flex-1 flex items-center min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 ml-1.5 sm:ml-2 rounded-xl bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center text-accent-primary shrink-0 shadow-2xs z-20">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={19}
                  strokeWidth={1.8}
                />
              </div>
              <input
                id={isHero ? 'vin-input-hero' : undefined}
                type="text"
                value={vinInput}
                onChange={handleVinChange}
                onFocus={() => setIsVinFocused(true)}
                onBlur={() => setIsVinFocused(false)}
                maxLength={17}
                aria-label="Vehicle Identification Number"
                autoComplete="off"
                spellCheck={false}
                className="w-full pl-3 pr-10 py-3 sm:py-3.5 text-base sm:text-lg font-mono font-medium tracking-wider bg-transparent text-theme-primary focus:outline-none uppercase relative z-10"
              />

              {/* Animated Marquee Placeholder (both screens) */}
              {!vinInput && (
                <div
                  className={`absolute inset-y-0 left-[52px] sm:left-[60px] right-10 flex items-center overflow-hidden pointer-events-none select-none marquee-mask transition-opacity duration-200 ${
                    isVinFocused ? 'opacity-25' : 'opacity-75'
                  }`}
                >
                  <div className="animate-placeholder-marquee flex shrink-0 items-center">
                    {/* Set 1 */}
                    <div className="flex shrink-0 items-center gap-6 pr-6">
                      <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider text-theme-subtle uppercase">
                        ENTER 17-CHARACTER VIN NUMBER
                      </span>
                      <span className="text-accent-primary/60 text-xs">✦</span>
                      <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider text-theme-subtle uppercase">
                        ENTER 17-CHARACTER VIN NUMBER
                      </span>
                      <span className="text-accent-primary/60 text-xs">✦</span>
                    </div>
                    {/* Set 2 (Identical duplicate for seamless loop) */}
                    <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
                      <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider text-theme-subtle uppercase">
                        ENTER 17-CHARACTER VIN NUMBER
                      </span>
                      <span className="text-accent-primary/60 text-xs">✦</span>
                      <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider text-theme-subtle uppercase">
                        ENTER 17-CHARACTER VIN NUMBER
                      </span>
                      <span className="text-accent-primary/60 text-xs">✦</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Realtime character badge */}
              <div className="absolute right-2 flex items-center gap-1.5 z-20">
                {vinValidation.isValid ? (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 text-xs font-semibold shadow-2xs">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} strokeWidth={1.5} className="shrink-0" />
                    <span className="hidden sm:inline">Valid VIN</span>
                  </div>
                ) : vinInput.length > 0 ? (
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-theme-secondary text-theme-muted border border-theme-subtle shadow-2xs">
                    {vinInput.length}/17
                  </span>
                ) : null}
              </div>
            </div>
          )}

          {/* 3D Primary Button CTA */}
          <Button
            type="submit"
            variant="primary"
            size={isHero ? 'lg' : 'md'}
            disabled={isSubmitting}
            className="sm:w-auto shrink-0 font-heading font-bold uppercase tracking-wider gap-2.5 btn-cta-3d text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-xl cursor-pointer select-none"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{searchMode === 'plate' ? 'Checking Plate...' : 'Searching...'}</span>
              </span>
            ) : (
              <>
                <span>{searchMode === 'plate' ? 'Check Plate' : 'Check VIN Now'}</span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </Button>
        </div>

        {/* Validation Error Messages */}
        {searchMode === 'vin' && vinTouched && !vinValidation.isValid && vinInput.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 pl-1 animate-in fade-in duration-150">
            <HugeiconsIcon icon={Alert02Icon} size={14} strokeWidth={1.5} className="shrink-0" />
            <span>{vinValidation.errorMessage}</span>
          </div>
        )}

        {searchMode === 'plate' && plateTouched && !isPlateValid && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 pl-1 animate-in fade-in duration-150">
            <HugeiconsIcon icon={Alert02Icon} size={14} strokeWidth={1.5} className="shrink-0" />
            <span>Please enter a valid license plate number (e.g. 7XYZ123).</span>
          </div>
        )}

        {searchMode === 'plate' && plateTouched && isPlateValid && !isStateValid && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 pl-1 animate-in fade-in duration-150">
            <HugeiconsIcon icon={Alert02Icon} size={14} strokeWidth={1.5} className="shrink-0" />
            <span>Please select the registered US state for this license plate.</span>
          </div>
        )}

        {/* Sub-form helper links and sample chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-theme-muted">
          <div className="flex items-center gap-1.5">
            <span>
              {searchMode === 'plate'
                ? '50-State DMV Integrated Database'
                : 'Standard 17-character VIN (ISO 3779)'}
            </span>
          </div>

          {onHelpClick && (
            <button
              type="button"
              onClick={onHelpClick}
              className="inline-flex items-center gap-1 text-accent-primary font-semibold hover:underline cursor-pointer"
            >
              <HugeiconsIcon icon={HelpCircleIcon} size={14} strokeWidth={1.5} />
              <span>{searchMode === 'plate' ? 'Need help finding plate records?' : "Don't know your VIN?"}</span>
            </button>
          )}
        </div>

        {/* Quick Sample chips for instant demo experience */}
        {isHero && (
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-theme-subtle font-medium">
              {searchMode === 'plate' ? 'Try sample plate:' : 'Try sample:'}
            </span>
            {searchMode === 'plate'
              ? SAMPLE_PLATES.map((sample) => (
                  <button
                    key={sample.plate}
                    type="button"
                    onClick={() => handleSelectSamplePlate(sample)}
                    className="text-xs px-2.5 py-1 rounded-md bg-theme-secondary hover:bg-theme-hover border border-theme-subtle text-theme-muted hover:text-theme-primary transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-theme-primary">{sample.plate}</span>{' '}
                    <span className="text-theme-subtle">({sample.state})</span>
                  </button>
                ))
              : SAMPLE_VINS.slice(0, 3).map((sample) => (
                  <button
                    key={sample.vin}
                    type="button"
                    onClick={() => handleSelectSampleVin(sample.vin)}
                    className="text-xs px-2.5 py-1 rounded-md bg-theme-secondary hover:bg-theme-hover border border-theme-subtle text-theme-muted hover:text-theme-primary transition-colors cursor-pointer"
                  >
                    {sample.year} {sample.make} {sample.model}
                  </button>
                ))}
          </div>
        )}
      </form>
    </div>
  );
};

