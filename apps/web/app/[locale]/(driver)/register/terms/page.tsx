'use client';
import TermsAcceptance from '@/components/Driver/register/terms/terms';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function TermsAcceptancePage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleUpdate = (data: {
    CGU: boolean;
    politiqueConf: boolean;
  }) => {
    console.log('Termes acceptés:', data);
  };

  return (
      <TermsAcceptance onUpdate={handleUpdate} />
  );
}