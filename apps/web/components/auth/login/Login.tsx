'use client';

import { useLogin } from './useActions';
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
import { EyeIcon, EyeOffIcon, KeyIcon, LockKeyhole, MailIcon, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export const Login = () => {
  const { form, loading, showPassword, login, handleShowPassword } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C02AA8] from-0% to-[#C936A1] to-15% to-[#EE6984] to-60% to-[#FE7F78] to-85% w-full flex items-center justify-center">
      <div className=" bg-gradient-to-br from-[#f96556] from-14%  to-[#FF7746]  to-64% rounded-sm shadow-[0_0_9px_rgba(0,0,0,0.5)] overflow-hidden max-w-4xl h-[550px] w-full xxs:h-800 xxs:w-300 sm:flex sm:justify-between  xs:h-700s xs:w-450s sm:w-[600px] md:w-[750px] lg:max-w-4xl lg:w-full">
        <div className="w-[62%] rounded-tl-sm rounded-bl-sm bg-gradient-to-br from-[#EA3A7E] from-14%  to-[#FF7746]  to-64% h-[550px]  text-white flex items-center xxs:w xxs:h-350s xs:h-350s xs:w xs:w-20 md:w-[55%] sm:w-[50%]">
          <div className="w-full h-3/4 overflow-hidden text-center xxs:p-4 lg:m-18  xs:pt sm:p-4 sm:pt-11 ">
            <h1 className="text-3xl  mb-2 pt-10 xxs:pt xxs:f-20 sm:text-xl xs:mb xs:f-20">
              👋Bienvenue sur Safe Driving
            </h1>
            <p className="text-md mb-1 opacity-90 xxs:mbs xs:mb xs:mbs">Voyagez l'esprit léger.</p>
            <p className="text-sm mb-1 opacity-80 leading-relaxed xs:mb xs:pf xs:pr">
              Connectez-vous pour réserver votre transport en un clin d'œil et suivre votre course
              en temps réel.
            </p>
            <p className="text-sm mb-2 opacity-80 xxs:hidden xs:hidden xs:mb">Ou</p>
            <p className="text-sm mb-8 opacity-80 xxs:hidden xs:hidden xs:mb">
              Si vous n'avez pas encore de compte, vous pouvez vous <br /> inscrire ici
            </p>
            <button className="rounded-sm border-1 border-white text-white px-25 py-1.5 hover:bg-white hover:text-orange-500 transition-all duration-300 font-medium xxs:hidden xs:hidden">
              Sign up
            </button>
          </div>
        </div>
        <div className="w-[38%] min-h-[550px] bg-white rounded-tr-md rounded-br-md xxs:bor xxs:w  xs:bor xs:w sm:w-[50%] md:w-[45%]">
          <div className="w-full  h-1/3  flex items-center justify-center xxs:p xxs:pb xs:p xs:pb">
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
                          type="email"
                          placeholder="E-mail ou username"
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
              </div>
              <div className="text-right mb-4">
                <Link
                  href="#"
                  className="text-sm underline font-semibold text-[#9a4a8c] hover:text-pink-600"
                >
                  Forgot password ?
                </Link>
              </div>
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
                    Signing in...
                  </span>
                ) : (
                  'Se connecter'
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
                <div className="w-full text-left">
                  <p className="text-xs text-[#822072] mt-6">
                    Pas encore de compte ?{' '}
                    <a href="#" className="font-bold underline text-[#822072] hover:text-pink-600">
                      S'inscrire
                    </a>
                  </p>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    /*<div className="min-h-screen min-w-[50%] shadow-blue-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-[13px]  overflow-hidden"
      >
         En-tête avec dégradé 
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <img src="/logo.svg" alt="Logo Safe Driving" className="h-10 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-white">Bienvenue</h1>
        </div>

         Contenu du formulaire 
        <div className="p-8">
          <Form {...form}>
            <div className="space-y-6">
               Champ Email 
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="safedriveing@example.com"
                        {...field}
                        startOrnerIcon={<MailIcon className="h-5 w-5 text-gray-400" />}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

               Champ Mot de passe 
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Mot de passe
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-blue-600 hover:text-blue-500"
                      >
                        Mot de passe oublié?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        {...field}
                        startOrnerIcon={<KeyIcon className="h-5 w-5 text-gray-400" />}
                        endOrnerIcon={
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={handleShowPassword}
                          >
                            {showPassword ? (
                              <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

               Bouton de connexion 
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  disabled={loading}
                  onClick={form.handleSubmit(login)}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow-md transition-all"
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
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </motion.div>
            </div>
          </Form>

           Séparateur 
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-xs text-gray-500">ou continuer avec</span>
            </div>
          </div>

           Boutons sociaux 
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 h-10 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.175-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z"></path>
              </svg>
              Google
            </button>

            <button className="flex items-center justify-center gap-2 h-10 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              GitHub
            </button>
          </div>

           Lien d'inscription 
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              S'inscrire
            </Link>
          </p>
        </div>
      </motion.div>
    </div>*/
  );
};

export default Login;
