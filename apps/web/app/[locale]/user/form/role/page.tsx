'use client';

import { motion } from 'framer-motion';
import styles from './pickrole.module.css';
import TopRolex from '../../../../../components/user/components/Form/picktopgray/toprole';
import PickRoleForm from '../../../../../components/user/components/Form/pickrole/pickrole';

export default function ChoixLoginPage() {
  return (
    <div className={styles.auth_container}>
      <motion.div
        className={styles.auth_card_fond_container}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 2 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.auth_toprole}>
          <TopRolex />
        </div>
        <div className={styles.auth_card_container}>
          <PickRoleForm />
        </div>
      </motion.div>
    </div>
  );
}
