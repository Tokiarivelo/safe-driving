'use client';

import { useLogin } from './useSignoutAction';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  EyeIcon,
  EyeOffIcon,
  IdCard,
  KeyIcon,
  LockKeyhole,
  MailIcon,
  UserRound,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export const Signout = () => {
  const { form, loading, showPassword, login, handleShowPassword } = useLogin();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C02AA8] from-0% to-[#C936A1] to-15% to-[#EE6984] to-60% to-[#FE7F78] to-85% w-full flex items-center justify-center">
      <div className=" bg-linear-to-br from-[#f96556] from-14%  to-[#FF7746]  to-64% rounded-sm shadow-[0_0_9px_rgba(0,0,0,0.5)] overflow-hidden max-w-4xl h-[600px] w-full xxs:h-800 xxs:w-300 sm:flex sm:justify-between  xs:h-700s xs:w-450s sm:w-[600px] md:w-[750px] lg:max-w-4xl lg:w-full">
        <div className="w-[62%] rounded-tl-sm rounded-bl-sm bg-linear-to-br from-[#EA3A7E] from-14%  to-[#FF7746]  to-64% h-[600px]  text-white flex items-center xxs:w xxs:h-350s xs:h-350s xs:w xs:w-20 md:w-[55%] sm:w-[50%]">
          <div className="w-full h-3/4 overflow-hidden text-center lg:m-18  xs:pt sm:p-4 sm:pt-11 ">
            <h1 className="text-3xl  mb-2 pt-5 xxs:mbx xxs:f-20  sm:text-xl xs:mb xs:f-20 sm:text-sm">
              🚀Prêt à rejoindre Safe Driving ?
            </h1>
            <p className="text-md mb-1 opacity-90 xxs:mbxs xxs:p xs:f-18 xs:prx xs:pfx xs:mb">
              Explorez la ville comme jamais auparavant.
            </p>
            <p className="text-sm mb-1 opacity-80 leading-relaxed xxs:p xs:p xs:mb">
              Créez votre compte et laissez notre assistant intelligent vous guider pour une
              expérience fluide, rapide et sécurisée.
            </p>
            <p className="text-sm mb-2 opacity-80 xs:mb xxs:hidden">Ou</p>
            <p className="text-sm mb-8 opacity-80 xs:mb xxs:hidden">
              Connectez-vous pour réserver votre transport en un clin d'œil et suivre votre course
              en temps réel.
            </p>
            <button className="rounded-sm border border-white text-white px-25 py-1.5 hover:bg-white hover:text-orange-500 transition-all duration-300 font-medium xxs:hidden">
              Sign up
            </button>
          </div>
        </div>
        <div className="w-[38%] min-h-[600px] bg-white rounded-tr-md rounded-br-md xxs:bor xxs:w  xs:bor xs:w sm:w-[50%] md:w-[45%]">
          <div className="w-full h-1/4  flex  items-center justify-center xxs:p xxs:pb xs:p xs:pb">
            <Image
              src={'/logo.svg'}
              alt="photo"
              width={100}
              height={100}
              priority={true}
              blurDataURL=""
              className="h-25 w-auto"
            />
          </div>
          <div className="w-full h-3/2  px-6">
            <Form {...form}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Firstname"
                          {...field}
                          startOrnerIcon={<IdCard className="h-5 w-5 text-pink-600" />}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Lastname"
                          {...field}
                          startOrnerIcon={<IdCard className="h-5 w-5 text-pink-600" />}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="E-mail "
                          {...field}
                          startOrnerIcon={<UserRound className="h-5 w-5 text-pink-600" />}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          {...field}
                          startOrnerIcon={<LockKeyhole className="h-5 w-5 text-pink-600" />}
                          endOrnerIcon={
                            <button
                              type="button"
                              className="cursor-pointer "
                              onClick={handleShowPassword}
                            >
                              {showPassword ? (
                                <EyeIcon className="h-5 w-5 text-pink-600 hover:text-pink-600" />
                              ) : (
                                <EyeOffIcon className="h-5 w-5 text-pink-600 hover:text-pink-600" />
                              )}
                            </button>
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          {...field}
                          startOrnerIcon={<LockKeyhole className="h-5 w-5 text-pink-600" />}
                          endOrnerIcon={
                            <button
                              type="button"
                              className="cursor-pointer "
                              onClick={handleShowPassword}
                            >
                              {showPassword ? (
                                <EyeIcon className="h-5 w-5 text-pink-600 hover:text-pink-600" />
                              ) : (
                                <EyeOffIcon className="h-5 w-5 text-pink-600 hover:text-pink-600" />
                              )}
                            </button>
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-right mb-4"></div>
              <Button
                type="submit"
                disabled={loading}
                onClick={form.handleSubmit(login)}
                className="w-full h-10 bg-vio  rounded-sm text-white"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path className="opacity-75" fill="currentColor"></path>
                    </svg>
                    Create account...
                  </span>
                ) : (
                  'Create account'
                )}
              </Button>
              <div className="text-center">
                <p className="text-sm text-[#822072] mb-4 mt-2">— Or continue with —</p>

                <div className="flex justify-center space-x-4">
                  <div className="flex space-x-4">
                    <button className="border border-pink-600 w-10 h-10 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </button>

                    <button className="border border-pink-600 w-10 h-10 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg  flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="black">
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.19 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                      </svg>
                    </button>

                    <button className="border border-pink-600 w-10 h-10 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg  flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signout;
