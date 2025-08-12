'use client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { StepListCard } from '@/components/ui/StepListCard';
import { StepIndicator } from '@/components/ui/PogressBar';
import { useNotificationPreferences } from './useAction';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { NotificationPreferencesValues } from './schema';
import Image from 'next/image';
import * as icons from 'lucide-react';
import styles from './notif.module.css';

export const NotificationPreferences = ({
  onUpdate
}: {
  onUpdate: (data: NotificationPreferencesValues) => void;
}) => {
  const { t } = useTranslation(['registerDriver/step8', 'registerDriver/stepList']);
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

  const iconNames = [
    'User', 'UserRound', 'IdCard', 'CarFront', 'FileUp', 'Camera',
    'MapPin', 'Bell', 'Settings', 'ClipboardList', 'CheckCircle'
  ];

  const STEPS = Array.from({ length: 11 }, (_, i) => {
    const stepNum = i + 1;
    const iconName = iconNames[i];
    const IconComponent = (icons as Record<string, React.FC<any>>)[iconName] ?? icons.Hand;

    return {
      id: `step${stepNum}`,
      icon: <IconComponent size={18} />,
      title: t(`registerDriver/stepList:step${stepNum}`)
    };
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      onUpdate(value as NotificationPreferencesValues);
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8`}>
        <div className="mt-10">
          <StepIndicator
            steps={[
              { number: 1, label: t('registerDriver/stepList:progressionRole'), status: 'completed' },
              { number: 2, label: t('registerDriver/stepList:progressionInfo'), status: 'active' }
            ]}
          />
        </div>

        <CardFormContainer title="" subtitle="" className="relative max-w-6xl w-full p-0 mt-5">
          <div className="flex flex-col md:flex-row w-full">
            <div className={`flex-1 p-12 pt-6 flex flex-col relative bg-[var(--color-auth-color-bg-white)] dark:bg-card`}>
              <div className="absolute top-6 left-6">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={64}
                  height={64}
                  className="dark:invert dark:brightness-0 dark:contrast-200"
                />
              </div>

              <div className={styles.contentContainer}>
                <div className={styles.textContainer}>
                  <h1 className={styles.title}>{t('title')}</h1>
                  <p className={styles.subtitle}>{t('subtitle')}</p>
                </div>

                {!isPushSupported && (
                  <div className="p-3 bg-yellow-50 text-yellow-700 rounded-lg flex items-start mb-4">
                    <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t('notifications.unsupported')}</span>
                  </div>
                )}

                <div className="flex space-x-8 mb-4">
                    <div className="flex items-start space-x-2">
                        <Checkbox
                        id="notif-push"
                        checked={preferences.push}
                        onCheckedChange={(checked) =>
                        handlePreferenceChange('push', !!checked)
                        }
                        disabled={isRequesting || !isPushSupported}
                        />
                    <div className="flex-1">
                        <Label htmlFor="notif-push" className="flex items-center">
                        {t('notifications.push')}
                        {isRequesting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                        </Label>
                        {browserPermission === 'denied' && (
                        <p className="text-sm text-red-500 mt-1">
                            {t('notifications.permissionDenied')}
                        </p>
                        )}
                        {form.formState.errors.push && (
                            <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.push.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-start space-x-2">
                    <Checkbox
                    id="notif-email"
                    checked={preferences.email}
                    onCheckedChange={(checked) =>
                    handlePreferenceChange('email', !!checked)
                    }
                    disabled={isRequesting}
                    />
                    <Label htmlFor="notif-email">{t('notifications.email')}</Label>
                </div>
            </div>

                <div className={styles.buttonContainer}>
                  <Button
                    type="button"
                    variant="outline"
                    className={styles.buttonOutline}
                  >
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
                    ) : t('buttons.validate')}
                  </Button>
                </div>
              </div>
            </div>

            <div className={styles.sidebar}>
              <StepListCard steps={STEPS} currentStepId="step8" />
            </div>
          </div>
        </CardFormContainer>
      </form>
    </Form>
  );
};

export default NotificationPreferences;