'use client';

import { Icon } from '@iconify/react';
import InteractiveDashboard from './InteractiveDashboard';

const features = [
  {
    icon: 'material-symbols:security',
    title: 'Sécurité Active IA',
    description:
      'Détection automatique des risques par intelligence artificielle et alertes prédictives en temps réel.',
    color: 'primary',
  },
  {
    icon: 'material-symbols:location-on',
    title: 'Tracking Holographique',
    description:
      'Suivi 3D en temps réel avec visualisation immersive et partage instantané avec vos proches.',
    color: 'secondary',
  },
  {
    icon: 'material-symbols:bolt',
    title: 'Réservation Quantum',
    description:
      'Planification instantanée avec IA prédictive pour optimiser vos trajets et anticiper les besoins.',
    color: 'accent',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50 relative">
      <div className="absolute inset-0 grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-gray-100">Voyagez en toute</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              sérénité
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Nos fonctionnalités intelligentes conçues pour votre sécurité et tranquillité d'esprit
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8 animate-fade-right">
            {features.map(feature => (
              <div
                key={feature.title}
                className="flex items-start space-x-4 p-6 bg-white dark:bg-gray-800/70 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    feature.color === 'primary'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500'
                      : feature.color === 'secondary'
                        ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500'
                        : 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500'
                  }`}
                >
                  <Icon icon={feature.icon} className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative animate-fade-left">
            <InteractiveDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
