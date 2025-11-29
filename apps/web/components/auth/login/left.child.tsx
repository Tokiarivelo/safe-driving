'use client';

import { motion } from 'framer-motion';
import { ProgressLink } from '@/components/ui/progress-link';
import { useTranslation } from 'react-i18next';
import styles from '../common/auth.module.css';
import style from './login.module.css';

export const LeftChild = () => {
  const { t, ready } = useTranslation('auth/login');

  if (!ready) return null;

  return (
    <div className={style.auth_txt1}>
      <motion.h1
        className={style.auth_txt2}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('title')}
      </motion.h1>
      <p className="text-md mb-7 opacity-90 sm:mb-1">{t('title1')}</p>
      <p className={style.auth_txt4}>{t('title2')}</p>
      <p className={style.auth_tzzxt5}>{t('title3')}</p>
      <p className={style.auth_txt6}>{t('title4')}</p>
      <ProgressLink href="/signup" className={styles.auth_button_Sign}>
        {t('title5')}
      </ProgressLink>
    </div>
  );
};

export default LeftChild;
