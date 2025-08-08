'use client';
import { useVehicleInfoAction } from './useAction';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { StepListCard } from '@/components/ui/StepListCard';
import { StepIndicator } from '@/components/ui/PogressBar';
import styles from './vehicle.module.css';
import Image from 'next/image';
import * as icons from 'lucide-react';

interface VehicleInfoFormProps {
  initialData?: {
    brand?: string;
    model?: string;
    plate?: string;
    seats?: number;
    type?: string;
  };
}

export const VehicleInfoForm = ({ initialData }: VehicleInfoFormProps) => {
  const { t } = useTranslation(['registerDriver/step4', 'registerDriver/stepList']);
  const { form, handleSubmit, isSubmitting } = useVehicleInfoAction(initialData);

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

  return (
    <div className="min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8">
      <div className="mt-10">
        <StepIndicator
          steps={[
            { number: 1, label: t('registerDriver/stepList:progressionIdentity'), status: 'completed' },
            { number: 2, label: t('registerDriver/stepList:progressionVehicle'), status: 'active' },
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

              <div className={styles.formContainer}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 max-w-md">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <Input
                          label={t('form.brand.label')}
                          placeholder={t('form.brand.placeholder')}
                          {...field}
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <Input
                          label={t('form.model.label')}
                          placeholder={t('form.model.placeholder')}
                          {...field}
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="plate"
                      render={({ field }) => (
                        <Input
                          label={t('form.plate.label')}
                          placeholder={t('form.plate.placeholder')}
                          {...field}
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seats"
                      render={({ field }) => (
                        <Input
                          label={t('form.seats.label')}
                          placeholder={t('form.seats.placeholder')}
                          type="number"
                          {...field}
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <Input
                          label={t('form.type.label')}
                          placeholder={t('form.type.placeholder')}
                          {...field}
                        />
                      )}
                    />

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
                        disabled={isSubmitting}
                        className={styles.buttonPrimary}
                      >
                        {isSubmitting ? t('buttons.processing') : t('buttons.validate')}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <StepListCard steps={STEPS} currentStepId="step4" />
          </div>
        </div>
      </CardFormContainer>
    </div>
  );
};