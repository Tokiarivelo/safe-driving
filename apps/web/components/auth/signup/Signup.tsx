'use client';

import { useRegister } from './useSignupAction';
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
  KeyIcon,
  LockKeyhole,
  MailIcon,
  MoveLeft,
  UserRound,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export const Register = () => {
  const { form, loading, showPassword, register, handleShowPassword } = useRegister();

  return (
    <>
      <div className={styles.auth_card_un_container}>
        <div className="w-full h-3/4 text-auth-color-bg-white overflow-hidden text-center sm:p-4 sm:pt-11 lg:px-14">
          <h1 className="text-xl lg:text-2xl  mb-5 mt-5 leading-tight">🔒 Mot de passe oublié ?</h1>
          <p className="text-sm opacity-90 leading-relaxed">
            Pas de panique, ça arrive à tout le monde.
            <br />
            Entrez votre adresse e-mail dans le formulaire et nous
            <br />
            vous enverrons un lien pour réinitialiser vo tre mot de
            <br />
            passe en toute sécurité.
          </p>
        </div>
      </div>
      <div className="w-full min-h-[550px] uth-color-bg-white rounded-tr-md rounded-br-md sm:w-[50%] md:w-[45%] lg:w-[38%]">
        <div className="w-full  h-[150px] flex items-center justify-center lg:h-1/3">
          <Image
            src={'/logo.svg'}
            alt="photo"
            width={100}
            height={100}
            priority={true}
            blurDataURL=""
            className="h-20 w-auto sm:h-25 sm:mt-5"
          />
        </div>
        <div className="w-full h-3/2  px-6">
          <Form {...form}>
            <div className="space-y-5">
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
              <Button
                type="submit"
                disabled={loading}
                onClick={form.handleSubmit(register)}
                className={styles.auth_button_connecter}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-auth-color-text-white"
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
                    Reset password...
                  </span>
                ) : (
                  'Reset password'
                )}
              </Button>
            </div>
            <div className="flex justify-center w-full">
              <p className="text-sm text-auth-color-text-custom-magenta font-semibold underline mb-4 mt-2 flex  gap-2">
                <MoveLeft size={25} strokeWidth={1.5} /> Back to Sign In
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Register;
