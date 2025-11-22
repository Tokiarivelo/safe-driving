'use client';

import React from 'react';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useButton } from './sidebareAction';
import { useMeQuery } from '@/graphql/generated/graphql';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
function LeftSidebarMenu() {
  const {
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
  } = useButton();
  const { data } = useMeQuery({
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
    <div className="w-16 h-auto z-100 ml-5 mt-3">
      <div className="w-16 h-16 mb-5 flex justify-center items-center rounded-full border-2 border-pink-600">
        <div
          className="text-white flex justify-center items-center w-14 h-14 rounded-full"
          style={{ backgroundColor: bgColor }}
        >
          {data?.me?.firstName?.[0]}
          {data?.me?.lastName?.[0]}
        </div>
      </div>
      <div className="bg-white w-16 h-auto space-y-4 rounded-full shadow-auth-card">
        <div>
          <Link href="/driver/dashboard">
            <div
              className={`bg-white w-16 h-16 rounded-full border flex justify-center items-center ${datahome ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => datahome && home()}
                >
                  <Icon
                    icon="radix-icons:home"
                    width="30"
                    height="30"
                    className="text-[#FF7F41] cursor-pointer hover:scale-120 transition-transform duration-200"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>
        <div>
          <Link href="">
            <div
              className={`bg-white w-16 h-16 rounded-full border-1 flex justify-center items-center ${datarechercher ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => datarechercher && recherche()}
                >
                  <Icon
                    icon="material-symbols:search-rounded"
                    width="30"
                    height="30"
                    className="cursor-pointer hover:scale-120 transition-transform duration-200"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Rechercher</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/driver/dashboard/messages">
            <div
              className={`bg-white w-16 h-16 rounded-full border-1 flex justify-center items-center ${datamessages ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => datamessages && messages()}
                >
                  <Icon
                    icon="streamline-ultimate-color:messages-logo"
                    width="30"
                    height="30"
                    className="cursor-pointer hover:scale-120 transition-transform duration-200"
                  />
                  <div className="w-3 h-3 absolute z-20 bg-red-600 ml-6 mb-6 rounded-full text-white flex justify-center items-center text-xs">
                    9
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Messages</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>
        <div>
          <Link href="">
            <div
              className={`bg-white w-16 h-16 rounded-full border-1 flex justify-center items-center ${datacourses ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => datacourses && courses()}
                >
                  <Icon
                    icon="streamline-kameleon-color:map"
                    width="30"
                    height="30"
                    className="cursor-pointer hover:scale-120 transition-transform duration-200"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Mes Courses</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/driver/dashboard/scan">
            <div
              className={`bg-white w-16 h-16 rounded-full border-1 flex justify-center items-center ${datascanner ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => datascanner && scanner()}
                >
                  <div className="w-8 h-8 bg-[#C8E6FF] rounded-full flex items-center justify-center">
                    <Icon
                      icon="iconoir:scan-qr-code"
                      width="20"
                      height="20"
                      className="text-pink-600 cursor-pointer hover:scale-120 transition-transform duration-200"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Scanner Qr Code</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>
        <div>
          <Link href="">
            <div
              className={`bg-white w-16 h-16 rounded-full border-1 flex justify-center items-center ${datanotifications ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => datanotifications && notifications()}
                >
                  <Icon
                    icon="streamline-sharp-color:bell-notification-flat"
                    width="30"
                    height="30"
                    className="cursor-pointer hover:scale-120 transition-transform duration-200"
                  />
                  <div className="w-3 h-3 absolute z-20 bg-red-600 ml-6 mb-6 rounded-full text-white flex justify-center items-center text-xs">
                    3
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Notification</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>
        <div>
          <Link href="">
            <div
              className={`bg-white w-16 h-16 rounded-full border-1 flex justify-center items-center ${datatrajet ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => datatrajet && trajet()}
                >
                  <Icon
                    icon="icon-park:gps"
                    width="30"
                    height="30"
                    className="cursor-pointer hover:scale-120 transition-transform duration-200"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Trajet en Cours</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/driver/dashboard/profile">
            <div
              className={`bg-white w-16 h-16 rounded-full border-1 flex justify-center items-center ${dataprofil ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => dataprofil && profil()}
                >
                  <div className="w-8 h-8 bg-[#9EDD28] rounded-full flex items-center justify-center">
                    <Icon
                      icon="mdi:user"
                      width="20"
                      height="20"
                      className="text-white cursor-pointer hover:scale-120 transition-transform duration-200"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Profil</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>

        <div>
          <Link href="">
            <div
              className={`bg-white w-16 h-16 rounded-full border-1 flex justify-center items-center ${dataparametre ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => dataparametre && parametre()}
                >
                  <Icon
                    icon="uil:setting"
                    width="30"
                    height="30"
                    className="text-pink-500 cursor-pointer hover:scale-120 transition-transform duration-200"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Parametre</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>
        <div>
          <Link href="">
            <div
              className={`bg-white w-16 h-16 rounded-full border-1 flex justify-center items-center ${dataassistance ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
            >
              <Tooltip>
                <TooltipTrigger
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => dataassistance && assistance()}
                >
                  <Icon
                    icon="flat-color-icons:online-support"
                    width="30"
                    height="30"
                    className="cursor-pointer hover:scale-120 transition-transform duration-200"
                  />
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  <p>Assistance</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebarMenu;
