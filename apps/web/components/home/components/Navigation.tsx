'use client';

import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';
import ProgressLink from '@/components/ui/progress-link';
import Image from 'next/image';
import NoSSR from '@/components/NoSSR';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import NotificationMenu from '@/components/ui/NotificationMenu';
import MessageMenu from '@/components/ui/MessageMenu';
import ProfileMenu from '@/components/ui/ProfileMenu';

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const navigationItems = [
  { href: '#transports', label: 'Véhicules' },
  { href: '#features', label: 'Fonctionnalités' },
  { href: '#how-it-works', label: 'Comment ça marche' },
  { href: '#pricing', label: 'Tarifs' },
  { href: '#faq', label: 'FAQ' },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Icon icon="material-symbols:light-mode" className="w-5 h-5 text-yellow-400" />
      ) : (
        <Icon
          icon="material-symbols:dark-mode"
          className="w-5 h-5 text-blue-600 dark:text-blue-400"
        />
      )}
    </button>
  );
}

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // État pour gérer quel menu est ouvert
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigationRef = useRef<HTMLElement>(null);

  // Fermer les menus quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navigationRef.current && !navigationRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setMobileMenuOpen]);

  // Fonction pour basculer un menu
  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  // Fonction pour fermer tous les menus
  const closeAllMenus = () => {
    setOpenMenu(null);
  };

  return (
    <header
      ref={navigationRef}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-lg"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <ProgressLink
            href="/"
            className="flex items-center space-x-3 group"
            onClick={closeAllMenus}
          >
            <div className="relative">
              <div className="w-12 h-12 p-2 rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 group-hover:scale-105 border border-gray-200 dark:border-gray-700">
                <Image
                  src="/logo.svg"
                  alt="SafeDriving Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 animate-pulse opacity-30"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              SafeDriving
            </span>
          </ProgressLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={closeAllMenus}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Language Switch */}
            <NoSSR
              fallback={
                <div className="w-11 h-11 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
              }
            >
              <LanguageSwitch
                isOpen={openMenu === 'language'}
                onToggle={() => toggleMenu('language')}
              />
            </NoSSR>

            {isAuthenticated ? (
              /* Authenticated User Menus */
              <>
                <NotificationMenu
                  isOpen={openMenu === 'notifications'}
                  onToggle={() => toggleMenu('notifications')}
                />
                <MessageMenu
                  isOpen={openMenu === 'messages'}
                  onToggle={() => toggleMenu('messages')}
                />
                <ProfileMenu
                  isOpen={openMenu === 'profile'}
                  onToggle={() => toggleMenu('profile')}
                />
              </>
            ) : (
              /* Guest User Buttons */
              <>
                <ProgressLink
                  href="/login"
                  className="hidden md:inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm transition-all duration-300"
                  onClick={closeAllMenus}
                >
                  <Icon icon="material-symbols:login" className="w-4 h-4" />
                  <span>Connexion</span>
                </ProgressLink>

                <ProgressLink
                  href="/signup"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 text-white hover:from-blue-600 hover:to-indigo-600 dark:hover:from-blue-300 dark:hover:to-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={closeAllMenus}
                >
                  <Icon icon="material-symbols:add-circle-outline" className="w-4 h-4" />
                  <span>Essai gratuit</span>
                </ProgressLink>
              </>
            )}

            {/* Theme Toggle */}
            <NoSSR
              fallback={
                <div className="w-11 h-11 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              }
            >
              <ThemeToggle />
            </NoSSR>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                closeAllMenus();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <Icon
                icon="material-symbols:menu"
                className="w-5 h-5 text-gray-700 dark:text-gray-300"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700">
          {navigationItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => {
                setMobileMenuOpen(false);
                closeAllMenus();
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile buttons for guests */}
          {!isAuthenticated && (
            <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
              <ProgressLink
                href="/login"
                className="block px-4 py-3 rounded-xl text-center border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                onClick={() => {
                  setMobileMenuOpen(false);
                  closeAllMenus();
                }}
              >
                Connexion
              </ProgressLink>

              <ProgressLink
                href="/signup"
                className="block px-4 py-3 rounded-xl text-center bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 text-white hover:from-blue-600 hover:to-indigo-600 dark:hover:from-blue-300 dark:hover:to-indigo-300 transition-all duration-300"
                onClick={() => {
                  setMobileMenuOpen(false);
                  closeAllMenus();
                }}
              >
                Essai gratuit
              </ProgressLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
