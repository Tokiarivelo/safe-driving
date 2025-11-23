'use client';

import { usePathname } from 'next/navigation';

export const useButton = () => {
  const pathname = usePathname();
  const datawelcome = pathname.includes('/welcome');
  const datapersonalInfo = pathname.includes('/personalInfo');
  const dataidentityUpload = pathname.includes('/identityUpload');
  const datavehicle = pathname.includes('/vehiculeInfo');
  const datauploadVehicle = pathname.includes('/vehiculeUpload');
  const dataselfie = pathname.includes('/selfieVerif');
  const datagps = pathname.includes('/gps');
  const datanotif = pathname.includes('/notif');
  const datapref = pathname.includes('/preferences');
  const datarecap = pathname.includes('/recapitulatif');
  {/*========================================*/}
  const butwelcome = () => {};
  const butpersonalInfo = () => {};
  const butidentityUpload = () => {};
  const butvehicle = () => {};
  const butuploadVehicle = () => {};
  const butselfie = () => {};
  const butgps = () => {};
  const butnotif = () => {};
  const butpref = () => {};
  const butrecap = () => {};
  
  return {
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
  };
};