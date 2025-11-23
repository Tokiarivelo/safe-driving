'use client';
import ExperiencePreferences from '@/components/driver/register/preference/preference';

export default function ExperiencePreferencesPage() {
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
