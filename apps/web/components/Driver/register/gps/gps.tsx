'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocationPermissionAction } from './useAction';
import { Form } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { StepListCard } from '@/components/ui/StepListCard';
import { StepIndicator } from '@/components/ui/PogressBar';
import styles from './gps.module.css'; 
import Image from 'next/image';
import * as icons from 'lucide-react';

export const LocationPermission = () => {
  const { t } = useTranslation(['registerDriver/step7', 'registerDriver/stepList']);
  const {
    form,
    handleSubmit: formSubmitHandler,
    isLoading,
    checkLocationSupport,
    isClient,
    hasPermission
  } = useLocationPermissionAction({
    onSuccess: (data) => {
      console.log('Données de géolocalisation sauvegardées:', data);
    },
    onLocationUpdate: (position) => {
      console.log('Position mise à jour:', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    }
  });
  
  const { watch, setValue } = form;
  const locationEnabled = watch('locationEnabled');
  const rememberChoice = watch('rememberChoice');

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
      title: t(`registerDriver/stepList:step${stepNum}`),
    };
  });

  if (!isClient) {
    return (
      <div className={`min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8`}>
        <div className="animate-pulse max-w-6xl w-full">
          <div className="h-20 bg-gray-300 rounded mb-4"></div>
          <div className="h-96 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8`}>
      <div className="mt-10">
        <StepIndicator
          steps={[
            { number: 1, label: t('registerDriver/stepList:progressionRole'), status: 'completed' },
            { number: 2, label: t('registerDriver/stepList:progressionInfo'), status: 'active' },
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

              {!checkLocationSupport() ? (
                <div className="text-destructive p-6 border border-destructive rounded-lg bg-destructive/5">
                  <div className="flex items-center space-x-2">
                    <icons.AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">La géolocalisation n'est pas supportée par ce navigateur</span>
                  </div>
                </div>
              ) : (
                <div className={styles.formContainer}>
                  <Form {...form}>
                    <form onSubmit={formSubmitHandler} className="space-y-10 max-w-3xl mx-auto">
                      
                      {/* Options sous forme de checkboxes */}
                      <div className="flex flex-col w-full space-y-6">
                        
                        {/* Checkbox "Plus tard" */}
                        <div className={styles.uploadBlock}>
                          <div className="flex items-center space-x-4 p-6 bg-muted rounded-lg border-2 border-muted hover:border-primary/20 transition-colors">
                            <Checkbox
                              id="later-option"
                              checked={!locationEnabled}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setValue('locationEnabled', false, { shouldValidate: true });
                                  setValue('rememberChoice', false, { shouldValidate: true });
                                }
                              }}
                              className="w-5 h-5"
                            />
                            <div className="flex-1">
                              <Label htmlFor="later-option" className="text-base font-medium cursor-pointer">
                                {t('options.later')}
                              </Label>
                            </div>
                          </div>
                        </div>

                        {/* Checkbox "Activer" */}
                        <div className={styles.uploadBlock}>
                          <div className="flex items-center space-x-4 p-6 bg-muted rounded-lg border-2 border-muted hover:border-primary/20 transition-colors">
                            <Checkbox
                              id="enable-option"
                              checked={locationEnabled}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setValue('locationEnabled', true, { shouldValidate: true });
                                } else {
                                  setValue('locationEnabled', false, { shouldValidate: true });
                                  setValue('rememberChoice', false, { shouldValidate: true });
                                }
                              }}
                              className="w-5 h-5"
                            />
                            <div className="flex-1">
                              <Label htmlFor="enable-option" className="text-base font-medium cursor-pointer">
                                {t('options.enable')}
                                {hasPermission && locationEnabled && (
                                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    <icons.CheckCircle className="w-3 h-3 mr-1" />
                                    Permission accordée
                                  </span>
                                )}
                              </Label>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Boutons d'action */}
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
                          disabled={isLoading}
                          className={styles.buttonPrimary}
                        >
                          {isLoading ? 'Traitement...' : t('buttons.validate')}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>

          <div className={styles.sidebar}>
            <StepListCard steps={STEPS} currentStepId="step7" />
          </div>
        </div>
      </CardFormContainer>
    </div>
  );
};