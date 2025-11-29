'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../common/auth.module.css';
import style from './show.module.css';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForgotPassword } from './forget-passwordAction';
import { MoveLeft, UserRound } from 'lucide-react';
import { ProgressLink } from '@/components/ui/progress-link';
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
function RightChild() {
  const { t } = useTranslation('auth/forget-password');
  const { form, loading, submit } = useForgotPassword();
  return (
    <>
      <motion.div
        className={style.auth_show5}
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
          className={style.auth_show6}
        />
      </motion.div>
      <motion.div
        className={style.auth_show7}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Form {...form}>
          <div className={style.auth_show8}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t('input')}
                      {...field}
                      startOrnerIcon={<UserRound className={style.auth_show9} />}
                    />
                  </FormControl>
                  <FormMessage className={style.auth_txt12} />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading}
              onClick={form.handleSubmit(submit)}
              className={styles.auth_button_connecter}
            >
              {loading ? (
                <span className={style.auth_show14}>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-auth-color-text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className={style.auth_show16}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path className={style.auth_show17} fill="currentColor"></path>
                  </svg>
                  {t('title5')}
                </span>
              ) : (
                `${t('title6')}`
              )}
            </Button>
          </div>
          <div className={style.auth_show18}>
            <ProgressLink href="/login" className={style.auth_show19}>
              <MoveLeft size={25} strokeWidth={1.5} /> {t('title7')}
            </ProgressLink>
          </div>
        </Form>
      </motion.div>
    </>
  );
}

export default RightChild;
