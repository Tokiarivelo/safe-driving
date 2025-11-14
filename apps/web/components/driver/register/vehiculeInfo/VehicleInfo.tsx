'use client';
import { useVehicleInfoAction } from './useAction';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import styles from './vehicle.module.css';

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
  const { t } = useTranslation(['registerDriver/step4']);
  const { form, handleSubmit, isSubmitting, vehicleTypes, loadingTypes } = useVehicleInfoAction(initialData);

  return (
    <div className="w-full px-4 py-8">
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.formContainer}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 max-w-md mx-auto">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <Input label={t('form.brand.label')} placeholder={t('form.brand.placeholder')} {...field} />
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <Input label={t('form.model.label')} placeholder={t('form.model.placeholder')} {...field} />
                )}
              />

              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <Input label={t('form.plate.label')} placeholder={t('form.plate.placeholder')} {...field} />
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
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('form.type.label')}
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('form.type.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingTypes ? (
                          <SelectItem value="loading" disabled>
                            Chargement...
                          </SelectItem>
                        ) : vehicleTypes.length === 0 ? (
                          <SelectItem value="empty" disabled>
                            Aucun type de véhicule disponible
                          </SelectItem>
                        ) : (
                          vehicleTypes.map((vehicleType) => (
                            <SelectItem key={vehicleType.id} value={vehicleType.id}>
                              {vehicleType.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <div className={styles.buttonContainer}>
                <Button type="button" variant="outline" className={styles.buttonOutline}>
                  {t('buttons.later')}
                </Button>
                <Button type="submit" disabled={isSubmitting || loadingTypes} className={styles.buttonPrimary}>
                  {isSubmitting ? t('buttons.processing') : t('buttons.validate')}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};