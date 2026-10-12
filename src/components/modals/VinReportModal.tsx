import React, { useState, useRef, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { getMockReportByVin } from '../../data/mockReport';
import { BrandLogo } from '../ui/BrandLogo';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  SecurityCheckIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  InformationCircleIcon,
  PrinterIcon,
  DashboardSpeed01Icon,
  UserMultipleIcon,
  Car01Icon,
  Copy01Icon,
  DocumentValidationIcon,
  Shield01Icon,
  Wrench01Icon,
  CheckmarkBadge01Icon,
  Location01Icon
} from '@hugeicons/core-free-icons';
import { Button } from '../ui/Button';

export interface VinReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  vin: string;
}

export const VinReportModal: React.FC<VinReportModalProps> = ({
  isOpen,
  onClose,
  vin
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'accident' | 'ownership' | 'mileage' | 'title'>('overview');
  const [copiedVin, setCopiedVin] = useState(false);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const centerTab = (tabId: string, smooth: boolean = true) => {
    const container = tabScrollRef.current;
    const buttonEl = tabButtonRefs.current[tabId];
    if (!container || !buttonEl) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = buttonEl.getBoundingClientRect();

    const buttonCenter = buttonRect.left + buttonRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const diff = buttonCenter - containerCenter;

    container.scrollBy({
      left: diff,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  const report = getMockReportByVin(vin);

  interface TabItem {
    id: 'overview' | 'accident' | 'ownership' | 'mileage' | 'title';
    label: string;
    icon: any;
    badge?: string;
  }

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: Car01Icon },
    {
      id: 'accident',
      label: 'Accident History',
      icon: Alert02Icon,
      badge: report.accidentsReported === 0 ? 'Clean' : `${report.accidentsReported}`
    },
    {
      id: 'ownership',
      label: 'Ownership History',
      icon: UserMultipleIcon,
      badge: `${report.ownersCount}`
    },
    {
      id: 'mileage',
      label: 'Mileage Records',
      icon: DashboardSpeed01Icon,
      badge: `${report.mileageHistory.length}`
    },
    {
      id: 'title',
      label: 'Title Records',
      icon: DocumentValidationIcon,
      badge: report.titleStatus
    }
  ];

  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        centerTab(activeTab, false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab]);

  const handleScrollTabs = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentTabIndex > 0) {
      const prevTab = tabs[currentTabIndex - 1];
      setActiveTab(prevTab.id);
      centerTab(prevTab.id);
    } else if (direction === 'right' && currentTabIndex < tabs.length - 1) {
      const nextTab = tabs[currentTabIndex + 1];
      setActiveTab(nextTab.id);
      centerTab(nextTab.id);
    }
  };

  const handleTabClick = (tabId: TabItem['id']) => {
    setActiveTab(tabId);
    centerTab(tabId);
  };

  const handleCopyVin = async () => {
    try {
      await navigator.clipboard.writeText(report.vin);
      setCopiedVin(true);
      setTimeout(() => setCopiedVin(false), 2000);
    } catch {
      setCopiedVin(true);
      setTimeout(() => setCopiedVin(false), 2000);
    }
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${report.year}_${report.make}_${report.model}_VinLens_Report_${report.vin}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center text-accent-primary shrink-0">
            <HugeiconsIcon icon={SecurityCheckIcon} size={18} strokeWidth={1.8} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-theme-primary text-base sm:text-lg">
                Vehicle History Audit Report
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0098BB]/10 text-[#0098BB] border border-[#0098BB]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0098BB] animate-pulse" />
                NMVTIS Verified
              </span>
            </div>
            <div className="text-[11px] text-theme-muted font-normal">
              Official VinLens Diagnostic Telemetry · Report ID #VL-98412-AUDIT
            </div>
          </div>
        </div>
      }
      maxWidth="5xl"
    >
      {/* 1. On-Screen Interactive Modal View (Hidden in Print) */}
      <div className="space-y-6 print:hidden">
        {/* Top Notice: Verified Simulated Audit Banner */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-theme-secondary/80 via-theme-card to-theme-secondary/80 border border-theme-subtle shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary shrink-0 mt-0.5 sm:mt-0">
              <HugeiconsIcon icon={InformationCircleIcon} size={20} strokeWidth={1.8} />
            </div>
            <div className="text-xs sm:text-sm">
              <div className="font-bold text-theme-primary flex flex-wrap items-center gap-1.5">
                <span>Certified Simulated Vehicle Record</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 font-bold border border-emerald-500/30">
                  Live Feed Online
                </span>
              </div>
              <p className="text-theme-muted text-xs mt-0.5">
                Forensic history audit compiled for VIN <span className="font-mono font-bold text-theme-primary">{report.vin}</span>. Cross-referenced against NMVTIS crash records, state DMV title brands, and insurance registries.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-[11px] font-medium text-theme-subtle bg-theme-card px-3 py-1.5 rounded-xl border border-theme-subtle">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Database Synchronized</span>
          </div>
        </div>

        {/* Vehicle Hero Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-theme-card border border-theme-subtle shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Left: Make Logo + Info */}
            <div className="flex items-start sm:items-center gap-4">
              <BrandLogo
                makeName={report.make}
                size="lg"
                className="w-14 h-14 sm:w-16 sm:h-16 p-2 rounded-2xl shadow-xs shrink-0"
              />

              <div className="space-y-1.5 min-w-0">
                {/* Pills row */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyVin}
                    title="Click to copy VIN"
                    className="group flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-theme-secondary border border-theme-subtle hover:border-accent-primary/50 text-accent-primary transition-all cursor-pointer"
                  >
                    <span>VIN: {report.vin}</span>
                    <HugeiconsIcon
                      icon={copiedVin ? CheckmarkCircle02Icon : Copy01Icon}
                      size={14}
                      className={copiedVin ? 'text-emerald-500' : 'text-theme-subtle group-hover:text-accent-primary'}
                    />
                    {copiedVin && (
                      <span className="text-[10px] text-emerald-600 font-bold animate-in fade-in">
                        Copied!
                      </span>
                    )}
                  </button>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                      report.titleStatus === 'Clean'
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25'
                        : 'bg-amber-500/10 text-amber-600 border-amber-500/25'
                    }`}
                  >
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} strokeWidth={2} />
                    <span>{report.titleStatus} Title</span>
                  </span>

                  <span className="text-xs px-2.5 py-1 rounded-lg bg-theme-secondary text-theme-muted border border-theme-subtle font-medium flex items-center gap-1">
                    <HugeiconsIcon icon={Location01Icon} size={12} className="text-theme-subtle" />
                    <span>Titled in {report.stateOfTitle}</span>
                  </span>

                  <span className="text-xs px-2.5 py-1 rounded-lg bg-theme-card text-theme-muted border border-theme-subtle font-medium">
                    {report.usageType}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-theme-primary tracking-tight">
                  {report.year} {report.make} {report.model}{' '}
                  <span className="text-accent-primary font-bold text-lg sm:text-xl lg:text-2xl">
                    {report.trim}
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-theme-muted flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>{report.bodyStyle}</span>
                  <span className="text-theme-subtle">·</span>
                  <span>{report.engine}</span>
                  <span className="text-theme-subtle">·</span>
                  <span>{report.drivetrain}</span>
                </p>
              </div>
            </div>

            {/* Right: VinLens History Score Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-theme-secondary/90 to-theme-card border border-theme-subtle shadow-xs shrink-0 self-start lg:self-auto">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-bold text-theme-subtle flex items-center gap-1.5">
                  <HugeiconsIcon icon={SecurityCheckIcon} size={14} className="text-accent-primary" />
                  <span>VinLens Score</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-heading font-black text-theme-primary tracking-tight">
                    {report.overallScore}
                  </span>
                  <span className="text-sm font-bold text-theme-subtle">/100</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {report.overallScore >= 90 ? 'Clean Record · Low Risk' : 'Advisory Record'}
                  </span>
                </div>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white shadow-md shrink-0 ${
                  report.overallScore >= 90
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-700 shadow-emerald-500/20'
                    : 'bg-gradient-to-br from-amber-500 to-orange-700 shadow-amber-500/20'
                }`}
              >
                <HugeiconsIcon
                  icon={report.overallScore >= 90 ? Shield01Icon : Alert02Icon}
                  size={28}
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Enhanced with visible arrows & centered titles on mobile/tablet (Desktop layout untouched) */}
        <div className="relative flex items-center gap-1.5 w-full">
          {/* Mobile/Tablet Left Step Arrow (Hidden on Desktop) */}
          <button
            type="button"
            onClick={() => handleScrollTabs('left')}
            disabled={currentTabIndex <= 0}
            aria-label="Previous tab"
            className={`lg:hidden shrink-0 w-8 h-9 sm:w-9 sm:h-10 rounded-xl bg-theme-secondary/80 border border-theme-subtle shadow-xs flex items-center justify-center transition-all cursor-pointer ${
              currentTabIndex > 0
                ? 'text-theme-primary hover:bg-theme-card hover:text-accent-primary active:scale-95'
                : 'text-theme-subtle opacity-25 cursor-not-allowed pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scroll Track with Subtle Left/Right Fade Masks */}
          <div className="relative flex-1 min-w-0 overflow-hidden rounded-2xl">
            {/* Left Fade Gradient Mask (Hidden on Desktop) */}
            <div
              className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-theme-secondary via-theme-secondary/80 to-transparent z-10 transition-opacity duration-200 lg:hidden ${
                currentTabIndex > 0 ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Scrollable Tabs */}
            <div
              ref={tabScrollRef}
              className="p-1.5 rounded-2xl bg-theme-secondary/80 border border-theme-subtle shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth max-lg:snap-x max-lg:snap-mandatory"
            >
              {/* Left Spacer for Mobile/Tablet to allow Tab 1 to center (Hidden on Desktop) */}
              <div className="shrink-0 w-[calc(50%-75px)] sm:w-[calc(50%-90px)] lg:hidden pointer-events-none" aria-hidden="true" />

              {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={el => { tabButtonRefs.current[tab.id] = el; }}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 shrink-0 flex items-center gap-2 cursor-pointer max-lg:snap-center ${
                      isActive
                        ? 'bg-accent-primary text-white shadow-xs'
                        : 'text-theme-muted hover:text-theme-primary hover:bg-theme-card/80'
                    }`}
                  >
                    <HugeiconsIcon icon={tab.icon} size={16} strokeWidth={1.8} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                    {tab.badge !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-theme-secondary text-theme-muted border border-theme-subtle'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Right Spacer for Mobile/Tablet to allow Last Tab to center (Hidden on Desktop) */}
              <div className="shrink-0 w-[calc(50%-75px)] sm:w-[calc(50%-90px)] lg:hidden pointer-events-none" aria-hidden="true" />
            </div>

            {/* Right Fade Gradient Mask (Hidden on Desktop) */}
            <div
              className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-theme-secondary via-theme-secondary/80 to-transparent z-10 transition-opacity duration-200 lg:hidden ${
                currentTabIndex < tabs.length - 1 ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Mobile/Tablet Right Step Arrow (Hidden on Desktop) */}
          <button
            type="button"
            onClick={() => handleScrollTabs('right')}
            disabled={currentTabIndex >= tabs.length - 1}
            aria-label="Next tab"
            className={`lg:hidden shrink-0 w-8 h-9 sm:w-9 sm:h-10 rounded-xl bg-theme-secondary/80 border border-theme-subtle shadow-xs flex items-center justify-center transition-all cursor-pointer ${
              currentTabIndex < tabs.length - 1
                ? 'text-theme-primary hover:bg-theme-card hover:text-accent-primary active:scale-95'
                : 'text-theme-subtle opacity-25 cursor-not-allowed pointer-events-none'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Quick Diagnostic Checklist (4 Telemetry Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl border border-theme-subtle bg-theme-card shadow-xs hover:border-[#0098BB]/40 hover:-translate-y-0.5 transition-all text-left space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-theme-subtle uppercase tracking-wider">
                    Accidents
                  </span>
                  <HugeiconsIcon
                    icon={report.accidentsReported === 0 ? SecurityCheckIcon : Alert02Icon}
                    size={16}
                    className={report.accidentsReported === 0 ? 'text-emerald-500' : 'text-amber-500'}
                  />
                </div>
                <div
                  className={`text-base sm:text-lg font-heading font-bold ${
                    report.accidentsReported === 0 ? 'text-emerald-600' : 'text-amber-500'
                  }`}
                >
                  {report.accidentsReported === 0 ? 'None (Clean)' : `${report.accidentsReported} Reported`}
                </div>
                <div className="text-[11px] text-theme-muted">
                  {report.accidentsReported === 0 ? 'Zero collision records' : 'Incident log logged'}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-theme-subtle bg-theme-card shadow-xs hover:border-[#0098BB]/40 hover:-translate-y-0.5 transition-all text-left space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-theme-subtle uppercase tracking-wider">
                    Owners
                  </span>
                  <HugeiconsIcon icon={UserMultipleIcon} size={16} className="text-accent-primary" />
                </div>
                <div className="text-base sm:text-lg font-heading font-bold text-theme-primary">
                  {report.ownersCount} {report.ownersCount === 1 ? 'Owner' : 'Owners'}
                </div>
                <div className="text-[11px] text-theme-muted">
                  {report.ownersTimeline[0]?.ownershipLength || 'Verified tenure'}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-theme-subtle bg-theme-card shadow-xs hover:border-[#0098BB]/40 hover:-translate-y-0.5 transition-all text-left space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-theme-subtle uppercase tracking-wider">
                    Mileage
                  </span>
                  <HugeiconsIcon icon={DashboardSpeed01Icon} size={16} className="text-accent-primary" />
                </div>
                <div className="text-base sm:text-lg font-mono font-bold text-theme-primary">
                  {report.lastReportedMileage.toLocaleString()} mi
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={11} />
                  <span>Verified Odometer</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-theme-subtle bg-theme-card shadow-xs hover:border-[#0098BB]/40 hover:-translate-y-0.5 transition-all text-left space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-theme-subtle uppercase tracking-wider">
                    Recalls
                  </span>
                  <HugeiconsIcon
                    icon={report.openRecalls === 0 ? CheckmarkBadge01Icon : Alert02Icon}
                    size={16}
                    className={report.openRecalls === 0 ? 'text-emerald-500' : 'text-amber-500'}
                  />
                </div>
                <div
                  className={`text-base sm:text-lg font-heading font-bold ${
                    report.openRecalls === 0 ? 'text-emerald-600' : 'text-amber-500'
                  }`}
                >
                  {report.openRecalls === 0 ? '0 Open Recalls' : `${report.openRecalls} Active`}
                </div>
                <div className="text-[11px] text-theme-muted">
                  NHTSA official bulletin check
                </div>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="border border-theme-subtle rounded-2xl overflow-hidden bg-theme-card shadow-xs">
              <div className="px-5 py-3.5 bg-theme-secondary/70 border-b border-theme-subtle flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={DocumentValidationIcon} size={16} className="text-accent-primary" />
                  <span className="font-heading font-bold text-xs sm:text-sm text-theme-primary">
                    Verified Manufacturer Technical Specifications
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary font-bold border border-accent-primary/20">
                  OEM Data Match
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-theme-subtle">
                <div className="p-5 space-y-3">
                  <div className="text-[11px] font-bold text-theme-subtle uppercase tracking-wider">
                    Powertrain & Mechanical
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Engine:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.engine}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Transmission:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.transmission}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Drivetrain:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.drivetrain}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Fuel Type:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.fuelType}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-[11px] font-bold text-theme-subtle uppercase tracking-wider">
                    Assembly & Body
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Body Style:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.bodyStyle}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Exterior Paint:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.exteriorColor}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Interior:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.interiorColor}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Assembly Plant:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.assemblyCountry}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-[11px] font-bold text-theme-subtle uppercase tracking-wider">
                    Registration & Records
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Title Jurisdiction:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.stateOfTitle}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Title Brand:</span>
                      <span className="font-semibold text-emerald-600 text-right">{report.titleStatus} Title</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Usage Class:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.usageType}</span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-theme-muted text-xs">Service History:</span>
                      <span className="font-semibold text-theme-primary text-right">{report.serviceRecordsCount} Records Logged</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Verified Inspection Snapshot */}
            {report.inspectionHistory && report.inspectionHistory.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-theme-secondary/40 border border-theme-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary shrink-0 mt-0.5">
                    <HugeiconsIcon icon={Wrench01Icon} size={20} strokeWidth={1.8} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-theme-primary flex items-center gap-2">
                      <span>Latest Documented Service Event: {report.inspectionHistory[0].type}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-theme-card border border-theme-subtle text-theme-muted">
                        {report.inspectionHistory[0].date}
                      </span>
                    </div>
                    <p className="text-xs text-theme-muted">
                      {report.inspectionHistory[0].details}
                    </p>
                    <div className="text-[11px] text-theme-subtle font-medium pt-0.5">
                      Service Facility: {report.inspectionHistory[0].source} · Mileage: <strong className="font-mono text-theme-primary">{report.inspectionHistory[0].odometer.toLocaleString()} mi</strong>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
                  <span>Verified Service</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Accident History */}
        {activeTab === 'accident' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl border border-theme-subtle bg-theme-card shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
                </div>
                <div>
                  <div className="text-xs text-theme-muted">Structural Frame Integrity</div>
                  <div className="text-sm font-bold text-theme-primary">No Structural Damage</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-theme-subtle bg-theme-card shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
                </div>
                <div>
                  <div className="text-xs text-theme-muted">Airbag Deployments</div>
                  <div className="text-sm font-bold text-theme-primary">0 Deployments Logged</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-theme-subtle bg-theme-card shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
                </div>
                <div>
                  <div className="text-xs text-theme-muted">Flood, Hail & Fire Damage</div>
                  <div className="text-sm font-bold text-theme-primary">None Recorded</div>
                </div>
              </div>
            </div>

            {report.accidentDetails && report.accidentDetails.length > 0 ? (
              <div className="border border-amber-500/30 rounded-2xl p-5 bg-amber-500/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-700 flex items-center gap-2">
                    <HugeiconsIcon icon={Alert02Icon} size={18} />
                    <span>Reported Collision & Incident Log</span>
                  </h4>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800">
                    {report.accidentDetails.length} Incident Recorded
                  </span>
                </div>

                {report.accidentDetails.map((acc, i) => (
                  <div
                    key={i}
                    className="text-xs space-y-2 p-4 rounded-xl bg-theme-card border border-theme-subtle shadow-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span className="text-theme-primary">Incident Date: {acc.date}</span>
                      <span className="text-amber-600 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                        {acc.severity} Severity Impact
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-theme-muted">
                      <div>
                        Point of impact: <strong className="text-theme-primary">{acc.impactPoint}</strong>
                      </div>
                      <div>
                        Airbags deployed:{' '}
                        <strong className="text-theme-primary">{acc.airbagsDeployed ? 'Yes' : 'No'}</strong>
                      </div>
                      <div>
                        Repair cost estimate:{' '}
                        <strong className="text-theme-primary font-mono">{acc.repairCostEstimate}</strong>
                      </div>
                      <div>
                        Reporting authority: <strong className="text-theme-primary">{acc.reportedBy}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 sm:p-10 rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 via-theme-card to-theme-card text-center space-y-3 shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 mx-auto shadow-xs">
                  <HugeiconsIcon icon={SecurityCheckIcon} size={36} strokeWidth={1.8} />
                </div>
                <h4 className="text-lg sm:text-xl font-heading font-bold text-theme-primary">
                  Zero Collision or Total Loss Events Detected
                </h4>
                <p className="text-xs sm:text-sm text-theme-muted max-w-lg mx-auto leading-relaxed">
                  Cross-referenced with state police crash archives, insurance total-loss databases, salvage auctions, and NMVTIS registries nationwide. Vehicle frame rails and passenger cabin show no record of structural repair.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    ✓ Clean Structural Integrity
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    ✓ 0 Airbag Deployments
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    ✓ 0 Salvage Auction Bids
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Ownership History */}
        {activeTab === 'ownership' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-2xl bg-theme-secondary/70 border border-theme-subtle flex items-center justify-between text-xs">
              <span className="text-theme-muted font-medium">Documented Ownership Timeline:</span>
              <span className="font-bold text-accent-primary flex items-center gap-1.5">
                <HugeiconsIcon icon={UserMultipleIcon} size={15} />
                <span>
                  {report.ownersCount} {report.ownersCount === 1 ? 'Owner' : 'Owners'} · Verified Registration
                </span>
              </span>
            </div>

            <div className="space-y-3 relative before:absolute before:left-5 before:top-6 before:bottom-6 before:w-0.5 before:bg-theme-subtle/70 before:hidden sm:before:block">
              {report.ownersTimeline.map((owner, idx) => (
                <div
                  key={owner.ownerNumber}
                  className="p-5 rounded-2xl border border-theme-subtle bg-theme-card shadow-xs space-y-3 relative sm:pl-14 hover:border-[#0098BB]/40 transition-all"
                >
                  <div className="hidden sm:flex absolute left-2.5 top-5 w-5 h-5 rounded-full bg-accent-primary text-white text-[10px] font-bold items-center justify-center ring-4 ring-theme-card shadow-xs">
                    {idx + 1}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-theme-subtle pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-accent-primary text-white">
                        Owner #{owner.ownerNumber}
                      </span>
                      <span className="text-xs font-semibold text-theme-primary">
                        Registered in {owner.state}
                      </span>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
                      Title Transferred Clean
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-theme-muted block">Year Purchased:</span>
                      <span className="font-bold text-theme-primary text-sm">{owner.yearPurchased}</span>
                    </div>
                    <div>
                      <span className="text-theme-muted block">Length of Ownership:</span>
                      <span className="font-bold text-theme-primary text-sm">{owner.ownershipLength}</span>
                    </div>
                    <div>
                      <span className="text-theme-muted block">Est. Annual Mileage:</span>
                      <span className="font-mono font-bold text-theme-primary text-sm">
                        ~{owner.estimatedMilesPerYear.toLocaleString()} mi/yr
                      </span>
                    </div>
                    <div>
                      <span className="text-theme-muted block">Usage Classification:</span>
                      <span className="font-bold text-theme-primary text-sm">{owner.usage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Mileage Records */}
        {activeTab === 'mileage' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-theme-secondary via-theme-card to-theme-secondary border border-theme-subtle flex items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                  <HugeiconsIcon icon={DashboardSpeed01Icon} size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="font-bold text-theme-primary text-sm flex items-center gap-1.5">
                    <span>Odometer Rollback Shield: Clean</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-theme-muted text-xs">
                    Consistent linear progression verified across {report.mileageHistory.length} documented service milestones. Zero rollback anomalies detected.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 shrink-0 hidden sm:inline-block">
                Rollback Index: 0.00%
              </span>
            </div>

            <div className="border border-theme-subtle rounded-2xl overflow-hidden bg-theme-card shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm font-data">
                <thead className="bg-theme-secondary/80 text-theme-muted font-bold border-b border-theme-subtle text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 sm:px-4">Audit Date</th>
                    <th className="p-3.5 sm:px-4">Reported Mileage</th>
                    <th className="p-3.5 sm:px-4">Reporting Facility / Source</th>
                    <th className="p-3.5 sm:px-4 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-theme-subtle font-normal">
                  {report.mileageHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-theme-secondary/40 transition-colors">
                      <td className="p-3.5 sm:px-4 font-medium text-theme-primary">{item.date}</td>
                      <td className="p-3.5 sm:px-4 font-mono font-bold text-accent-primary">
                        {item.mileage.toLocaleString()} mi
                      </td>
                      <td className="p-3.5 sm:px-4 text-theme-muted">{item.source}</td>
                      <td className="p-3.5 sm:px-4 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} />
                          <span>Verified</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Title Records */}
        {activeTab === 'title' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-2xl bg-theme-secondary/70 border border-theme-subtle flex items-center justify-between text-xs">
              <span className="text-theme-muted font-medium">50-State Title Registry Audit:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
                <span>All Brand Checks Passed Clean</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { title: 'Salvage / Junk Total Loss Brand', status: 'Clean (None)' },
                { title: 'Flood / Water Inundation Brand', status: 'Clean (None)' },
                { title: 'Rebuilt / Reconstructed Brand', status: 'Clean (None)' },
                { title: 'Lemon Law / Manufacturer Buyback', status: 'Clean (None)' },
                { title: 'Odometer Tampering / Exceeds Limits', status: 'Clean (None)' },
                { title: 'Active Stolen Police Registry', status: 'Clean (Not Stolen)' },
                { title: 'Hail & Catastrophic Disaster Brand', status: 'Clean (None)' },
                { title: 'Fire & Smoke Damage Brand', status: 'Clean (None)' },
                { title: 'Lien / Active Repossession Hold', status: 'Clear (No Active Liens)' },
                { title: 'Gray Market / Non-Conforming Spec', status: 'Clean (US Spec)' }
              ].map((brand, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl border border-theme-subtle bg-theme-card shadow-xs hover:border-[#0098BB]/40 transition-all flex items-center justify-between gap-3"
                >
                  <span className="text-theme-primary font-medium">{brand.title}</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} />
                    <span>{brand.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-theme-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-theme-subtle flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>VinLens Automated Forensic Audit · NMVTIS Approved Provider</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 flex-1 sm:flex-none cursor-pointer"
            >
              <HugeiconsIcon icon={PrinterIcon} size={16} />
              <span>Print Report</span>
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="btn-cta-3d px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-white flex-1 sm:flex-none cursor-pointer shadow-md text-center"
            >
              Done (Close)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Official Print Document View (Only renders when window.print() is called) */}
      <div className="hidden print:block text-slate-900 bg-white font-sans text-xs space-y-5">
        {/* Document Masthead */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src="/images/vinlens-logo.png"
              alt="VinLens Logo"
              className="h-10 w-auto object-contain mix-blend-multiply"
            />
            <div>
              <div className="font-heading font-black text-lg text-slate-900 tracking-tight">
                OFFICIAL VEHICLE HISTORY REPORT
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                National Motor Vehicle Title Information System (NMVTIS) Approved Data Provider
              </div>
            </div>
          </div>

          <div className="text-right text-[11px] space-y-0.5">
            <div className="font-mono font-bold text-slate-900">REPORT ID: #VL-98412-AUDIT</div>
            <div className="text-slate-600 font-medium">
              AUDIT DATE:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
              Status: Certified Original Record
            </div>
          </div>
        </div>

        {/* Vehicle Dossier Hero */}
        <div className="border border-slate-300 rounded-xl p-4 bg-slate-50 flex items-center justify-between gap-4 print-avoid-break">
          <div className="flex items-center gap-3.5">
            <BrandLogo
              makeName={report.make}
              size="md"
              className="w-12 h-12 p-1.5 bg-white border border-slate-300 rounded-xl shrink-0"
            />
            <div>
              <h2 className="text-xl font-heading font-black text-slate-900 tracking-tight">
                {report.year} {report.make} {report.model}{' '}
                <span className="text-[#0082A0] font-bold text-lg">{report.trim}</span>
              </h2>
              <div className="text-[11px] text-slate-600 font-medium pt-0.5">
                {report.bodyStyle} · {report.engine} · {report.transmission} · {report.drivetrain}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-[11px]">
                <span className="font-bold bg-white px-2 py-0.5 border border-slate-300 rounded">
                  VIN: {report.vin}
                </span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300 rounded">
                  {report.titleStatus} Title
                </span>
                <span className="text-slate-700 bg-white px-2 py-0.5 border border-slate-300 rounded">
                  Titled in {report.stateOfTitle}
                </span>
                <span className="text-slate-700 bg-white px-2 py-0.5 border border-slate-300 rounded">
                  Usage: {report.usageType}
                </span>
              </div>
            </div>
          </div>

          <div className="border-2 border-slate-800 rounded-xl p-3 text-center bg-white min-w-[130px] shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              VinLens Score
            </div>
            <div className="text-3xl font-heading font-black text-slate-900 leading-tight">
              {report.overallScore}
              <span className="text-sm font-semibold text-slate-400">/100</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-700 uppercase">
              {report.overallScore >= 90 ? 'Clean Record · Low Risk' : 'Advisory Record'}
            </div>
          </div>
        </div>

        {/* Section 1: Executive Diagnostic Summary */}
        <div className="print-avoid-break space-y-2">
          <div className="font-heading font-bold text-xs text-slate-900 border-b border-slate-300 pb-1 uppercase tracking-wider">
            1. Executive Diagnostic Summary
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            <div className="p-2.5 border border-slate-300 rounded-lg bg-slate-50 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Accidents Reported</div>
              <div
                className={`text-sm font-bold ${
                  report.accidentsReported === 0 ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {report.accidentsReported === 0 ? 'None (Clean)' : `${report.accidentsReported} Reported`}
              </div>
            </div>
            <div className="p-2.5 border border-slate-300 rounded-lg bg-slate-50 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Previous Owners</div>
              <div className="text-sm font-bold text-slate-900">
                {report.ownersCount} {report.ownersCount === 1 ? 'Owner' : 'Owners'}
              </div>
            </div>
            <div className="p-2.5 border border-slate-300 rounded-lg bg-slate-50 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Last Recorded Mileage</div>
              <div className="text-sm font-bold font-mono text-slate-900">
                {report.lastReportedMileage.toLocaleString()} mi
              </div>
            </div>
            <div className="p-2.5 border border-slate-300 rounded-lg bg-slate-50 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Open Safety Recalls</div>
              <div
                className={`text-sm font-bold ${
                  report.openRecalls === 0 ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {report.openRecalls === 0 ? '0 Open' : `${report.openRecalls} Active`}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Verified Technical Specifications */}
        <div className="print-avoid-break space-y-2">
          <div className="font-heading font-bold text-xs text-slate-900 border-b border-slate-300 pb-1 uppercase tracking-wider">
            2. Verified Manufacturer Technical Specifications
          </div>
          <table className="w-full text-left border border-slate-300 text-[11px] rounded-lg overflow-hidden">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="p-2 bg-slate-100 font-semibold w-1/4">Engine:</td>
                <td className="p-2 w-1/4">{report.engine}</td>
                <td className="p-2 bg-slate-100 font-semibold w-1/4">Body Style:</td>
                <td className="p-2 w-1/4">{report.bodyStyle}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2 bg-slate-100 font-semibold">Transmission:</td>
                <td className="p-2">{report.transmission}</td>
                <td className="p-2 bg-slate-100 font-semibold">Exterior Color:</td>
                <td className="p-2">{report.exteriorColor}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2 bg-slate-100 font-semibold">Drivetrain:</td>
                <td className="p-2">{report.drivetrain}</td>
                <td className="p-2 bg-slate-100 font-semibold">Interior Color:</td>
                <td className="p-2">{report.interiorColor}</td>
              </tr>
              <tr>
                <td className="p-2 bg-slate-100 font-semibold">Assembly Plant:</td>
                <td className="p-2">{report.assemblyCountry}</td>
                <td className="p-2 bg-slate-100 font-semibold">Fuel Type:</td>
                <td className="p-2">{report.fuelType}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Accident & Structural Damage Record */}
        <div className="print-avoid-break space-y-2">
          <div className="font-heading font-bold text-xs text-slate-900 border-b border-slate-300 pb-1 uppercase tracking-wider">
            3. Accident & Collision Assessment
          </div>
          <div className="grid grid-cols-3 gap-2.5 text-[11px]">
            <div className="p-2 border border-slate-300 rounded-lg bg-slate-50 flex justify-between">
              <span className="text-slate-600">Structural Frame Damage:</span>
              <span className="font-bold text-emerald-700">None Reported</span>
            </div>
            <div className="p-2 border border-slate-300 rounded-lg bg-slate-50 flex justify-between">
              <span className="text-slate-600">Airbag Deployments:</span>
              <span className="font-bold text-emerald-700">0 Deployments</span>
            </div>
            <div className="p-2 border border-slate-300 rounded-lg bg-slate-50 flex justify-between">
              <span className="text-slate-600">Flood, Hail & Fire:</span>
              <span className="font-bold text-emerald-700">None Recorded</span>
            </div>
          </div>
          {report.accidentDetails && report.accidentDetails.length > 0 ? (
            <div className="border border-slate-300 rounded-lg p-3 space-y-2">
              <div className="font-bold text-slate-900">Incident Details Log:</div>
              {report.accidentDetails.map((acc, i) => (
                <div key={i} className="text-[11px] border-t border-slate-200 pt-2 grid grid-cols-2 gap-2">
                  <div>
                    Date: <strong>{acc.date}</strong> · Severity: <strong>{acc.severity}</strong>
                  </div>
                  <div>
                    Impact: <strong>{acc.impactPoint}</strong>
                  </div>
                  <div>
                    Repair Estimate: <strong>{acc.repairCostEstimate}</strong>
                  </div>
                  <div>
                    Source: <strong>{acc.reportedBy}</strong>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2.5 border border-emerald-300 bg-emerald-50 text-emerald-800 rounded-lg text-center font-medium">
              ✓ Clean Collision Record: No total loss, salvage rebuilds, or collision repairs found across all reporting state databases.
            </div>
          )}
        </div>

        {/* Section 4: Ownership History */}
        <div className="print-avoid-break space-y-2">
          <div className="font-heading font-bold text-xs text-slate-900 border-b border-slate-300 pb-1 uppercase tracking-wider">
            4. Ownership & Registration Timeline
          </div>
          <table className="w-full text-left border border-slate-300 text-[11px] rounded-lg overflow-hidden">
            <thead className="bg-slate-100 border-b border-slate-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-2">Owner</th>
                <th className="p-2">Year Purchased</th>
                <th className="p-2">Length of Ownership</th>
                <th className="p-2">Est. Miles / Year</th>
                <th className="p-2">State</th>
                <th className="p-2">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {report.ownersTimeline.map(owner => (
                <tr key={owner.ownerNumber}>
                  <td className="p-2 font-bold">Owner #{owner.ownerNumber}</td>
                  <td className="p-2">{owner.yearPurchased}</td>
                  <td className="p-2">{owner.ownershipLength}</td>
                  <td className="p-2 font-mono">~{owner.estimatedMilesPerYear.toLocaleString()} mi/yr</td>
                  <td className="p-2">{owner.state}</td>
                  <td className="p-2">{owner.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 5: Mileage Progression Log */}
        <div className="print-avoid-break space-y-2">
          <div className="font-heading font-bold text-xs text-slate-900 border-b border-slate-300 pb-1 uppercase tracking-wider">
            5. Odometer Progression Log
          </div>
          <table className="w-full text-left border border-slate-300 text-[11px] rounded-lg overflow-hidden">
            <thead className="bg-slate-100 border-b border-slate-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-2">Audit Date</th>
                <th className="p-2">Recorded Mileage</th>
                <th className="p-2">Reporting Facility / Source</th>
                <th className="p-2 text-right">Odometer Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {report.mileageHistory.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-2 font-medium">{item.date}</td>
                  <td className="p-2 font-mono font-bold text-[#0082A0]">
                    {item.mileage.toLocaleString()} mi
                  </td>
                  <td className="p-2 text-slate-600">{item.source}</td>
                  <td className="p-2 text-right font-bold text-emerald-700">Verified Passed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 6: 50-State NMVTIS Title Brand Audit */}
        <div className="print-avoid-break space-y-2">
          <div className="font-heading font-bold text-xs text-slate-900 border-b border-slate-300 pb-1 uppercase tracking-wider">
            6. 50-State NMVTIS Title Brand Registry Check
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {[
              { title: 'Salvage / Junk Total Loss Brand', status: 'Passed (Clean)' },
              { title: 'Flood / Water Inundation Brand', status: 'Passed (Clean)' },
              { title: 'Rebuilt / Reconstructed Brand', status: 'Passed (Clean)' },
              { title: 'Lemon Law / Manufacturer Buyback', status: 'Passed (Clean)' },
              { title: 'Odometer Tampering / Exceeds Limits', status: 'Passed (Clean)' },
              { title: 'Active Stolen Police Registry', status: 'Passed (Clean - Not Stolen)' },
              { title: 'Hail & Catastrophic Disaster Brand', status: 'Passed (Clean)' },
              { title: 'Fire & Smoke Damage Brand', status: 'Passed (Clean)' },
              { title: 'Active Lien / Repossession Hold', status: 'Passed (Clear)' },
              { title: 'Gray Market / Non-Conforming Spec', status: 'Passed (Clean - US Spec)' }
            ].map((brand, idx) => (
              <div
                key={idx}
                className="p-2 border border-slate-300 rounded-lg bg-slate-50 flex justify-between items-center"
              >
                <span className="font-medium text-slate-700">{brand.title}</span>
                <span className="font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                  {brand.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Official Sign-off & Legal Disclosure */}
        <div className="print-avoid-break border-t-2 border-slate-900 pt-3 text-[10px] text-slate-500 space-y-1">
          <div className="flex justify-between items-center font-bold text-slate-800">
            <span>VINLENS FORENSIC VEHICLE AUDIT · REPORT HASH: #VL-98412-AUTH-VERIFIED</span>
            <span>DATA SOURCE: NMVTIS / NHTSA / 50 STATE DMVS</span>
          </div>
          <p>
            This vehicle history audit is compiled through authorized access to the National Motor Vehicle Title Information System (NMVTIS), commercial insurance registries, auction databases, and law enforcement records. All rights reserved © {new Date().getFullYear()} VinLens Inc.
          </p>
        </div>
      </div>
    </Modal>
  );
};
