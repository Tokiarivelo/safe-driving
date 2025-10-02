'use client';

import React from 'react';

import { Icon } from '@iconify/react';
import { usebutton } from './sidebareAction';
import { useMeQuery } from '@/graphql/generated/graphql';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
function sidebare() {
  const {
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
  } = usebutton();
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
    <div className="w-12 h-155 fixed z-100 ml-5 mt-3">
      <div className="w-12 h-12 mb-5 flex justify-center items-center rounded-full border-2 border-pink-600">
        <div
          className="text-white flex justify-center items-center w-10 h-10 rounded-full"
          style={{ backgroundColor: bgColor }}
        >
          {data?.me?.firstName?.[0]}
          {data?.me?.lastName?.[0]}
        </div>
      </div>
      <div className="bg-white w-12 h-150 space-y-2 rounded-[23px] shadow-auth-card">
        <div>
        <Link href="/user/dashboard/dashboard">
          <div
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${datahome ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full cursor-pointer"
                onClick={() => datahome && home()}
              >
                <Icon icon="radix-icons:home" width="30" height="30" className="text-[#FF7F41] cursor-pointer hover:scale-120 transition-transform duration-200" />
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Link>
        </div>
        <div>
        <Link href="/user/dashboard/rechercher">
          <div
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${datarechercher ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full  cursor-pointer"
                onClick={() => datarechercher && recherche()}
              >
                <Icon
                  icon="material-symbols:search-rounded"
                  width="30"
                  height="30"
                  className="text-[#C82BA0] cursor-pointer hover:scale-120 transition-transform duration-200"
                />
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>Rechercher un transport</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Link>
        </div>
        <div>
        <Link href="/user/dashboard/messages">
          <div
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${datamessages ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full cursor-pointer"
                onClick={() => datamessages && messages()}
              >
                <Icon icon="streamline-ultimate-color:messages-logo" width="30" height="30" className='cursor-pointer hover:scale-120 transition-transform duration-200'/>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>Messages</p>
              </TooltipContent>
            </Tooltip>
            <div className="w-4 h-4 text-[12px] absolute z-20 bg-red-600 ml-7 mb-7 rounded-full text-white flex justify-center items-center">
              9
            </div>
          </div>
        </Link>
        </div>
        <div>
        <Link href="">
          <div
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${datacourses ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full  cursor-pointer"
                onClick={() => datacourses && courses()}
              >
                <Icon icon="streamline-kameleon-color:map" width="30" height="30" className='cursor-pointer hover:scale-120 transition-transform duration-200'/>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>Mes Courses</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Link>
        </div>
        <div>
        <Link href="">
          <div
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${datacourses ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full  cursor-pointer"
                onClick={() => datascanner && scanner()}
              >
                <Icon
                  icon="iconoir:scan-qr-code"
                  width="30"
                  height="30"
                  className="text-[#FF7F41] cursor-pointer hover:scale-120 transition-transform duration-200"
                />
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>Scanner Qr code</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Link>
        </div>
        <div>
        <Link href="">
          <div
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${datanotifications ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full  cursor-pointer"
                onClick={() => datanotifications && notifications()}
              >
                <Icon icon="streamline-sharp-color:bell-notification-flat" width="30" height="30" className='cursor-pointer hover:scale-120 transition-transform duration-200'/>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>Notification</p>
              </TooltipContent>
            </Tooltip>
            <div className="w-4 h-4 absolute z-20 text-[12px] bg-red-600 ml-7 mb-7 rounded-full text-white flex justify-center items-center">
              3
            </div>
          </div>
        </Link>
        </div>
        <div>
        <Link href="">
          <div
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${datatrajet ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full cursor-pointer"
                onClick={() => datatrajet && trajet()}
              >
                <Icon icon="icon-park:gps" width="30" height="30" className='cursor-pointer hover:scale-120 transition-transform duration-200'/>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>Trajet en Cours</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Link>
        </div>
        <div>
        <Link href="">
          <div
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${datahome ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full  cursor-pointer"
                onClick={() => dataprofil && profil()}
              >
                <Icon icon="mdi:user" width="30" height="30" className="text-[#C82BA0] cursor-pointer hover:scale-120 transition-transform duration-200" />
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
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${dataoffre ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full cursor-pointer"
                onClick={() => dataoffre && offre()}
              >
                <Icon icon="lsicon:badge-promotion-filled" width="30" height="30" color="red" className='cursor-pointer hover:scale-120 transition-transform duration-200'/>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>Offre Promotions</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Link>
        </div>
        <div>
        <Link href="">
          <div
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${dataparametre ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full cursor-pointer"
                onClick={() => dataparametre && parametre()}
              >
                <Icon icon="uil:setting" width="30" height="30" className="text-[#C82BA0] cursor-pointer hover:scale-120 transition-transform duration-200" />
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
            className={`bg-white w-12 h-12 rounded-full border-1 flex justify-center items-center ${datahome ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
          >
            <Tooltip>
              <TooltipTrigger
                className="p-2 rounded-full  cursor-pointer"
                onClick={() => dataassistance && assistance()}
              >
                <Icon icon="flat-color-icons:online-support" width="30" height="30" className='cursor-pointer hover:scale-120 transition-transform duration-200'/>
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

export default sidebare;
