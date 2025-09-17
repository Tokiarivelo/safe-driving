'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useMeQuery } from '@/graphql/generated/graphql';
import ReactFlagsSelect from 'react-flags-select';
import * as Popover from '@radix-ui/react-popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Définition des statuts avec clé, label et couleur
const statuses = [
  { key: "libre", label: "Disponible", color: "bg-green-400" },
  { key: "occupe", label: "Occupé", color: "bg-yellow-400" },
  { key: "pause", label: "En pause", color: "bg-blue-400" },
  { key: "non_dispo", label: "Non disponible", color: "bg-red-500" },
];

function Dashboard() {
  const [selected, setSelected] = useState("");
  const [position, setPosition] = React.useState<string>('bottom');
  const {
    data,
    error,
    loading: queryLoading,
  } = useMeQuery({
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
                onSelect={(code) => setSelected(code)}
                countries={["US", "GB", "FR", "DE", "IT", "NG"]}
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
            src={"/logo.svg"}
            alt="photo"
            width={100}
            height={100}
            priority={true}
            className="w-20 h-23"
          />
        </div>

        {/* Dashboard blocks */}
        <div className="w-full mt-5 h-[700px] flex justify-center">
          <div className="w-full sm:w-[700px] md:w-[800px] lg:w-[900px]">

            {/* Première ligne */}
            <div className="w-full p-5 sm:p-0 h-[120px] flex justify-between items-center sm:h-[180px] sm:w-[700px] md:w-[800px] md:h-[220px] lg:w-[900px] mb-8">
              
              {/* Bloc Status avec Popover */}
              <Popover.Root open={open} onOpenChange={setOpen}>
                <Popover.Trigger asChild>
                  <div className="w-28 h-28 auth-border overflow-hidden rounded-md sm:w-40 sm:h-40 md:w-48 md:h-48 flex flex-col items-center justify-center cursor-pointer border-2 border-pink-300">
                    {/* Statut sélectionné */}
                    <div className="flex flex-col items-center justify-center h-full">
                      <div
                        className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${
                          statuses.find((s) => s.key === status)?.color
                        }`}
                      />
                      <p className="mt-2 text-[10px] sm:text-sm text-auth-color-placeholder font-medium">
                        {statuses.find((s) => s.key === status)?.label}
                      </p>
                    </div>
                  </div>
                </Popover.Trigger>
                
                <Popover.Content 
                  className="w-auto p-0 bg-transparent border-none shadow-none outline-none"
                  align="start"
                  side="bottom"
                  sideOffset={-120}
                  alignOffset={0}
                >
                  {/* Options de statut - alignement flex comme dans l'image */}
                  <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-10 max-w-[240px] sm:max-w-[336px] md:max-w-[416px]">
                    {statuses.map((s, index) => (
                      <div
                        key={s.key}
                        className={`w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                          status === s.key 
                            ? 'bg-pink-50 border-2 border-pink-400' 
                            : 'bg-white border-2 border-gray-300 hover:border-pink-400'
                        }`}
                        onClick={() => {
                          setStatus(s.key);
                          setOpen(false);
                        }}
                      >
                        <div
                          className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${s.color} mb-2`}
                        />
                        <p className="text-[10px] sm:text-sm text-center font-medium text-gray-700">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Popover.Content>
              </Popover.Root>

              {/* Bloc Rechercher */}
              <Link href="/user/form/name/bjr">
                <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 
                                overflow-hidden rounded-md 
                                border-2 border-l-[#c02aa8] border-b-[#c02aa8] 
                                border-r-[#fe7f78] border-t-[#ee6984]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#D4D995] rounded-full flex items-center justify-center">
                      <Icon
                        icon="material-symbols:search-rounded"
                        width="32"
                        height="32"
                        className="text-pink-500"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-2 inset-x-0 text-center 
                                  text-auth-color-placeholder 
                                  text-[10px] sm:text-sm md:text-base font-medium">
                    Rechercher des Courses
                  </div>
                </div>
              </Link>

              {/* Bloc Messages */}
              <Link href="/user/form/name/bjr">
                <div className="w-28 h-28 auth-border rounded-md overflow-hidden sm:w-40 sm:h-40 md:w-48 md:h-48">
                  <div className="md:w-47 h-10 w-28 mt-12 text-auth-color-placeholder text-[12px] absolute z-10 md:mt-36 sm:mt-28 sm:h-7 sm:w-39 text-center sm:text-[16px] flex justify-center">
                    Messages
                  </div>
                  <div className="w-full h-16 md:h-48 flex items-center justify-center sm:h-40">
                    <Icon icon="streamline-ultimate-color:messages-logo" width="58" height="58" />
                    <div className="w-5 h-5 absolute z-20 bg-red-600 ml-14 mb-14 rounded-full text-white flex justify-center items-center">
                      9
                    </div>
                  </div>
                </div>
              </Link>

              {/* Bloc Mes Courses */}
              <Link href="/user/form/name/bjr">
                <div className="w-28 h-28 auth-border overflow-hidden rounded-md sm:w-40 sm:h-40 md:w-48 md:h-48">
                  <div className="md:w-47 h-10 mt-12 w-28 text-[12px] text-auth-color-placeholder absolute z-10 md:mt-36 sm:mt-28 sm:h-7 sm:w-39 sm:text-[16px] flex justify-center">
                    Mes Courses
                  </div>
                  <div className="w-full h-16 md:h-48 flex items-center justify-center sm:h-40">
                    <Icon icon="streamline-kameleon-color:map" width="58" height="58" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Deuxième ligne */}
            <div className="w-full p-5 sm:p-0 h-[120px] flex justify-between items-center sm:h-[180px] sm:w-[700px] md:w-[800px] md:h-[220px] lg:w-[900px] mb-8">
              
              {/* Bloc Scanner */}
              <Link href="/register/scan">
                <div className="w-28 h-28 auth-border overflow-hidden rounded-md sm:w-40 sm:h-40 md:w-48 md:h-48">
                  <div className="md:w-47 h-10 mt-12 w-28 text-[12px] text-auth-color-placeholder absolute z-10 md:mt-36 sm:mt-28 sm:h-7 sm:w-39 sm:text-[16px] flex justify-center">
                    Scanner Qr Code
                  </div>
                  <div className="w-full h-16 md:h-48 flex items-center justify-center sm:h-40">
                    <div className="w-16 h-16 bg-[#C8E6FF] rounded-full flex items-center justify-center">
                      <Icon icon="iconoir:scan-qr-code" width="36" height="36" className="text-pink-600" />
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/user/form/name/bjr">
                <div className="w-28 h-28 auth-border overflow-hidden rounded-md sm:w-40 sm:h-40 md:w-48 md:h-48">
                  <div className="md:w-47 h-10 mt-12 w-28 text-[12px] text-auth-color-placeholder absolute z-10 md:mt-36 sm:mt-28 sm:h-7 sm:w-39 sm:text-[16px] flex justify-center">
                    Notification
                  </div>
                  <div className="w-full h-16 md:h-48 flex items-center justify-center sm:h-40">
                    <Icon icon="streamline-sharp-color:bell-notification-flat" width="58" height="58" />
                    <div className="w-5 h-5 absolute z-20 bg-red-600 ml-14 mb-14 rounded-full text-white flex justify-center items-center">
                      3
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/user/form/name/bjr">
                <div className="w-28 h-28 auth-border overflow-hidden rounded-md sm:w-40 sm:h-40 md:w-48 md:h-48">
                  <div className="md:w-47 h-10 mt-12 w-28 text-[12px] text-auth-color-placeholder absolute z-10 md:mt-36 sm:mt-28 sm:h-7 sm:w-39 sm:text-[16px] flex justify-center">
                    Trajet en cours
                  </div>
                  <div className="w-full h-16 md:h-48 flex items-center justify-center sm:h-40">
                    <Icon icon="icon-park:gps" width="56" height="56" />
                  </div>
                </div>
              </Link>
              <Link href="/recapitulatif">
                <div className="w-28 h-28 auth-border overflow-hidden rounded-md sm:w-40 sm:h-40 md:w-48 md:h-48">
                  <div className="md:w-47 h-10 mt-12 w-28 text-[12px] text-auth-color-placeholder absolute z-10 md:mt-36 sm:mt-28 sm:h-7 sm:w-39 sm:text-[16px] flex justify-center">
                    Profil
                  </div>
                  <div className="w-full h-16 md:h-48 flex items-center justify-center sm:h-40">
                    <div className="w-16 h-16 bg-[#9EDD28] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:user" width="36" height="36" className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Troisième ligne */}
            <div className="w-full h-[120px] p-5 sm:p-0 flex justify-between items-center sm:h-[180px] sm:w-[700px] md:w-[800px] md:h-[220px] lg:w-[900px]">
              <Link href="/user/form/name/bjr">
                <div className="w-28 h-28 auth-border overflow-hidden rounded-md sm:w-40 sm:h-40 md:w-48 md:h-48">
                  <div className="md:w-47 h-10 mt-12 w-28 text-[12px] text-auth-color-placeholder absolute z-10 md:mt-36 sm:mt-28 sm:h-7 sm:w-39 sm:text-[16px] flex justify-center">
                    Parametre
                  </div>
                  <div className="w-full h-16 md:h-48 flex items-center justify-center sm:h-40">
                    <Icon icon="uil:setting" width="58" height="58" className="text-pink-500" />
                  </div>
                </div>
              </Link>
              <Link href="/user/form/name/bjr">
                <div className="w-28 h-28 auth-border overflow-hidden rounded-md sm:w-40 sm:h-40 md:w-48 md:h-48">
                  <div className="md:w-47 h-10 mt-12 w-28 text-[12px] text-auth-color-placeholder absolute z-10 md:mt-36 sm:mt-28 sm:h-7 sm:w-39 sm:text-[16px] flex justify-center">
                    Assistance
                  </div>
                  <div className="w-full h-16 md:h-48 flex items-center justify-center sm:h-40">
                    <Icon icon="flat-color-icons:online-support" width="58" height="58" />
                  </div>
                </div>
              </Link>
              <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48"></div>
              <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;