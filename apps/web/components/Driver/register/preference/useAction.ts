'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { useRouter, usePathname } from 'next/navigation';
import { experiencePreferencesSchema, ExperiencePreferencesValues } from './schema';
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';
import { 
  useUpsertUserPreferenceMutation, 
  useUserPreferenceQuery 
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
  const { data: preferenceData, refetch: refetchPreferences } = useUserPreferenceQuery({
    skip: !session?.user?.id
  });

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

  // Synchroniser les valeurs du formulaire avec les données de la base
  useEffect(() => {
    if (preferenceData?.userPreference) {
      const dbTheme = preferenceData.userPreference.theme;
      const dbLanguage = preferenceData.userPreference.language;
      
      if (dbTheme) {
        form.setValue('theme', {
          light: dbTheme === 'light',
          dark: dbTheme === 'dark'
        });
        setTheme(dbTheme as 'light' | 'dark');
      }
      
      if (dbLanguage) {
        form.setValue('language', dbLanguage === 'fr' ? 'french' : 'english');
        i18n.changeLanguage(dbLanguage);
      }
    }
  }, [preferenceData, form, setTheme, i18n]);

  // Synchroniser le thème avec le document HTML
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Sauvegarder aussi dans localStorage pour persistance
    localStorage.setItem('preferred-theme', theme);
  }, [theme]);

  const handleThemeChange = async (selectedTheme: 'light' | 'dark') => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return;
    }

    const newThemePrefs = {
      light: selectedTheme === 'light',
      dark: selectedTheme === 'dark'
    };
    
    form.setValue('theme', newThemePrefs, { shouldValidate: true });
    setTheme(selectedTheme); // Met à jour le contexte global

    // Sauvegarder immédiatement le thème en base
    try {
      const existingPreference = preferenceData?.userPreference;
      
      const { errors } = await upsertUserPreference({
        variables: {
          input: {
            theme: selectedTheme,
            // Conserver les autres préférences existantes
            activateLocation: existingPreference?.activateLocation ?? false,
            activateNotifications: existingPreference?.activateNotifications ?? false,
            activateSmsNotifications: existingPreference?.activateSmsNotifications ?? false,
            activateEmailNotifications: existingPreference?.activateEmailNotifications ?? false,
            language: existingPreference?.language ?? (i18n.language === 'fr' ? 'fr' : 'en'),
            cguAccepted: existingPreference?.cguAccepted ?? false,
            privacyPolicyAccepted: existingPreference?.privacyPolicyAccepted ?? false
          }
        }
      });

      if (errors) {
        console.error('Erreurs GraphQL lors de la sauvegarde du thème:', errors);
        toast.error('Erreur lors de la sauvegarde du thème');
        return;
      }

      // Rafraîchir les préférences et la session
      await refetchPreferences();
      await updateSession();
      
      toast.success('Thème mis à jour');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du thème:', error);
      toast.error('Erreur lors de la sauvegarde du thème');
    }
  };

  const handleLanguageChange = async (lang: 'french' | 'english') => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return;
    }

    const languageCode = lang === 'french' ? 'fr' : 'en';
    
    console.log('Changement de langue:', lang, '-> code:', languageCode);
    console.log('Pathname actuel:', pathname);
    
    // Sauvegarder immédiatement la langue en base
    try {
      const existingPreference = preferenceData?.userPreference;
      
      const { errors } = await upsertUserPreference({
        variables: {
          input: {
            language: languageCode,
            // Conserver les autres préférences existantes
            activateLocation: existingPreference?.activateLocation ?? false,
            activateNotifications: existingPreference?.activateNotifications ?? false,
            activateSmsNotifications: existingPreference?.activateSmsNotifications ?? false,
            activateEmailNotifications: existingPreference?.activateEmailNotifications ?? false,
            theme: existingPreference?.theme ?? (theme || 'light'),
            cguAccepted: existingPreference?.cguAccepted ?? false,
            privacyPolicyAccepted: existingPreference?.privacyPolicyAccepted ?? false
          }
        }
      });

      if (errors) {
        console.error('Erreurs GraphQL lors de la sauvegarde de la langue:', errors);
        toast.error('Erreur lors de la sauvegarde de la langue');
        return;
      }

      // Mettre à jour i18n après la sauvegarde réussie
      await i18n.changeLanguage(languageCode);
      form.setValue('language', lang, { shouldValidate: true });
      
      // Sauvegarder dans localStorage pour persistance
      localStorage.setItem('preferred-language', languageCode);
      
      // Rafraîchir les préférences et la session
      await refetchPreferences();
      await updateSession();

      // Mettre à jour l'URL
      let newPathname = pathname;
      
      if (pathname.startsWith('/fr')) {
        newPathname = pathname.replace('/fr', `/${languageCode}`);
      } else if (pathname.startsWith('/en')) {
        newPathname = pathname.replace('/en', `/${languageCode}`);
      } else {
        newPathname = `/${languageCode}${pathname}`;
      }
      
      router.push(newPathname);
      router.refresh();
      
      toast.success('Langue mise à jour');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la langue:', error);
      toast.error('Erreur lors de la sauvegarde de la langue');
    }
  };

  const onSubmit = async (data: ExperiencePreferencesValues) => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return { success: false, error: 'Utilisateur non connecté' };
    }

    setIsSubmitting(true);
    
    try {
      const languageCode = data.language === 'french' ? 'fr' : 'en';
      const selectedTheme = data.theme.light ? 'light' : 'dark';

      // Sauvegarder les préférences en base de données
      const { errors } = await upsertUserPreference({
        variables: {
          input: {
            language: languageCode,
            theme: selectedTheme,
            // Valeurs par défaut pour les autres champs
            activateLocation: preferenceData?.userPreference?.activateLocation ?? false,
            activateNotifications: preferenceData?.userPreference?.activateNotifications ?? false,
            activateSmsNotifications: preferenceData?.userPreference?.activateSmsNotifications ?? false,
            activateEmailNotifications: preferenceData?.userPreference?.activateEmailNotifications ?? false,
            cguAccepted: preferenceData?.userPreference?.cguAccepted ?? false,
            privacyPolicyAccepted: preferenceData?.userPreference?.privacyPolicyAccepted ?? false
          }
        }
      });

      if (errors) {
        console.error('Erreurs GraphQL:', errors);
        throw new Error(errors.map(e => e.message).join(', '));
      }

      // Appliquer les changements immédiatement
      setTheme(selectedTheme);
      await i18n.changeLanguage(languageCode);
      
      // Sauvegarder en localStorage pour la persistance locale
      localStorage.setItem('preferred-language', languageCode);
      localStorage.setItem('preferred-theme', selectedTheme);
      
      // Rafraîchir les données
      await refetchPreferences();
      await updateSession();
      
      toast.success('Préférences sauvegardées avec succès');
      router.push('/terms');
      
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
      toast.error('Erreur lors de la sauvegarde des préférences');
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
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
    onSubmit: form.handleSubmit(onSubmit),
    userPreference: preferenceData?.userPreference
  };
};