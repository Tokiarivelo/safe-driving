'use client';

import styles from './bjr.module.css';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
export const Bjr = () => {
  const router = useRouter();
  const { t, ready } = useTranslation('user/bjr');

  if (!ready) return null;
  return (
    <>
      <div className={styles.auth_bjr3}>
        <motion.h1
          className={styles.auth_bjr4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h1>

        <motion.p
          className={styles.auth_bjr5}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('title1')}
          <br />
          {t('title2')}
        </motion.p>
      </div>
      <div className={styles.auth_bjr6}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            type="button"
            onClick={() => router.push('/user/form/name/gps')}
            className={styles.auth_bjr7}
          >
            {t('title3')}
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            type="button"
            onClick={() => router.push('/user/form/name/gps')}
            className={styles.auth_bjr8}
          >
            {t('title4')}
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default Bjr;
