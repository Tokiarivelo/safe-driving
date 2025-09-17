'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './formbutton.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { usebutton } from './formbuttonAction';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WelcomeStep } from '../welcome/WelcomeStep';
import { PersonalInfoForm } from '../personalInfo/PersonalInfo';
import { IdentityUploadForm } from '../identityUpload/identityUpload';
import { VehicleInfoForm } from '../vehiculeInfo/VehicleInfo';
import { VehicleDocumentsForm } from '../vehiculeUpload/vehiculeUpload';
import { SelfieVerification } from '../selfieVerif/selfieVerif';
import { LocationPermission } from '../gps/gps';
import { NotificationPreferences} from '../notif/notif';
import { ExperiencePreferences } from '../preference/preference';
import { Recap } from '../recapitulatif/recapitulatif';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { identity } from 'lodash';

function FormButton() {
  const {
    datawelcome,
    datapersonalInfo,
    dataidentityUpload,
    datavehicle,
    datauploadVehicle,
    dataselfie,
    datagps,
    datanotif,
    datapref,
    datarecap,
    butwelcome,
    butpersonalInfo,
    butidentityUpload,
    butvehicle,
    butuploadVehicle,
    butselfie,
    butgps,
    butnotif,
    butpref,
    butrecap,
  } = usebutton();

  const [currentStep, setCurrentStep] = useState(1);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const totalSteps = 11;

  const updateProgress = () => {
    const percentage = (currentStep / totalSteps) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return {
      percentage,
      strokeDashoffset,
      circumference,
    };
  };

  useEffect(() => {
    if (datawelcome) {
      setOpenItem('item-1');
      setCurrentStep(2);
    } else if (datapersonalInfo) {
      setOpenItem('item-2');
      setCurrentStep(3);
    } else if (dataidentityUpload) {
      setOpenItem('item-3');
      setCurrentStep(4);
    } else if (datavehicle) {
      setOpenItem('item-4');
      setCurrentStep(5);
    } else if (datauploadVehicle) {
      setOpenItem('item-5');
      setCurrentStep(6);
    } else if (dataselfie) {
      setOpenItem('item-6');
      setCurrentStep(6);
    } else if (datagps) {
      setOpenItem('item-7');
      setCurrentStep(6);
    } else if (datanotif) {
      setOpenItem('item-8');
      setCurrentStep(6);
    } else if (datapref) {
      setOpenItem('item-9');
      setCurrentStep(6);
    } else if (datarecap) {
      setOpenItem('item-10');
      setCurrentStep(6);
    } else {
      setOpenItem(null);
      setCurrentStep(1);
    }
  }, [    datawelcome,
    datapersonalInfo,
    dataidentityUpload,
    datavehicle,
    datauploadVehicle,
    dataselfie,
    datagps,
    datanotif,
    datapref,
    datarecap]);

  const getDescription = () => {
    if (datawelcome) return 'Bienvenue';
    if (datapersonalInfo) return 'Infos perso';
    if (dataidentityUpload) return 'Upload pièces d identité';
    if (datavehicle) return 'Infos du véhicule';
    if (datauploadVehicle) return 'Upload documents véhicule';
    if (dataselfie) return 'Selfie';
    if (datagps) return 'GPS';
    if (datanotif) return 'Notifications';
    if (datapref) return 'Préference';
    if (datarecap) return 'Récapitulatif';
    return '';
  };

  const getButtonText = () => {
    return currentStep === totalSteps ? 'Commencer' : 'Continuer';
  };

  const { strokeDashoffset, circumference } = updateProgress();

  const router = useRouter();
  const { t, ready } = useTranslation('registerDriver/stepList');
  const handleSubmit = async (data: { name: string; email: string; phone: string }) => { }
  const handleUpdateNotif = (data: {
    sms: boolean;
    email: boolean;
    push: boolean;
  }) => {
    console.log('Préférences de notification mises à jour:', data);
  };
  const handleUpdatePref = (data: {
    theme: {
      light: boolean;
      dark: boolean;
    };
    language: string;
  }) => {
    console.log('Préférences mises à jour:', data);
  };
  if (!ready) return null;
  return (
    <>
      <div className={styles.auth_btn}>
        <motion.div
          className={styles.auth_btn1}
          initial={{ opacity: 0, filter: 'brightness(50%)' }}
          animate={{ opacity: 1, filter: 'brightness(100%)' }}
          transition={{ duration: 2 }}
        >
          <Image
            src={'/user/logowhite.svg'}
            alt="photo"
            width={100}
            height={100}
            priority={true}
            blurDataURL=""
            className={styles.auth_btn2}
          />
        </motion.div>
        <div className={styles.auth_btn3}>
          <div className={styles.auth_btn4}>
            <div className={styles.auth_btn5}>
              <svg className={styles.auth_btn6} viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  id="progressRing"
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#60B74F"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={styles.auth_btn7}
                />
              </svg>
              <div className={styles.auth_btn8}>
                <span id="progressText" className={styles.auth_btn9}>
                  {currentStep}/{totalSteps}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.auth_btn10}>
            <div className={styles.auth_btn11}>
              <p className={styles.auth_btn12}>{getDescription()}</p>
            </div>
          </div>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className={styles.auth_btn13}
        onValueChange={value => {
          if (value) {
            const stepMap = {
              'item-1': 2,
              'item-2': 3,
              'item-3': 4,
              'item-4': 5,
              'item-5': 6,
              'item-6': 7,
              'item-7': 8,
              'item-8': 9,
              'item-9': 10,
              'item-10': 11,
            };
            setCurrentStep(stepMap[value as keyof typeof stepMap] || 1);
          } else {
          }
        }}
      >
        <div className={styles.auth_btn14}>
          <div>
            <Link href="register/welcome">
              <AccordionItem
                value="item-1"
                className={`tag ${datawelcome ? styles.auth_btn15 : ''}`}
                onClick={() => datawelcome && butwelcome()}
              >
                <AccordionTrigger>
                  <div className="space-x-3">
                    <span className={`${styles.auth_btn17} ${datawelcome ? 'animate-spin-y' : ''}`}>
                      👋
                    </span>
                    <span
                      className={`${styles.auth_btn19} ${datawelcome ? styles.auth_btn20 : styles.auth_btn21}`}
                    >
                      {t('step1')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn22}>
                  <WelcomeStep />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="register/personalInfo">
              <AccordionItem
                value="item-2"
                className={`tag ${datapersonalInfo ? styles.auth_btn23 : ''}`}
                onClick={() => datapersonalInfo && butpersonalInfo()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn24}>
                    <span className={styles.auth_btn25}>
                      <div
                        className={`${styles.auth_btn26} ${datapersonalInfo ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn28}`}
                      >
                        <Icon
                          icon="gis:position-o"
                          style={{
                            width: '35px',
                            height: '35px',
                            transition: 'none',
                            animation: 'none',
                            opacity: '1',
                          }}
                        />
                      </div>
                    </span>
                    <span
                      className={`${styles.auth_btn29} ${datapersonalInfo ? styles.auth_btn30 : styles.auth_btn31}`}
                    >
                      {t('step2')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn32}>
                <PersonalInfoForm onSubmit={handleSubmit} />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="register/identityUpload">
              <AccordionItem
                value="item-3"
                className={`tog ${dataidentityUpload ? styles.auth_btn33 : ''}`}
                onClick={() => dataidentityUpload && butidentityUpload()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn34}>
                    <span className={styles.auth_btn35}>
                      <div
                        className={`${styles.auth_btn36} ${dataidentityUpload ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn38}`}
                      >
                        <Icon
                          icon="iconamoon:notification-fill"
                          style={{
                            width: '35px',
                            height: '35px',
                            transition: 'none',
                            animation: 'none',
                            opacity: '1',
                          }}
                        />
                      </div>
                    </span>
                    <span
                      className={`${styles.auth_btn39} ${dataidentityUpload ? styles.auth_btn40 : styles.auth_btn41}`}
                    >
                      {t('step3')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn42}>
                  <IdentityUploadForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="register/vehiculeInfo">
              <AccordionItem
                value="item-4"
                className={`teg ${datavehicle ? styles.auth_btn43 : ''}`}
                onClick={() => datavehicle && butvehicle()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn44}>
                    <span className={styles.auth_btn45}>
                      <div
                        className={`${styles.auth_btn46} ${datavehicle ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn48}`}
                      >
                        <Icon
                          icon="material-symbols:settings-outline-rounded"
                          style={{
                            width: '35px',
                            height: '35px',
                            transition: 'none',
                            animation: 'none',
                            opacity: '1',
                          }}
                        />
                      </div>
                    </span>
                    <span
                      className={`${styles.auth_btn49} ${datavehicle ? styles.auth_btn50 : styles.auth_btn51}`}
                    >
                      {t('step4')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn52}>
                  <VehicleInfoForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="register/vehiculeUpload">
              <AccordionItem
                value="item-5"
                className={`tig ${datauploadVehicle ? styles.auth_btn53 : ''}`}
                onClick={() => datauploadVehicle && butuploadVehicle()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn54}>
                    <span className={styles.auth_btn55}>
                      <div
                        className={`${styles.auth_btn56} ${datauploadVehicle ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn58}`}
                      >
                        <Icon
                          icon="gg:list"
                          style={{
                            width: '35px',
                            height: '35px',
                            transition: 'none',
                            animation: 'none',
                            opacity: '1',
                          }}
                        />
                      </div>
                    </span>
                    <span
                      className={`${styles.auth_btn59} ${datauploadVehicle ? styles.auth_btn60 : styles.auth_btn61}`}
                    >
                      {t('step5')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn62}>
                  <VehicleDocumentsForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="register/selfieVerif">
              <AccordionItem
                value="item-6"
                className={`tag ${dataselfie ? styles.auth_btn23 : ''}`}
                onClick={() => dataselfie && butselfie()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn24}>
                    <span className={styles.auth_btn25}>
                      <div
                        className={`${styles.auth_btn26} ${dataselfie ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn28}`}
                      >
                        <Icon
                          icon="gis:position-o"
                          style={{
                            width: '35px',
                            height: '35px',
                            transition: 'none',
                            animation: 'none',
                            opacity: '1',
                          }}
                        />
                      </div>
                    </span>
                    <span
                      className={`${styles.auth_btn29} ${dataselfie ? styles.auth_btn30 : styles.auth_btn31}`}
                    >
                      {t('step6')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn32}>
                <SelfieVerification />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="register/gps">
              <AccordionItem
                value="item-7"
                className={`tag ${datagps ? styles.auth_btn23 : ''}`}
                onClick={() => datagps && butgps()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn24}>
                    <span className={styles.auth_btn25}>
                      <div
                        className={`${styles.auth_btn26} ${datagps ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn28}`}
                      >
                        <Icon
                          icon="gis:position-o"
                          style={{
                            width: '35px',
                            height: '35px',
                            transition: 'none',
                            animation: 'none',
                            opacity: '1',
                          }}
                        />
                      </div>
                    </span>
                    <span
                      className={`${styles.auth_btn29} ${datagps ? styles.auth_btn30 : styles.auth_btn31}`}
                    >
                      {t('step7')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn32}>
                <LocationPermission />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="register/notif">
              <AccordionItem
                value="item-8"
                className={`tag ${datanotif ? styles.auth_btn23 : ''}`}
                onClick={() => datanotif && butnotif()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn24}>
                    <span className={styles.auth_btn25}>
                      <div
                        className={`${styles.auth_btn26} ${datanotif ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn28}`}
                      >
                        <Icon
                          icon="gis:position-o"
                          style={{
                            width: '35px',
                            height: '35px',
                            transition: 'none',
                            animation: 'none',
                            opacity: '1',
                          }}
                        />
                      </div>
                    </span>
                    <span
                      className={`${styles.auth_btn29} ${datanotif ? styles.auth_btn30 : styles.auth_btn31}`}
                    >
                      {t('step8')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn32}>
                <NotificationPreferences onUpdate={handleUpdateNotif} />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="register/preferences">
              <AccordionItem
                value="item-9"
                className={`tag ${datapref ? styles.auth_btn23 : ''}`}
                onClick={() => datapref && butpref()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn24}>
                    <span className={styles.auth_btn25}>
                      <div
                        className={`${styles.auth_btn26} ${datapref ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn28}`}
                      >
                        <Icon
                          icon="gis:position-o"
                          style={{
                            width: '35px',
                            height: '35px',
                            transition: 'none',
                            animation: 'none',
                            opacity: '1',
                          }}
                        />
                      </div>
                    </span>
                    <span
                      className={`${styles.auth_btn29} ${datapref ? styles.auth_btn30 : styles.auth_btn31}`}
                    >
                      {t('step9')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn32}>
                <ExperiencePreferences onUpdate={handleUpdatePref} />;
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="register/recapituatif">
              <AccordionItem
                value="item-10"
                className={`tag ${datarecap ? styles.auth_btn23 : ''}`}
                onClick={() => datarecap && butrecap()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn24}>
                    <span className={styles.auth_btn25}>
                      <div
                        className={`${styles.auth_btn26} ${datarecap ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn28}`}
                      >
                        <Icon
                          icon="gis:position-o"
                          style={{
                            width: '35px',
                            height: '35px',
                            transition: 'none',
                            animation: 'none',
                            opacity: '1',
                          }}
                        />
                      </div>
                    </span>
                    <span
                      className={`${styles.auth_btn29} ${datarecap ? styles.auth_btn30 : styles.auth_btn31}`}
                    >
                      {t('step10')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn32}>
                <Recap />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
        </div>
      </Accordion>
    </>
  );
}
export default FormButton;
