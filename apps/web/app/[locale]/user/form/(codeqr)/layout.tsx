'use client';

import styles from './codeqr.module.css';
import { motion } from 'framer-motion';
import { useSelectedLayoutSegment } from 'next/navigation';
import TopRoles from '../../../../../components/user/components/Form/picktopgreen/toprole';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  return (
    <div className={styles.auth_container}>
      <motion.div
        className={styles.auth_card_fond_container}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 2 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.auth_toprole}>
          <TopRoles />
        </div>
        <div className={styles.auth_card_container}>{children}</div>
      </motion.div>
    </div>
  );
}
