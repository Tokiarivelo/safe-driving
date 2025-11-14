'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './pickrole.module.css';
import { useTranslation } from 'react-i18next';
export const PickRole = () => {
  const { t, ready } = useTranslation('user/pickrole');

  if (!ready) return null;
  return (
    <>
      <div className={styles.auth_pickrole}>
        <Image
          src={'/logo.svg'}
          alt="photo"
          width={100}
          height={100}
          priority={true}
          blurDataURL=""
          className={styles.auth_pickrole1}
        />
      </div>
      <div className={styles.auth_pickrole2}>
        <h1 className={styles.auth_pickrole3}> {t('title1')}</h1>
      </div>

      <div className=" w-ful gap-[100%] px-40  h-30 sm:h-50 flex items-center justify-center sm:gap-40">
        <Link href="/user/form/name/bjr" className={styles.auth_pickrole5}>
          <div className={styles.auth_pickrole6}>{t('title2')}</div>
        </Link>

        <Link href="/driver/register/welcome" className={styles.auth_pickrole7}>
          <div className={styles.auth_pickrole8}>{t('title3')}</div>
        </Link>
      </div>
    </>
  );
};

export default PickRole;
