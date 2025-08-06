'use client';
import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { usebutton } from './formbuttonAction';
import styles from './formbutton.module.css';
function FormButton() {
  const {
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
  } = usebutton();
  return (
    <>
      <div className="space-y-2">
        <div>
          <Link
            onClick={butbjr}
            href="/user/form/bjr"
            className={`tag w-full flex items-center space-x-2 justify-start py-1 px-4 rounded-md cursor-pointer ${databjr ? 'bg-[#fbf7f722] shadow-sm' : ''} hover:scale-101 active:scale-95`}
          >
            <span className="text-3xl">👋</span>
            <span className="text-2xl font-medium text-auth-color-bg-white ">Bienvenue</span>
          </Link>
        </div>
        <div>
          <Link
            onClick={butgps}
            href="/user/form/gps"
            className={`tag w-full flex items-center space-x-2 text-auth-color-bg-white justify-start py-2 px-4 rounded-md ${datagps ? 'bg-[#fbf7f722]' : ''} cursor-pointer hover:scale-101 active:scale-95`}
          >
            <span className="flex items-center ">
              <div className="w-10 h-10 flex items-center justify-center">
                <Icon
                  icon="gis:position-o"
                  style={{
                    width: '35px',
                    height: '35px',
                    transition: 'none',
                    animation: 'none',
                    opacity: '1',
                  }}
                />
              </div>
            </span>
            <span className="text-2xl font-medium">GPS</span>
          </Link>
        </div>
        <div>
          <Link
            onClick={butnot}
            href="/user/form/notification"
            className={`tog w-full flex items-center space-x-2 text-auth-color-bg-white justify-start py-2 px-4 rounded-md ${datanot ? 'bg-[#fbf7f722]' : ''} cursor-pointer hover:scale-101 active:scale-95`}
          >
            <span className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <Icon
                  icon="iconamoon:notification-fill"
                  style={{
                    width: '35px',
                    height: '35px',
                    transition: 'none',
                    animation: 'none',
                    opacity: '1',
                  }}
                />
              </div>
            </span>
            <span className="text-2xl font-medium">Notifications</span>
          </Link>
        </div>
        <div>
          <Link
            onClick={butpref}
            href="/user/form/preference"
            className={`teg w-full flex items-center space-x-2 text-auth-color-bg-white justify-start py-2 px-4 rounded-md ${datapref ? 'bg-[#fbf7f722]' : ''} cursor-pointer hover:scale-101 active:scale-95`}
          >
            <span className="flex items-center ">
              <div className="w-10 h-10 flex items-center justify-center">
                <Icon
                  icon="material-symbols:settings-outline-rounded"
                  style={{
                    width: '35px',
                    height: '35px',
                    transition: 'none',
                    animation: 'none',
                    opacity: '1',
                  }}
                />
              </div>
            </span>
            <span className="text-2xl font-medium">Préférence</span>
          </Link>
        </div>
        <div>
          <Link
            onClick={butreca}
            href="/user/form/recapitulatif"
            className={`tig w-full flex items-center space-x-2 text-auth-color-bg-white  justify-start py-2 px-4 rounded-md ${datareca ? 'bg-[#fbf7f722]' : ''} cursor-pointer  hover:scale-101 active:scale-95`}
          >
            <span className="flex items-center ">
              <div className="w-10 h-10 flex items-center justify-center">
                <Icon
                  icon="gg:list"
                  style={{
                    width: '35px',
                    height: '35px',
                    transition: 'none',
                    animation: 'none',
                    opacity: '1',
                  }}
                />
              </div>
            </span>
            <span className="text-2xl font-medium">Récapitulatif</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default FormButton;
