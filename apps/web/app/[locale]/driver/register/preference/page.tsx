'use client';
import ExperiencePreferences from '@/components/driver/register/preference/preference';
import { ExperiencePreferencesValues } from '@/components/driver/register/preference/schema';

export default function ExperiencePreferencesPage() {
  const handleUpdate = (data: ExperiencePreferencesValues) => {
    console.log('Préférences mises à jour:', data);
  };

  return <ExperiencePreferences onUpdate={handleUpdate} />;
}
