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
import BjrForm from '../bjr/bjr';
import GpsForm from '../gps/gps';
import NotificationForm from '../notification/notification';
import PreferenceForm from '../preference/preference';
import RecapitulatifForm from '../recapitulatif/recapitulatif';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function FormButton() {
  const {
    databjr,
    datagps,
    datanot,
    datapref,
    datareca,
    butbjr,
    butgps,
    butnot,
    butpref,
    butreca,
  } = usebutton();

  const [currentStep, setCurrentStep] = useState(1);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const totalSteps = 6;

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
    if (databjr) {
      setOpenItem('item-1');
      setCurrentStep(2);
    } else if (datagps) {
      setOpenItem('item-2');
      setCurrentStep(3);
    } else if (datanot) {
      setOpenItem('item-3');
      setCurrentStep(4);
    } else if (datapref) {
      setOpenItem('item-4');
      setCurrentStep(5);
    } else if (datareca) {
      setOpenItem('item-5');
      setCurrentStep(6);
    } else {
      setOpenItem(null);
      setCurrentStep(1);
    }
  }, [databjr, datagps, datanot, datapref, datareca]);

  const getDescription = () => {
    if (databjr) return 'Bienvenue';
    if (datagps) return 'GPS';
    if (datanot) return 'Notifications';
    if (datapref) return 'Préférences';
    if (datareca) return 'Félicitations';
    return '';
  };

  const getButtonText = () => {
    return currentStep === totalSteps ? 'Commencer' : 'Continuer';
  };

  const { strokeDashoffset, circumference } = updateProgress();

  const router = useRouter();
  const { t, ready } = useTranslation('user/formbutton');

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
            };
            setCurrentStep(stepMap[value as keyof typeof stepMap] || 1);
          } else {
          }
        }}
      >
        <div className={styles.auth_btn14}>
          <div>
            <Link href="/user/form/name/bjr">
              <AccordionItem
                value="item-1"
                className={`tag ${databjr ? styles.auth_btn15 : ''}`}
                onClick={() => databjr && butbjr()}
              >
                <AccordionTrigger>
                  <div className="space-x-3">
                    <span className={`${styles.auth_btn17} ${databjr ? 'animate-spin-y' : ''}`}>
                      👋
                    </span>
                    <span
                      className={`${styles.auth_btn19} ${databjr ? styles.auth_btn20 : styles.auth_btn21}`}
                    >
                      {t('title')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn22}>
                  <BjrForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="/user/form/name/gps">
              <AccordionItem
                value="item-2"
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
                      {t('title1')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn32}>
                  <GpsForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="/user/form/name/notification">
              <AccordionItem
                value="item-3"
                className={`tog ${datanot ? styles.auth_btn33 : ''}`}
                onClick={() => datanot && butnot()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn34}>
                    <span className={styles.auth_btn35}>
                      <div
                        className={`${styles.auth_btn36} ${datanot ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn38}`}
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
                      className={`${styles.auth_btn39} ${datanot ? styles.auth_btn40 : styles.auth_btn41}`}
                    >
                      {t('title2')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn42}>
                  <NotificationForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="/user/form/name/preference">
              <AccordionItem
                value="item-4"
                className={`teg ${datapref ? styles.auth_btn43 : ''}`}
                onClick={() => datapref && butpref()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn44}>
                    <span className={styles.auth_btn45}>
                      <div
                        className={`${styles.auth_btn46} ${datapref ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn48}`}
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
                      className={`${styles.auth_btn49} ${datapref ? styles.auth_btn50 : styles.auth_btn51}`}
                    >
                      {t('title3')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn52}>
                  <PreferenceForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="/user/form/name/recapitulatif">
              <AccordionItem
                value="item-5"
                className={`tig ${datareca ? styles.auth_btn53 : ''}`}
                onClick={() => datareca && butreca()}
              >
                <AccordionTrigger>
                  <div className={styles.auth_btn54}>
                    <span className={styles.auth_btn55}>
                      <div
                        className={`${styles.auth_btn56} ${datareca ? 'animate-spin-y text-[#ffcf4a]' : styles.auth_btn58}`}
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
                      className={`${styles.auth_btn59} ${datareca ? styles.auth_btn60 : styles.auth_btn61}`}
                    >
                      {t('title4')}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={styles.auth_btn62}>
                  <RecapitulatifForm />
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
