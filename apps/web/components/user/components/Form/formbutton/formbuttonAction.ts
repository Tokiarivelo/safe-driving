'use client';

import { usePathname } from 'next/navigation';

export const useButton = () => {
  const pathname = usePathname();
  const databjr = pathname.includes('/bjr');
  const datagps = pathname.includes('/gps');
  const datanot = pathname.includes('/notification');
  const datapref = pathname.includes('/preference');
  const datareca = pathname.includes('/recapitulatif');
  {/*========================================*/}
  const butbjr = () => {};
  const butgps = () => {};
  const butnot = () => {};
  const butpref = () => {};
  const butreca = () => {};
  
  return {
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
  };
};