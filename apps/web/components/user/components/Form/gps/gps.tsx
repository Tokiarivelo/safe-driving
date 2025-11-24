'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGpsSettings } from './gpsAction';
import { Radio } from '@/components/ui/radiogroup';
import { useGetMyUserPreferenceQuery } from '@/graphql/generated/graphql';
import styles from './gps.module.css';
import { useNotifications } from '@/hooks/useNotifications';

export const Gps: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const {
    isSupported,
    permission,
    requestPermission: requestNotificationPermission,
    showTest,
  } = useNotifications();

  const { data, loading: queryLoading } = useGetMyUserPreferenceQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (data?.userPreference) {
      if (data.userPreference.activateNotifications === true) {
        setSelectedOption('Actuve');
      } else {
        setSelectedOption('Plustard');
      }
      setIsDataLoaded(true);
    }
  }, [data?.userPreference?.activateNotifications]);

  const router = useRouter();
  const { t, ready } = useTranslation('user/gps');
  const { toggleGps, loading } = useGpsSettings();

  if (!ready) return null;

  const handleOptionChange = async (value: string) => {
    setSelectedOption(value);

    if (value === 'Plustard') {
      router.push('/user/form/name/notification');
    } else if (value === 'Actuve') {
      if (isSupported && permission !== 'granted') {
        try {
          await requestNotificationPermission();
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }

      const success = await toggleGps(true);
      if (success) {
        if (permission === 'granted') {
          showTest();
        }
        router.push('/user/form/name/notification');
      }
    }
  };

  if (queryLoading && !isDataLoaded) {
    return (
      <div className={styles.auth_gps3}>
        <div className="flex justify-center items-center h-32">
          <div>Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={styles.auth_gps3}>
        <motion.h2
          className={styles.auth_gps4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className={styles.auth_gps5}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('title1')} <br />
          {t('title2')}
        </motion.p>
      </div>

      <div className={styles.auth_gps6}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.auth_gps7}
        >
          <Radio
            name="gpsOption"
            value="Plustard"
            id="Plustard"
            checked={selectedOption === 'Plustard'}
            onChange={e => handleOptionChange(e.target.value)}
            disabled={loading || queryLoading}
          />
          <label htmlFor="Plustard" className={styles.auth_gps8}>
            {t('title3')}
          </label>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.auth_gps9}
        >
          <Radio
            name="gpsOption"
            value="Actuve"
            id="Actuve"
            checked={selectedOption === 'Actuve'}
            onChange={e => handleOptionChange(e.target.value)}
            disabled={loading || queryLoading}
          />
          <label htmlFor="Actuve" className={styles.auth_gps10}>
            {t('title4')} {loading && '(Loading...)'}
          </label>
        </motion.div>
      </div>
    </>
  );
};

export default Gps;
