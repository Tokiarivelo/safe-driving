'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useMeQuery } from '@/graphql/generated/graphql';
import ReactFlagsSelect from 'react-flags-select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
function dashboard() {
  const [selected, setSelected] = useState('');
  const [position, setPosition] = React.useState<string>('bottom');
  const mika = () => {};
  const {
    data,
    error,
    loading: queryLoading,
  } = useMeQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
  function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  }
  const bgColor = stringToColor(`${data?.me?.firstName}${data?.me?.lastName}`);
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-13 flex items-center">
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger>
              <div className="w-12 h-12 rounded-full flex justify-center items-center ml-5 mt-5 border-2 border-l-[#c02aa8] border-b-[#c02aa8] border-r-[#fe7f78] border-t-[#ee6984] cursor-pointer">
                <div
                  className="w-10 h-10 rounded-full flex justify-center items-center text-white"
                  style={{ backgroundColor: bgColor }}
                >
                  {data?.me?.firstName?.[0]}
                  {data?.me?.lastName?.[0]}
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetDescription>
                  <div className="w-full h-15 flex">
                    <div className="w-[23%] h-15 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full flex justify-center items-center border-2 border-l-[#c02aa8] border-b-[#c02aa8] border-r-[#fe7f78] border-t-[#ee6984] cursor-pointer">
                        <div
                          className="w-10 h-10 rounded-full flex justify-center items-center text-white"
                          style={{ backgroundColor: bgColor }}
                        >
                          {data?.me?.firstName?.[0]}
                          {data?.me?.lastName?.[0]}
                        </div>
                      </div>
                    </div>
                    <div className="w-[77%] h-14">
                      <div className="w-full h-7 font-semibold flex items-center pl-1 text-lg">
                        mickael
                      </div>
                      <div className="w-full h-8 text-[9px] pl-1">
                        Passionne de la route depuis 10ans,votre <br />
                        confort et votre securite sont ma priorite.
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-10 mt-10 flex">
                    <div className="w-10 h-10 flex justify-center items-center">
                      <Icon icon="uil:setting" width="24" height="24" />
                    </div>
                    <div className="w-40 h-10 flex items-center ">Account Settings</div>
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
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden sm:block">
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
                <div className="w-40 h-10 flex items-center ">Account Settings</div>
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
      </div>
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
            blurDataURL=""
            className="w-20 h-23"
          />
        </div>
        <div className="w-full mt-5 h-[549px] flex justify-center">
          <div className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px]">
            <div className="w-full p-5 sm:p-0 h-[100px] flex justify-between items-center sm:h-[150px] sm:w-[600px] md:w-[700px] md:h-[183px] lg:w-[800px]">
              <Link href="/user/form/name/bjr">
                <div className="w-20 h-20 sm:border-2 sm:border-l-[#c02aa8] sm:border-b-[#c02aa8] sm:border-r-[#fe7f78] sm:border-t-[#ee6984] overflow-hidden rounded-md sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 mt-12 w-20 text-center text-auth-color-placeholder text-[12px] absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-31  sm:text-[16px] flex justify-center">
                    Rechercher
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <div className="w-13 h-13 bg-[#D4D995] rounded-full flex items-center justify-center">
                      <Icon
                        icon="material-symbols:search-rounded"
                        width="30"
                        height="30"
                        className="text-pink-500"
                      />
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/user/dashboard/messages">
                <div className="w-20 h-20 auth-border rounded-md overflow-hidden sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 w-20 text-center mt-12 text-auth-color-placeholder text-[12px] absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-31 text-center  sm:text-[16px] flex justify-center">
                    Messages
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <Icon icon="streamline-ultimate-color:messages-logo" width="50" height="50" />
                    <div className="w-5 h-5 absolute z-20 bg-red-600 ml-10 mb-10 rounded-full text-white flex justify-center items-center">
                      9
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/user/form/name/bjr">
                <div className="w-20 h-20 auth-border overflow-hidden rounded-md sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 mt-12 w-20 text-center text-[12px] text-auth-color-placeholder absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-31  sm:text-[16px] flex justify-center">
                    Mes Courses
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <Icon icon="streamline-kameleon-color:map" width="50" height="50" />
                  </div>
                </div>
              </Link>
              <Link href="/user/form/name/bjr">
                <div className="w-20 h-20 auth-border overflow-hidden rounded-md sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 mt-12 w-20 text-center text-[12px] text-auth-color-placeholder absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-31  sm:text-[16px] flex justify-center">
                    Scanner Qr Code
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <div className="w-13 h-13 bg-[#C8E6FF] rounded-full flex items-center justify-center">
                      <Icon
                        icon="iconoir:scan-qr-code"
                        width="30"
                        height="30"
                        className="text-pink-600"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full  p-5 sm:p-0 h-[100px] flex justify-between items-center sm:h-[150px] sm:w-[600px] md:w-[700px] md:h-[183px] lg:w-[800px]">
              <Link href="/user/form/name/bjr">
                <div className=" w-20 h-20 auth-border overflow-hidden rounded-md sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 mt-12 w-20 text-center text-[12px] text-auth-color-placeholder absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-31  sm:text-[16px] flex justify-center">
                    Notification
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <Icon
                      icon="streamline-sharp-color:bell-notification-flat"
                      width="50"
                      height="50"
                    />
                    <div className="w-5 h-5 absolute z-20 bg-red-600 ml-10 mb-10 rounded-full text-white flex justify-center items-center">
                      3
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/user/form/name/bjr">
                <div className=" w-20 h-20 auth-border overflow-hidden rounded-md sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 mt-12 w-20 text-[12px] text-center text-auth-color-placeholder absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-31  sm:text-[16px] flex justify-center">
                    Trajet en cours
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <Icon icon="icon-park:gps" width="48" height="48" />
                  </div>
                </div>
              </Link>
              <Link href="/user/form/name/bjr">
                <div className=" w-20 h-20 auth-border overflow-hidden rounded-md sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 mt-12 w-20 text-center text-[12px] text-auth-color-placeholder absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-31  sm:text-[16px] flex justify-center">
                    Profil
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <div className="w-13 h-13 bg-[#9EDD28] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:user" width="30" height="30" className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/user/form/name/bjr">
                <div className=" w-20 h-20 auth-border overflow-hidden rounded-md sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 mt-12 w-20 text-center text-[12px] text-auth-color-placeholder absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-  sm:text-[16px] flex justify-center">
                    Offres Promations
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <Icon icon="lsicon:badge-promotion-filled" width="50" height="50" color="red" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full h-[100px] p-5 sm:p-0 flex justify-between items-center sm:h-[150px] sm:w-[600px] md:w-[700px] md:h-[183px] lg:w-[800px]">
              <Link href="/user/form/name/bjr">
                <div className=" w-20 h-20 auth-border overflow-hidden rounded-md sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 mt-12 w-20 text-center text-[12px] text-auth-color-placeholder absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-31  sm:text-[16px] flex justify-center">
                    Parametre
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <Icon icon="uil:setting" width="50" height="50" className="text-pink-500" />
                  </div>
                </div>
              </Link>
              <Link href="/user/form/name/bjr">
                <div className=" w-20 h-20 auth-border overflow-hidden rounded-md sm:w-32 sm:h-32 md:w-40 md:h-40">
                  <div className="md:w-39 h-10 mt-12 w-20 text-center text-[12px] text-auth-color-placeholder absolute z-10 md:mt-29 sm:mt-23 sm:h-7 sm:w-31  sm:text-[16px] flex justify-center">
                    Assistance
                  </div>
                  <div className="w-full h-13 md:h-40 flex items-center justify-center sm:h-32">
                    <Icon icon="flat-color-icons:online-support" width="50" height="50" />
                  </div>
                </div>
              </Link>
              <div className=" w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40"></div>
              <div className=" w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default dashboard;
