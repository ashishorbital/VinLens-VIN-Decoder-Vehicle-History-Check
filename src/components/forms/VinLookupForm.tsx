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

  // Responsive mobile check for placeholder fit
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // License Plate state
  const [plateInput, setPlateInput] = useState('');
  const [stateInput, setStateInput] = useState('California');
  const [plateTouched, setPlateTouched] = useState(false);

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
      {/* Search Mode Tab Switcher */}
      <div className="flex items-center justify-center mb-2.5">
        <div className="inline-flex items-center rounded-xl bg-theme-card/90 p-1 border border-theme-subtle shadow-xs">
          <button
            type="button"
            onClick={() => setSearchMode('vin')}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              searchMode === 'vin'
                ? 'bg-theme-primary text-theme-inverted shadow-xs font-bold'
                : 'text-theme-muted hover:text-theme-primary hover:bg-theme-secondary/80'
            }`}
          >
            <span>by VIN</span>
            {searchMode === 'vin' && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-theme-primary pointer-events-none" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setSearchMode('plate')}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              searchMode === 'plate'
                ? 'bg-theme-primary text-theme-inverted shadow-xs font-bold'
                : 'text-theme-muted hover:text-theme-primary hover:bg-theme-secondary/80'
            }`}
          >
            <span>by US License Plate</span>
            {searchMode === 'plate' && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-theme-primary pointer-events-none" />
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-2.5">
        {/* Preserved Search Bar 3D Container */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl search-bar-3d">
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
                  maxLength={8}
                  placeholder="License Plate"
                  aria-label="License Plate"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full pl-3 sm:pl-4 pr-3 py-3 sm:py-3.5 text-base sm:text-lg font-mono font-medium tracking-wider bg-transparent text-theme-primary placeholder:text-theme-subtle placeholder:font-sans placeholder:tracking-normal focus:outline-none uppercase"
                />
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
            /* Preserved VIN Input Mode */
            <div className="relative flex-1 flex items-center min-w-0">
              <HugeiconsIcon
                icon={Search01Icon}
                size={20}
                strokeWidth={1.5}
                className="text-theme-muted ml-3 sm:ml-4 shrink-0 transition-colors"
              />
              <input
                id={isHero ? 'vin-input-hero' : undefined}
                type="text"
                value={vinInput}
                onChange={handleVinChange}
                maxLength={17}
                placeholder={isMobile ? 'Enter 17-Digit VIN' : 'Enter 17-character VIN Number'}
                aria-label="Vehicle Identification Number"
                autoComplete="off"
                spellCheck={false}
                className="w-full pl-3 pr-10 py-3 sm:py-3.5 text-base sm:text-lg font-mono font-medium tracking-wider bg-transparent text-theme-primary placeholder:text-theme-subtle placeholder:font-sans placeholder:tracking-normal focus:outline-none uppercase"
              />
              {/* Realtime character badge */}
              <div className="absolute right-2 flex items-center gap-1.5">
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

          {/* Preserved Button Component with btn-cta-3d */}
          <Button
            type="submit"
            variant="primary"
            size={isHero ? 'lg' : 'md'}
            disabled={isSubmitting}
            className="sm:w-auto shrink-0 font-heading font-bold uppercase tracking-wide gap-2.5 btn-cta-3d text-sm sm:text-base px-6 py-3.5 rounded-xl cursor-pointer"
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

