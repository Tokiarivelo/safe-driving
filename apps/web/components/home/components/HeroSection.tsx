import { Icon } from '@iconify/react';
import StatsGrid from './StatsGrid';
import PhoneMockup from './PhoneMockup';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden safe-bg-light dark:safe-bg-dark">
      {/* Animated gradient background avec le nouveau gradient */}
      <div className="absolute inset-0 safe-gradient-bg opacity-20 dark:!opacity-10 animate-gradient-shift"></div>

      {/* Overlay pour améliorer le contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:!from-black/30 dark:!to-transparent"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark:!opacity-10">
        <div className="grid-pattern"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8 animate-fade-up">
            <div className="space-y-4">
              {/* Badge avec le nouveau gradient */}
              <div className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm safe-border transition-all duration-300 text-sm font-medium mb-6 bg-white/20 dark:bg-white/10 border-safe-primary-300 dark:border-white/20 safe-text-dark dark:!text-white/90">
                <span className="w-2 h-2 bg-safe-success rounded-full mr-2 animate-pulse"></span>
                Nouveau : IA intégrée pour la sécurité
              </div>

              {/* Titre principal avec le nouveau gradient */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight safe-text-dark dark:!text-white">
                Réinventons la
                <span className="block text-gradient">mobilité urbaine</span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 safe-text-muted dark:!text-white/90">
                  en toute sécurité
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl max-w-2xl safe-text-muted dark:!text-white/80">
                Intelligence artificielle, suivi temps réel et protection avancée pour chaque trajet
                urbain.
              </p>
            </div>

            {/* Boutons avec le nouveau gradient */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="safe-btn-gradient-large group">
                <span>Télécharger l\Télécharger l&apos;appapos;app</span>
                <Icon
                  icon="material-symbols:download"
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button className="safe-btn-glass-large group">
                <Icon icon="material-symbols:play-circle-outline" className="w-5 h-5" />
                <span>Essai gratuit</span>
              </button>
            </div>

            <StatsGrid />
          </div>

          <div className="relative animate-fade-left">
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Scroll indicator avec le nouveau gradient */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 rounded-full flex justify-center border-safe-primary-400 dark:!border-white/30">
          <div className="w-1 h-3 rounded-full mt-2 animate-pulse safe-gradient-circle dark:!bg-white/50"></div>
        </div>
      </div>
    </section>
  );
}
