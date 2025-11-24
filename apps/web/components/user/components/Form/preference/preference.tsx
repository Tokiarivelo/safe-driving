'use client';

import ReactFlagsSelect from 'react-flags-select';
import styles from './preference.module.css';
import { useRouter } from 'next/navigation';
import { Radio } from '@/components/ui/radiogroup';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePreference } from './preferenceAction';
import { ClientSchemaType } from './preference.shema';
import { MultiSelect } from '@/components/ui/multi-select';
import { useGetMyUserPreferenceQuery } from '@/graphql/generated/graphql';

export const Preference = () => {
  const [formData, setFormData] = useState<ClientSchemaType>({
    typetrasport: [] as string[],
    country: '',
    theme: '',
    preferedvelicles: [],
  });

  const { data } = useGetMyUserPreferenceQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
  const router = useRouter();
  const { datas, loading, errors, submitClientData, setErrors } = usePreference();

  useEffect(() => {
    if (data?.userPreference) {
      setFormData(prev => ({
        ...prev,
        typetrasport: data.userPreference?.preferedvelicles?.map(v => v.id) || [],
        country: data.userPreference?.language || '',
        theme: data.userPreference?.theme === 'dark' ? 'dark' : 'claire',
        preferedvelicles: data.userPreference?.preferedvelicles || [],
      }));
    }
  }, [data?.userPreference]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(undefined);
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
              onChange={() => setFormData(prev => ({ ...prev, theme: 'claire' }))}
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
              onChange={() => setFormData(prev => ({ ...prev, theme: 'dark' }))}
            />
            <label htmlFor="dark" className={styles.auth_not10}>
              {t('title5')}
            </label>
          </motion.div>
        </div>
        {errors?.theme && <p className={styles.auth_errer1}>{errors.theme?.toString()}</p>}

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
                options={(datas?.vehicleTypes ?? []).map(v => ({
                  value: v.id,
                  label: v.name,
                }))}
                value={formData.typetrasport}
                onValueChange={val => setFormData(prev => ({ ...prev, typetrasport: val }))}
                placeholder={t('title6')}
                className={styles.auth_pref14}
              />
              {errors?.typetrasport && (
                <p className={styles.auth_errer2}>{errors.typetrasport?.toString()}</p>
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
                onSelect={code => setFormData(prev => ({ ...prev, country: code }))}
                countries={['US', 'FR', 'MG', 'DE']}
                customLabels={{ MG: 'Madagascar' }}
                searchable={true}
                className={styles.auth_errer3}
              />
              {errors?.country && (
                <p className={styles.auth_errer4}>{errors.country?.toString()}</p>
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
