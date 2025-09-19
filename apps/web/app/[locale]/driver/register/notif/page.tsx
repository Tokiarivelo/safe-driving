'use client';
import NotificationPreferences from '@/components/Driver/register/notif/notif';

export default function NotificationPreferencesPage() {
  const handleUpdate = (data: {
    sms: boolean;
    email: boolean;
    push: boolean;
  }) => {
    console.log('Préférences de notification mises à jour:', data);
  };

  return <NotificationPreferences onUpdate={handleUpdate} />;
}
