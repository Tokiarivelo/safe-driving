'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGpsSettings } from './gpsAction';
import { Radio } from '@/components/ui/radiogroup';
import styles from './gps.module.css';

export const Gps: React.FC = () => {
  const router = useRouter();
  const { t, ready } = useTranslation('user/gps');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const { toggleGps, loading,} = useGpsSettings();

  if (!ready) return null;

  const handleOptionChange = async (value: string) => {
    console.log('handleOptionChange value:', value);
    setSelectedOption(value);

    if (value === 'Plustard') {
      router.push('/user/form/name/notification');
    } else if (value === 'Actuve') {
      const success = await toggleGps(true);
      if (success) {
        router.push('/user/form/name/notification');
      }
    }
  };

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
            onChange={(e) => handleOptionChange(e.target.value)}
            disabled={loading}
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
            onChange={(e) => handleOptionChange(e.target.value)}
            disabled={loading}
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