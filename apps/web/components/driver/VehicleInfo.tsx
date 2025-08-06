'use client';
import { Input } from '@/components/ui/input';

interface VehicleInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
  t: (key: string, options?: any) => string;
}

export default function VehicleInfoForm({ data, onUpdate, t }: VehicleInfoFormProps) {
  return (
    <div className="space-y-4 w-full max-w-md">
      {/* Champ Marque */}
      <div className="space-y-1">
        <label className="text-sm font-medium block">
          {t('form.brand.label')}
        </label>
        <Input
          placeholder={t('form.brand.placeholder')}
          value={data.brand || ''}
          onChange={(e) => onUpdate({ brand: e.target.value })}
        />
      </div>

      {/* Champ Modèle */}
      <div className="space-y-1">
        <label className="text-sm font-medium block">
          {t('form.model.label')}
        </label>
        <Input
          placeholder={t('form.model.placeholder')}
          value={data.model || ''}
          onChange={(e) => onUpdate({ model: e.target.value })}
        />
      </div>

      {/* Champ Plaque d'immatriculation */}
      <div className="space-y-1">
        <label className="text-sm font-medium block">
          {t('form.plate.label')}
        </label>
        <Input
          placeholder={t('form.plate.placeholder')}
          value={data.plate || ''}
          onChange={(e) => onUpdate({ plate: e.target.value })}
        />
      </div>

      {/* Champ Nombre de places */}
      <div className="space-y-1">
        <label className="text-sm font-medium block">
          {t('form.seats.label')}
        </label>
        <Input
          placeholder={t('form.seats.placeholder')}
          value={data.seats || ''}
          onChange={(e) => onUpdate({ seats: e.target.value })}
        />
      </div>

      {/* Champ Type de véhicule */}
      <div className="space-y-1">
        <label className="text-sm font-medium block">
          {t('form.type.label')}
        </label>
        <Input
          placeholder={t('form.type.placeholder')}
          value={data.type || ''}
          onChange={(e) => onUpdate({ type: e.target.value })}
        />
      </div>
    </div>
  );
}