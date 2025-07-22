'use client';

import { useLogin } from './useSignupAction';
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
import styles from '../common/auth.module.css';
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
    <>
      <div className={styles.auth_card_un_container}>
        <div className="w-full text-auth-color-bg-white h-3/4 overflow-hidden text-center sm:p-4 sm:pt-11 ">
          <h1 className="text-2xl  mb-2 pt-5 sm:text-lg lg:text-2xl">
            🚀Prêt à rejoindre Safe Driving ?
          </h1>
          <p className="text-md px-10 mb-3 opacity-90 ">
            Explorez la ville comme jamais auparavant.
          </p>
          <p className="text-sm mb-1 px-5 opacity-80 leading-relaxed sm:px-2 sm:text-md lg:px-20">
            Créez votre compte et laissez notre assistant intelligent vous guider pour une
            expérience fluide, rapide et sécurisée.
          </p>
          <p className="text-sm mb-2 opacity-80 hidden sm:block">Ou</p>
          <p className="text-sm mb-8 opacity-80 hidden sm:block sm:text-md sm:mb-4 lg:px-20">
            Connectez-vous pour réserver votre transport en un clin d'œil et suivre votre course en
            temps réel.
          </p>
          <button className={styles.auth_button_Sign}>Sign up</button>
        </div>
      </div>
      <div className="w-full min-h-[600px] bg-auth-color-bg-white rounded-tr-md rounded-br-md sm:w-[50%] md:w-[45%] lg:w-[38%]">
        <div className="w-full h-[135px] flex  items-center justify-center">
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
                        startOrnerIcon={<IdCard className="h-5 w-5 text-auth-color-icon" />}
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
                        startOrnerIcon={<IdCard className="h-5 w-5 text-auth-color-icon" />}
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
                        startOrnerIcon={<UserRound className="h-5 w-5 text-auth-color-icon" />}
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
                        startOrnerIcon={<LockKeyhole className="h-5 w-5 text-auth-color-icon" />}
                        endOrnerIcon={
                          <button
                            type="button"
                            className="cursor-pointer "
                            onClick={handleShowPassword}
                          >
                            {showPassword ? (
                              <EyeIcon className="h-5 w-5 text-auth-color-icon hover:text-auth-color-icon" />
                            ) : (
                              <EyeOffIcon className="h-5 w-5 text-auth-color-icon hover:text-auth-color-icon" />
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
                        startOrnerIcon={<LockKeyhole className="h-5 w-5 text-auth-color-icon" />}
                        endOrnerIcon={
                          <button
                            type="button"
                            className="cursor-pointer "
                            onClick={handleShowPassword}
                          >
                            {showPassword ? (
                              <EyeIcon className="h-5 w-5 text-auth-color-icon hover:text-auth-color-icon" />
                            ) : (
                              <EyeOffIcon className="h-5 w-5 text-auth-color-icon hover:text-auth-color-icon" />
                            )}
                          </button>
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                onClick={form.handleSubmit(login)}
                className={styles.auth_button_connecter}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5  text-auth-color-text-white"
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
            </div>
            <div className="text-center">
              <p className="text-sm text-auth-color-text-custom-magenta mb-4 mt-2">
                — Or continue with —
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex space-x-4">
                  <button className={styles.auth_button_google}>
                    <img src="./login/google.svg" alt="" className="h-8 w-8" />
                  </button>

                  <button className={styles.auth_button_google}>
                    <img src="./login/apple.svg" alt="" className="h-8 w-8" />
                  </button>

                  <button className={styles.auth_button_google}>
                    <img src="./login/facebook.svg" alt="" className="h-8 w-8" />
                  </button>
                </div>
              </div>
              <div className="w-full text-left">
                <p className="text-xs text-auth-color-text-custom-magenta mt-6">
                  Pas encore de compte ?{' '}
                  <a
                    href="#"
                    className="font-bold underline text-auth-color-text-custom-magenta hover:text-auth-color-button"
                  >
                    S'inscrire
                  </a>
                </p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Signout;
