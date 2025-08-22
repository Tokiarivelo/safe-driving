'use client';    

import ReactFlagsSelect from 'react-flags-select';
import styles from './recapitulatif.module.css';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@/components/ui/radiogroup';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import * as React from 'react';
import { useState, useEffect } from 'react';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import { MultiSelect } from '@/components/ui/multi-select';
import { CableCar, Car, Bike } from 'lucide-react';
import { useRegister } from './recapitulatifAction'; 
import { ClientSchemaType } from './recapitulatuf.schema';

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

export default function Recapitulatif() {
  const router = useRouter();
  const { t, ready } = useTranslation('user/recapitulatif');

  const { 
    loading, 
    errors, 
    submitClientData, 
    setErrors,
    currentUserPreference,
    availableVehicleTypes,
    getInitialFormData 
  } = useRegister();

  const [formData, setFormData] = useState<ClientSchemaType>(() => 
    getInitialFormData()
  );

  const [toggles, setToggles] = useState({
    notifications: false,
    emailNotifications: false,
    smsNotifications: false,
    location: false,
  });

  useEffect(() => {
    if (currentUserPreference) {
      const initialData = getInitialFormData();
      setFormData(initialData);
      
      setToggles({
        notifications: currentUserPreference.activateNotifications || false,
        emailNotifications: currentUserPreference.activateEmailNotifications || false,
        smsNotifications: currentUserPreference.activateSmsNotifications || false,
        location: currentUserPreference.activateLocation || false,
      });
    }
  }, [currentUserPreference]);

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    
    try {
      const dataToSubmit: ClientSchemaType = {
        ...formData,
        activateNotifications: toggles.notifications,
        activateEmailNotifications: toggles.emailNotifications,
        activateSmsNotifications: toggles.smsNotifications,
        activateLocation: toggles.location,
      };

      const result = await submitClientData(dataToSubmit);
      if (!result.success) {
        setErrors(result.errors);
      } else {
        console.log('Success:', result);
        router.push('/user/form/codeqr');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!ready) return null;

  return (
    <>
      <div className={styles.auth_reca3}>
        <motion.h2
          className={styles.auth_reca4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className={styles.auth_reca5}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('title1')}
          <br className={styles.auth_reca6} />
          {t('title2')}
        </motion.p>
      </div>

      <div className={styles.auth_reca7}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.auth_reca8}
        >
          <div className={styles.auth_reca28}>
            <div>
              <ToggleSwitch 
                isOn={toggles.notifications} 
                onToggle={() => handleToggle('notifications')} 
              />
            </div>
            <div className={styles.auth_reca29}>
              <label>{t('title3')}</label>
            </div>
          </div>
          <div className={styles.auth_reca30}>
            <div>
              <ToggleSwitch 
                isOn={toggles.emailNotifications} 
                onToggle={() => handleToggle('emailNotifications')} 
              />
            </div>
            <div className={styles.auth_reca31}>
              <label>{t('title4')}</label>
            </div>
          </div>
        </motion.div>

        <div className={styles.auth_reca9}>
          <motion.h3
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.auth_reca10}
          >
            {t('title5')}
          </motion.h3>
        </div>
        <div className={styles.auth_reca11}>
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
              onChange={() => setFormData({ ...formData, theme: 'claire' })}
            />
            <label htmlFor="claire" className={styles.auth_not8}>
              {t('title6')}
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
              {t('title7')}
            </label>
          </motion.div>
        </div>
        {errors?.theme && <p className='text-red-500 text-xs mt-1'>{errors.theme._errors[0]}</p>}

        <div className={styles.auth_reca12}>
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.auth_reca13}
            >
              <label className={styles.auth_reca14}>{t('title8')}</label>
              <MultiSelect
                options={options}
                value={formData.typetrasport}
                onValueChange={(val) => setFormData({ ...formData, typetrasport: val })}
                placeholder={t('title8')}
                className={styles.auth_reca15}
              />
              {errors?.typetrasport && <p className='text-red-500 text-xs mt-1'>{errors.typetrasport._errors[0]}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.auth_reca16}
            >
              <label htmlFor="lang-select" className={styles.auth_reca17}>
                {t('title9')}
              </label>
              <ReactFlagsSelect
                selected={formData.country}
                onSelect={(code) => setFormData({ ...formData, country: code })}
                countries={['US', 'FR', 'MG', 'DE']}
                customLabels={{ MG: 'Madagascar' }}
                searchable={true}
              />
              {errors?.country && <p className='text-red-500 text-xs mt-1'>{errors.country._errors[0]}</p>}
            </motion.div>
          </form>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.auth_reca27}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            type="button"
            onClick={() => router.back()}
            className={styles.auth_bjr7}
          >
            {t('title10')}
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
            {loading ? 'Sauvegarde...' : t('title11')}
          </Button>
        </motion.div>
      </div>
    </>
  );
}