'use client';

import React from 'react';
import { motion } from 'framer-motion';
import style from './resetpass.module.css';
import { useTranslation } from 'react-i18next';
function LeftChild() {
  const { t, ready } = useTranslation('auth/reset-password');

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

        <motion.p
          className="text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('title1')} <br />
          {t('title2')}
        </motion.p>

        <motion.p
          className="text-sm leading-relaxed mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('title3')}
          <br />
          {t('title4')}
        </motion.p>
      </div>
  );
}

export default LeftChild;
