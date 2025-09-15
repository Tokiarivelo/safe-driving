'use client';

import Image from 'next/image';
import React from 'react';
import styles from './driver.module.css';
import FormButton from '../../../components/Driver/register/formbutton/formbutton';
import TopRole from '../../../components/Driver/register/picktopnoir/toprole';
import TopRoles from '../../../components/Driver/register/picktopgreen/toprole';
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
          {segment === 'welcome' ||
          segment === 'personalInfo' ||
          segment === 'identityUpload' ||
          segment === 'vehiculeInfo' ||
          segment === 'vehiculeUpload' ||
          segment === 'selfieVerif' ||
          segment === 'gps' ||
          segment === 'notif' ||
          segment === 'preference' ||
          segment === 'terms' ||
          segment === 'recapitulatif' ||
          segment === 'qrCode' ? (
            <TopRole />
          ) : (
            <TopRoles />
          )}
        </div>
        <div className={styles.auth_card_container}>
          <div className={styles.auth_card_un_container}>
            <motion.div
              className={styles.auth_image}
              initial={{ opacity: 0, filter: 'brightness(50%)' }}
              animate={{ opacity: 1, filter: 'brightness(100%)' }}
              transition={{ duration: 2 }}
            >
              <Image
                src={'/logo.svg'}
                alt="photo"
                width={100}
                height={100}
                priority={true}
                blurDataURL=""
                className={styles.auth_image2}
              />
            </motion.div>
            {children}
          </div>
          <div className={styles.auth_card_deux_container}>
            <FormButton />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
