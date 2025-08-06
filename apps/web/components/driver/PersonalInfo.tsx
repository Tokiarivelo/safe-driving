'use client';
import { Input } from '@/components/ui/input';

interface PersonalInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
  t: (key: string, options?: any) => string;
  translations?: any; 
}

export default function PersonalInfoForm({ data, onUpdate, t }: PersonalInfoFormProps) {
  return (
    <div className="w-full max-w-md space-y-4">
      <Input
        label={t('form.name.label')}
        placeholder={t('form.name.placeholder')}
        value={data.name || ''}
        onChange={(e) => onUpdate({ name: e.target.value })}
      />
      <Input
        label={t('form.email.label')}
        placeholder={t('form.email.placeholder')}
        value={data.email || ''}
        onChange={(e) => onUpdate({ email: e.target.value })}
      />
      <Input
        label={t('form.phone.label')}
        placeholder={t('form.phone.placeholder')}
        value={data.phone || ''}
        onChange={(e) => onUpdate({ phone: e.target.value })}
      />
    </div>
  );
}