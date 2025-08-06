'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CardFormContainer  } from '@/components/ui/CardFormContainer';
import { Button } from '@/components/ui/button';
import { StepListCard } from '@/components/ui/StepListCard';
import { StepIndicator } from '@/components/ui/PogressBar';
import { Hand, UserRound, IdCard, CarFront, FileUp, Camera, MapPin, Bell, Settings, ClipboardList, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const PersonalInfoForm = dynamic(() => import('@/components/driver/PersonalInfo'));
const IdentityVerification = dynamic(() => import('@/components/driver/IdentityVerification'));
const VehicleInfoForm = dynamic(() => import('@/components/driver/VehicleInfo'));
const VehicleDocuments = dynamic(() => import('@/components/driver/VehicleDocuments'));
const SelfieVerification = dynamic(() => import('@/components/driver/SelfieVerification'));
const LocationPermission = dynamic(() => import('@/components/driver/Localisation'));
const NotificationPreferences = dynamic(() => import('@/components/driver/Notification'));
const ExperiencePreferences = dynamic(() => import('@/components/driver/Preference'));
const TermsAcceptance = dynamic(() => import('@/components/driver/Terms'));

const STEPS = [
  { id: 'step1', icon: <Hand size={18} />, component: null },
  { id: 'step2', icon: <UserRound size={18} />, component: PersonalInfoForm },
  { id: 'step3', icon: <IdCard size={18} />, component: IdentityVerification },
  { id: 'step4', icon: <CarFront size={18} />, component: VehicleInfoForm },
  { id: 'step5', icon: <FileUp size={18} />, component: VehicleDocuments },
  { id: 'step6', icon: <Camera size={18} />, component: SelfieVerification },
  { id: 'step7', icon: <MapPin size={18} />, component: LocationPermission },
  { id: 'step8', icon: <Bell size={18} />, component: NotificationPreferences },
  { id: 'step9', icon: <Settings size={18} />, component: ExperiencePreferences },
  { id: 'step10', icon: <ClipboardList size={18} />, component: TermsAcceptance },
  { id: 'step11', icon: <CheckCircle size={18} />, component: null }
];

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const currentNamespace = `registerDriver/${STEPS[currentStep].id}`;
  const { t, ready } = useTranslation([currentNamespace, 'registerDriver/stepList']);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateFormData = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const currentStepConfig = STEPS[currentStep];
  const StepComponent = currentStepConfig.component;

  if (!ready) return (
    <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center">
      <div className="text-foreground dark:text-foreground">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8">
      <div className="mt-10">
        <StepIndicator
          steps={[
            { 
              number: 1, 
              label: t('registerDriver/stepList:progressionRole'), 
              status: currentStep > 0 ? 'done' : 'active' 
            },
            { 
              number: 2, 
              label: t('registerDriver/stepList:progressionInfo'), 
              status: currentStep > 1 ? 'done' : currentStep === 1 ? 'active' : 'inactive' 
            },
          ]}
        />
      </div>

      <CardFormContainer 
        title=""
        subtitle=""
        className="relative max-w-6xl w-full p-0 mt-5"
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex-1 p-12 pt-6 flex flex-col relative bg-[var(--color-auth-color-bg-white)] dark:bg-card">
            <div className="absolute top-6 left-6">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={64} 
                height={64} 
                className="dark:invert dark:brightness-0 dark:contrast-200"
              />
            </div>

            <div className="flex flex-col items-center justify-center flex-1">
              {/* En-tête systématique avec titre et sous-titre */}
              <div className="w-full max-w-2xl text-center mb-8">
                <h2 className="text-3xl font-light text-[var(--color-auth-color-text-custom-magenta)] dark:text-foreground mb-4">
                  {t('title')}
                </h2>
                <p className="text-lg text-[var(--color-auth-color-text-custom-magenta)] dark:text-muted-foreground">
                  {t('subtitle')}
                </p>
              </div>

              {/* Contenu dynamique de l'étape */}
              {StepComponent && (
                <StepComponent 
                  data={formData} 
                  onUpdate={updateFormData} 
                  t={t}
                  translations={t} 
                />
              )}

              {/* Boutons de navigation */}
              <div className="flex justify-between w-full max-w-xl gap-4 mt-8">
                <Button
                  variant="outline"
                  className="w-1/2 py-4 text-lg border-[var(--color-auth-primary)] dark:border-border text-[var(--color-auth-primary)] dark:text-foreground hover:bg-[var(--color-auth-primary)] hover:text-white dark:hover:bg-primary dark:hover:text-primary-foreground"
                  onClick={currentStep === 0 ? () => {} : handlePrev}
                >
                  {currentStep === 0 
                    ? t('buttons.later', { defaultValue: 'Plus tard' })
                    : t('buttons.later', { defaultValue: 'Retour' })}
                </Button>
                <Button
                  className="w-1/2 py-4 text-lg bg-[var(--color-auth-color-button)] dark:bg-primary text-white dark:text-primary-foreground hover:bg-[var(--color-auth-color-button)]/90 dark:hover:bg-primary/90"
                  onClick={handleNext}
                >
                  {currentStep === STEPS.length - 1 
                    ? t('button', { defaultValue: 'Terminer' })
                    : t('buttons.validate', { defaultValue: 'Continuer' })}
                </Button>
              </div>
            </div>
          </div>

          {/* Barre latérale avec progression */}
          <div className="md:w-80 auth-card-bg-gradient dark:bg-card dark:border-l dark:border-border rounded-r-xl p-4">
            <StepListCard 
              steps={STEPS.map((step, index) => ({
                ...step,
                title: t(`registerDriver/stepList:step${index + 1}`),
              }))} 
              currentStepId={currentStepConfig.id} 
            />
          </div>
        </div>
      </CardFormContainer>
    </div>
  );
}