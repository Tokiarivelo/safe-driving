'use client';

import { Icon } from '@iconify/react';

const socialLinks = [
  { name: 'twitter', icon: 'mdi:twitter' },
  { name: 'facebook', icon: 'mdi:facebook' },
  { name: 'instagram', icon: 'mdi:instagram' },
  { name: 'linkedin', icon: 'mdi:linkedin' },
];

const footerSections = [
  {
    title: 'Produit',
    links: ['Fonctionnalités', 'Tarifs', 'Démo', 'API', 'Télécharger'],
  },
  {
    title: 'Entreprise',
    links: ['À propos', 'Carrières', 'Presse', 'Blog', 'Partenaires'],
  },
  {
    title: 'Support',
    links: ["Centre d'aide", 'FAQ', 'Contact', 'Statut', 'Sécurité'],
  },
];

const legalLinks = ['Confidentialité', 'Conditions', 'Cookies'];

export default function Footer() {
  return (
    <footer className="bg-dark safe-text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Icon icon="material-symbols:shield-with-heart" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                SafeDriving
              </span>
            </div>
            <p className="safe-text-muted dark:safe-text-dark-muted max-w-sm">
              L'avenir de la mobilité urbaine sécurisée. Intelligence artificielle, suivi temps réel
              et protection avancée.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a key={social.name} href="#" className="social-link">
                  <span className="sr-only">{social.name}</span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-safe-primary--500 transition-colors">
                    <Icon icon={social.icon} className="w-5 h-5" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="font-bold mb-6 safe-text-light">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="safe-text-muted dark:safe-text-dark-muted hover:text-safe-primary-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="safe-text-muted dark:safe-text-dark-muted text-sm mb-4 md:mb-0">
            © 2024 SafeDriving. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            {legalLinks.map(link => (
              <a
                key={link}
                href="#"
                className="safe-text-muted dark:safe-text-dark-muted hover:text-safe-primary-400 text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
