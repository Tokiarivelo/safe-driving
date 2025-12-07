'use client';

import Image from 'next/image';
import styles from './pickrole.module.css';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useUpdateUserMutation } from '@/graphql/generated/graphql';
export const PickRole = () => {
  const { t, ready } = useTranslation('user/pickrole');
  const router = useRouter();
  const [updateUser] = useUpdateUserMutation();

  const handleRoleSelect = async (roleName: 'USER' | 'DRIVER', redirectPath: string) => {
    try {
      const { data } = await updateUser({
        variables: {
          input: {
            Role: {
              connect: [{ name: roleName }],
            },
          },
        },
      });

      if (data?.updateUser) {
        router.push(redirectPath);
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

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
        <div
          onClick={() => handleRoleSelect('USER', '/user/form/name/bjr')}
          className={`${styles.auth_pickrole5} cursor-pointer`}
        >
          <div className={styles.auth_pickrole6}>{t('title2')}</div>
        </div>

        <div
          onClick={() => handleRoleSelect('DRIVER', '/driver/register/welcome')}
          className={`${styles.auth_pickrole7} cursor-pointer`}
        >
          <div className={styles.auth_pickrole8}>{t('title3')}</div>
        </div>
      </div>
    </>
  );
};

export default PickRole;
