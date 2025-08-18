'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './toprolex.module.css';
import { useTranslation } from 'react-i18next';
function toprole() {
    const { t, ready } = useTranslation('user/toprole');
  
    if (!ready) return null;
  return (
    <>
      <div className={styles.auth_toprol}>
        <div className={styles.auth_toprole}>
          <motion.div
            initial={{ opacity: 0, filter: 'brightness(50%)' }}
            animate={{ opacity: 1, filter: 'brightness(100%)' }}
            transition={{ duration: 2 }}
          >
            <Image
              src={'/user/logowhite.svg'}
              alt="photo"
              width={100}
              height={100}
              priority={true}
              blurDataURL=""
              className={styles.auth_toprole1}
            />
          </motion.div>
        </div>
        <div className={styles.auth_toprole2}>

     <div className={styles.auth_toprole3}>
            <div className={styles.auth_toprole4}>
              <svg className={styles.auth_toprole5} viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#e5e7eb"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  id="progressRing"
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#60B74F"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={282.74}
                  strokeDashoffset={235.62}
                  strokeLinecap="round"
                  className={styles.auth_toprole6}
                />
              </svg>
              <div className={styles.auth_toprole7}>
                <span id="progressText" className={styles.auth_toprole8}>
                  1/6
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.auth_toprole9}>
        <div>
          <div className={styles.auth_toprole10}>
            1
          </div>
          <div>
            <h3 className={styles.auth_toprole11}>Role</h3>
          </div>
        </div>
        <div className={styles.auth_toprole12}>
          <hr className={styles.auth_toprole13}/>
        </div>
        <div>
          <div className={styles.auth_toprole14}>
            2
          </div>
          <div>
            <h3 className={styles.auth_toprole15}>information</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default toprole;
