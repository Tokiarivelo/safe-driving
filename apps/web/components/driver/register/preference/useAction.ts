'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { experiencePreferencesSchema, ExperiencePreferencesValues } from './schema';
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';
import {
  useUpsertUserPreferenceMutation,
  useGetMyUserPreferenceQuery,
} from '@/graphql/generated/graphql';
import { toast } from 'sonner';
import '@/lib/i18n';

export const useExperiencePreferences = (initialValues?: Partial<ExperiencePreferencesValues>) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session, update: updateSession } = useSession();

  const [upsertUserPreference] = useUpsertUserPreferenceMutation();
  const { data: preferenceData, refetch: refetchPreferences } = useGetMyUserPreferenceQuery({
    skip: !session?.user?.id,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formulaire
  const form = useForm<ExperiencePreferencesValues>({
    resolver: zodResolver(experiencePreferencesSchema),
    defaultValues: {
      theme: {
        light: initialValues?.theme?.light ?? theme === 'light',
        dark: initialValues?.theme?.dark ?? theme === 'dark',
      },
      language: initialValues?.language ?? (i18n.language === 'fr' ? 'french' : 'english'),
    },
  });

  // Synchroniser les valeurs du formulaire avec la base
  useEffect(() => {
    if (preferenceData?.userPreference) {
      const dbTheme = preferenceData.userPreference.theme;
      const dbLanguage = preferenceData.userPreference.language;

      if (dbTheme) {
        form.setValue('theme', {
          light: dbTheme === 'light',
          dark: dbTheme === 'dark',
        });
        setTheme(dbTheme as 'light' | 'dark');
      }

      if (dbLanguage) {
        form.setValue('language', dbLanguage === 'fr' ? 'french' : 'english');
        i18n.changeLanguage(dbLanguage);
      }
    }
  }, [preferenceData, form, setTheme, i18n]);

  // Appliquer le thème globalement
  // useEffect(() => {
  //   const html = document.documentElement;
  //   if (theme === 'dark') html.classList.add('dark');
  //   else html.classList.remove('dark');

  //   localStorage.setItem('preferred-theme', theme);
  // }, [theme]);

  // Changer le thème
  const handleThemeChange = async (selectedTheme: 'light' | 'dark') => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return;
    }

    form.setValue('theme', { light: selectedTheme === 'light', dark: selectedTheme === 'dark' });
    setTheme(selectedTheme);

    try {
      const existingPreference = preferenceData?.userPreference;
      const { errors } = await upsertUserPreference({
        variables: {
          input: {
            theme: selectedTheme,
            language: existingPreference?.language ?? (i18n.language === 'fr' ? 'fr' : 'en'),
            activateLocation: existingPreference?.activateLocation ?? false,
            activateNotifications: existingPreference?.activateNotifications ?? false,
            activateSmsNotifications: existingPreference?.activateSmsNotifications ?? false,
            activateEmailNotifications: existingPreference?.activateEmailNotifications ?? false,
            cguAccepted: existingPreference?.cguAccepted ?? false,
            privacyPolicyAccepted: existingPreference?.privacyPolicyAccepted ?? false,
          },
        },
      });

      if (errors) throw new Error(errors.map(e => e.message).join(', '));

      await refetchPreferences();
      await updateSession();
      toast.success('Thème mis à jour');
    } catch (error) {
      console.error('Erreur sauvegarde thème:', error);
      toast.error('Erreur lors de la sauvegarde du thème');
    }
  };

  // Changer la langue
  const handleLanguageChange = async (lang: 'french' | 'english') => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return;
    }

    const languageCode = lang === 'french' ? 'fr' : 'en';

    form.setValue('language', lang);
    i18n.changeLanguage(languageCode);
    localStorage.setItem('preferred-language', languageCode);
    document.cookie = `preferred-language=${languageCode}; path=/; max-age=31536000`;

    // Changer l'URL
    let newPathname = pathname.replace(/^\/(fr|en)/, `/${languageCode}`);
    if (!/^\/(fr|en)/.test(pathname)) newPathname = `/${languageCode}${pathname}`;

    router.push(newPathname);

    try {
      const existingPreference = preferenceData?.userPreference;
      const { errors } = await upsertUserPreference({
        variables: {
          input: {
            language: languageCode,
            theme: existingPreference?.theme ?? (theme || 'light'),
            activateLocation: existingPreference?.activateLocation ?? false,
            activateNotifications: existingPreference?.activateNotifications ?? false,
            activateSmsNotifications: existingPreference?.activateSmsNotifications ?? false,
            activateEmailNotifications: existingPreference?.activateEmailNotifications ?? false,
            cguAccepted: existingPreference?.cguAccepted ?? false,
            privacyPolicyAccepted: existingPreference?.privacyPolicyAccepted ?? false,
          },
        },
      });

      if (errors) throw new Error(errors.map(e => e.message).join(', '));
      await refetchPreferences();
      await updateSession();
      toast.success('Langue mise à jour');
    } catch (error) {
      console.error('Erreur sauvegarde langue:', error);
      toast.error('Erreur lors de la sauvegarde de la langue');
    }
  };

  // Soumettre tout le formulaire
  const onSubmit = async (data: ExperiencePreferencesValues) => {
    if (!session?.user?.id) return { success: false, error: 'Utilisateur non connecté' };
    setIsSubmitting(true);

    try {
      const languageCode = data.language === 'french' ? 'fr' : 'en';
      const selectedTheme = data.theme.light ? 'light' : 'dark';

      const { errors } = await upsertUserPreference({
        variables: {
          input: {
            language: languageCode,
            theme: selectedTheme,
            activateLocation: preferenceData?.userPreference?.activateLocation ?? false,
            activateNotifications: preferenceData?.userPreference?.activateNotifications ?? false,
            activateSmsNotifications:
              preferenceData?.userPreference?.activateSmsNotifications ?? false,
            activateEmailNotifications:
              preferenceData?.userPreference?.activateEmailNotifications ?? false,
            cguAccepted: preferenceData?.userPreference?.cguAccepted ?? false,
            privacyPolicyAccepted: preferenceData?.userPreference?.privacyPolicyAccepted ?? false,
          },
        },
      });

      if (errors) throw new Error(errors.map(e => e.message).join(', '));

      setTheme(selectedTheme);
      i18n.changeLanguage(languageCode);
      localStorage.setItem('preferred-language', languageCode);
      localStorage.setItem('preferred-theme', selectedTheme);
      document.cookie = `preferred-language=${languageCode}; path=/; max-age=31536000`;

      await refetchPreferences();
      await updateSession();
      toast.success('Préférences sauvegardées avec succès');

      router.push(`/${languageCode}/register/terms`);
      return { success: true };
    } catch (error) {
      console.error('Erreur sauvegarde préférences:', error);
      toast.error('Erreur lors de la sauvegarde des préférences');
      return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    preferences: form.watch(),
    isSubmitting,
    handleThemeChange,
    handleLanguageChange,
    onSubmit: form.handleSubmit(onSubmit),
    userPreference: preferenceData?.userPreference,
  };
};
