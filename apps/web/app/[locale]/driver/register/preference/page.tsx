'use client';
import ExperiencePreferences from '@/components/driver/register/preference/preference';
import { useTranslation } from 'react-i18next';

export default function ExperiencePreferencesPage() {
  const { t } = useTranslation();

  const handleUpdate = (data: {
    theme: {
      light: boolean;
      dark: boolean;
    };
    language: string;
  }) => {
    console.log('Préférences mises à jour:', data);
  };

  return <ExperiencePreferences onUpdate={handleUpdate} />;
}
