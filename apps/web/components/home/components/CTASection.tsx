'use client';

import { Icon } from '@iconify/react';

const appStores = [
  { label: 'Télécharger sur', name: 'App Store' },
  { label: 'Disponible sur', name: 'Google Play' },
];

export default function CTASection() {
  return (
    <section id="cta" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-700 dark:via-indigo-600 dark:to-purple-700"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-up">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Prêt à révolutionner
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              vos trajets ?
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Rejoignez des milliers d&apos;utilisateurs qui ont choisi l&apos;avenir de la mobilité urbaine
            sécurisée.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white text-blue-600 font-bold text-lg hover:bg-gray-50 hover:scale-105 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
              <span>Télécharger l&apos;application</span>
              <Icon
                icon="material-symbols:download"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              />
            </button>

            <button className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl border-2 border-white/30 bg-white/10 text-white font-bold text-lg hover:bg-white/20 hover:border-white/50 backdrop-blur-sm transition-all duration-300 group">
              <Icon icon="material-symbols:phone" className="w-5 h-5" />
              <span>Nous contacter</span>
            </button>
          </div>

          {/* App store badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            {appStores.map(store => (
              <div
                key={store.name}
                className="flex flex-col items-center px-6 py-3 bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <span className="text-white/80 text-xs">{store.label}</span>
                <span className="text-white font-bold text-lg">{store.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
