'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import ProgressLink from '@/components/ui/progress-link';

const socialLinks = [
  { name: 'twitter', icon: 'mdi:twitter', href: '#' },
  { name: 'facebook', icon: 'mdi:facebook', href: '#' },
  { name: 'instagram', icon: 'mdi:instagram', href: '#' },
  { name: 'linkedin', icon: 'mdi:linkedin', href: '#' },
];

const footerSections = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', href: '#features' },
      { label: 'Tarifs', href: '#pricing' },
      { label: 'Démo', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Télécharger', href: '#' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', href: '#' },
      { label: 'Carrières', href: '#' },
      { label: 'Presse', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Partenaires', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: "Centre d'aide", href: '#' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#' },
      { label: 'Statut', href: '#' },
      { label: 'Sécurité', href: '#' },
    ],
  },
];

const legalLinks = [
  { label: 'Confidentialité', href: '#' },
  { label: 'Conditions', href: '#' },
  { label: 'Cookies', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-6">
            <ProgressLink href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 p-2 bg-white dark:bg-gray-800 rounded-xl transition-transform duration-300 group-hover:scale-105 shadow-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="/logo.svg"
                  alt="SafeDriving Logo"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                SafeDriving
              </span>
            </ProgressLink>
            <p className="text-gray-400 dark:text-gray-300 max-w-sm">
              L&apos;avenir de la mobilité urbaine sécurisée. Intelligence artificielle, suivi temps
              réel et protection avancée.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group"
                  aria-label={`Suivez-nous sur ${social.name}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-400 border border-gray-700 dark:border-gray-600 flex items-center justify-center transition-colors duration-300">
                    <Icon
                      icon={social.icon}
                      className="w-5 h-5 text-gray-400 dark:text-gray-300 group-hover:text-white transition-colors"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="font-bold mb-6 text-gray-100 dark:text-gray-200">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 dark:text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 SafeDriving. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            {legalLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 text-sm transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
