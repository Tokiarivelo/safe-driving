'use client';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import styles from '../common/utilisateur.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
export const Bjr = () => {
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
          <div className="w-full h-28 text-center sm:h-50 md:px-10 md:mt-2">
            <h1 className="text-xl font-semibold text-auth-color-text-custom-magenta mb-2  sm:mb-10 sm:text-xl md:text-2xl">
              Bienvenue chez Safe Driving !
            </h1>
            <p className="text-auth-color-placeholder leading-relaxed">
              Merci d'avoir rejoint notre communauté ! Laissez-nous vous guider
              <br />
              pour personnaliser votre expérience.
            </p>
          </div>
          <div className="w-full h-15 space-x-4 flex items-center justify-center sm:space-x-22 sm:block sm:space-y-4 sm:px-2 md:px-15 lg:flex lg:space-x-25 lg:items-center lg:px-10 lg:align-top">
            <Button
              type="button"
              onClick={() => router.push('/user/form/gps')}
              className="px-12 py-[6px] rounded-md border-1 text-auth-color-button border-pink-600 transition-all duration-200 sm:py-[6px] sm:w-full lg:w-45 lg:mt-3 "
            >
              Plus tard
            </Button>
            <Button
              type="button"
              onClick={() => router.push('/user/form/gps')}
              className="px-12 py-[6px] bg-auth-color-button text-auth-color-bg-white rounded-md hover:bg-auth-hover sm:w-full lg:w-42"
            >
              Démarrer
            </Button>
          </div>
    </>
  );
};

export default Bjr;
