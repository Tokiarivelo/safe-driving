'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
function toprole() {
  return (
    <>
      <div className="w-full h-60 sm:hidden">
        <div className="w-full h-[40%] flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, filter: 'brightness(50%)' }}
            animate={{ opacity: 1, filter: 'brightness(100%)' }}
            transition={{ duration: 2 }}
          >
            <Image
              src={'/user/logowhite.svg'}
              alt="photo"
              width={100}
              height={100}
              priority={true}
              blurDataURL=""
              className="w-full h-21"
            />
          </motion.div>
        </div>
        <div className="w-full h-[25%]">

     <div className="w-[18%] pt-2 pr-4">
            <div className="relative flex justify-center mb-8">
              <svg className="w-13 h-13 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#e5e7eb"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  id="progressRing"
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#60B74F"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={282.74}
                  strokeDashoffset={235.62}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span id="progressText" className="text-sm font-bold text-white">
                  1/6
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className=" hidden sm:max-w-4xl sm:w-full sm:h-20 sm:top-0 sm:flex sm:justify-center sm:space-x-1">
        <div>
          <div className="bg-black w-9 border-3 border-white h-9 rounded-full flex items-center justify-center text-auth-color-bg-white">
            1
          </div>
          <div>
            <h3 className="text-auth-color-bg-white">Role</h3>
          </div>
        </div>
        <div className=" w-45 h-10 flex mt-4 justify-center">
          <hr className=" bg-auth-color-bg-white w-full h-[2px]" />
        </div>
        <div>
          <div className="bg-[#C3BABA] w-9 border-3 border-white h-9 rounded-full text-center text-xl font-semibold text-auth-color-bg-white">
            2
          </div>
          <div>
            <h3 className="text-auth-color-bg-white">information</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default toprole;
