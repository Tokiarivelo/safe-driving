'use client';

import { usePathname } from 'next/navigation';

export const useButton = () => {
  const pathname = usePathname();
  const datahome = pathname.includes('/dashboard');
  const datarechercher = pathname.includes('/recherche');
  const datamessages = pathname.includes('/messages');
  const datacourses = pathname.includes('/courses');
  const datascanner = pathname.includes('/scan');
  const datanotifications = pathname.includes('/notifications');
  const datatrajet = pathname.includes('/trajet');
  const dataprofil = pathname.includes('/profile');
  const dataparametre = pathname.includes('/parametre');
  const dataassistance = pathname.includes('/assistance');
  {
    /*========================================*/
  }
  const home = () => {};
  const recherche = () => {};
  const messages = () => {};
  const courses = () => {};
  const scanner = () => {};
  const notifications = () => {};
  const trajet = () => {};
  const profil = () => {};
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
    parametre,
    assistance,
  };
};
