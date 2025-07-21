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

interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

const RegistrationPage = () => {
  // Exemple de données pour les étapes
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
      <CardFormContainer
        title=""
        subtitle=""
        className="relative max-w-4xl w-full p-0" // Ajout de p-0 pour gérer le padding intérieur
      >
        <div className="flex flex-col md:flex-row">
          {/* Colonne principale */}
          <div className="flex-1 p-8">
            <h2 className="text-xl font-semibold mb-4">Bienvenue chez Safe Driving !</h2>
            <p className="text-gray-600 mb-6">
              Merci d'avoir choisi Safe Driving. Commençons par configurer votre profil
              pour que vous puissiez prendre la route en toute sérénité.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" className="w-1/2">Plus tard</Button>
              <Button className="w-1/2">Démarrer</Button>
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
}
export default RegistrationPage;