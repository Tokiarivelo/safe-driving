'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useTheme } from '@/lib/contexts/ThemeContext'; 

export const ExperiencePreferences = ({
  onUpdate,
  t
}: {
  onUpdate: (data: any) => void;
  t: (key: string, options?: any) => string;
}) => {
  const { theme, setTheme } = useTheme();
  
  const [preferences, setPreferences] = useState({
    theme: {
      light: theme === 'light',
      dark: theme === 'dark'
    },
    language: 'french',
  });

  const themeOptions = {
    light: t('theme.light'),
    dark: t('theme.dark')
  };

  const languageOptions = {
    french: t('language.french'),
    english: t('language.english')
  };

  const handleThemeChange = (selectedTheme: keyof typeof preferences.theme) => {
    // Désactive tous les thèmes d'abord
    const newThemePrefs = {
      light: false,
      dark: false,
    };

    // Active le thème sélectionné seulement s'il n'était pas déjà actif
    const wasActive = preferences.theme[selectedTheme];
    if (!wasActive) {
      newThemePrefs[selectedTheme] = true;
      // Applique le thème globalement
      setTheme(selectedTheme);
    }

    setPreferences(prev => ({
      ...prev,
      theme: newThemePrefs
    }));

    onUpdate({
      theme: newThemePrefs
    });
  };

  const handleLanguageChange = (lang: string) => {
    setPreferences(prev => ({
      ...prev,
      language: lang
    }));
    onUpdate({
      language: lang
    });
  };

  return (
    <div className="w-full max-w-xl space-y-10 bg-white dark:bg-[color:var(--card)] p-8 rounded-xl shadow-xl text-[color:var(--auth-color-text-custom-magenta)] dark:text-[color:var(--foreground)]">
      {/* Thème */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-left text-[color:var(--auth-color-button)] dark:text-[color:var(--primary)]">
          Thème
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
          {Object.entries(themeOptions).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-2 text-sm">
              <Checkbox
                id={`theme-${key}`}
                checked={preferences.theme[key as keyof typeof preferences.theme]}
                onCheckedChange={() => handleThemeChange(key as keyof typeof preferences.theme)}
                className="border-pink-400 dark:border-[color:var(--border)] data-[state=checked]:bg-[color:var(--auth-color-button)] dark:data-[state=checked]:bg-[color:var(--primary)]"
              />
              <Label 
                htmlFor={`theme-${key}`} 
                className="text-[color:var(--auth-color-button)] dark:text-[color:var(--foreground)] cursor-pointer"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Langue */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-left text-[color:var(--auth-color-button)] dark:text-[color:var(--primary)]">
          Langue
        </h3>
        <Select value={preferences.language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[280px] border border-[color:var(--auth-color-input-border)] dark:border-[color:var(--border)] bg-[color:var(--auth-color-input)] dark:bg-[color:var(--input)] text-[color:var(--auth-color-button)] dark:text-[color:var(--foreground)] px-4 py-2 rounded-md focus:ring-2 focus:ring-pink-400 dark:focus:ring-[color:var(--ring)]">
            <SelectValue placeholder={t('language.placeholder')} />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[color:var(--popover)] border border-pink-300 dark:border-[color:var(--border)] text-[color:var(--auth-color-button)] dark:text-[color:var(--popover-foreground)]">
            {Object.entries(languageOptions).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ExperiencePreferences;