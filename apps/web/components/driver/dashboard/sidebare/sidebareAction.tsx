'use client';

import { usePathname } from 'next/navigation';

export const usebutton = () => {
  const pathname = usePathname();
  const datahome = pathname.includes('/home');
  const datarechercher = pathname.includes('/recherche');
  const datamessages = pathname.includes('/messages');
  const datacourses = pathname.includes('/courses');
  const datascanner = pathname.includes('/scanner');
  const datanotifications = pathname.includes('/notifications');
  const datatrajet = pathname.includes('/trajet');
  const dataprofil = pathname.includes('/profil');
  const dataoffre = pathname.includes('/offre');
  const dataparametre = pathname.includes('/parametre');
  const dataassistance = pathname.includes('/assistance');
  {/*========================================*/}
  const home = () => {};
  const recherche = () => {};
  const messages = () => {};
  const courses = () => {};
  const scanner = () => {};
  const notifications = () => {};
  const trajet = () => {};
  const profil = () => {};
  const offre = () => {};
  const parametre = () => {};
  const assistance = () => {};
  
  return {
    datahome,
    datarechercher,
    datamessages,
    datacourses,
    datascanner,
    datanotifications,
    datatrajet,
    dataprofil,
    dataoffre,
    dataparametre,
    dataassistance,
    home,
    recherche,
    messages,
    courses,
    scanner,
    notifications,
    trajet,
    profil,
    offre,
    parametre,
    assistance,
  };
};