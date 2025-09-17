'use client';

import { useState, useEffect } from 'react';

const stats = [
  { label: 'Trajets sécurisés', value: 15000, suffix: '+' },
  { label: 'Utilisateurs actifs', value: 25000, suffix: '+' },
  { label: 'Villes couvertes', value: 50, suffix: '+' },
  { label: 'Satisfaction', value: 98, suffix: '%' },
];

export default function StatsGrid() {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observers = counters.map((_, index) => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter(index);
              setHasAnimated(true);
            }
          });
        },
        { threshold: 0.5 },
      );

      const element = document.getElementById(`stat-${index}`);
      if (element) observer.observe(element);

      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, [counters, hasAnimated]);

  const animateCounter = (index: number) => {
    const target = stats[index].value;
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      setCounters(prev => {
        const newCounters = [...prev];
        newCounters[index] = Math.floor(current);
        return newCounters;
      });
    }, duration / steps);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          id={`stat-${index}`}
          className="text-center p-4 rounded-2xl backdrop-blur-sm bg-white/10 dark:!bg-white/5 safe-border border-white/20 dark:!border-white/10 transition-all duration-500 hover:bg-white/20 dark:hover:!bg-white/10 hover:scale-105"
        >
          <div className="text-2xl lg:text-3xl font-bold mb-2 safe-text-dark dark:!text-white counter-animation">
            {counters[index]}
            {stat.suffix}
          </div>
          <div className="text-sm safe-text-muted dark:!text-white/70 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
