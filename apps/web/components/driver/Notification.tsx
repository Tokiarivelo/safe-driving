'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export const NotificationPreferences = ({ 
  onUpdate, 
  t 
}: { 
  onUpdate: (data: any) => void; 
  t: (key: string) => string;
}) => {
  const [preferences, setPreferences] = useState({
    sms: false,
    push: false,
    email: false
  });

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    const newPreferences = {
      ...preferences,
      [type]: !preferences[type]
    };
    setPreferences(newPreferences);
    onUpdate({
      notificationPreferences: newPreferences
    });
  };

  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="space-y-4">        
        <div className="space-y-4 mt-6">
          {/* Option SMS */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="notif-sms"
              checked={preferences.sms}
              onCheckedChange={() => handlePreferenceChange('sms')}
            />
            <div>
              <Label htmlFor="notif-sms">{t('notifications.sms')}</Label>
            </div>
          </div>

          {/* Option Notifications Push */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="notif-push"
              checked={preferences.push}
              onCheckedChange={() => handlePreferenceChange('push')}
            />
            <div>
              <Label htmlFor="notif-push">{t('notifications.push')}</Label>
            </div>
          </div>

          {/* Option Email */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="notif-email"
              checked={preferences.email}
              onCheckedChange={() => handlePreferenceChange('email')}
            />
            <div>
              <Label htmlFor="notif-email">{t('notifications.email')}</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;