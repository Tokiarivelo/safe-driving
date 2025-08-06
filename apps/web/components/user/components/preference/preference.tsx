'use client';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import styles from '../common/utilisateur.module.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export const Notification = () => {
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
          <div className="w-full h-26 text-center sm:h-50 md:px-8 md:mt-2">
            <h2 className="text-xl font-semibold text-[#822072] mb-2  sm:mb-10 sm:text-xl md:text-2xl">
              Restez informé
            </h2>
            <p className="text-[#B15C8B] leading-relaxed sm:mb-8">
              Choisissez de recevoir des alertes en temps réel sur l'arrivée de votre <br />{' '}
              chauffeur et l'état de votre trajet.
            </p>
          </div>
          <div className="w-full h-15 space-x-25 flex items-center justify-center">
            <div className="relative flex items-center">
              <input
                className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer focus-visible:outline-none peer border-pink-500 checked:border-pink-500 checked:bg-pink-200 checked:hover:border-pink-500 focus:outline-none checked:focus:border-pink-500 checked:focus:bg-pink-200 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                type="radio"
                value="dewey2"
                id="dewey2"
                name="drone2"
              />
              <label
                className="pl-2 cursor-pointer text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-pink-400"
                htmlFor="dewey2"
              >
                <p>Plus tard</p>
              </label>
              <svg
                className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-pink-500 peer-checked:scale-100 peer-checked:opacity-100 peer-hover:fill-pink-500 peer-focus:fill-pink-500 peer-disabled:cursor-not-allowed"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="title-02 description-02"
                role="graphics-symbol"
              >
                <title id="title-02">Circle Shape</title>
                <desc id="description-02">
                  Circle shape to indicate whether the radio input is checked or not.
                </desc>
                <circle cx="8" cy="8" r="4" />
              </svg>
            </div>
            <div className="relative flex items-center">
              <input
                className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer focus-visible:outline-none peer border-pink-500 checked:border-pink-500 checked:bg-pink-200 checked:hover:border-pink-500 focus:outline-none checked:focus:border-pink-500 checked:focus:bg-pink-200 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                type="radio"
                value="dewey2"
                id="dewey2"
                name="drone2"
              />
              <label
                className="pl-2 cursor-pointer text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-pink-400"
                htmlFor="dewey2"
              >
                <p>Actuve</p>
              </label>
              <svg
                className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-pink-500 peer-checked:scale-100 peer-checked:opacity-100 peer-hover:fill-pink-500 peer-focus:fill-pink-500 peer-disabled:cursor-not-allowed"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="title-02 description-02"
                role="graphics-symbol"
              >
                <title id="title-02">Circle Shape</title>
                <desc id="description-02">
                  Circle shape to indicate whether the radio input is checked or not.
                </desc>
                <circle cx="8" cy="8" r="4" />
              </svg>
            </div>
          </div>
    </>
  );
};

export default Notification;
