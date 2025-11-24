'use client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNotificationPreferences } from './useAction';
import { Loader2 } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { NotificationPreferencesValues } from './schema';
import styles from './notif.module.css';

export const NotificationPreferences = ({
  onUpdate,
}: {
  onUpdate: (data: NotificationPreferencesValues) => void;
}) => {
  const { t } = useTranslation(['registerDriver/step8']);
  const {
    form,
    preferences,
    browserPermission,
    isRequesting,
    isSubmitting,
    handlePreferenceChange,
    onSubmit,
    isPushSupported,
  } = useNotificationPreferences();

  useEffect(() => {
    const subscription = form.watch(value => {
      onUpdate(value as NotificationPreferencesValues);
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full px-4 py-8">
        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>

          {!isPushSupported && (
            <div className="p-3 bg-yellow-50 text-yellow-700 rounded-lg flex items-start mb-4 max-w-2xl mx-auto">
              <span>{t('notifications.unsupported')}</span>
            </div>
          )}

          <div className="flex space-x-8 mb-4 max-w-2xl mx-auto">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="notif-push"
                checked={preferences.push}
                onCheckedChange={checked => handlePreferenceChange('push', !!checked)}
                disabled={isRequesting || !isPushSupported}
              />
              <div className="flex-1">
                <Label htmlFor="notif-push" className="flex items-center">
                  {t('notifications.push')}
                  {isRequesting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                </Label>
                {browserPermission === 'denied' && (
                  <p className="text-sm text-red-500 mt-1">{t('notifications.permissionDenied')}</p>
                )}
                {form.formState.errors.push && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.push.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="notif-email"
                checked={preferences.email}
                onCheckedChange={checked => handlePreferenceChange('email', !!checked)}
                disabled={isRequesting}
              />
              <Label htmlFor="notif-email">{t('notifications.email')}</Label>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button type="button" variant="outline" className={styles.buttonOutline}>
              {t('buttons.later')}
            </Button>
            <Button
              type="submit"
              disabled={isRequesting || isSubmitting}
              className={styles.buttonPrimary}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('buttons.processing')}
                </>
              ) : (
                t('buttons.validate')
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NotificationPreferences;
