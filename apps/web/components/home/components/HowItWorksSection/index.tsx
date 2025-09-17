'use client';

import { Icon } from '@iconify/react';

const steps = [
  {
    step: '01',
    title: 'Réservez',
    description:
      'Interface futuriste avec IA pour sélectionner le véhicule optimal selon vos besoins et conditions de trafic.',
    icon: 'material-symbols:add-circle',
  },
  {
    step: '02',
    title: 'Suivez',
    description:
      'Visualisation holographique 3D de votre trajet avec alertes prédictives et communication temps réel avec le conducteur.',
    icon: 'material-symbols:analytics',
  },
  {
    step: '03',
    title: 'Soyez tranquille',
    description:
      "Confirmation automatique à l'arrivée, évaluation mutuelle et partage sécurisé de votre statut avec vos proches.",
    icon: 'material-symbols:check-circle',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-gray-100">Comment ça</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              marche
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Trois étapes simples pour révolutionner vos trajets urbains
          </p>
        </div>

        <div className="relative">
          {/* Connection lines - Desktop horizontal */}
          <div className="hidden lg:flex absolute top-20 left-0 right-0 justify-between items-center px-16">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 opacity-30"></div>
            <div className="w-16"></div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 opacity-30"></div>
          </div>

          {/* Mobile vertical connection line */}
          <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 top-20 bottom-20 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 opacity-30"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center group animate-fade-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  {/* Main circle */}
                  <div
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 ${
                      index === 0
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500'
                        : index === 1
                          ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500'
                          : 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500'
                    }`}
                  >
                    <Icon icon={step.icon} className="w-8 h-8" />
                  </div>

                  {/* Step number badge */}
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center text-white ${
                      index === 0
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600'
                        : index === 1
                          ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600'
                          : 'bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600'
                    }`}
                  >
                    {step.step}
                  </div>

                  {/* Pulsing background effect */}
                  <div
                    className={`absolute inset-0 rounded-full animate-pulse opacity-20 ${
                      index === 0
                        ? 'bg-blue-500 dark:bg-blue-400'
                        : index === 1
                          ? 'bg-indigo-500 dark:bg-indigo-400'
                          : 'bg-purple-500 dark:bg-purple-400'
                    }`}
                  ></div>

                  {/* Additional glow ring */}
                  <div
                    className={`absolute -inset-2 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${
                      index === 0
                        ? 'bg-gradient-to-br from-blue-400/20 to-blue-600/20 dark:from-blue-300/20 dark:to-blue-500/20'
                        : index === 1
                          ? 'bg-gradient-to-br from-indigo-400/20 to-indigo-600/20 dark:from-indigo-300/20 dark:to-indigo-500/20'
                          : 'bg-gradient-to-br from-purple-400/20 to-purple-600/20 dark:from-purple-300/20 dark:to-purple-500/20'
                    }`}
                  ></div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Connection indicator for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-gray-400 dark:text-gray-500">
                    <Icon icon="material-symbols:keyboard-arrow-down" className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
