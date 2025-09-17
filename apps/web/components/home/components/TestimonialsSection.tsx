'use client';

import { Icon } from '@iconify/react';

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Gestionnaire de flotte',
    avatar: '🧑‍💼',
    rating: 5,
    comment:
      "SafeDriving a révolutionné notre gestion des déplacements. L'IA prédictive nous fait économiser 30% sur les coûts et la sécurité est inégalée.",
  },
  {
    name: 'Thomas Laurent',
    role: 'Parent',
    avatar: '👨‍👧‍👦',
    rating: 5,
    comment:
      "Pouvoir suivre les trajets de mes enfants en temps réel avec l'interface holographique me rassure énormément. L'app est intuitive.",
  },
  {
    name: 'Sophie Kim',
    role: 'Utilisatrice quotidienne',
    avatar: '👩‍💻',
    rating: 5,
    comment:
      "L'assistance IA 24/7 m'a sauvée lors d'une panne. Réaction instantanée et solution trouvée en 2 minutes. Impressionnant !",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-gray-100">Ils nous font</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              confiance
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Découvrez l'expérience de nos utilisateurs avec SafeDriving
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-white dark:bg-gray-800/70 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group backdrop-blur-sm animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icon key={i} icon="material-symbols:star" className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-gray-600 dark:text-gray-300 mb-8 italic">
                "{testimonial.comment}"
              </blockquote>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 flex items-center justify-center text-xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
