'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const usebutton = () => {
  const pathname = usePathname();
  
  //useState useEffect usePathname tracking
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
// 'use client';
// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';

// export const usebutton = () => {
//   const pathname = usePathname();

//   // useState useEffect usePathname tracking
//   const databjr = pathname.includes('/bjr');
//   const datagps = pathname.includes('/gps');
//   const datanot = pathname.includes('/notification');
//   const datapref = pathname.includes('/preference');
//   const datareca = pathname.includes('/recapitulatif');

//   {/*========================================*/}
//   const butbjr = () => {}; // Azo ampiarahina fanovana fanampiny raha ilaina
//   const butgps = () => {};
//   const butnot = () => {};
//   const butpref = () => {};
//   const butreca = () => {};

//   return {
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
//   };
// };