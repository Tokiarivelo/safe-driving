'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNotificationSettings } from './notificationAction';
import { Radio } from '@/components/ui/radiogroup';
import styles from './notification.module.css';

export const Notification: React.FC = () => {
  const router = useRouter();
  const { t, ready } = useTranslation('user/gps');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const { toggleGps, loading } = useNotificationSettings();

  if (!ready) return null;

  const handleOptionChange = async (value: string) => {
    console.log('handleOptionChange value:', value);
    setSelectedOption(value);

    if (value === 'Plustard') {
      router.push('/user/form/name/preference');
    } else if (value === 'Actuve') {
      const success = await toggleGps(true);
      if (success) {
        router.push('/user/form/name/preference');
      }
    }
  };
  return (
    <>
      <div className={styles.auth_not3}>
        <motion.h2
          className={styles.auth_not4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className={styles.auth_not5}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('title1')} <br /> {t('title2')}
        </motion.p>
      </div>
      <div className={styles.auth_not6}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.auth_not7}
        >
          <Radio
            name="gpsOption"
            value="Plustard"
            id="Plustard"
            checked={selectedOption === 'Plustard'}
            onChange={(e) => handleOptionChange(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="Plustard" className={styles.auth_not8}>
            {t('title3')}
          </label>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.auth_not9}
        >
             <Radio
            name="gpsOption"
            value="Actuve"
            id="Actuve"
            checked={selectedOption === 'Actuve'}
            onChange={(e) => handleOptionChange(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="Actuve" className={styles.auth_not10}>
            {t('title4')}
          </label>
        </motion.div>
      </div>
    </>
  );
};

export default Notification;
