import React from 'react';
import { Modal } from '../ui/Modal';
import { SAMPLE_VINS } from '../../utils/validateVin';
import { BrandLogo } from '../ui/BrandLogo';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  DashboardSpeed01Icon,
  Door01Icon,
  DocumentValidationIcon,
  Shield01Icon,
  InformationCircleIcon,
  CheckmarkCircle02Icon,
  Location01Icon
} from '@hugeicons/core-free-icons';

export interface VinHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSampleVin: (vin: string) => void;
}

export const VinHelpModal: React.FC<VinHelpModalProps> = ({
  isOpen,
  onClose,
  onSelectSampleVin
}) => {
  const locations = [
    {
      title: "Driver's Side Dashboard",
      category: 'Vehicle Exterior',
      point: 'Lower Windshield Corner',
      desc: "Look through the lower corner of the front windshield on the driver's side. The 17-digit metal plate is permanently stamped on the dash.",
      icon: DashboardSpeed01Icon,
      tag: 'Most Common',
      badgeColor: 'bg-[#0098BB]/10 text-[#0098BB] border-[#0098BB]/25'
    },
    {
      title: "Driver's Door Jamb Sticker",
      category: 'Vehicle Interior',
      point: 'B-Pillar Latch Post',
      desc: "Open the driver's door and inspect the federal safety certification decal affixed to the door post or near the door latch striker area.",
      icon: Door01Icon,
      tag: 'Easy Access',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25'
    },
    {
      title: 'Vehicle Registration & Title',
      category: 'Official Paperwork',
      point: 'DMV Registration / Pink Slip',
      desc: 'Check your state vehicle registration certificate, official DMV title deed (pink slip), or annual vehicle renewal notice.',
      icon: DocumentValidationIcon,
      tag: 'Paperwork',
      badgeColor: 'bg-sky-500/10 text-sky-600 border-sky-500/25'
    },
    {
      title: 'Auto Insurance Card & Policy',
      category: 'Digital / Wallet',
      point: 'Mobile Insurance App / ID Card',
      desc: 'Your auto insurance identification card, mobile carrier app, and monthly billing statement prominently list the insured VIN.',
      icon: Shield01Icon,
      tag: 'Digital / Wallet',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/25'
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center text-accent-primary shrink-0">
            <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={1.8} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-theme-primary text-base sm:text-lg">
                Where to Find Your 17-Digit VIN
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0098BB]/10 text-[#0098BB] border border-[#0098BB]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0098BB] animate-pulse" />
                Location Guide
              </span>
            </div>
            <div className="text-[11px] text-theme-muted font-normal">
              Quick visual inspection checkpoints on physical vehicles & registration paperwork
            </div>
          </div>
        </div>
      }
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Intro Guidance Notice with License Plate Alternate Tip */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-theme-secondary/80 via-theme-card to-theme-secondary/80 border border-theme-subtle shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary shrink-0 mt-0.5 sm:mt-0">
              <HugeiconsIcon icon={InformationCircleIcon} size={20} strokeWidth={1.8} />
            </div>
            <div className="text-xs sm:text-sm">
              <div className="font-bold text-theme-primary flex items-center gap-1.5">
                <span>The Vehicle Identification Number (VIN)</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-theme-secondary border border-theme-subtle text-theme-muted font-bold">
                  17 Alphanumeric Digits
                </span>
              </div>
              <p className="text-theme-muted text-xs mt-0.5">
                Every vehicle has a unique fingerprint stamped across 2 physical body locations and recorded on all official paperwork.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-bold text-accent-primary bg-theme-card px-3 py-1.5 rounded-xl border border-theme-subtle">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} />
            <span>Never contains letters I, O, Q</span>
          </div>
        </div>

        {/* 4 Location Cards (2x2 Grid with Elevated Aesthetic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {locations.map(loc => {
            const Icon = loc.icon;
            return (
              <div
                key={loc.title}
                className="p-5 rounded-2xl border border-theme-subtle bg-theme-card/90 backdrop-blur-md shadow-xs hover:border-[#0098BB]/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Top Bar: Icon + Status Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary group-hover:scale-105 transition-transform shrink-0">
                      <HugeiconsIcon icon={Icon} size={20} strokeWidth={1.8} />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs ${loc.badgeColor}`}
                    >
                      {loc.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4 className="text-sm sm:text-base font-heading font-bold text-theme-primary group-hover:text-accent-primary transition-colors">
                      {loc.title}
                    </h4>
                    <p className="text-xs text-theme-muted leading-relaxed mt-1">
                      {loc.desc}
                    </p>
                  </div>
                </div>

                {/* Sub-bar / Visual Location Hotspot Pin */}
                <div className="pt-3.5 mt-3.5 border-t border-theme-subtle/60 flex items-center justify-between text-[11px]">
                  <span className="text-theme-subtle font-medium flex items-center gap-1">
                    <HugeiconsIcon icon={Location01Icon} size={12} className="text-accent-primary" />
                    <span>{loc.point}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase text-theme-subtle bg-theme-secondary px-2 py-0.5 rounded-md border border-theme-subtle">
                    {loc.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alternative Tip: License Plate Lookup */}
        <div className="p-3.5 rounded-xl bg-theme-secondary/50 border border-theme-subtle flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-primary shrink-0" />
            <span className="text-theme-muted">
              Don't have access to your VIN right now? You can also search by{' '}
              <strong className="text-theme-primary">US License Plate & State</strong> on the home search bar.
            </span>
          </div>
        </div>

        {/* Quick Sample Vehicles Section (Rich Cards with Car Brand Logos) */}
        <div className="pt-2 border-t border-theme-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-theme-primary">
                Test With A Sample Vehicle Right Now
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/25">
                Instant Audit Demo
              </span>
            </div>
            <span className="text-[11px] text-theme-subtle hidden sm:inline font-medium">
              Click any car to autofill and inspect report
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {SAMPLE_VINS.map(s => (
              <button
                key={s.vin}
                type="button"
                onClick={() => {
                  onSelectSampleVin(s.vin);
                  onClose();
                }}
                className="p-3 rounded-2xl border border-theme-subtle bg-theme-card hover:border-[#0098BB]/60 hover:shadow-sm hover:-translate-y-0.5 transition-all text-left flex items-center gap-3 group cursor-pointer"
              >
                <BrandLogo makeName={s.make} size="sm" className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-theme-primary group-hover:text-accent-primary transition-colors truncate">
                    {s.year} {s.make} {s.model}
                  </div>
                  <div className="text-[10px] font-mono text-theme-muted truncate pt-0.5">
                    VIN: <span className="font-semibold text-theme-primary">{s.vin.slice(0, 8)}···</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-theme-subtle group-hover:text-accent-primary group-hover:translate-x-0.5 transition-all shrink-0">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
