"use client";

import React from 'react';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { Button } from '@/components/ui/button';
import { StepListCard } from '@/components/ui/StepListCard';
import { StepIndicator } from '@/components/ui/PogressBar';
import {
  Hand,
  UserRound,
  IdCard,
  CarFront,
  FileUp,
  Camera,
  MapPin,
  Bell,
  Settings,
  ClipboardList
} from 'lucide-react';
import Image from 'next/image';
import { FileUpload } from '@/components/ui/FileUpload';

const RegistrationPage = () => {
  const steps = [
    { id: 'welcome', title: 'Bienvenue', icon: <Hand size={18} />, completed: true, current: false },
    { id: 'personal', title: 'Infos personnelles', icon: <UserRound size={18} />, completed: false, current: true },
    { id: 'upload', title: 'Upload pièce d’identité', icon: <IdCard size={18} />, completed: false, current: false },
    { id: 'vehicule', title: 'Infos du véhicule', icon: <CarFront size={18} />, completed: false, current: false },
    { id: 'doc_vehicule', title: 'Upload documents véhicule', icon: <FileUp size={18} />, completed: false, current: false },
    { id: 'selfie', title: 'Selfie de vérification', icon: <Camera size={18} />, completed: false, current: false },
    { id: 'gps', title: 'GPS', icon: <MapPin size={18} />, completed: false, current: false },
    { id: 'notif', title: 'Notifications', icon: <Bell size={18} />, completed: false, current: false },
    { id: 'preference', title: 'Préférence', icon: <Settings size={18} />, completed: false, current: false },
    { id: 'recap', title: 'Récapitulatif', icon: <ClipboardList size={18} />, completed: false, current: false },
  ];

  const [identityFile, setIdentityFile] = React.useState<File | null>(null);
  const [licenseFile, setLicenseFile] = React.useState<File | null>(null);

  const handleIdentityChange = (files: FileList | null) => {
    setIdentityFile(files?.[0] || null);
  };

  const handleLicenseChange = (files: FileList | null) => {
    setLicenseFile(files?.[0] || null);
  };

  return (
    <div className="min-h-screen auth-background flex flex-col items-center justify-start px-4 py-8">
      
      {/* Barre de progression */}
      <div className="mb-10 mt-20">
        <StepIndicator
          steps={[
            { number: 1, label: 'Rôle', status: 'done' },
            { number: 2, label: 'Informations', status: 'active' },
          ]}
        />
      </div>

      {/* Carte principale */}
      <CardFormContainer title="" subtitle="" className="relative max-w-6xl w-full p-0 mt-15">
        <div className="flex flex-col md:flex-row w-full">

          {/* Colonne principale */}
          <div className="flex-1 px-12 py-14 bg-[var(--color-auth-color-bg-white)] relative">

            {/* Logo */}
            <div className="absolute top-6 left-6">
              <Image src="/logo.svg" alt="Logo" width={64} height={64} />
            </div>

            {/* Titre et instructions */}
            <div className="flex flex-col items-center justify-center mt-10">
              <h2 className="text-4xl font-light text-[var(--color-auth-color-text-custom-magenta)] mb-10"> 
                Vérification d'identité
              </h2>
              <p className="text-[var(--color-auth-color-text-custom-magenta)] text-center text-lg mb-8 max-w-2xl"> 
                Téléchargez votre permis de conduire et votre carte d'identité pour
                vous assurer une inscription rapide et fiable
              </p>
            </div>

            {/* Uploads */}
            <div className="space-y-6 w-full max-w-md mx-auto">
              <div>
                <p className="mb-2 text-sm font-medium text-[var(--color-auth-color-text-custom-magenta)]">
                  Carte d'identité (recto)
                </p>
                <FileUpload
                    accept="image/*,.pdf"
                    onFileSelect={handleIdentityChange}
                    className="w-[320px]"
                />
                {identityFile && (
                  <p className="mt-1 text-sm text-[var(--color-auth-color-text-custom-magenta)]">
                    Fichier sélectionné : {identityFile.name}
                  </p>
                )}
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-[var(--color-auth-color-text-custom-magenta)]">
                  Carte d'identité (verso)
                </p>
                <FileUpload
                    accept="image/*,.pdf"
                    onFileSelect={handleIdentityChange}
                    className="w-[320px]"
                />
                {identityFile && (
                  <p className="mt-1 text-sm text-[var(--color-auth-color-text-custom-magenta)]">
                    Fichier sélectionné : {identityFile.name}
                  </p>
                )}
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-[var(--color-auth-color-text-custom-magenta)]">
                  Permis de conduire
                </p>
                <FileUpload
                    accept="image/*,.pdf"
                    onFileSelect={handleLicenseChange}
                    className="w-[320px]"
                />
                {licenseFile && (
                  <p className="mt-1 text-sm text-[var(--color-auth-color-text-custom-magenta)]">
                    Fichier sélectionné : {licenseFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Boutons */}
            <div className="flex justify-between w-full max-w-md mx-auto mt-16 gap-6">
              <Button
                variant="outline"
                className="w-1/2 py-4 text-lg border-[var(--color-auth-primary)] text-[var(--color-auth-primary)] hover:bg-[var(--color-auth-color-input)]"
              >
                Plus tard
              </Button>
              <Button
                className="w-1/2 py-4 text-lg bg-[var(--color-auth-color-button)] text-[var(--color-auth-text-light)] hover:bg-[var(--color-auth-primary)]"
              >
                Valider
              </Button>
            </div>
          </div>

          {/* Colonne latérale étapes */}
          <div className="md:w-80 auth-card-bg-gradient rounded-r-xl p-4">
            <StepListCard steps={steps} />
          </div>
        </div>
      </CardFormContainer>
    </div>
  );
};

export default RegistrationPage;
