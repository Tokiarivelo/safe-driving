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

export const Login = () => {
  const { form, loading, showPassword, login, handleShowPassword } = useLogin();
  const { t, ready } = useTranslation('login');

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.auth_card_un_container}>
        <div className={style.auth_txt1}>
          <h1 className={style.auth_txt2}>{t('title')}</h1>
          <p className="text-md mb-7 opacity-90 sm:mb-1">Voyagez l'esprit léger.</p>
          <p className={style.auth_txt4}>
            Connectez-vous pour réserver votre transport en un clin d'œil et suivre votre course en
            temps réel.
          </p>
          <p className={style.auth_txt5}>Ou</p>
          <p className={style.auth_txt6}>
            Si vous n'avez pas encore de compte, vous pouvez vous <br /> inscrire ici
          </p>
          <button className={styles.auth_button_Sign}>Sign up</button>
        </div>
      </div>
      <div className={styles.auth_card_deux_container}>
        <div className={style.auth_txt7}>
          <Image
            src={'/logo.svg'}
            alt="photo"
            width={100}
            height={100}
            priority={true}
            blurDataURL=""
            className={style.auth_txt8}
          />
        </div>
        <div className={style.auth_txt9}>
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
                        placeholder="E-mail ou username"
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
                        placeholder="Password"
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
              <Link href="#" className={style.auth_txt19}>
                Forgot password ?
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
                  Signing in...
                </span>
              ) : (
                'Se connecter'
              )}
            </Button>
            <div className={style.auth_txt24}>
              <p className={style.auth_txt25}>— Or continue with —</p>

              <div className={style.auth_txt26}>
                <div className={style.auth_txt27}>
                  <button className={styles.auth_button_google}>
                    <Image
                      src="/login/google.svg"
                      alt=""
                      width={24}
                      height={24}
                      className={style.auth_txt28}
                    />
                  </button>

                  <button className={styles.auth_button_google}>
                    <Image
                      src="/login/apple.svg"
                      alt=""
                      width={24}
                      height={24}
                      className={style.auth_txt28}
                    />
                  </button>

                  <button className={styles.auth_button_google}>
                    <Image
                      src="/login/facebook.svg"
                      alt=""
                      width={24}
                      height={24}
                      className={style.auth_txt28}
                    />
                  </button>
                </div>
              </div>
              <div className={style.auth_txt29}>
                <p className={style.auth_txt30}>
                  Pas encore de compte ?{' '}
                  <a href="#" className={style.auth_txt31}>
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

export default Login;
