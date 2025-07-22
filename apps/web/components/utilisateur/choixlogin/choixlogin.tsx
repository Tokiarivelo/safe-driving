'use client';
import Image from 'next/image';
export const Choixlogin = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#C02AA8] from-0% to-[#C936A1] to-15% to-[#EE6984] to-60% to-[#FE7F78] to-85% w-full flex items-center justify-center">
      <div className=" bg-white rounded-sm shadow-[0_0_9px_rgba(0,0,0,0.5)] overflow-hidden  h-[550px] w-full-4xl w-full xxs:w-300 xs:w-450s sm:w-[620px] md:w-[750px] lg:max-w-4xl lg:w-full">
        <div className="w-full h-50  flex items-center justify-center">
          <Image
            src={'/logo.svg'}
            alt="photo"
            width={100}
            height={100}
            priority={true}
            blurDataURL=""
            className="h-25 w-auto mt-5"
          />
        </div>
        <div className="w-full h-20  flex items-center justify-center text-center  text-xl font-sans xxs:mb-15 xs:mb-15">
          <h1 className="text-[#9a4a8c]">Vous êtes... ?</h1>
        </div>

        <div className=" w-ful h-50  xxs:p-4 xs:p-4 sm:flex sm:items-center sm:justify-center  sm:gap-[100px] lg:gap-[150px]">
          <div>
            <button className="w-50 bg-pink-600 text-white py-2 px-6 rounded-lg font-medium  hover:to-pink-700 transition-all duration-200 transform hover:scale-105 xxs:w xxs:mb-15 xs:mb-15 xs:w">
              Je suis vendeur
            </button>
          </div>
          <div>
            <button className="w-50 bg-pink-600  text-white py-2 px-6 rounded-lg font-medium hover:to-pink-700 transition-all duration-200 transform hover:scale-105 xxs:w xs:w">
              Je suis acheteur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choixlogin;
