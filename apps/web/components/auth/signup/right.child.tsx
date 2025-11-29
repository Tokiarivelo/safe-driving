'use client';

import React from 'react';
import { ProgressLink } from '@/components/ui/progress-link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../common/auth.module.css';
import style from './signup.module.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRegister } from './useSignupAction';
import { EyeIcon, EyeOffIcon, IdCard, LockKeyhole, UserRound } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
function RightChild() {
  const {
    form,
    loading,
    showPassword,
    showPasswords,
    register,
    handleShowPassword,
    handleShowPasswords,
    capitalizeText,
  } = useRegister();
  const { t, ready } = useTranslation('auth/signup');
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
          alt="photo"
          width={100}
          height={100}
          priority={true}
          blurDataURL=""
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
          <form onSubmit={form.handleSubmit(register)}>
            <div className={style.auth_signup11}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t('input1')}
                        {...field}
                        startOrnerIcon={<IdCard className={style.auth_signup12} />}
                        onInput={e => {
                          const target = e.target as HTMLInputElement;
                          const capitalizedValue = capitalizeText(target.value);
                          target.value = capitalizedValue;
                          field.onChange(capitalizedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage className={style.auth_signup13} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t('input2')}
                        {...field}
                        startOrnerIcon={<IdCard className={style.auth_signup14} />}
                        onInput={e => {
                          const target = e.target as HTMLInputElement;
                          const uppercaseValue = target.value.toUpperCase();
                          target.value = uppercaseValue;
                          field.onChange(uppercaseValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage className={style.auth_signup15} />
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
                        placeholder={t('input3')}
                        {...field}
                        startOrnerIcon={<UserRound className={style.auth_signup16} />}
                      />
                    </FormControl>
                    <FormMessage className={style.auth_signup17} />
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
                        placeholder={t('input4')}
                        {...field}
                        startOrnerIcon={<LockKeyhole className={style.auth_signup18} />}
                        endOrnerIcon={
                          <button
                            type="button"
                            className={style.auth_signup19}
                            onClick={handleShowPassword}
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={showPasswords ? 'text' : 'password'}
                        placeholder={t('input5')}
                        {...field}
                        startOrnerIcon={<LockKeyhole className={style.auth_signup23} />}
                        endOrnerIcon={
                          <button
                            type="button"
                            className={style.auth_signup24}
                            onClick={handleShowPasswords}
                          >
                            {showPasswords ? (
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

              <Button type="submit" disabled={loading} className={styles.auth_button_connecter}>
                {loading ? (
                  <span className={style.auth_signup28}>
                    <svg
                      className={style.auth_signup40}
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
                    {t('title9')}
                  </span>
                ) : (
                  `${t('title10')}`
                )}
              </Button>
            </div>
            <div className={style.auth_signup32}>
              <p className={style.auth_signup33}>{t('title6')}</p>
              <div className={style.auth_signup34}>
                <div className={style.auth_signup35}>
                  <button type="button" className={styles.auth_button_google}>
                    <Image
                      src="/login/google.svg"
                      alt="Google login"
                      width={24}
                      height={24}
                      className={style.auth_signup36}
                    />
                  </button>

                  <button type="button" className={styles.auth_button_google}>
                    <Image
                      src="/login/apple.svg"
                      alt="Apple login"
                      width={24}
                      height={24}
                      className={style.auth_signup36}
                    />
                  </button>

                  <button type="button" className={styles.auth_button_google}>
                    <Image
                      src="/login/facebook.svg"
                      alt="Facebook login"
                      width={24}
                      height={24}
                      className={style.auth_signup36}
                    />
                  </button>
                </div>
              </div>
              <div className={style.auth_signup37}>
                <p className={style.auth_signup38}>
                  {t('title7')}{' '}
                  <ProgressLink href="/login" className={style.auth_signup39}>
                    {t('title8')}
                  </ProgressLink>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </motion.div>
    </>
  );
}

export default RightChild;
