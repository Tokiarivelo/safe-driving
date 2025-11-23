'use client';
import Image from 'next/image';
import styles from './codeqr.module.css';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useGetqrQuery, useMeQuery } from '@/graphql/generated/graphql';
import { Icon } from '@iconify/react';

export const PickRole = () => {
  const {
    data,
    error,
    loading: queryLoading,
  } = useGetqrQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
  const { data: meData } = useMeQuery();
  const router = useRouter();
  const { t, ready } = useTranslation('user/codeqr');
  if (!ready) return null;
  const downloadQRCode = async () => {
    if (!data?.getUserQr) {
          console.log("pas codeqr");
      return;
    }

    try {
      const response = await fetch(data.getUserQr);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${meData?.me?.firstName || 'user'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback method if fetch fails
      try {
        const img = document.querySelector(`img[src="${data.getUserQr}"]`) as HTMLImageElement;
        if (img) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Canvas context not available');
          }

          canvas.width = img.naturalWidth || 160;
          canvas.height = img.naturalHeight || 160;

          ctx.drawImage(img, 0, 0);

          const link = document.createElement('a');
          link.download = `qr-code-${meData?.me?.firstName || 'user'}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      } catch {
        alert('Tsy afaka na-download ny QR code. Andramo indray.');
      }
    }
  };

  if (!ready) return null;

  return (
    <>
      <div className={styles.auth_Qr1}>
        <Image
          src={'/logo.svg'}
          alt="photo"
          width={100}
          height={100}
          priority={true}
          blurDataURL=""
          className={styles.auth_Qr2}
        />
      </div>
      <div className={styles.auth_Qr3}>
        <h1 className={styles.auth_Qr4}>
          {t('title')}
          {meData?.me?.firstName}
        </h1>
      </div>
      <div className={styles.auth_Qr5}>
        <p className={styles.auth_Qr6}>{t('title1')}</p>
        <p className={styles.auth_Qr7}>{t('title2')}</p>
      </div>
      <div className={styles.auth_Qr8}>
        <p className={styles.auth_Qr9}> {t('title3')}</p>
        <p className={styles.auth_Qr10}>
          {t('title4')}
          <br />
          {t('title5')}
        </p>
      </div>
      <div className={styles.auth_Qr11}>
        {queryLoading ? (
          <div className={styles.auth_Qr12}>
            <span className={styles.auth_Qr13}>Chargement...</span>
          </div>
        ) : error ? (
          <div className={styles.auth_Qr14}>
            <span className={styles.auth_Qr15}>{t('title6')}</span>
          </div>
        ) : data?.getUserQr ? (
          <>
            <Image
              src={data.getUserQr}
              alt="QR Code"
              width={160}
              height={160}
              priority={true}
              className={styles.auth_Qr16}
            />
            <div
              className="auth-background text-white w-7 h-7 absolute mt-31 ml-31 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={downloadQRCode}
              title="Download QR Code"
            >
              <Icon icon="line-md:download-twotone" width="24" height="24" />
            </div>
          </>
        ) : (
          <div className={styles.auth_Qr17}>
            <span className={styles.auth_Qr18}> {t('title7')}</span>
          </div>
        )}
      </div>
      <div className={styles.auth_Qr19}>
        <p className={styles.auth_Qr20}>{t('title8')}</p>
        <p className={styles.auth_Qr21}>{t('title9')}</p>
      </div>
      <div className={styles.auth_Qr22}>
        <Button
          type="button"
          onClick={() => router.push('/user/dashboard/dashboard')}
          className={styles.auth_Qr23}
        >
          {t('title10')}
        </Button>
      </div>
    </>
  );
};

export default PickRole;
