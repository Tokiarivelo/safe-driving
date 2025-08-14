'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from '../common/auth.module.css';
import style from './signup.module.css';
import Link from 'next/link';
export const LeftChild = () => {
  const { t, ready } = useTranslation('auth/signup');
  if (!ready) return null;
  return (
    <div className={style.auth_signup1}>
      <motion.h1
        className={style.auth_signup2}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('title')}
      </motion.h1>
      <p className="text-md px-10 mb-3 opacity-90 ">{t('title1')}</p>
      <p className="text-sm mb-1 px-5 opacity-80 leading-relaxed sm:px-2 sm:text-md lg:px-20">
        {t('title2')}
      </p>
      <p className={style.auth_signup5}>{t('title3')}</p>
      <p className="text-sm mb-8 opacity-80 hidden sm:block sm:text-md sm:mb-4 lg:px-20">
        {t('title4')}
      </p>
      <Link href="/login" className={styles.auth_button_Sign}>
        {t('title5')}
      </Link>
    </div>
  );
};

export default LeftChild;
