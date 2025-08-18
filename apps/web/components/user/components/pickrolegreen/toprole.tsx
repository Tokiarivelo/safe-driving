import { Check } from 'lucide-react';
import React from 'react';
import styles from './toproles.module.css';
import { useTranslation } from 'react-i18next';
function toprole() {
     const { t, ready } = useTranslation('user/toprole');
    
      if (!ready) return null;
  return (
    <>
      <div className={styles.auth_toprole1}>
        <div>
          <div className={styles.auth_toprole2}>
            <Check />
          </div>
          <div>
            <h3 className={styles.auth_toprole3}>Role</h3>
          </div>
        </div>
        <div className={styles.auth_toprole4}>
          <hr className={styles.auth_toprole5}/>
        </div>
        <div>
          <div className={styles.auth_toprole6}>
            2
          </div>
          <div>
            <h3 className={styles.auth_toprole7}>information</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default toprole;
