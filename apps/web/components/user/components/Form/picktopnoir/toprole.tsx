import { Check } from 'lucide-react';
import React from 'react';
import styles from './toprole.module.css';
import { useTranslation } from 'react-i18next';
function toprole() {
  const { t, ready } = useTranslation('user/picktop');

  if (!ready) return null;
  return (
    <>
      <div className={styles.auth_toprole}>
        <div>
          <div className={styles.auth_toprole1}>
            <Check />
          </div>
          <div>
            <h3 className={styles.auth_toprole2}> {t('title1')}</h3>
          </div>
        </div>
        <div className={styles.auth_toprole3}>
          <hr className={styles.auth_toprole4} />
        </div>
        <div>
          <div className={styles.auth_toprole5}>2</div>
          <div>
            <h3 className={styles.auth_toprole6}> {t('title2')}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default toprole;
