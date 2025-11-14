"use client";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocationPermissionAction } from './useAction';
import { Form } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import styles from './gps.module.css';

export const LocationPermission = () => {
  const { t } = useTranslation(['registerDriver/step7']);
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

  if (!isClient) {
    return <div className="flex items-center justify-center min-h-[50vh] animate-pulse">Chargement...</div>;
  }

  return (
    <div className="w-full px-4 py-8">
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        {!checkLocationSupport() ? (
          <div className="text-destructive p-6 border border-destructive rounded-lg bg-destructive/5 max-w-2xl mx-auto">
            <div className="flex items-center space-x-2">
              <span className="font-medium">La géolocalisation n'est pas supportée par ce navigateur</span>
            </div>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <Form {...form}>
              <form onSubmit={formSubmitHandler} className="space-y-10 max-w-3xl mx-auto">
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
                              Permission accordée
                            </span>
                          )}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <Button type="button" variant="outline" className={styles.buttonOutline}>
                    {t('buttons.later')}
                  </Button>
                  <Button type="submit" disabled={isLoading} className={styles.buttonPrimary}>
                    {isLoading ? 'Traitement...' : t('buttons.validate')}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};