'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RadioGroup from '@/components/ui/radiogroup';
export const Gps = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-20 flex sm:h-23 ">
        <Image
          src={'/logo.svg'}
          alt="photo"
          width={100}
          height={100}
          priority={true}
          blurDataURL=""
          className="h-15 w-auto mt-2 ml-6 sm:h-20"
        />
      </div>

      <div className="w-full h-26 text-center sm:h-50 md:px-10 md:mt-2">
        <h2 className="text-xl font-semibold text-[#822072] mb-2 sm:mb-10 sm:text-xl md:text-2xl">
          Où êtes-vous ?
        </h2>
        <p className="text-[#B15C8B] leading-relaxed sm:mb-8">
          Pour vous proposer les véhicules les plus proches, autorisez l'accès <br />à votre
          position. C'est rapide et sécurisé.
        </p>
      </div>
      <div className="w-full h-15 space-x-25 flex items-center justify-center">
        <RadioGroup
          id="active"
          name="drone2"
          label="Plus tard"
          className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer focus-visible:outline-none peer border-pink-500 checked:border-pink-500 checked:bg-pink-200 checked:hover:border-pink-500 focus:outline-none checked:focus:border-pink-500 checked:focus:bg-pink-200 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
        />
        <RadioGroup
          id="active"
          name="drone2"
          label="Active"
          className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer focus-visible:outline-none peer border-pink-500 checked:border-pink-500 checked:bg-pink-200 checked:hover:border-pink-500 focus:outline-none checked:focus:border-pink-500 checked:focus:bg-pink-200 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
        />
      </div>
    </>
  );
};

export default Gps;
