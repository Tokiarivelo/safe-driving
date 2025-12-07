'use client';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import styles from '../../../user/components/Form/codeqr/codeqr.module.css';
import ProgressLink from '@/components/ui/progress-link';

export default function UserQrPage() {
  const searchParams = useSearchParams();
  const qrUrl = searchParams.get('qrUrl');

  if (!qrUrl) return <div>Erreur lors de la récupération du QR Code</div>;

  const downloadQr = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full px-4 py-8">
      <div className={styles.auth_Qr1}>
        <h1 className={styles.auth_Qr4}>Votre QR Code</h1>
      </div>

      <div className={styles.auth_Qr11}>
        <Image
          src={qrUrl!}
          alt="QR Code"
          width={160}
          height={160}
          className={styles.auth_Qr16}
          unoptimized
        />
      </div>

      <div className={styles.auth_Qr19}>
        <p className={styles.auth_Qr20}>Scannez ce QR Code pour récupérer vos informations.</p>
      </div>

      <div className={styles.auth_Qr22}>
        <Button type="button" onClick={downloadQr} className={styles.auth_Qr23}>
          Télécharger le QR Code
        </Button>
      </div>
      <div className={styles.auth_Qr22}>
        <ProgressLink href="/driver/dashboard">Dashboard</ProgressLink>
      </div>
    </div>
  );
}
