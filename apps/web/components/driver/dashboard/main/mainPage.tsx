'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { ProgressLink } from '@/components/ui/progress-link';
import { useMeQuery } from '@/graphql/generated/graphql';
import ReactFlagsSelect from 'react-flags-select';
import * as Popover from '@radix-ui/react-popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statuses = [
  { key: 'libre', label: 'Disponible', color: 'bg-green-400' },
  { key: 'occupe', label: 'Occupé', color: 'bg-yellow-400' },
  { key: 'pause', label: 'En pause', color: 'bg-blue-400' },
  { key: 'non_dispo', label: 'Non disponible', color: 'bg-red-500' },
];

const blockClass =
  'relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-md overflow-hidden flex flex-col items-center justify-center';

function Dashboard() {
  const [selected, setSelected] = useState('');
  const { data } = useMeQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  // Génération couleur de fond avatar
  function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  }
  const bgColor = stringToColor(`${data?.me?.firstName}${data?.me?.lastName}`);

  // Gestion du statut
  const [status, setStatus] = useState('libre');
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-h-screen">
      {/* Avatar + Menu */}
      <div className="w-full h-13 flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-12 h-12 rounded-full flex justify-center items-center ml-5 mt-5 border-2 border-l-[#c02aa8] border-b-[#c02aa8] border-r-[#fe7f78] border-t-[#ee6984] cursor-pointer">
              <div
                className="w-10 h-10 rounded-full flex justify-center items-center text-white"
                style={{ backgroundColor: bgColor }}
              >
                {data?.me?.firstName?.[0]}
                {data?.me?.lastName?.[0]}
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="end"
            className="w-50 p-2 rounded-sm border border-white shadow-md shadow-gray-400 ml-18 mt-[-40px]"
          >
            <h1 className="ml-2">{data?.me?.firstName}</h1>
            <DropdownMenuSeparator />
            <div className="w-full h-10 flex">
              <div className="w-10 h-10 flex justify-center items-center">
                <Icon icon="uil:setting" width="24" height="24" />
              </div>
              <div className="w-40 h-10 flex items-center">Account Settings</div>
            </div>
            <div className="w-full h-10 flex">
              <div className="w-10 h-10 flex justify-center items-center">
                <Icon icon="mingcute:settings-6-line" width="24" height="24" />
              </div>
              <div className="w-40 h-10 flex items-center">Preference</div>
            </div>
            <div className="w-full h-10 px-1.5">
              <ReactFlagsSelect
                selected={selected}
                onSelect={code => setSelected(code)}
                countries={['US', 'GB', 'FR', 'DE', 'IT', 'NG']}
              />
            </div>
            <div className="w-full h-10 flex">
              <div className="w-10 h-10 flex justify-center items-center">
                <Icon icon="circum:dark" width="24" height="24" />
              </div>
              <div className="w-40 h-10 flex items-center">Sombre</div>
            </div>
            <hr className="h-[1px] w-full bg-black" />
            <div className="w-full h-10 flex">
              <div className="w-10 h-10 flex justify-center items-center">
                <Icon icon="material-symbols:logout" width="24" height="24" />
              </div>
              <div className="w-40 h-10 flex items-center">Log Out</div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logo animé */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 2 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-25 flex justify-center mt-25 sm:mt-0">
          <Image
            src={'/logo.svg'}
            alt="photo"
            width={100}
            height={100}
            priority={true}
            className="w-20 h-23"
          />
        </div>

        {/* Dashboard blocks */}
        <div className="w-full mt-5 flex justify-center">
          <div className="w-full sm:w-[700px] md:w-[800px] lg:w-[900px]">
            {/* Première ligne */}
            <div className="w-full p-5 sm:p-0 flex justify-between items-center mb-5">
              {/* Bloc Status */}
              <Popover.Root open={open} onOpenChange={setOpen}>
                <Popover.Trigger asChild>
                  <div
                    className={`${blockClass} border-2 border-l-[#c02aa8] border-b-[#c02aa8] border-r-[#fe7f78] border-t-[#ee6984]`}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <div
                        className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${
                          statuses.find(s => s.key === status)?.color
                        }`}
                      />
                    </div>
                    <p className="absolute bottom-2 text-[10px] sm:text-sm text-auth-color-placeholder font-medium">
                      {statuses.find(s => s.key === status)?.label}
                    </p>
                  </div>
                </Popover.Trigger>
                <Popover.Content
                  className="bg-white rounded-lg shadow-lg p-5 border border-gray-200 z-50 translate-x-55"
                  align="start"
                  side="bottom"
                  sideOffset={10}
                >
                  <div className="flex flex-row gap-6">
                    {statuses
                      .filter(s => s.key !== status)
                      .map(s => (
                        <div
                          key={s.key}
                          className="w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 
                                    flex flex-col items-center justify-center cursor-pointer 
                                    rounded-md border-2 border-gray-300 hover:border-pink-400"
                          onClick={() => {
                            setStatus(s.key);
                            setOpen(false);
                          }}
                        >
                          <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${s.color} mb-2`} />
                          <p className="text-[10px] sm:text-sm md:text-base text-center font-medium text-gray-700">
                            {s.label}
                          </p>
                        </div>
                      ))}
                  </div>
                </Popover.Content>
              </Popover.Root>

              {/* Bloc Rechercher */}
              <ProgressLink href="/driver/dashboard/search">
                <div
                  className={`${blockClass} border-2 border-l-[#c02aa8] border-b-[#c02aa8] border-r-[#fe7f78] border-t-[#ee6984]`}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#D4D995] rounded-full flex items-center justify-center">
                      <Icon
                        icon="material-symbols:search-rounded"
                        width="32"
                        height="32"
                        className="text-pink-500"
                      />
                    </div>
                  </div>
                  <p className="absolute bottom-2 inset-x-0 text-center text-auth-color-placeholder text-[10px] sm:text-sm md:text-base font-medium">
                    Rechercher des Courses
                  </p>
                </div>
              </ProgressLink>

              {/* Bloc Messages */}
              <ProgressLink href="/driver/dashboard/messages">
                <div className={`${blockClass} auth-border`}>
                  <div className="flex-1 flex items-center justify-center">
                    <Icon icon="streamline-ultimate-color:messages-logo" width="58" height="58" />
                    <div className="w-5 h-5 absolute z-20 bg-red-600 ml-14 mb-14 rounded-full text-white flex justify-center items-center">
                      9
                    </div>
                  </div>
                  <p className="absolute bottom-2 text-[10px] sm:text-sm md:text-base text-auth-color-placeholder font-medium">
                    Messages
                  </p>
                </div>
              </ProgressLink>

              {/* Bloc Mes Courses */}
              <ProgressLink href="/driver/dashboard/courses">
                <div className={`${blockClass} auth-border`}>
                  <div className="flex-1 flex items-center justify-center">
                    <Icon icon="streamline-kameleon-color:map" width="58" height="58" />
                  </div>
                  <p className="absolute bottom-2 text-[10px] sm:text-sm md:text-base text-auth-color-placeholder font-medium">
                    Mes Courses
                  </p>
                </div>
              </ProgressLink>
            </div>

            {/* Deuxième ligne */}
            <div className="w-full p-5 sm:p-0 flex justify-between items-center mb-5">
              {/* Bloc Scanner */}
              <ProgressLink href="/driver/dashboard/scan">
                <div className={`${blockClass} auth-border`}>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#C8E6FF] rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconoir:scan-qr-code"
                        width="36"
                        height="36"
                        className="text-pink-600"
                      />
                    </div>
                  </div>
                  <p className="absolute bottom-2 text-[10px] sm:text-sm md:text-base text-auth-color-placeholder font-medium">
                    Scanner Qr Code
                  </p>
                </div>
              </ProgressLink>

              {/* Bloc Notification */}
              <ProgressLink href="/driver/dashboard/notifications">
                <div className={`${blockClass} auth-border`}>
                  <div className="flex-1 flex items-center justify-center">
                    <Icon
                      icon="streamline-sharp-color:bell-notification-flat"
                      width="58"
                      height="58"
                    />
                    <div className="w-5 h-5 absolute z-20 bg-red-600 ml-14 mb-14 rounded-full text-white flex justify-center items-center">
                      3
                    </div>
                  </div>
                  <p className="absolute bottom-2 text-[10px] sm:text-sm md:text-base text-auth-color-placeholder font-medium">
                    Notification
                  </p>
                </div>
              </ProgressLink>

              {/* Bloc Trajet en cours */}
              <ProgressLink href="/driver/dashboard/rides">
                <div className={`${blockClass} auth-border`}>
                  <div className="flex-1 flex items-center justify-center">
                    <Icon icon="icon-park:gps" width="56" height="56" />
                  </div>
                  <p className="absolute bottom-2 text-[10px] sm:text-sm md:text-base text-auth-color-placeholder font-medium">
                    Trajet en cours
                  </p>
                </div>
              </ProgressLink>

              {/* Bloc Profil */}
              <ProgressLink href="/driver/dashboard/profile">
                <div className={`${blockClass} auth-border`}>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#9EDD28] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:user" width="36" height="36" className="text-white" />
                    </div>
                  </div>
                  <p className="absolute bottom-2 text-[10px] sm:text-sm md:text-base text-auth-color-placeholder font-medium">
                    Profil
                  </p>
                </div>
              </ProgressLink>
            </div>

            {/* Troisième ligne */}
            <div className="w-full p-5 sm:p-0 flex justify-between items-center">
              {/* Bloc Parametre */}
              <ProgressLink href="/driver/dashboard/settings">
                <div className={`${blockClass} auth-border`}>
                  <div className="flex-1 flex items-center justify-center">
                    <Icon icon="uil:setting" width="58" height="58" className="text-pink-500" />
                  </div>
                  <p className="absolute bottom-2 text-[10px] sm:text-sm md:text-base text-auth-color-placeholder font-medium">
                    Parametre
                  </p>
                </div>
              </ProgressLink>

              {/* Bloc Assistance */}
              <ProgressLink href="/driver/dashboard/support">
                <div className={`${blockClass} auth-border`}>
                  <div className="flex-1 flex items-center justify-center">
                    <Icon icon="flat-color-icons:online-support" width="58" height="58" />
                  </div>
                  <p className="absolute bottom-2 text-[10px] sm:text-sm md:text-base text-auth-color-placeholder font-medium">
                    Assistance
                  </p>
                </div>
              </ProgressLink>

              {/* Bloc Statistiques */}
              <ProgressLink href="/driver/dashboard/stats">
                <div className={`${blockClass} auth-border`}>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#E8B4F9] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:chart-line" width="36" height="36" className="text-purple-700" />
                    </div>
                  </div>
                  <p className="absolute bottom-2 text-[10px] sm:text-sm md:text-base text-auth-color-placeholder font-medium">
                    Statistiques
                  </p>
                </div>
              </ProgressLink>

              {/* Bloc vide */}
              <div className={blockClass}></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
