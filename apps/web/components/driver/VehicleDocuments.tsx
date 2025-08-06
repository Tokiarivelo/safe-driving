'use client';

import { MultiFileUpload } from '@/components/ui/MultiFileUpload';

interface VehicleDocumentsProps {
  data: any;
  onUpdate: (data: any) => void;
  translations: any;
}

export default function VehicleDocuments({ data, onUpdate, translations }: VehicleDocumentsProps) {
  const documents = translations?.documents || {
    registration: {},
    insurance: {},
    photos: {}
  };

  const handleUpload = (field: string) => (files: File[]) => {
    onUpdate({ ...data, [field]: files });
  };

  return (
    <div className="space-y-8">
      {/* Certificat d'immatriculation */}
      <div className="flex justify-center">
        <div className="w-full max-w-md p-4 rounded-lg border border-gray-200 shadow-sm bg-white space-y-4">
          <h2 className="text-lg font-medium text-center">Certificat d'immatriculation</h2>
          <MultiFileUpload
            files={data?.registrationFiles || []}
            buttonText={documents.registration.button || 'Choisir un fichier'}
            addMoreText={documents.registration.add_more}
            onUpload={handleUpload('registrationFiles')}
            multiple={true}
          />
        </div>
      </div>

      {/* Attestation d'assurance */}
      <div className="flex justify-center">
        <div className="w-full max-w-md p-4 rounded-lg border border-gray-200 shadow-sm bg-white space-y-4">
          <h2 className="text-lg font-medium text-center">Attestation d'assurance</h2>
          <MultiFileUpload
            files={data?.insuranceFiles || []}
            buttonText={documents.insurance.button || 'Choisir un fichier'}
            addMoreText={documents.insurance.add_more}
            onUpload={handleUpload('insuranceFiles')}
            multiple={true}
          />
        </div>
      </div>

      {/* Photos du véhicule */}
      <div className="flex justify-center">
        <div className="w-full max-w-md p-4 rounded-lg border border-gray-200 shadow-sm bg-white space-y-4">
          <h2 className="text-lg font-medium text-center">Photos du véhicule</h2>
          <MultiFileUpload
            files={data?.vehiclePhotos || []}
            buttonText={documents.photos.button || 'Choisir un fichier'}
            addMoreText={documents.photos.add_more}
            onUpload={handleUpload('vehiclePhotos')}
            multiple={true}
          />
        </div>
      </div>
    </div>
  );
}