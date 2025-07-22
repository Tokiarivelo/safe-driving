import React from 'react';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { Button } from '@/components/ui/button';
import { StepListCard } from '@/components/ui/StepListCard';
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
  ClipboardList,
} from 'lucide-react';
import Image from 'next/image';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-pink-400 to-orange-400 flex items-center justify-center px-4 py-8">
      <CardFormContainer title="" subtitle="" className="relative max-w-6xl w-full p-0">
        <div className="flex flex-col md:flex-row w-full">

          {/* Colonne principale élargie */}
          <div className="flex-1 p-12 pt-6 flex flex-col text-center relative">

            {/* Logo dans le coin supérieur gauche */}
            <div className="absolute top-6 left-6">
              <Image src="/logo.svg" alt="Logo" width={64} height={64} />
            </div>

            {/* Contenu centré */}
            <div className="flex flex-col items-center justify-center flex-1 -mt-20">
              <h2 className="text-4xl font-light text-violet-700 mb-15">
                Bienvenue chez Safe Driving !
              </h2>

              <p className="text-pink-600 text-lg mb-25 max-w-2xl">
                Merci d'avoir choisi Safe Driving. Commençons par configurer votre profil
                pour que vous puissiez prendre la route en toute sérénité.
              </p>

              {/* Boutons */}
              <div className="flex justify-between w-full max-w-xl gap-14">
                <Button
                  variant="outline"
                  className="w-1/2 py-4 text-lg border-pink-600 text-pink-600 hover:bg-pink-50 hover:text-pink-600"
                >
                  Plus tard
                </Button>
                <Button
                  className="w-1/2 py-4 text-lg bg-pink-600 text-white hover:bg-pink-500"
                >
                  Démarrer
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-80 bg-gradient-to-br from-pink-500 to-orange-400 rounded-r-xl p-4">
            <StepListCard steps={steps} />
          </div>
        </div>
      </CardFormContainer>
    </div>
  );
};

export default RegistrationPage;
