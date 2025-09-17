'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

const messages = [
  {
    id: 1,
    sender: 'Marie Dupont',
    message: 'Merci pour le trajet, très professionnel !',
    time: '10 min',
    read: false,
    avatar: '👩‍💼',
  },
  {
    id: 2,
    sender: 'Support SafeDriving',
    message: 'Votre demande a été traitée avec succès',
    time: '2h',
    read: true,
    avatar: '🛡️',
  },
];

interface MessageMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MessageMenu({ isOpen, onToggle }: MessageMenuProps) {
  const [msgs, setMsgs] = useState(messages);

  const unreadCount = msgs.filter(m => !m.read).length;

  const markAsRead = (id: number) => {
    setMsgs(msgs.map(m => (m.id === id ? { ...m, read: true } : m)));
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
        aria-label="Messages"
      >
        <Icon icon="material-symbols:chat" className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Messages</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {msgs.map(message => (
              <div
                key={message.id}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                  !message.read ? 'bg-green-50/50 dark:bg-green-900/10' : ''
                }`}
                onClick={() => markAsRead(message.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                    {message.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {message.sender}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {message.message}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {message.time}
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
