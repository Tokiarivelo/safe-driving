'use client';

import { useTranslation } from 'react-i18next';

export default function Acceuil() {
  const { t, ready } = useTranslation('accueil');

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <!-- Navigation --> */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-dark/80 border-b border-light-muted dark:border-dark-light">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <a href="#" className="flex items-center">
                <i data-feather="shield" className="w-8 h-8 text-primary"></i>
                <span className="ml-2 text-xl font-bold font-heading">SafeDrive</span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#transports"
                className="text-dark dark:text-light hover:text-primary transition-colors"
              >
                Véhicules
              </a>
              <a
                href="#features"
                className="text-dark dark:text-light hover:text-primary transition-colors"
              >
                Fonctionnalités
              </a>
              <a
                href="#how-it-works"
                className="text-dark dark:text-light hover:text-primary transition-colors"
              >
                Comment ça marche
              </a>
              <a
                href="#pricing"
                className="text-dark dark:text-light hover:text-primary transition-colors"
              >
                Tarifs
              </a>
              <a
                href="#faq"
                className="text-dark dark:text-light hover:text-primary transition-colors"
              >
                FAQ
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a href="#" className="btn-secondary hidden md:inline-flex items-center">
                <i data-feather="log-in" className="w-4 h-4 mr-2"></i>
                Connexion
              </a>
              <a href="#cta" className="btn-primary inline-flex items-center">
                <i data-feather="user-plus" className="w-4 h-4 mr-2"></i>
                Essai gratuit
              </a>
              <button
                id="theme-toggle"
                className="p-2 rounded-full hover:bg-light-muted/20 dark:hover:bg-dark-light/20 transition-colors"
              >
                <i data-feather="moon" className="hidden dark:block w-5 h-5"></i>
                <i data-feather="sun" className="dark:hidden w-5 h-5"></i>
              </button>
              <button
                id="mobile-menu-button"
                className="md:hidden p-2 rounded-full hover:bg-light-muted/20 dark:hover:bg-dark-light/20 transition-colors"
              >
                <i data-feather="menu" className="w-5 h-5"></i>
              </button>
            </div>
          </div>
        </nav>

        {/* <!-- Mobile Menu --> */}
        <div
          id="mobile-menu"
          className="hidden md:hidden bg-white dark:bg-dark-light border-t border-light-muted dark:border-dark-light"
        >
          <div className="px-4 py-3 space-y-3">
            <a
              href="#transports"
              className="block px-3 py-2 rounded-lg hover:bg-light-muted/20 dark:hover:bg-dark-light/20 transition-colors"
            >
              Véhicules
            </a>
            <a
              href="#features"
              className="block px-3 py-2 rounded-lg hover:bg-light-muted/20 dark:hover:bg-dark-light/20 transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 rounded-lg hover:bg-light-muted/20 dark:hover:bg-dark-light/20 transition-colors"
            >
              Comment ça marche
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-lg hover:bg-light-muted/20 dark:hover:bg-dark-light/20 transition-colors"
            >
              Tarifs
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 rounded-lg hover:bg-light-muted/20 dark:hover:bg-dark-light/20 transition-colors"
            >
              FAQ
            </a>
            <div className="pt-2 border-t border-light-muted dark:border-dark-light">
              <a href="#" className="btn-secondary w-full inline-flex justify-center items-center">
                <i data-feather="log-in" className="w-4 h-4 mr-2"></i>
                Connexion
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- Hero Section --> */}
      <section className="bg-gradient-to-r from-[#6366F1] to-[#14B8A6] text-white pt-16 pb-24 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" data-aos="fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                Sécurisez vos trajets urbains — simplement.
              </h1>
              <p className="text-xl text-white/90">
                Suivi en temps réel, alertes intelligentes et assistance 24/7 pour chaque trajet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#cta" className="btn-primary inline-flex items-center justify-center">
                  Commencer gratuitement
                </a>
                <a
                  href="#demo"
                  className="btn-secondary inline-flex items-center justify-center bg-white/10 border-white/20 hover:bg-white/20"
                >
                  <i data-feather="play" className="w-4 h-4 mr-2"></i>
                  Voir la démo
                </a>
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="http://static.photos/technology/1024x576/42"
                  alt="SafeDrive en action"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></div>
                    </div>
                    <span className="text-sm font-medium">Trajet sécurisé en cours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Transport Options Section --> */}
      <section id="transports" className="py-16 md:py-24 bg-white dark:bg-[#0F1724]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Nos véhicules disponibles
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-light-muted dark:text-dark-muted">
              Sécurité optimale pour tous vos déplacements urbains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="transport-grid">
            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <i data-feather="car" className="w-6 h-6 text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Voitures</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Sécurité optimale pour vos trajets en voiture avec détection des risques et alertes
                en temps réel.
              </p>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <i data-feather="bike" className="w-6 h-6 text-secondary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Motos</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Protection spéciale pour les motocyclistes avec détection des angles morts et alerte
                aux dangers.
              </p>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <i data-feather="truck" className="w-6 h-6 text-accent"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Tuktuks</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Sécurité renforcée pour les véhicules à trois roues avec stabilisation et alerte de
                surcharge.
              </p>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <i data-feather="truck" className="w-6 h-6 text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Tuktuks</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Sécurité renforcée pour les véhicules à trois roues avec stabilisation et alerte de
                surcharge.
              </p>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <i data-feather="bicycle" className="w-6 h-6 text-secondary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Vélos</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Protection optimale pour les cyclistes avec détection des angles morts et
                itinéraires sécurisés.
              </p>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <i data-feather="scooter" className="w-6 h-6 text-accent"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Scooters</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Alerte de vitesse et détection de chute pour une conduite plus sûre en scooter
                électrique.
              </p>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <i data-feather="box" className="w-6 h-6 text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Autres véhicules</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Solution adaptable aux trottinettes, gyropodes et autres moyens de transport urbain
                innovants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Features Section --> */}
      <section id="features" className="py-16 md:py-24 bg-[#F3F4F6] dark:bg-[#0B1020]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Voyagez en toute sérénité
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-light-muted dark:text-dark-muted">
              Nos fonctionnalités clés conçues pour votre sécurité et tranquillité d'esprit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <i data-feather="shield" className="w-6 h-6 text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Sécurité active</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Détection automatique des risques et alertes en temps réel pour une conduite plus
                sûre.
              </p>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <i data-feather="map-pin" className="w-6 h-6 text-secondary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Live Tracking</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Suivez vos proches en temps réel et recevez des notifications à chaque étape du
                trajet.
              </p>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <i data-feather="clock" className="w-6 h-6 text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Réservations rapides</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Planifiez vos trajets en quelques clics avec notre interface intuitive et
                personnalisable.
              </p>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20 transition-all hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <i data-feather="headphones" className="w-6 h-6 text-secondary"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Assistance 24/7</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Une équipe dédiée disponible à tout moment pour vous assister en cas de besoin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- How It Works Section --> */}
      <section id="how-it-works" className="py-16 md:py-24 bg-[#F3F4F6] dark:bg-[#0B1020]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Comment ça marche</h2>
            <p className="max-w-2xl mx-auto text-lg text-light-muted dark:text-dark-muted">
              Trois étapes simples pour des trajets plus sûrs et plus sereins
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary text-2xl font-bold font-heading">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Réservez</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Planifiez votre trajet en quelques secondes via l'application ou le site web.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-6 text-secondary text-2xl font-bold font-heading">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Suivez</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Visualisez votre trajet en temps réel avec toutes les informations de sécurité.
              </p>
            </div>

            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary text-2xl font-bold font-heading">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Soyez tranquille</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Recevez une confirmation à l'arrivée et partagez votre statut avec vos proches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Demo Section --> */}
      <section id="demo" className="py-16 md:py-24 bg-white dark:bg-[#0F1724]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold font-heading">
                Découvrez SafeDrive en action
              </h2>
              <p className="text-lg text-light-muted dark:text-dark-muted">
                Notre démo interactive vous montre comment SafeDrive peut sécuriser vos déplacements
                quotidiens.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i data-feather="check-circle" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Visualisation des trajets en temps réel</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check-circle" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Alertes de sécurité personnalisables</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check-circle" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Historique des trajets et statistiques</span>
                </li>
              </ul>
              <a href="#cta" className="btn-primary inline-flex items-center mt-6">
                Essayer maintenant
                <i data-feather="arrow-right" className="w-4 h-4 ml-2"></i>
              </a>
            </div>

            <div
              className="relative rounded-xl overflow-hidden shadow-xl h-96"
              data-aos="fade-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
              <img
                src="http://static.photos/technology/1024x576/43"
                alt="SafeDrive Demo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></div>
                    </div>
                    <span className="font-medium">Démo interactive</span>
                  </div>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 backdrop-blur-sm transition-colors">
                    <i data-feather="play" className="w-4 h-4 text-white"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Testimonials Section --> */}
      <section className="py-16 md:py-24 bg-[#F3F4F6] dark:bg-[#0B1020]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ils nous font confiance
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-light-muted dark:text-dark-muted">
              Découvrez ce que nos utilisateurs disent de SafeDrive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-center mb-4 space-x-2">
                <div className="flex items-center">
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                </div>
              </div>
              <p className="mb-6 italic">
                "SafeDrive a changé notre façon de gérer les déplacements de notre équipe. La
                tranquillité d'esprit est inestimable."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <i data-feather="user" className="w-5 h-5 text-primary"></i>
                </div>
                <div>
                  <h4 className="font-bold">Marie D.</h4>
                  <p className="text-sm text-light-muted dark:text-dark-muted">
                    Gestionnaire de flotte
                  </p>
                </div>
              </div>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center mb-4 space-x-2">
                <div className="flex items-center">
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                </div>
              </div>
              <p className="mb-6 italic">
                "En tant que parent, pouvoir suivre les trajets de mes enfants pour aller à l'école
                est rassurant. L'interface est très simple."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                  <i data-feather="user" className="w-5 h-5 text-secondary"></i>
                </div>
                <div>
                  <h4 className="font-bold">Thomas L.</h4>
                  <p className="text-sm text-light-muted dark:text-dark-muted">Parent</p>
                </div>
              </div>
            </div>

            <div
              className="card-glass p-6 rounded-xl border border-light-muted/20 dark:border-dark-light/20"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex items-center mb-4 space-x-2">
                <div className="flex items-center">
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                  <i data-feather="star" className="w-4 h-4 text-yellow-400"></i>
                </div>
              </div>
              <p className="mb-6 italic">
                "L'assistance 24/7 m'a sauvé la vie lors d'une panne nocturne. Réponse rapide et
                professionnelle."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <i data-feather="user" className="w-5 h-5 text-primary"></i>
                </div>
                <div>
                  <h4 className="font-bold">Sophie K.</h4>
                  <p className="text-sm text-light-muted dark:text-dark-muted">
                    Utilisatrice quotidienne
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Partners Section --> */}
      <section className="py-12 bg-white dark:bg-[#0F1724]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8" data-aos="fade-up">
            <p className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
              Ils nous font confiance
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-heading">Partenaires et clients</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex justify-center" data-aos="fade-up" data-aos-delay="100">
              <div className="h-12 flex items-center opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold font-heading">TransUrban</span>
              </div>
            </div>
            <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
              <div className="h-12 flex items-center opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold font-heading">CityFleet</span>
              </div>
            </div>
            <div className="flex justify-center" data-aos="fade-up" data-aos-delay="300">
              <div className="h-12 flex items-center opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold font-heading">SafeRide</span>
              </div>
            </div>
            <div className="flex justify-center" data-aos="fade-up" data-aos-delay="400">
              <div className="h-12 flex items-center opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold font-heading">MobiTech</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Pricing Section --> */}
      <section id="pricing" className="py-16 md:py-24 bg-[#F3F4F6] dark:bg-[#0B1020]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Des tarifs adaptés à vos besoins
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-light-muted dark:text-dark-muted">
              Choisissez le plan qui correspond à votre utilisation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              className="card-glass p-8 rounded-xl border border-light-muted/20 dark:border-dark-light/20"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-bold mb-2">Basique</h3>
              <p className="text-light-muted dark:text-dark-muted mb-6">
                Parfait pour les utilisateurs occasionnels
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Gratuit</span>
                <span className="text-light-muted dark:text-dark-muted">/mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Suivi de trajets limité</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Alertes de sécurité basiques</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Historique 7 jours</span>
                </li>
              </ul>
              <a
                href="#cta"
                className="btn-secondary w-full inline-flex justify-center items-center"
              >
                Commencer
              </a>
            </div>

            <div
              className="card-glass p-8 rounded-xl border-2 border-primary relative"
              data-aos="fade-up"
            >
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                Populaire
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-light-muted dark:text-dark-muted mb-6">
                Pour les utilisateurs réguliers
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">9,99€</span>
                <span className="text-light-muted dark:text-dark-muted">/mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Trajets illimités</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Alertes avancées</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Historique 30 jours</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Partage avec 3 proches</span>
                </li>
              </ul>
              <a href="#cta" className="btn-primary w-full inline-flex justify-center items-center">
                Choisir ce plan
              </a>
            </div>

            <div
              className="card-glass p-8 rounded-xl border border-light-muted/20 dark:border-dark-light/20"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-bold mb-2">Fleet</h3>
              <p className="text-light-muted dark:text-dark-muted mb-6">
                Pour les entreprises et flottes
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Sur mesure</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Gestion centralisée</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Rapports détaillés</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>API d'intégration</span>
                </li>
                <li className="flex items-start">
                  <i data-feather="check" className="w-5 h-5 text-primary mt-0.5 mr-2"></i>
                  <span>Support prioritaire</span>
                </li>
              </ul>
              <a
                href="#cta"
                className="btn-secondary w-full inline-flex justify-center items-center"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- FAQ Section --> */}
      <section id="faq" className="py-16 md:py-24 bg-white dark:bg-[#0F1724]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Questions fréquentes
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-light-muted dark:text-dark-muted">
              Trouvez des réponses aux questions les plus courantes sur SafeDrive
            </p>
          </div>

          <div className="space-y-4">
            <div
              className="border border-light-muted/20 dark:border-dark-light/20 rounded-xl overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <button className="faq-toggle w-full flex justify-between items-center p-6 text-left hover:bg-light-muted/5 dark:hover:bg-dark-light/10 transition-colors">
                <h3 className="font-bold">
                  Comment SafeDrive améliore-t-il ma sécurité routière ?
                </h3>
                <i
                  data-feather="chevron-down"
                  className="w-5 h-5 transform transition-transform duration-300"
                ></i>
              </button>
              <div className="faq-content hidden px-6 pb-6 pt-0">
                <p className="text-light-muted dark:text-dark-muted">
                  SafeDrive utilise une combinaison de technologies avancées pour analyser votre
                  conduite en temps réel, détecter les comportements à risque (comme les freinages
                  brusques ou les accélérations soudaines) et vous alerter immédiatement. De plus,
                  notre système de suivi permet à vos proches de savoir où vous êtes en cas
                  d'incident.
                </p>
              </div>
            </div>

            <div
              className="border border-light-muted/20 dark:border-dark-light/20 rounded-xl overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <button className="faq-toggle w-full flex justify-between items-center p-6 text-left hover:bg-light-muted/5 dark:hover:bg-dark-light/10 transition-colors">
                <h3 className="font-bold">
                  Quelle est la consommation de batterie de l'application ?
                </h3>
                <i
                  data-feather="chevron-down"
                  className="w-5 h-5 transform transition-transform duration-300"
                ></i>
              </button>
              <div className="faq-content hidden px-6 pb-6 pt-0">
                <p className="text-light-muted dark:text-dark-muted">
                  Nous avons optimisé SafeDrive pour une consommation minimale de batterie. En mode
                  normal, l'application consomme environ 5-8% de batterie par heure. Vous pouvez
                  activer le mode économie d'énergie qui réduit cette consommation à 2-3% par heure
                  tout en maintenant les fonctionnalités essentielles.
                </p>
              </div>
            </div>

            <div
              className="border border-light-muted/20 dark:border-dark-light/20 rounded-xl overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <button className="faq-toggle w-full flex justify-between items-center p-6 text-left hover:bg-light-muted/5 dark:hover:bg-dark-light/10 transition-colors">
                <h3 className="font-bold">Puis-je utiliser SafeDrive à l'étranger ?</h3>
                <i
                  data-feather="chevron-down"
                  className="w-5 h-5 transform transition-transform duration-300"
                ></i>
              </button>
              <div className="faq-content hidden px-6 pb-6 pt-0">
                <p className="text-light-muted dark:text-dark-muted">
                  Oui, SafeDrive fonctionne dans la plupart des pays. Nos services de suivi et
                  d'alerte sont disponibles partout où vous avez une connexion internet. Certaines
                  fonctionnalités avancées comme l'assistance routière peuvent varier selon les
                  pays. Consultez notre carte de couverture pour plus de détails.
                </p>
              </div>
            </div>

            <div
              className="border border-light-muted/20 dark:border-dark-light/20 rounded-xl overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <button className="faq-toggle w-full flex justify-between items-center p-6 text-left hover:bg-light-muted/5 dark:hover:bg-dark-light/10 transition-colors">
                <h3 className="font-bold">Comment annuler mon abonnement ?</h3>
                <i
                  data-feather="chevron-down"
                  className="w-5 h-5 transform transition-transform duration-300"
                ></i>
              </button>
              <div className="faq-content hidden px-6 pb-6 pt-0">
                <p className="text-light-muted dark:text-dark-muted">
                  Vous pouvez annuler votre abonnement à tout moment depuis la section "Compte" dans
                  l'application ou sur notre site web. Votre accès aux fonctionnalités premium
                  restera actif jusqu'à la fin de votre période de facturation en cours. Aucun
                  remboursement n'est possible pour la période en cours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- CTA Section --> */}
      <section
        id="cta"
        className="py-16 md:py-24 bg-gradient-to-r from-[#6366F1] to-[#14B8A6] text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Prêt à sécuriser vos trajets ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui voyagent en toute sérénité avec SafeDrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="btn-primary inline-flex items-center justify-center">
                Commencer gratuitement
              </a>
              <a
                href="#"
                className="btn-secondary inline-flex items-center justify-center bg-white/10 border-white/20 hover:bg-white/20"
              >
                <i data-feather="phone" className="w-4 h-4 mr-2"></i>
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer className="bg-[#0B1020] text-[#98A3B3] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <a href="#" className="flex items-center mb-6">
                <i data-feather="shield" className="w-8 h-8 text-primary"></i>
                <span className="ml-2 text-xl font-bold font-heading text-white">SafeDrive</span>
              </a>
              <p className="mb-6">
                La solution complète pour des déplacements urbains sécurisés et sereins.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-light-muted hover:text-white transition-colors">
                  <i data-feather="twitter" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-light-muted hover:text-white transition-colors">
                  <i data-feather="facebook" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-light-muted hover:text-white transition-colors">
                  <i data-feather="instagram" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-light-muted hover:text-white transition-colors">
                  <i data-feather="linkedin" className="w-5 h-5"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Produit</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#transports" className="hover:text-white transition-colors">
                    Véhicules
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-white transition-colors">
                    Démo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Télécharger
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about.html" className="hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="/careers.html" className="hover:text-white transition-colors">
                    Carrières
                  </a>
                </li>
                <li>
                  <a href="/press.html" className="hover:text-white transition-colors">
                    Presse
                  </a>
                </li>
                <li>
                  <a href="/blog.html" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mentions légales
                  </a>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-dark-light">
                <button
                  id="reduce-motion"
                  className="text-sm flex items-center hover:text-white transition-colors"
                >
                  <i data-feather="activity" className="w-4 h-4 mr-2"></i>
                  Réduire les animations
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-dark-light mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">© 2023 SafeDrive. Tous droits réservés.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:text-white transition-colors">
                Confidentialité
              </a>
              <a href="#" className="text-sm hover:text-white transition-colors">
                Conditions
              </a>
              <a href="#" className="text-sm hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
