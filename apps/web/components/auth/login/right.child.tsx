'use client';

import styles from '../common/auth.module.css';
import style from './login.module.css';
import { useLogin } from './useActions';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, LockKeyhole, UserRound } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const RightChild = () => {
  const { form, loading, showPassword, login, handleShowPassword } = useLogin();
  const { t, ready } = useTranslation('auth/login');

  if (!ready) return null; // Ensure translations are ready before rendering

  return (
    <>
      <motion.div
        className={style.auth_txt7}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={'/logo.svg'}
          alt="photo"
          width={100}
          height={100}
          priority
          className={style.auth_txt8}
        />
      </motion.div>
      <motion.div
        className={style.auth_txt9}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Form {...form}>
          <div className={style.auth_txt10}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t('title11')}
                      {...field}
                      startOrnerIcon={<UserRound className={style.auth_txt11} />}
                    />
                  </FormControl>
                  <FormMessage className={style.auth_txt12} />
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
                      placeholder={t('title12')}
                      {...field}
                      startOrnerIcon={<LockKeyhole className={style.auth_txt13} />}
                      endOrnerIcon={
                        <button
                          type="button"
                          className={style.auth_txt14}
                          onClick={handleShowPassword}
                        >
                          {showPassword ? (
                            <EyeIcon className={style.auth_txt15} />
                          ) : (
                            <EyeOffIcon className={style.auth_txt16} />
                          )}
                        </button>
                      }
                    />
                  </FormControl>
                  <FormMessage className={style.auth_txt17} />
                </FormItem>
              )}
            />
          </div>

          <div className={style.auth_txt18}>
            <Link href="/forget-password" className={style.auth_txt19}>
              {t('title6')}
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            onClick={form.handleSubmit(login)}
            className={styles.auth_button_connecter}
          >
            {loading ? (
              <span className={style.auth_txt20}>
                <svg
                  className={style.auth_txt21}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className={style.auth_txt22}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path className={style.auth_txt23} fill="currentColor"></path>
                </svg>
                {t('title7')}
              </span>
            ) : (
              t('title8')
            )}
          </Button>
        </Form>

        <div className={style.auth_txt24}>
          <p className={style.auth_txt25}>{t('title9')}</p>

          <div className={style.auth_txt26}>
            <div className={style.auth_txt27}>
              <button className={styles.auth_button_google}>
                <img src="/login/google.svg" alt="" className={style.auth_txt28} />
              </button>

              <button className={styles.auth_button_google}>
                <img src="/login/apple.svg" alt="" className={style.auth_txt28} />
              </button>

              <button className={styles.auth_button_google}>
                <img src="/login/facebook.svg" alt="" className={style.auth_txt28} />
              </button>
            </div>
          </div>

          <div className={style.auth_txt29}>
            <p className={style.auth_txt30}>
              {t('title10')}{' '}
              <Link href="/signup" className={style.auth_txt31}>
                {t('title5')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RightChild;
