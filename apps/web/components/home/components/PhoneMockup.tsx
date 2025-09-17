'use client';

import { Icon } from '@iconify/react';

const vehicleTypes = [
  { icon: '🚗', label: 'Voiture' },
  { icon: '🏍️', label: 'Moto' },
  { icon: '🛺', label: 'Tuktuk' },
  { icon: '🚲', label: 'Vélo' },
];

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-72 h-[600px] animate-float">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black rounded-[3rem] shadow-2xl">
        <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-900">
          {/* Screen content */}
          <div className="h-full bg-gradient-to-br from-safe-primary-50 to-safe-secondary-50 dark:from-safe-primary-950 dark:to-safe-secondary-950 p-6 flex flex-col">
            {/* Status bar */}
            <div className="flex justify-between items-center mb-6 safe-text-dark dark:safe-text-light">
              <span className="text-sm font-semibold">9:41</span>
              <div className="flex space-x-1">
                <div className="w-4 h-2 bg-safe-success rounded-sm"></div>
                <div className="w-1 h-2 bg-gray-300 rounded-sm"></div>
                <div className="w-6 h-2 bg-gray-300 rounded-sm"></div>
              </div>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 safe-text-dark dark:safe-text-light">
                SafeDriving
              </h2>
              <p className="safe-text-muted text-sm">Votre trajet en temps réel</p>
            </div>

            {/* Map mockup */}
            <div className="flex-1 rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-safe-primary-100 to-safe-secondary-100 dark:from-safe-primary-900 dark:to-safe-secondary-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-safe-primary-500 rounded-full flex items-center justify-center animate-pulse">
                  <Icon icon="material-symbols:my-location" className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Route line */}
              <div className="absolute top-1/3 left-4 right-4 h-0.5 bg-safe-primary-400 opacity-60"></div>
              <div className="absolute top-2/3 left-8 right-8 h-0.5 bg-safe-secondary-400 opacity-60"></div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="safe-stat-card bg-white/50 dark:bg-white/10 safe-border border-white/30 dark:border-white/20">
                <div className="text-sm font-semibold safe-text-dark dark:safe-text-light">
                  12min
                </div>
                <div className="text-xs safe-text-muted">Durée</div>
              </div>
              <div className="safe-stat-card bg-white/50 dark:bg-white/10 safe-border border-white/30 dark:border-white/20">
                <div className="text-sm font-semibold safe-text-dark dark:safe-text-light">
                  3.2km
                </div>
                <div className="text-xs safe-text-muted">Distance</div>
              </div>
              <div className="safe-stat-card bg-white/50 dark:bg-white/10 safe-border border-white/30 dark:border-white/20">
                <div className="text-sm font-semibold text-safe-success">98%</div>
                <div className="text-xs safe-text-muted">Sécurité</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-safe-accent-400 to-safe-accent-500 rounded-2xl flex items-center justify-center shadow-xl animate-float-delayed">
        <Icon icon="material-symbols:shield-with-heart" className="w-8 h-8 text-white" />
      </div>

      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-safe-secondary-400 to-safe-secondary-500 rounded-2xl flex items-center justify-center shadow-xl animate-float">
        <Icon icon="material-symbols:location-on" className="w-8 h-8 text-white" />
      </div>
    </div>
  );
}
