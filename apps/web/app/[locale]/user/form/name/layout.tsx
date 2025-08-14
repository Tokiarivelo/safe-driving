'use client';

import React from 'react';
import styles from './utilisateur.module.css';
import FormButton from '../../../../../components/user/components/formbutton/formbutton';
import TopRole from '../../../../../components/user/components/toprole/toprole';
import TopRoles from '../../../../../components/user/components/toproles/toproles';
import { usePathname } from 'next/navigation';
import { useSelectedLayoutSegment } from 'next/navigation';
import { motion } from 'framer-motion';
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // const name = pathname.split('/').pop();
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
          {segment === 'bjr' ||
          segment === 'gps' ||
          segment === 'notification' ||
          segment === 'preference' ? (
            <TopRole />
          ) : (
            <TopRoles />
          )}
        </div>
        <div className={styles.auth_card_container}>
          <div className={styles.auth_card_un_container}>{children}</div>
          <div className={styles.auth_card_deux_container}>
            <FormButton />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
