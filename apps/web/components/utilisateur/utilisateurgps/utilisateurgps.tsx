'use client';
import Image from 'next/image';
export const Gps = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C02AA8] from-0% to-[#C936A1] to-15% to-[#EE6984] to-60% to-[#FE7F78] to-85% w-full flex items-center justify-center">
      <div className=" bg-white rounded-sm shadow-[0_0_9px_rgba(0,0,0,0.5)] overflow-hidden max-w-4xl h-[550px] w-full flex justify-between">
        <div className="w-[62%] rounded-tl-sm rounded-bl-sm bg-white h-[550px] ">
          <div className='w-full h-23 flex'>
            <Image
              src={'/logo.svg'}
              alt="photo"
              width={100}
              height={100}
              priority={true}
              blurDataURL=""
              className="h-20 w-auto mt-2 ml-6"
            />
          </div>
          <div className='w-full h-50 text-center'>
               <h1 className="text-2xl font-semibold text-[#822072] mb-10">
                Bienvenue chez Safe Driving !
              </h1>
              <p className="text-[#B15C8B] leading-relaxed">
                Merci d'avoir rejoint notre communauté ! Laissez-nous vous guider<br />
                pour personnaliser votre expérience.
              </p>
          </div>
          <div className='w-full h-15 space-x-20 flex items-center justify-center'>
              <button 
                className="px-12 py-2 rounded-md border-1 text-pink-600 border-pink-600 transition-all duration-200"
              >
                Plus tard
              </button>
              <button className="px-12 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
                Démarrer
              </button>
          </div>
        </div>
        <div className="w-[38%] min-h-[550px] bg-gradient-to-br from-[#EA3A7E] from-14%  to-[#FF7746]  to-64%  rounded-tr-md rounded-br-md "></div>
      </div>
    </div>
  );
};

export default Gps;
