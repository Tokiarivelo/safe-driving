'use client';

import React from 'react';
import { motion } from 'framer-motion';
import style from './show.module.css';
import { useTranslation } from 'react-i18next';
function LeftChild() {
  const { t, ready } = useTranslation('auth/forget-password');
  if (!ready) return null;
  return (
      <div className={style.auth_show1}>
        <motion.h1
          className={style.auth_show2}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h1>
        <p className={style.auth_show3}>
          {t('title1')}
          <br />
          {t('title2')}
          <br />
          {t('title3')}
          <br />
          {t('title4')}
        </p>
      </div>
  );
}
export default LeftChild;
