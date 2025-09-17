'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

const notifications = [
  {
    id: 1,
    title: 'Nouveau trajet disponible',
    message: "Un trajet vers le centre-ville vient d'être ajouté",
    time: '5 min',
    type: 'info',
    read: false,
  },
  {
    id: 2,
    title: 'Trajet complété',
    message: "Votre course vers l'aéroport s'est terminée avec succès",
    time: '1h',
    type: 'success',
    read: false,
  },
];

interface NotificationMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NotificationMenu({ isOpen, onToggle }: NotificationMenuProps) {
  const [notifs, setNotifs] = useState(notifications);

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
        aria-label="Notifications"
      >
        <Icon
          icon="material-symbols:notifications"
          className="w-5 h-5 text-gray-700 dark:text-gray-300"
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifs.map(notification => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                  !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
