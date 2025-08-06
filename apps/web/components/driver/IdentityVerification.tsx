'use client';
import { FileUpload } from '@/components/ui/FileUpload';

interface IdentityVerificationProps {
  data: any;
  onUpdate: (data: any) => void;
  t: (key: string, options?: any) => string;
}

export default function IdentityVerification({ data, onUpdate, t }: IdentityVerificationProps) {
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto">
      <h4 className="font-medium mb-4">{t('id_card.front.title')}</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col">
          <p className="text-sm mb-3">{t('id_card.front.subtitle')}</p>
          <FileUpload
            onUpload={(file) => onUpdate({ idCardFront: file })}
            className="h-48 w-full rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm mb-3">{t('id_card.back.subtitle')}</p>
          <FileUpload
            onUpload={(file) => onUpdate({ idCardBack: file })}
            className="h-48 w-full rounded-lg"
          />
        </div>

        <div className="flex flex-col">
            <h4 className="font-medium mb-1">{t('id_card.license.title')}</h4>
            <FileUpload
              onUpload={(file) => onUpdate({ license: file })}
              className="h-48 w-full rounded-lg" 
            />
        </div>
      </div>
    </div>
  );
}