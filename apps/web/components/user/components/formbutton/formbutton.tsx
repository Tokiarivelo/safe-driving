'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { usebutton } from './formbuttonAction';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
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
  const [openItem, setOpenItem] = useState<string | null>(null); // State to control open item
  const totalSteps = 6; // 1 (initial) + 5 accordion items

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

  // Synchronize openItem and currentStep with URL-based booleans
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
    return ''; // Default if no item is open
  };

  const getButtonText = () => {
    return currentStep === totalSteps ? 'Commencer' : 'Continuer';
  };

  const { strokeDashoffset, circumference } = updateProgress();

  const router = useRouter();
  const { t, ready } = useTranslation('user/bjr');

  if (!ready) return null;

  return (
    <>
      <div className="w-full h-45 sm:hidden">
        <motion.div
          className="h-[65%] flex justify-center"
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
            className="w-full h-21 mt-8"
          />
        </motion.div>
        <div className="h-[35%] flex">
          <div className="w-[18%] pt-2 pr-4">
            <div className="relative flex justify-center mb-8">
              <svg className="w-13 h-13 transform -rotate-90" viewBox="0 0 100 100">
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
                  className="transition-all duration-500 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span id="progressText" className="text-sm font-bold text-white">
                  {currentStep}/{totalSteps}
                </span>
              </div>
            </div>
          </div>
          <div className="w-[77%] h-17 flex items-center">
            <div className="text-white">
              <p className="text-sm font-medium">{getDescription()}</p>
            </div>
          </div>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        onValueChange={(value) => {
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
            // Keep the last clicked step instead of resetting to 1
            // No change to currentStep when closing
          }
        }}
      >
        <div className="space-y-3 sm:space-y-2">
          <div>
            <Link href="/user/form/name/bjr">
              <AccordionItem
                value="item-1"
                className={`tag ${databjr ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
                onClick={() => databjr && butbjr()}
              >
                <AccordionTrigger>
                  <div className="space-x-3">
                    <span className={`text-3xl ml-3 ${databjr ? 'animate-spin-y' : ''}`}>👋</span>
                    <span
                      className={`text-2xl font-medium ${databjr ? 'text-[#ffcf4a]' : 'text-auth-color-bg-white'}`}
                    >
                      Bienvenue
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
                  <BjrForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="/user/form/name/gps">
              <AccordionItem
                value="item-2"
                className={`tag ${datagps ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
                onClick={() => datagps && butgps()}
              >
                <AccordionTrigger>
                  <div className="space-x-3 flex">
                    <span className="flex items-center">
                      <div
                        className={`w-10 h-10 flex items-center justify-center ml-3 ${datagps ? 'animate-spin-y text-[#ffcf4a]' : 'text-white'}`}
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
                      className={`text-2xl font-medium mt-1 ${datagps ? 'text-[#ffcf4a]' : 'text-white'}`}
                    >
                      GPS
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
                  <GpsForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="/user/form/name/notification">
              <AccordionItem
                value="item-3"
                className={`tog ${datanot ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
                onClick={() => datanot && butnot()}
              >
                <AccordionTrigger>
                  <div className="space-x-3 flex">
                    <span className="flex items-center">
                      <div
                        className={`w-10 h-10 flex items-center justify-center ml-3 ${datanot ? 'animate-spin-y text-[#ffcf4a]' : 'text-white'}`}
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
                      className={`text-2xl font-medium mt-1 ${datanot ? 'text-[#ffcf4a]' : 'text-white'}`}
                    >
                      Notifications
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
                  <NotificationForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="/user/form/name/preference">
              <AccordionItem
                value="item-4"
                className={`teg ${datapref ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
                onClick={() => datapref && butpref()}
              >
                <AccordionTrigger>
                  <div className="space-x-3 flex">
                    <span className="flex items-center">
                      <div
                        className={`w-10 h-10 flex items-center justify-center ml-3 ${datapref ? 'animate-spin-y text-[#ffcf4a]' : 'text-white'}`}
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
                      className={`text-2xl font-medium mt-1 ${datapref ? 'text-[#ffcf4a]' : 'text-white'}`}
                    >
                      Préférence
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
                  <PreferenceForm />
                </AccordionContent>
              </AccordionItem>
            </Link>
          </div>
          <div>
            <Link href="/user/form/name/recapitulatif">
              <AccordionItem
                value="item-5"
                className={`tig ${datareca ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
                onClick={() => datareca && butreca()}
              >
                <AccordionTrigger>
                  <div className="space-x-3 flex">
                    <span className="flex items-center">
                      <div
                        className={`w-10 h-10 flex items-center justify-center ml-3 ${datareca ? 'animate-spin-y text-[#ffcf4a]' : 'text-white'}`}
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
                      className={`text-2xl font-medium mt-1 ${datareca ? 'text-[#ffcf4a]' : 'text-white'}`}
                    >
                      Récapitulatif
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
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

// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import { Icon } from '@iconify/react';
// import { usebutton } from './formbuttonAction';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTranslation } from 'react-i18next';
// import BjrForm from '../bjr/bjr';
// import GpsForm from '../gps/gps';
// import NotificationForm from '../notification/notification';
// import PreferenceForm from '../preference/preference';
// import RecapitulatifForm from '../recapitulatif/recapitulatif';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
// function FormButton() {
//   const {
//     databjr,
//     datagps,
//     datanot,
//     datapref,
//     datareca,
//     butbjr,
//     butgps,
//     butnot,
//     butpref,
//     butreca,
//   } = usebutton();

//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 6;

//   const updateProgress = () => {
//     const percentage = (currentStep / totalSteps) * 100;
//     const circumference = 2 * Math.PI * 45;
//     const strokeDashoffset = circumference - (percentage / 100) * circumference;

//     return {
//       percentage,
//       strokeDashoffset,
//       circumference,
//     };
//   };

//   // Handler pour butbjr - étape 2
//   const handleButbjr = () => {
//     setCurrentStep(2);
//     butbjr();
//   };

//   // Handler pour butgps - étape 3
//   const handleButgps = () => {
//     setCurrentStep(3);
//     butgps();
//   };

//   // Handler pour butnot - étape 4
//   const handleButnot = () => {
//     setCurrentStep(4);
//     butnot();
//   };

//   // Handler pour butpref - étape 5
//   const handleButpref = () => {
//     setCurrentStep(5);
//     butpref();
//   };

//   // Handler pour butreca - étape 6
//   const handleButreca = () => {
//     setCurrentStep(6);
//     butreca();
//   };

//   const getDescription = () => {
//     if (databjr === true) {
//       return 'Bienvenue';
//     }

//     if (datagps === true) {
//       return 'GPS';
//     }

//     if (datanot === true) {
//       return 'Notifications';
//     }

//     if (datapref === true) {
//       return 'Préférences';
//     }

//     if (datareca === true) {
//       return 'Félicitations';
//     }
//   };

//   const getButtonText = () => {
//     return currentStep === totalSteps ? 'Commencer' : 'Continuer';
//   };

//   const { strokeDashoffset, circumference } = updateProgress();

//   const router = useRouter();
//   const { t, ready } = useTranslation('user/bjr');

//   if (!ready) return null;

//   return (
//     <>
//       <div className="w-full h-45 sm:hidden">
//         <motion.div
//           className="h-[65%] flex justify-center"
//           initial={{ opacity: 0, filter: 'brightness(50%)' }}
//           animate={{ opacity: 1, filter: 'brightness(100%)' }}
//           transition={{ duration: 2 }}
//         >
//           <Image
//             src={'/user/logowhite.svg'}
//             alt="photo"
//             width={100}
//             height={100}
//             priority={true}
//             blurDataURL=""
//             className="w-full h-21 mt-8"
//           />
//         </motion.div>
//         <div className=" h-[35%] flex">
//           <div className="w-[18%] pt-2 pr-4">
//             <div className="relative flex justify-center mb-8 ">
//               <svg className="w-13 h-13 transform -rotate-90" viewBox="0 0 100 100">
//                 {/* Background circle */}
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   stroke="#e5e7eb"
//                   strokeWidth="6"
//                   fill="transparent"
//                 />
//                 {/* Progress circle */}
//                 <circle
//                   id="progressRing"
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   stroke="#60B74F"
//                   strokeWidth="6"
//                   fill="transparent"
//                   strokeDasharray={circumference}
//                   strokeDashoffset={strokeDashoffset}
//                   strokeLinecap="round"
//                   className="transition-all duration-500 ease-in-out"
//                 />
//               </svg>
//               {/* Progress text */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span id="progressText" className="text-sm font-bold text-white">
//                   {currentStep}/{totalSteps}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="w-[77%] h-17 flex items-center">
//             <div className="text-white">
//               <p className="text-sm font-medium">{getDescription()}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="space-y-3 sm:space-y-2">
//         <div>
//           <Accordion type="single" collapsible className="w-full " defaultValue="item-1">
//             <Link href="/user/form/name/bjr">
//               <AccordionItem
//                 value="item-1 text-red-500"
//                 onClick={handleButbjr}
//                 className={`tag ${databjr ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
//               >
//                 <AccordionTrigger>
//                   <div className="space-x-3">
//                     <span className={`text-3xl ml-3 ${databjr ? 'animate-spin-y' : ''}`}>👋</span>
//                     <span
//                       className={`text-2xl font-medium ${databjr ? 'text-[#ffcf4a]' : 'text-auth-color-bg-white'}`}
//                     >
//                       Bienvenue
//                     </span>
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
//                   <BjrForm />
//                 </AccordionContent>
//               </AccordionItem>
//             </Link>
//           </Accordion>
//         </div>

//         <div>
//           <Accordion type="single" collapsible className="w-full " defaultValue="item-1">
//             <Link href="/user/form/name/gps">
//               <AccordionItem
//                 value="item-1 text-red-500"
//                 onClick={handleButgps}
//                 className={`tag ${datagps ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
//               >
//                 <AccordionTrigger>
//                   <div className="space-x-3 flex">
//                     <span className="flex items-center ">
//                       <div
//                         className={`w-10 h-10 flex items-center justify-center ml-3 ${datagps ? 'animate-spin-y text-[#ffcf4a]' : 'text-white'}`}
//                       >
//                         <Icon
//                           icon="gis:position-o"
//                           style={{
//                             width: '35px',
//                             height: '35px',
//                             transition: 'none',
//                             animation: 'none',
//                             opacity: '1',
//                           }}
//                         />
//                       </div>
//                     </span>
//                     <span
//                       className={`text-2xl font-medium mt-1 ${datagps ? 'text-[#ffcf4a]' : 'text-white'}`}
//                     >
//                       GPS
//                     </span>
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
//                   <GpsForm />
//                 </AccordionContent>
//               </AccordionItem>
//             </Link>
//           </Accordion>
//         </div>

//         <div>
//           <Accordion type="single" collapsible className="w-full " defaultValue="item-1">
//             <Link href="/user/form/name/notification">
//               <AccordionItem
//                 value="item-1 text-red-500"
//                 onClick={handleButnot}
//                 className={`tog ${datanot ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
//               >
//                 <AccordionTrigger>
//                   <div className="space-x-3 flex">
//                     <span className="flex items-center ">
//                       <div
//                         className={`w-10 h-10 flex items-center justify-center ml-3 ${datanot ? 'animate-spin-y text-[#ffcf4a]' : 'text-white'}`}
//                       >
//                         <Icon
//                           icon="iconamoon:notification-fill"
//                           style={{
//                             width: '35px',
//                             height: '35px',
//                             transition: 'none',
//                             animation: 'none',
//                             opacity: '1',
//                           }}
//                         />
//                       </div>
//                     </span>
//                     <span
//                       className={`text-2xl font-medium mt-1 ${datanot ? 'text-[#ffcf4a]' : 'text-white'}`}
//                     >
//                       Notifications
//                     </span>
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
//                   <NotificationForm />
//                 </AccordionContent>
//               </AccordionItem>
//             </Link>
//           </Accordion>
//         </div>

//         <div>
//           <Accordion type="single" collapsible className="w-full " defaultValue="item-1">
//             <Link href="/user/form/name/preference">
//               <AccordionItem
//                 value="item-1 text-red-500"
//                 onClick={handleButpref}
//                 className={`teg ${datapref ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
//               >
//                 <AccordionTrigger>
//                   <div className="space-x-3 flex">
//                     <span className="flex items-center ">
//                       <div
//                         className={`w-10 h-10 flex items-center justify-center ml-3 ${datapref ? 'animate-spin-y text-[#ffcf4a]' : 'text-white'}`}
//                       >
//                         <Icon
//                           icon="material-symbols:settings-outline-rounded"
//                           style={{
//                             width: '35px',
//                             height: '35px',
//                             transition: 'none',
//                             animation: 'none',
//                             opacity: '1',
//                           }}
//                         />
//                       </div>
//                     </span>
//                     <span
//                       className={`text-2xl font-medium mt-1 ${datapref ? 'text-[#ffcf4a]' : 'text-white'}`}
//                     >
//                       Préférence
//                     </span>
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
//                   <PreferenceForm />
//                 </AccordionContent>
//               </AccordionItem>
//             </Link>
//           </Accordion>
//         </div>

//         <div>
//           <Accordion type="single" collapsible className="w-full " defaultValue="item-1">
//             <Link href="/user/form/name/recapitulatif">
//               <AccordionItem
//                 value="item-1 text-red-500"
//                 onClick={handleButreca}
//                 className={`teg ${datareca ? 'auth-card-bgs-gradient shadow-sm' : ''}`}
//               >
//                 <AccordionTrigger>
//                   <div className="space-x-3 flex">
//                     <span className="flex items-center ">
//                       <div
//                         className={`w-10 h-10 flex items-center justify-center ml-3 ${datareca ? 'animate-spin-y text-[#ffcf4a]' : 'text-white'}`}
//                       >
//                         <Icon
//                           icon="gg:list"
//                           style={{
//                             width: '35px',
//                             height: '35px',
//                             transition: 'none',
//                             animation: 'none',
//                             opacity: '1',
//                           }}
//                         />
//                       </div>
//                     </span>
//                     <span
//                       className={`text-2xl font-medium mt-1 ${datareca ? 'text-[#ffcf4a]' : 'text-white'}`}
//                     >
//                       Récapitulatif
//                     </span>
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent className="flex flex-col gap-4 text-balance sm:hidden">
//                   <RecapitulatifForm />
//                 </AccordionContent>
//               </AccordionItem>
//             </Link>
//           </Accordion>
//         </div>
//       </div>
//     </>
//   );
// }

// export default FormButton;
