'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
export const PickRole = () => {
  return (
    <>
      <div className="hidden sm:w-full sm:h-50 sm:flex sm:items-center sm:justify-center">
        <Image
          src={'/logo.svg'}
          alt="photo"
          width={100}
          height={100}
          priority={true}
          blurDataURL=""
          className="h-20 w-auto mt-5"
        />
      </div>
      <div className="w-full h-20  flex items-center justify-center text-center  text-xl font-sans">
        <h1 className="text-[#9a4a8c]">Vous êtes... ?</h1>
      </div>

      <div className=" w-ful gap-[100%] px-40  h-30 sm:h-50  flex items-center justify-center sm:gap-40">
        <Link
          href="/user/form/name/bjr"
          className="w-33 sm:w-50 border-2 border-pink-600 flex text-center justify-center rounded-lg p-[2px] hover:border-pink-700 hover:p-[2px] transition-all duration-200 transform hover:scale-105"
        >
          <div className=" text-center py-1 w-33 sm:w-50 bg-pink-600 sm:py-2 text-white font-medium rounded-lg hover:to-pink-700 ">
            Je suis utilisateur
          </div>
        </Link>

        <Link
          href="#"
          className=" w-33 sm:w-50 border-2 border-pink-600 flex text-center justify-center rounded-lg p-[2px] hover:border-pink-700 hover:p-[2px] transition-all duration-200 transform hover:scale-105"
        >
          <div className="w-33 text-center p-1 sm:w-50 bg-pink-600 sm:py-2 text-white font-medium rounded-lg hover:to-pink-700">
            Je suis chauffeur
          </div>
        </Link>
      </div>
    </>
  );
};

export default PickRole;
