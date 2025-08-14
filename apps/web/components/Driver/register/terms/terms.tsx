'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popup } from '@/components/ui/popup';
import { useTranslation } from 'react-i18next';
import { useTermsAcceptance } from './useAction';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import * as icons from 'lucide-react';
import { Loader2 } from 'lucide-react';
import styles from './terms.module.css';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { StepListCard } from '@/components/ui/StepListCard';
import { StepIndicator } from '@/components/ui/PogressBar';
import { Button } from '@/components/ui/button';

export const TermsAcceptance = ({ 
  onUpdate
}: { 
  onUpdate: (data: any) => void;
}) => {
  const { t } = useTranslation([
    'registerDriver/step10',
    'registerDriver/stepList',
    'registerDriver/CGU', 
    'registerDriver/politiqueConf'
  ]);

  const {
    form,
    currentDocument,
    documentRead,
    handleOpenDocument,
    handleAcceptanceChange,
    setCurrentDocument
  } = useTermsAcceptance();

  const { isSubmitting } = form.formState;
  const terms = form.watch();

  const iconNames = [
    'User', 'UserRound', 'IdCard', 'CarFront', 'FileUp', 'Camera',
    'MapPin', 'Bell', 'Settings', 'ClipboardList', 'CheckCircle'
  ];

  const STEPS = Array.from({ length: 11 }, (_, i) => {
    const stepNum = i + 1;
    const iconName = iconNames[i];
    const IconComponent = (icons as Record<string, React.FC<any>>)[iconName] ?? icons.Hand;

    return {
      id: `step${stepNum}`,
      icon: <IconComponent size={18} />,
      title: t(`registerDriver/stepList:step${stepNum}`)
    };
  });

  return (
    <div className="min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8">
      <Form {...form}>
        <div className="mt-10">
          <StepIndicator
            steps={[
              { number: 1, label: t('registerDriver/stepList:progressionRole'), status: 'completed' },
              { number: 2, label: t('registerDriver/stepList:progressionInfo'), status: 'active' }
            ]}
          />
        </div>

        <CardFormContainer title="" subtitle="" className="relative max-w-6xl w-full p-0 mt-5">
          <div className="flex flex-col md:flex-row w-full">
            <div className="flex-1 p-12 pt-6 flex flex-col items-center justify-center text-center relative bg-[var(--color-auth-color-bg-white)] dark:bg-card">
              
              {/* Logo */}
              <div className="absolute top-6 left-6">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={64}
                  height={64}
                  className="dark:invert dark:brightness-0 dark:contrast-200"
                />
              </div>

              {/* Titles */}
              <div className={`${styles.textContainer} max-w-xl`}>
                <h1 className={styles.title}>{t('title', { ns: 'registerDriver/step10' })}</h1>
                <p className={styles.subtitle}>{t('subtitle', { ns: 'registerDriver/step10' })}</p>
              </div>

              {/* Checkboxes */}
              <div className="w-full max-w-xl flex flex-col gap-6 mt-8">
                
                {/* CGU */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="term-CGU"
                    checked={terms.CGU}
                    onCheckedChange={() => handleAcceptanceChange('CGU')}
                    disabled={!documentRead.CGU}
                  />
                  <div className="flex flex-col text-left">
                    <Label htmlFor="term-CGU">{t('registerDriver/step10:terms.cgu', { ns: 'registerDriver/CGU' })}</Label>
                    <button 
                      type="button"
                      onClick={() => handleOpenDocument('CGU')}
                      className="text-sm text-blue-600 hover:underline text-left mt-1"
                    >
                      {t('readLabel', { ns: 'registerDriver/CGU' })}
                    </button>
                  </div>
                </div>

                {/* Politique de confidentialité */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="term-politiqueConf"
                    checked={terms.politiqueConf}
                    onCheckedChange={() => handleAcceptanceChange('politiqueConf')}
                    disabled={!documentRead.politiqueConf}
                  />
                  <div className="flex flex-col text-left">
                    <Label htmlFor="term-politiqueConf">{t('registerDriver/step10:terms.privacy', { ns: 'registerDriver/politiqueConf' })}</Label>
                    <button 
                      type="button"
                      onClick={() => handleOpenDocument('politiqueConf')}
                      className="text-sm text-blue-600 hover:underline text-left mt-1"
                    >
                      {t('readLabel', { ns: 'registerDriver/politiqueConf' })}
                    </button>
                  </div>
                </div>
              </div>

              {/* Popups */}
              {currentDocument === 'CGU' && (
                <Popup
                  title={t('title', { ns: 'registerDriver/CGU' })}
                  content={
                    <div className="text-left">
                      {t('content', { ns: 'registerDriver/CGU' })}
                    </div>
                  }
                  onClose={() => setCurrentDocument(null)}
                  onAccept={() => handleAcceptanceChange('CGU')}
                  closeText={t('closeButton', { ns: 'registerDriver/CGU' })}
                  acceptText={t('acceptButton', { ns: 'registerDriver/CGU' })}
                />
              )}

              {currentDocument === 'politiqueConf' && (
                <Popup
                  title={t('title', { ns: 'registerDriver/politiqueConf' })}
                  content={
                    <div className="text-left">
                      {t('content', { ns: 'registerDriver/politiqueConf' })}
                    </div>
                  }
                  onClose={() => setCurrentDocument(null)}
                  onAccept={() => handleAcceptanceChange('politiqueConf')}
                  closeText={t('closeButton', { ns: 'registerDriver/politiqueConf' })}
                  acceptText={t('acceptButton', { ns: 'registerDriver/politiqueConf' })}
                />
              )}

              {/* Button */}
              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.buttonPrimary}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : t('registerDriver/step10:button', { ns: 'registerDriver/step10' })}
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              <StepListCard steps={STEPS} currentStepId="step10" />
            </div>
          </div>
        </CardFormContainer>
      </Form>
    </div>
  );
};

export default TermsAcceptance;
