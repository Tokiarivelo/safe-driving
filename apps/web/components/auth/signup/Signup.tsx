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
import { EyeIcon, EyeOffIcon, KeyIcon, MailIcon, User, User2Icon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Register = () => {
  const { form, loading, showPassword, register, handleShowPassword } = useRegister();

  return (
    <div className="min-h-screen min-w-[50%]   flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-[13px] shadow-xl overflow-hidden"
      >
        {/* En-tête avec dégradé */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-center">
          <div className="flex justify-center mb-3">
            <img src="/logo.svg" alt="Logo Safe Driving" className="h-10 w-auto" />
          </div>
          <h1 className="text-xl font-bold text-white">Créer un compte</h1>
        </div>

        {/* Contenu du formulaire - Espacements optimisés */}
        <div className="p-5 space-y-3">
          <Form {...form}>
            {/* Champ Nom complet */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-sm font-medium text-gray-700">Nom complet</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Safe Driving..."
                      {...field}
                      startOrnerIcon={<User className="h-4 w-4 text-gray-400" />}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            sqdqdsqdqs
            {/* Champ Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="safedriveing@example.com"
                      {...field}
                      startOrnerIcon={<MailIcon className="h-4 w-4 text-gray-400" />}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            {/* Champ Nom d'utilisateur */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nom d'utilisateur
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="safedriveing@example.com"
                      {...field}
                      startOrnerIcon={<User2Icon className="h-4 w-4 text-gray-400" />}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            {/* Champ Mot de passe */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-sm font-medium text-gray-700">Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...field}
                      startOrnerIcon={<KeyIcon className="h-4 w-4 text-gray-400" />}
                      endOrnerIcon={
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={handleShowPassword}
                        >
                          {showPassword ? (
                            <EyeIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <EyeOffIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            {/* Champ Confirmation mot de passe */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...field}
                      startOrnerIcon={<KeyIcon className="h-4 w-4 text-gray-400" />}
                      endOrnerIcon={
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={handleShowPassword}
                        >
                          {showPassword ? (
                            <EyeIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <EyeOffIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            {/* Bouton d'inscription */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                onClick={form.handleSubmit(register)}
                className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg text-sm shadow-md"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Création...
                  </span>
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </motion.div>
          </Form>

          {/* Séparateur */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-xs text-gray-500">ou continuer avec</span>
            </div>
          </div>

          {/* Boutons sociaux */}
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-1 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.175-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z"></path>
              </svg>
              Google
            </button>

            <button className="flex items-center justify-center gap-1 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              GitHub
            </button>
          </div>

          {/* Lien vers login */}
          <p className="text-center text-xs text-gray-500 mt-3">
            Vous avez déjà un compte?
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Se connecter
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
