'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';

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
          <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 flex flex-col">
            {/* Status bar */}
            <div className="flex justify-between items-center mb-6 text-gray-900 dark:text-gray-100">
              <span className="text-sm font-semibold">9:41</span>
              <div className="flex space-x-1">
                <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                <div className="w-1 h-2 bg-gray-300 rounded-sm"></div>
                <div className="w-6 h-2 bg-gray-300 rounded-sm"></div>
              </div>
            </div>

            {/* Header with logo */}
            <div className="mb-6 flex items-center space-x-3">
              <div className="w-10 h-10 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <Image
                  src="/logo.svg"
                  alt="SafeDriving Logo"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">SafeDriving</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Votre trajet en temps réel
                </p>
              </div>
            </div>

            {/* Map mockup */}
            <div className="flex-1 rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <Icon icon="material-symbols:my-location" className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Route line */}
              <div className="absolute top-1/3 left-4 right-4 h-0.5 bg-blue-400 opacity-60"></div>
              <div className="absolute top-2/3 left-8 right-8 h-0.5 bg-indigo-400 opacity-60"></div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/30 dark:border-white/20 shadow-sm">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">12min</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Durée</div>
              </div>
              <div className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/30 dark:border-white/20 shadow-sm">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">3.2km</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Distance</div>
              </div>
              <div className="bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/30 dark:border-white/20 shadow-sm">
                <div className="text-sm font-semibold text-green-500">98%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Sécurité</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
        <Icon icon="material-symbols:shield-with-heart" className="w-8 h-8 text-white" />
      </div>

      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
        <Icon icon="material-symbols:location-on" className="w-8 h-8 text-white" />
      </div>
    </div>
  );
}
