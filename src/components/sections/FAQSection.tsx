import React from 'react';
import { Container } from '../layout/Container';
import { FAQ_ITEMS } from '../../data/faqData';
import { Accordion } from '../ui/Accordion';
import { Reveal } from '../ui/Reveal';

export const FAQSection: React.FC = () => {
  const accordionItems = FAQ_ITEMS.map(item => ({
    id: item.id,
    title: item.question,
    content: item.answer
  }));

  return (
    <section id="faq" className="py-16 md:py-24 bg-theme-main transition-colors duration-200">
      <Container size="narrow">
        <Reveal direction="up" distance={20}>
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-theme-muted">
              Everything you need to know about VIN decoding, NMVTIS database coverage, and vehicle history checks.
            </p>
          </div>
        </Reveal>

        {/* Accessible Accordion */}
        <Reveal direction="up" delay={80} distance={24}>
          <Accordion items={accordionItems} allowMultiple={false} defaultOpenId="faq-1" />
        </Reveal>

        {/* Visually Pleasing Catchy Support Card */}
        <Reveal direction="up" delay={150} distance={18}>
          <div className="mt-12 p-6 sm:p-9 rounded-3xl bg-theme-card/90 backdrop-blur-md border border-theme-subtle shadow-md hover:border-accent-primary/40 hover:shadow-[0_16px_36px_-8px_rgba(0,152,187,0.18)] transition-all duration-300 text-center relative overflow-hidden group">
            {/* Ambient Cyan Glow Accents */}
            <div className="absolute -right-16 -top-16 w-52 h-52 bg-accent-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-52 h-52 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3.5">
              {/* Pulsing Status Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-primary/10 text-accent-primary border border-accent-primary/25 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                <span>24/7 Specialist Assistance</span>
              </div>

              {/* Big, Catchy Headline */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-theme-primary tracking-tight leading-snug">
                Have a question about a specific state DMV or report discrepancy?
              </h3>

              {/* Catchy, Readable Description */}
              <p className="text-sm sm:text-base text-theme-muted leading-relaxed max-w-xl mx-auto">
                Our certified vehicle support specialists are ready to guide you through title brands, odometer records, and lien inquiries in real time.
              </p>

              {/* Action Button */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const hero = document.getElementById('hero-search');
                    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-cta-3d px-6 py-2.5 rounded-xl font-heading font-bold text-sm text-white inline-flex items-center gap-2 shadow-md hover:-translate-y-0.5 transition-transform cursor-pointer"
                >
                  <span>Ask a Support Specialist</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
