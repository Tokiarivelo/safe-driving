'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import style from './resetpass.module.css';
import styles from '../common/auth.module.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, LockKeyhole } from 'lucide-react';
import { useResetPassword } from './resetpassAction';
import { useTranslation } from 'react-i18next';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
function RightChild() {
  const {
    form,
    loading,
    showPassword,
    showConfirmPassword,
    resetPassword,
    handleShowPassword,
    handleShowConfirmPassword,
  } = useResetPassword();
  const { t, ready } = useTranslation('reset-password');

  if (!ready) return null;
  return (
    <>
      <motion.div
        className={style.auth_signup8}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={'/logo.svg'}
          alt="Logo"
          width={100}
          height={100}
          priority={true}
          className={style.auth_signup9}
        />
      </motion.div>

      <motion.div
        className={style.auth_signup10}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(resetPassword)}>
            <div className={style.auth_signup11}>
              {/* Champ mot de passe */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('input')}
                        {...field}
                        startOrnerIcon={<LockKeyhole className={style.auth_signup18} />}
                        endOrnerIcon={
                          <button
                            type="button"
                            className={style.auth_signup19}
                            onClick={handleShowPassword}
                            aria-label={
                              showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                            }
                          >
                            {showPassword ? (
                              <EyeIcon className={style.auth_signup20} />
                            ) : (
                              <EyeOffIcon className={style.auth_signup21} />
                            )}
                          </button>
                        }
                      />
                    </FormControl>
                    <FormMessage className={style.auth_signup22} />
                  </FormItem>
                )}
              />

              {/* Champ confirmation mot de passe */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={t('input1')}
                        {...field}
                        startOrnerIcon={<LockKeyhole className={style.auth_signup23} />}
                        endOrnerIcon={
                          <button
                            type="button"
                            className={style.auth_signup24}
                            onClick={handleShowConfirmPassword}
                            aria-label={
                              showConfirmPassword
                                ? 'Masquer la confirmation'
                                : 'Afficher la confirmation'
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeIcon className={style.auth_signup25} />
                            ) : (
                              <EyeOffIcon className={style.auth_signup26} />
                            )}
                          </button>
                        }
                      />
                    </FormControl>
                    <FormMessage className={style.auth_signup27} />
                  </FormItem>
                )}
              />

              {/* Bouton de soumission */}
              <div className={style.auth_signup40}>
                <Button type="submit" disabled={loading} className={styles.auth_button_connecter}>
                  {loading ? (
                    <span className={style.auth_signup28}>
                      <svg
                        className={style.auth_signup41}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className={style.auth_signup30}
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path className={style.auth_signup31} fill="currentColor"></path>
                      </svg>
                      {t('title6')}
                    </span>
                  ) : (
                    `${t('title7')}`
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </motion.div>
    </>
  );
}

export default RightChild;
