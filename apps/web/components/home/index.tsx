'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import FloatingParticles from './components/FloatingParticles';
import HeroSection from './components/HeroSection';
import TransportSection from './components/TransportSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Acceuil() {
  const { ready } = useTranslation('accueil');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!ready) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col safe-bg-light dark:bg-dark overflow-x-hidden">
      <FloatingParticles />

      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <HeroSection />
      <TransportSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
