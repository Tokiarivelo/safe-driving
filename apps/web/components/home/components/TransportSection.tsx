'use client';

import { Icon } from '@iconify/react';

const vehicles = [
  {
    icon: '🚗',
    title: 'Voitures',
    description: 'Sécurité optimale avec détection des risques et alertes temps réel',
    color: 'primary',
    features: ['GPS intégré', 'Assistance 24/7', 'Paiement sécurisé'],
  },
  {
    icon: '🏍️',
    title: 'Motos',
    description: "Protection spéciale avec détection d'angles morts et alertes danger",
    color: 'secondary',
    features: ['Détection chute', 'Route optimisée', 'SOS urgence'],
  },
  {
    icon: '🛺',
    title: 'Tuktuks',
    description: 'Sécurité renforcée avec stabilisation et alerte de surcharge',
    color: 'accent',
    features: ['Contrôle charge', 'Trajet sécurisé', 'Prix abordable'],
  },
  {
    icon: '🚲',
    title: 'Vélos',
    description: 'Protection optimale avec itinéraires sécurisés et détection',
    color: 'primary',
    features: ['Pistes cyclables', 'Antivol connecté', 'Éco-responsable'],
  },
];

export default function TransportSection() {
  return (
    <section
      id="transports"
      className="py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Nos véhicules
            </span>
            <br />
            <span className="text-gray-900 dark:text-gray-100">disponibles</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Sécurité optimale pour tous vos déplacements urbains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.title}
              className={`bg-white dark:bg-gray-800/70 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group backdrop-blur-sm`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-2xl ${
                    vehicle.color === 'primary'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500'
                      : vehicle.color === 'secondary'
                        ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500'
                        : 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500'
                  } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-3xl">{vehicle.icon}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  {vehicle.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{vehicle.description}</p>

                <ul className="space-y-2">
                  {vehicle.features.map(feature => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      <Icon
                        icon="material-symbols:check-circle"
                        className={`w-4 h-4 mr-2 ${
                          vehicle.color === 'primary'
                            ? 'text-blue-500 dark:text-blue-400'
                            : vehicle.color === 'secondary'
                              ? 'text-indigo-500 dark:text-indigo-400'
                              : 'text-purple-500 dark:text-purple-400'
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-6 w-full px-4 py-2 rounded-xl border-2 font-medium transition-all duration-300 ${
                    vehicle.color === 'primary'
                      ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900'
                      : vehicle.color === 'secondary'
                        ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900'
                        : 'border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900'
                  }`}
                >
                  Réserver maintenant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
