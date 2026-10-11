import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Sections
import { HeroSection } from './components/sections/HeroSection';
import { TrustIndicators } from './components/sections/TrustIndicators';
import { EducationalBanner } from './components/sections/EducationalBanner';
import { VinComparisonSection } from './components/sections/VinComparisonSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { SupportSection } from './components/sections/SupportSection';
import { PricingBanner } from './components/sections/PricingBanner';
import { VehicleMakesSection } from './components/sections/VehicleMakesSection';
import { FAQSection } from './components/sections/FAQSection';
import { TrustReviewBanner } from './components/sections/TrustReviewBanner';

// Pages
import { AuthPage } from './components/pages/AuthPage';

// Modals
import { VinReportModal } from './components/modals/VinReportModal';
import { VinHelpModal } from './components/modals/VinHelpModal';
import { VideoDemoModal } from './components/modals/VideoDemoModal';
import { DEFAULT_MOCK_REPORT } from './data/mockReport';

export function App() {
  // View and user authentication state
  const [currentView, setCurrentView] = useState<'home' | 'auth'>('home');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);

  // Ensure page load / refresh always starts at the point where the Check VIN button lands (start of body)
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (currentView === 'home') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [currentView]);

  // Modal states
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [activeReportVin, setActiveReportVin] = useState(DEFAULT_MOCK_REPORT.vin);

  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Handlers
  const handleSearchVin = (vin: string) => {
    setActiveReportVin(vin);
    setReportModalOpen(true);
  };

  const handleOpenReportWithVin = (vin: string) => {
    setActiveReportVin(vin);
    setReportModalOpen(true);
  };

  const handleSelectMakeVin = (sampleVin: string) => {
    setActiveReportVin(sampleVin);
    const hero = document.getElementById('hero-search');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickCheckClick = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const searchBar = document.getElementById('first-search-bar') || document.getElementById('hero-search');
      if (searchBar) {
        searchBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = (document.getElementById('vin-input-hero') || document.getElementById('plate-input-hero')) as HTMLInputElement | null;
        if (input) {
          setTimeout(() => input.focus({ preventScroll: true }), 350);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, currentView !== 'home' ? 100 : 0);
  };

  // If user navigated to Login / Signup demo page
  if (currentView === 'auth') {
    return (
      <AuthPage
        currentUser={currentUser}
        onLogin={(user) => {
          setCurrentUser(user);
          setCurrentView('home');
        }}
        onLogout={() => setCurrentUser(null)}
        onBackToHome={() => setCurrentView('home')}
        onSearchVin={(vin) => {
          setCurrentView('home');
          handleSearchVin(vin);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors duration-200">
      {/* Sticky Header with Sign In Demo */}
      <div className={reportModalOpen ? 'print:hidden' : ''}>
        <Header
          onQuickCheckClick={handleQuickCheckClick}
          onAuthClick={() => setCurrentView('auth')}
          currentUser={currentUser}
        />
      </div>

      {/* Main Content */}
      <main className={`flex-1 ${reportModalOpen ? 'print:hidden' : ''}`}>
        {/* 1. Hero Section */}
        <HeroSection
          onSearchVin={handleSearchVin}
          onHelpClick={() => setHelpModalOpen(true)}
          onExploreReportClick={() => handleOpenReportWithVin(DEFAULT_MOCK_REPORT.vin)}
        />

        {/* 2. Trust Indicators */}
        <TrustIndicators />


        {/* 5. Educational Banner */}
        <EducationalBanner
          onLearnMoreClick={() => {
            const el = document.getElementById('comparison');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. VIN Lookup Comparison Section (Free vs Full Report) */}
        <VinComparisonSection
          onCheckVinClick={handleQuickCheckClick}
        />

        {/* 7. Customer Testimonials Carousel */}
        <TestimonialsSection />

        {/* 8. Dedicated Customer Support */}
        <SupportSection />

        {/* 9. Pricing Promotional Banner ("Starting from $1*...") */}
        <PricingBanner
          onSearchVin={handleSearchVin}
          onHelpClick={() => setHelpModalOpen(true)}
        />

        {/* 10. Supported Vehicle Makes */}
        <VehicleMakesSection
          onSelectMakeVin={handleSelectMakeVin}
        />

        {/* 11. Frequently Asked Questions (Accordion) */}
        <FAQSection />

        {/* 12. Trust & Review Banner (Bottom Lookup) */}
        <TrustReviewBanner
          onSearchVin={handleSearchVin}
          onHelpClick={() => setHelpModalOpen(true)}
        />
      </main>

      {/* Comprehensive Multi-Column Footer */}
      <div className={reportModalOpen ? 'print:hidden' : ''}>
        <Footer
          onVinHelpClick={() => setHelpModalOpen(true)}
          onSampleReportClick={() => handleOpenReportWithVin(DEFAULT_MOCK_REPORT.vin)}
        />
      </div>

      {/* Modals */}
      <VinReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        vin={activeReportVin}
      />

      <VinHelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        onSelectSampleVin={vin => {
          setActiveReportVin(vin);
          setReportModalOpen(true);
        }}
      />

      <VideoDemoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
}

export default App;
