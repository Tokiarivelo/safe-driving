'use client';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n'; 
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExperiencePreferences } from './useAction';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { StepListCard } from '@/components/ui/StepListCard';
import { StepIndicator } from '@/components/ui/PogressBar';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import * as icons from 'lucide-react';
import styles from './preference.module.css';
import { useEffect } from 'react';

export const ExperiencePreferences = ({ onUpdate }: { onUpdate: (data: any) => void }) => {
  const { t, i18n } = useTranslation(['registerDriver/step9', 'registerDriver/stepList']);
  
  const {
    form,
    preferences,
    isRequesting,
    isSubmitting,
    handleThemeChange,
    handleLanguageChange,
    onSubmit
  } = useExperiencePreferences();

  const themeOptions = {
    light: t('theme.light'),
    dark: t('theme.dark')
  };

  const languageOptions = {
    french: t('language.french'),
    english: t('language.english')
  };

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
    if (onUpdate) {
      onUpdate(preferences);
    }
  }, [preferences, onUpdate]);

  return (
    <div className="min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.contentContainer}>
          
          {/* Barre de progression */}
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
              <div className="flex-1 p-12 pt-6 flex flex-col relative bg-[var(--color-auth-color-bg-white)] dark:bg-card">
                
                {/* Logo */}
                <div className="absolute top-6 left-6">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={64}
                    height={64}
                    className="dark:invert dark:brightness-0 dark:contrast-200"
                  />
                </div>

                <div className={styles.textContainer}>
                  <h1 className={styles.title}>{t('title')}</h1>
                  <p className={styles.subtitle}>{t('subtitle')}</p>
                </div>

                {/* Thème */}
                <div className="space-y-4">
                  <div className="flex space-x-6">
                    {Object.entries(themeOptions).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2 text-sm">
                        <Checkbox
                          id={`theme-${key}`}
                          checked={preferences.theme[key as keyof typeof preferences.theme]}
                          onCheckedChange={() => handleThemeChange(key as 'light' | 'dark')}
                          className="border-pink-400 dark:border-[color:var(--border)] data-[state=checked]:bg-[color:var(--auth-color-button)] dark:data-[state=checked]:bg-[color:var(--primary)]"
                        />
                        <Label
                          htmlFor={`theme-${key}`}
                          className="text-[color:var(--auth-color-button)] dark:text-[color:var(--foreground)] cursor-pointer"
                        >
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Langue */}
                <div className="space-y-4 mt-6">
                  <Select
                    value={preferences.language}
                    onValueChange={(value: 'french' | 'english') => handleLanguageChange(value)}
                  >
                    <SelectTrigger className="w-[280px] border border-[color:var(--auth-color-input-border)] dark:border-[color:var(--border)] bg-[color:var(--auth-color-input)] dark:bg-[color:var(--input)] text-[color:var(--auth-color-button)] dark:text-[color:var(--foreground)]">
                      <SelectValue placeholder={t('language.placeholder')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[color:var(--popover)] border border-pink-300 dark:border-[color:var(--border)] text-[color:var(--auth-color-button)] dark:text-[color:var(--popover-foreground)]">
                      {Object.entries(languageOptions).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Boutons */}
                <div className={styles.buttonContainer}>
                  <Button
                    type="button"
                    variant="outline"
                    className={styles.buttonOutline}
                    disabled={isRequesting || isSubmitting}
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

              {/* Sidebar */}
              <div className={styles.sidebar}>
                <StepListCard steps={STEPS} currentStepId="step9" />
              </div>
            </div>
          </CardFormContainer>
        </form>
      </Form>
    </div>
  );
};

export default ExperiencePreferences;