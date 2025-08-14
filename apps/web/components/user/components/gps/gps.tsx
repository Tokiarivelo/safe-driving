'use client';

import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from '@/components/ui/radiogroup';
import { useState } from 'react';
import styles from './gps.module.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
export const Gps = () => {
  const router = useRouter();
  const [size, setSize] = useState('medium');
  const { t, ready } = useTranslation('user/gps');

  if (!ready) return null;
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
            name="size"
            value="Plustard"
            id="Plustard"
            checked={size === 'Plustard'}
            onChange={e => setSize(e.target.value)}
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
            name="Actuve"
            value="Actuve"
            id="Actuve"
            checked={size === 'Actuve'}
            onChange={e => setSize(e.target.value)}
          />
          <label htmlFor="Actuve" className={styles.auth_gps10}>
            {t('title4')}
          </label>
        </motion.div>
      </div>
    </>
  );
};

export default Gps;
