// components/onboarding/TermsAcceptance.tsx
'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Popup } from '@/components/ui/popup';
import { useTranslation } from 'react-i18next';

export const TermsAcceptance = ({ 
  onUpdate
}: { 
  onUpdate: (data: any) => void;
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState({
    CGU: false,
    politiqueConf: false
  });
  const [currentDocument, setCurrentDocument] = useState<'CGU' | 'politiqueConf' | null>(null);
  const [documentRead, setDocumentRead] = useState({
    CGU: false,
    politiqueConf: false
  });

  const { t } = useTranslation(['registerDriver/CGU', 'registerDriver/politiqueConf']);

  const handleOpenDocument = (doc: 'CGU' | 'politiqueConf') => {
    setCurrentDocument(doc);
    // Marque le document comme lu quand on ouvre le popup
    setDocumentRead(prev => ({ ...prev, [doc]: true }));
  };

  const handleAcceptanceChange = (term: keyof typeof acceptedTerms) => {
    // Empêche la coche si l'utilisateur n'a pas ouvert le document
    if (!documentRead[term]) return;

    const newAcceptedTerms = {
      ...acceptedTerms,
      [term]: !acceptedTerms[term]
    };
    setAcceptedTerms(newAcceptedTerms);
    onUpdate({
      acceptedTerms: newAcceptedTerms
    });
  };

  return (
    <div className="w-full max-w-xl space-y-8">
      <div className="space-y-4">
        {/* Checkbox CGU */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="term-CGU"
            checked={acceptedTerms.CGU}
            onCheckedChange={() => handleAcceptanceChange('CGU')}
            disabled={!documentRead.CGU} // Désactivé si non lu
          />
          <div className="flex flex-col">
            <Label htmlFor="term-CGU">J'accepte les CGU</Label>
            <button 
              type="button"
              onClick={() => handleOpenDocument('CGU')}
              className="text-sm text-blue-600 hover:underline text-left mt-1"
            >
              Lire les CGU
            </button>
          </div>
        </div>

        {/* Checkbox Politique de confidentialité */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="term-politiqueConf"
            checked={acceptedTerms.politiqueConf}
            onCheckedChange={() => handleAcceptanceChange('politiqueConf')}
            disabled={!documentRead.politiqueConf} // Désactivé si non lu
          />
          <div className="flex flex-col">
            <Label htmlFor="term-politiqueConf">J'accepte la Politique de Confidentialité</Label>
            <button 
              type="button"
              onClick={() => handleOpenDocument('politiqueConf')}
              className="text-sm text-blue-600 hover:underline text-left mt-1"
            >
              Lire la Politique
            </button>
          </div>
        </div>
      </div>

      {/* Popups */}
      {currentDocument === 'CGU' && (
        <Popup
          title={t('title', { ns: 'registerDriver/CGU' })}
          content={t('content', { ns: 'registerDriver/CGU' })}
          onClose={() => setCurrentDocument(null)}
          onAccept={() => handleAcceptanceChange('CGU')}
          closeText="Fermer"
          acceptText={t('button', { ns: 'registerDriver/CGU' })}
        />
      )}

      {currentDocument === 'politiqueConf' && (
        <Popup
          title={t('title', { ns: 'registerDriver/politiqueConf' })}
          content={t('content', { ns: 'registerDriver/politiqueConf' })}
          onClose={() => setCurrentDocument(null)}
          onAccept={() => handleAcceptanceChange('politiqueConf')}
          closeText="Fermer"
          acceptText={t('button', { ns: 'registerDriver/politiqueConf' })}
        />
      )}
    </div>
  );
};

export default TermsAcceptance;