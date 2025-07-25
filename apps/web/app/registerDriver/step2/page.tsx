import React from 'react';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { Button } from '@/components/ui/button';
import { StepListCard } from '@/components/ui/StepListCard';
import { Input } from '@/components/ui/input';
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

const RegistrationPage = () => {
  const steps = [
    { id: 'welcome', title: 'Bienvenue', icon: <Hand size={18} />, completed: true, current: false },
    { id: 'personal', title: 'Infos personnelles', icon: <UserRound size={18} />, completed: false, current: true },
    { id: 'upload', title: 'Upload pièce didentité', icon: <IdCard size={18} />, completed: false, current: false },
    { id: 'vehicule', title: 'Infos du véhicule', icon: <CarFront size={18} />, completed: false, current: false },
    { id: 'doc_vehicule', title: 'Upload documents véhicule', icon: <FileUp size={18} />, completed: false, current: false },
    { id: 'selfie', title: 'Selfie de vérification', icon: <Camera size={18} />, completed: false, current: false },
    { id: 'gps', title: 'GPS', icon: <MapPin size={18} />, completed: false, current: false },
    { id: 'notif', title: 'Notifications', icon: <Bell size={18} />, completed: false, current: false },
    { id: 'preference', title: 'Préférence', icon: <Settings size={18} />, completed: false, current: false },
    { id: 'recap', title: 'Récapitulatif', icon: <ClipboardList size={18} />, completed: false, current: false },
  ];

  return (
    <div className="min-h-screen auth-background flex flex-col items-center justify-start px-4 py-8">
      
      {/* Progression en haut */}
      <div className="mb-10 mt-25">
        <StepIndicator
          steps={[
            { number: 1, label: 'Rôle', status: 'done' },
            { number: 2, label: 'Informations', status: 'active' },
          ]}
        />
      </div>

      {/* Carte principale */}
      <CardFormContainer title="" subtitle="" className="relative max-w-6xl w-full p-0 mt-1">
        <div className="flex flex-col md:flex-row w-full">

          {/* Colonne principale */}
          <div className="flex-1 px-12 py-14 flex flex-col relative bg-[var(--color-auth-color-bg-white)]">

            {/* Logo */}
            <div className="absolute top-6 left-6">
              <Image src="/logo.svg" alt="Logo" width={64} height={64} />
            </div>

            {/* Titre */}
            <div className="flex flex-col items-center justify-center flex-1 mt-10">
              <h2 className="text-4xl font-light text-[var(--color-auth-color-text-custom-magenta)] mb-10"> 
                Quelques détails sur vous
              </h2>

              <p className="text-[var(--color-auth-color-text-custom-magenta)] text-center text-lg mb-8 max-w-2xl"> 
                Renseignez vos coordonnées pour que nous puissions vous contacter
                et valider votre identité
              </p>

              {/* Formulaire */}
              <div className="space-y-6 w-full max-w-md mx-auto"> 
                <div>
                  <p className="mb-2 text-sm font-medium text-[var(--color-auth-color-text-custom-magenta)]">Nom complet</p>
                  <Input placeholder="John Doe"/>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">E-mail</p>
                  <Input placeholder="email@email.com" type="email" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Téléphone</p>
                  <Input  placeholder="+261..." type="tel" />
                </div>
              </div>

              {/* Boutons - Ajouté mt-16 pour plus d'espace */}
              <div className="flex justify-between w-full max-w-md mt-16 gap-6"> {/* Changé max-w-xl à max-w-md */}
                <Button
                  variant="outline"
                  className="w-1/2 py-4 text-lg border-[var(--color-auth-primary)] text-[var(--color-auth-primary)] hover:bg-[var(--color-auth-color-input)] hover:text-[var(--color-auth-primary)]"
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
          </div>

          {/* Sidebar étapes */}
          <div className="md:w-80 auth-card-bg-gradient rounded-r-xl p-4">
            <StepListCard steps={steps} />
          </div>
        </div>
      </CardFormContainer>
    </div>
  );
};

export default RegistrationPage;