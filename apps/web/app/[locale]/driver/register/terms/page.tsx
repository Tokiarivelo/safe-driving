'use client';
import TermsAcceptance from '@/components/driver/register/terms/terms';
export default function TermsAcceptancePage() {
  const handleUpdate = (data: { CGU: boolean; politiqueConf: boolean }) => {
    console.log('Termes acceptés:', data);
  };

  return <TermsAcceptance onUpdate={handleUpdate} />;
}
