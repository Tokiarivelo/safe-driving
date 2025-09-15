'use client';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExperiencePreferences } from './useAction';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import styles from './preference.module.css';

export const ExperiencePreferences = ({ onUpdate }: { onUpdate: (data: any) => void }) => {
  const { t } = useTranslation(['registerDriver/step9']);
  const { form, preferences, isRequesting, isSubmitting, handleThemeChange, handleLanguageChange, onSubmit } = useExperiencePreferences();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const html = document.documentElement;
    setTheme(html.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  useEffect(() => { if (onUpdate) onUpdate(preferences); }, [preferences, onUpdate]);

  const themeOptions = { light: t('theme.light'), dark: t('theme.dark') } as const;
  const languageOptions = { french: t('language.french'), english: t('language.english') } as const;

  return (
    <div className="w-full px-4 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className={styles.contentContainer}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>{t('title')}</h1>
              <p className={styles.subtitle}>{t('subtitle')}</p>
            </div>

            {/* Thème */}
            <div className="space-y-4 mb-6 max-w-2xl mx-auto">
              <div className="flex space-x-6">
                {Object.entries(themeOptions).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2 text-sm">
                    <Checkbox
                      id={`theme-${key}`}
                      checked={preferences.theme[key as 'light' | 'dark']}
                      onCheckedChange={() => handleThemeChange(key as 'light' | 'dark')}
                    />
                    <Label htmlFor={`theme-${key}`} className="cursor-pointer">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Langue */}
            <div className="mb-6 max-w-2xl mx-auto">
              <Select
                value={preferences.language}
                onValueChange={(value: 'french' | 'english') => handleLanguageChange(value)}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder={t('language.placeholder')} />
                </SelectTrigger>
                <SelectContent>
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
              <Button type="button" variant="outline" disabled={isRequesting || isSubmitting} className={styles.buttonOutline}>
                {t('buttons.later')}
              </Button>
              <Button type="submit" disabled={isRequesting || isSubmitting} className={styles.buttonPrimary}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('buttons.processing')}
                  </>
                ) : t('buttons.validate')}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExperiencePreferences;