'use client';
import { useVehicleInfoAction } from './useAction';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  const { form, handleSubmit, isSubmitting, vehicleTypes, loadingTypes, loadingVehicle } =
    useVehicleInfoAction(initialData);

  if (loadingVehicle) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.formContainer}>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>{t('form.brand.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('form.brand.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>{t('form.model.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('form.model.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>{t('form.plate.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('form.plate.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>{t('form.seats.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('form.seats.placeholder')}
                        type="number"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>{t('form.type.label')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t('form.type.placeholder')} />
                        </SelectTrigger>
                      </FormControl>
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
                          vehicleTypes.map(vehicleType => (
                            <SelectItem key={vehicleType.id} value={vehicleType.id}>
                              {vehicleType.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={styles.buttonContainer}>
                <Button type="button" variant="outline" className={styles.buttonOutline}>
                  {t('buttons.later')}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || loadingTypes}
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
  );
};
