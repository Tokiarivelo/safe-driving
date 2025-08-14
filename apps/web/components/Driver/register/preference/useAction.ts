'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { useRouter, usePathname } from 'next/navigation';
import { experiencePreferencesSchema, ExperiencePreferencesValues } from './schema';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

export const useExperiencePreferences = (initialValues?: Partial<ExperiencePreferencesValues>) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isRequesting, setIsRequesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ExperiencePreferencesValues>({
    resolver: zodResolver(experiencePreferencesSchema),
    defaultValues: {
      theme: {
        light: initialValues?.theme?.light ?? theme === 'light',
        dark: initialValues?.theme?.dark ?? theme === 'dark'
      },
      language: initialValues?.language ?? (i18n.language === 'fr' ? 'french' : 'english')
    }
  });

  const handleThemeChange = (selectedTheme: 'light' | 'dark') => {
    const newThemePrefs = {
      light: selectedTheme === 'light',
      dark: selectedTheme === 'dark'
    };
    form.setValue('theme', newThemePrefs, { shouldValidate: true });
    setTheme(selectedTheme);
  };

  const handleLanguageChange = (lang: 'french' | 'english') => {
    const languageCode = lang === 'french' ? 'fr' : 'en';
    
    console.log('Changement de langue:', lang, '-> code:', languageCode);
    console.log('Pathname actuel:', pathname);

    i18n.changeLanguage(languageCode);
    
    let newPathname = pathname;
    
    if (pathname.startsWith('/fr')) {
      newPathname = pathname.replace('/fr', `/${languageCode}`);
    } else if (pathname.startsWith('/en')) {
      newPathname = pathname.replace('/en', `/${languageCode}`);
    } else {
      newPathname = `/${languageCode}${pathname}`;
    }
    
    form.setValue('language', lang, { shouldValidate: true });
    
    router.push(newPathname);
    router.refresh();
  };

  const onSubmit = async (data: ExperiencePreferencesValues) => {
    setIsSubmitting(true);
    try {
      const languageCode = data.language === 'french' ? 'fr' : 'en';
      localStorage.setItem('preferred-language', languageCode);
      localStorage.setItem('preferred-theme', data.theme.light ? 'light' : 'dark');
      
      router.push('/terms');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    preferences: form.watch(),
    isRequesting,
    isSubmitting,
    handleThemeChange,
    handleLanguageChange,
    onSubmit
  };
};