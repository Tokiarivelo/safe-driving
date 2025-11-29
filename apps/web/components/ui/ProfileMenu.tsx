'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useMeQuery } from '@/graphql/generated/graphql';
import { useMemo } from 'react';

interface ProfileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProfileMenu({ isOpen, onToggle }: ProfileMenuProps) {
  const { data: session } = useSession();
  const { data: me } = useMeQuery();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    onToggle(); // Ferme le menu
  };

  const handleMenuClick = () => {
    onToggle(); // Ferme le menu lors du clic sur un lien
  };

  const menuItems = useMemo(() => {
    if (!me?.me) return [];

    const isAdmin = me.me.Role?.some(role => role.name === 'ADMIN');
    const isDriver = me.me.Role?.some(role => role.name === 'DRIVER');
    const user = me.me.Role?.some(role => role.name === 'USER');

    let baseLink = 'user';
    if (user) {
      baseLink = 'user';
    }
    if (isDriver) {
      baseLink = 'driver';
    }
    if (isAdmin) {
      baseLink = 'admin';
    }

    return [
      {
        icon: 'material-symbols:dashboard',
        label: 'Dashboard',
        href: `${baseLink}/dashboard`,
      },
      {
        icon: 'material-symbols:person',
        label: 'Mon Profil',
        href: `${baseLink}/profile`,
      },
      {
        icon: 'material-symbols:settings',
        label: 'Paramètres',
        href: `${baseLink}/settings`,
      },
    ];
  }, [me]);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
        aria-label="Profile menu"
      >
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm">
          {session?.user?.firstName?.[0]?.toUpperCase() || 'U'}
        </div>
        <Icon
          icon="material-symbols:keyboard-arrow-down"
          className={`w-4 h-4 text-gray-700 dark:text-gray-300 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {session?.user?.firstName} {session?.user?.lastName}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
          </div>

          {/* Menu Items */}
          {menuItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={handleMenuClick}
            >
              <Icon icon={item.icon} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
            </Link>
          ))}

          {/* Separator */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-xl"
            >
              <Icon
                icon="material-symbols:logout"
                className="w-5 h-5 text-red-600 dark:text-red-400"
              />
              <span className="text-red-600 dark:text-red-400">Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
