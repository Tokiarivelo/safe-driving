'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popup } from '@/components/ui/popup';
import { useTranslation } from 'react-i18next';
import { useTermsAcceptance } from './useAction';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import styles from './terms.module.css';
import { Button } from '@/components/ui/button';

export const TermsAcceptance = ({ onUpdate }: { onUpdate: (data: any) => void; }) => {
  const { t } = useTranslation(['registerDriver/step10', 'registerDriver/CGU', 'registerDriver/politiqueConf']);

  const { form, currentDocument, documentRead, handleOpenDocument, handleAcceptanceChange, setCurrentDocument, onSubmit } = useTermsAcceptance();
  const { isSubmitting } = form.formState;
  const terms = form.watch();

  return (
    <div className="w-full px-4 py-8">
      <Form {...form}>
        <form onSubmit={onSubmit}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{t('title', { ns: 'registerDriver/step10' })}</h1>
          <p className={styles.subtitle}>{t('subtitle', { ns: 'registerDriver/step10' })}</p>
        </div>

        <div className="w-full max-w-xl mx-auto flex flex-col gap-6 mt-8">
          <div className="flex items-start space-x-2">
            <Checkbox id="term-CGU" checked={terms.CGU} onCheckedChange={() => handleAcceptanceChange('CGU')} disabled={!documentRead.CGU} />
            <div className="flex flex-col text-left">
              <Label htmlFor="term-CGU">{t('registerDriver/step10:terms.cgu', { ns: 'registerDriver/CGU' })}</Label>
              <button type="button" onClick={() => handleOpenDocument('CGU')} className="text-sm text-blue-600 hover:underline text-left mt-1">
                {t('readLabel', { ns: 'registerDriver/CGU' })}
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="term-politiqueConf" checked={terms.politiqueConf} onCheckedChange={() => handleAcceptanceChange('politiqueConf')} disabled={!documentRead.politiqueConf} />
            <div className="flex flex-col text-left">
              <Label htmlFor="term-politiqueConf">{t('registerDriver/step10:terms.privacy', { ns: 'registerDriver/politiqueConf' })}</Label>
              <button type="button" onClick={() => handleOpenDocument('politiqueConf')} className="text-sm text-blue-600 hover:underline text-left mt-1">
                {t('readLabel', { ns: 'registerDriver/politiqueConf' })}
              </button>
            </div>
          </div>
        </div>

        {currentDocument === 'CGU' && (
          <Popup
            title={t('title', { ns: 'registerDriver/CGU' })}
            content={<div className="text-left">{t('content', { ns: 'registerDriver/CGU' })}</div>}
            onClose={() => setCurrentDocument(null)}
            onAccept={() => handleAcceptanceChange('CGU')}
            closeText={t('closeButton', { ns: 'registerDriver/CGU' })}
            acceptText={t('acceptButton', { ns: 'registerDriver/CGU' })}
          />
        )}

        {currentDocument === 'politiqueConf' && (
          <Popup
            title={t('title', { ns: 'registerDriver/politiqueConf' })}
            content={<div className="text-left">{t('content', { ns: 'registerDriver/politiqueConf' })}</div>}
            onClose={() => setCurrentDocument(null)}
            onAccept={() => handleAcceptanceChange('politiqueConf')}
            closeText={t('closeButton', { ns: 'registerDriver/politiqueConf' })}
            acceptText={t('acceptButton', { ns: 'registerDriver/politiqueConf' })}
          />
        )}

        <div className="mt-8 text-center">
          <Button type="submit" disabled={isSubmitting} className={styles.buttonPrimary}>
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /></> : t('registerDriver/step10:button', { ns: 'registerDriver/step10' })}
          </Button>
        </div>
        </form>
      </Form>
    </div>
  );
};

export default TermsAcceptance;