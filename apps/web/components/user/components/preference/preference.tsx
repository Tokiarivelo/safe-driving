'use client';

import ReactFlagsSelect from 'react-flags-select';
import styles from './preference.module.css';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@/components/ui/radiogroup';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { usepreference } from './preferenceAction';
import { ClientSchemaType } from './preference.shema';
import { MultiSelect } from '@/components/ui/multi-select';
import { Car, CableCar, Bike } from 'lucide-react';

const options = [
  {
    value: 'moto',
    label: 'moto',
    icon: <Bike size={14} className="text-white" />,
  },
  {
    value: 'voiture',
    label: 'voiture',
    icon: <Car size={14} className="text-white" />,
  },
  {
    value: 'telipherique',
    label: 'telipherique',
    icon: <CableCar size={14} className="text-white" />,
  },
];

export const Preference = () => {
  const router = useRouter();

  const { loading, errors, submitClientData, setErrors } = usepreference();

  const [formData, setFormData] = useState<ClientSchemaType>({
    typetrasport: [] as string[],
    country: '',
    theme: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    try {
      const result = await submitClientData(formData);
      if (!result.success) {
        setErrors(result.errors);
      } else {
        console.log('Success:', result);
        router.push('/user/form/name/recapitulatif');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const { t, ready } = useTranslation('user/preference');
  if (!ready) return null;

  return (
    <>
      <div className={styles.auth_pref3}>
        <motion.h2
          className={styles.auth_pref4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className={styles.auth_pref5}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('title1')} <br className="sm:hidden" />
          {t('title2')}
        </motion.p>
      </div>

      <div className={styles.auth_pref6}>
        <div className={styles.auth_pref7}></div>

        {/* Theme Section */}
        <div className={styles.auth_pref8}>
          <motion.h3
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.auth_pref9}
          >
            {t('title3')}
          </motion.h3>
        </div>
        <div className={styles.auth_pref10}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.auth_not7}
          >
            <Radio
              name="theme"
              value="claire"
              id="claire"
              checked={formData.theme === 'claire'}
              onChange={e => setFormData({ ...formData, theme: 'claire' })}
            />
            <label htmlFor="claire" className={styles.auth_not8}>
              {t('title4')}
            </label>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.auth_not9}
          >
            <Radio
              name="theme"
              value="dark"
              id="dark"
              checked={formData.theme === 'dark'}
              onChange={() => setFormData({ ...formData, theme: 'dark' })}
            />
            <label htmlFor="dark" className={styles.auth_not10}>
              {t('title5')}
            </label>
          </motion.div>
        </div>
        {errors?.theme && (
          <p className="absolute mt-[-8px] text-[9px] text-red-500 lg:ml-10">
            {errors.theme._errors[0]}
          </p>
        )}

        <div className={styles.auth_pref11}>
          <form>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.auth_pref12}
            >
              <label className={styles.auth_pref13}>{t('title6')}</label>
              <MultiSelect
                options={options}
                value={formData.typetrasport}
                onValueChange={val => setFormData({ ...formData, typetrasport: val })}
                placeholder={t('title6')}
                className={styles.auth_pref14}
              />
              {errors?.typetrasport && (
                <p className="absolute mt-[70px] text-[9px] text-red-500">
                  {errors.typetrasport._errors[0]}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.auth_pref15}
            >
              <label htmlFor="lang-select" className={styles.auth_pref16}>
                {t('title7')}
              </label>
              <ReactFlagsSelect
                selected={formData.country}
                onSelect={code => setFormData({ ...formData, country: code })}
                countries={['US', 'FR', 'MG', 'DE']}
                customLabels={{ MG: 'Madagascar' }}
                searchable={true}
              />
              {errors?.country && (
                <p className="absolute mt-[-10px] text-[9px] text-red-500">
                  {errors.country._errors[0]}
                </p>
              )}
            </motion.div>
          </form>
        </div>
      </div>

      <div className={styles.auth_pref26}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            type="button"
            onClick={() => router.push('/user/form/name/recapitulatif')}
            className={styles.auth_bjr7}
          >
            {t('title8')}
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            type="button"
            onClick={handleSubmit}
            className={styles.auth_bjr8}
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : t('title9')}
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default Preference;
