import React from 'react';
import { cn } from '@/lib/utils';

interface CardFormContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const CardFormContainer = ({
  title,
  subtitle,
  children,
  className,
}: CardFormContainerProps) => {
  return (
    <div className={cn(
      // Background adaptatif selon le thème
      "bg-white dark:bg-card",
      // Bordures et ombres
      "rounded-xl shadow-md dark:shadow-lg dark:shadow-black/20",
      "border-0 dark:border dark:border-border",
      // Espacement et dimensions
      "p-8 w-full max-w-4xl mx-auto",
      // Transition fluide
      "transition-colors duration-300",
      className
    )}>
      {title && (
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-purple-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 mt-2">{subtitle}</p>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export {CardFormContainer};
