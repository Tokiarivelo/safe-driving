'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMeQuery } from '@/graphql/generated/graphql';
import { useProgress } from 'react-transition-progress';
import { LoadingScreen } from './LoadingScreen';

export function RedirectHandler() {
  const router = useRouter();
  const startProgress = useProgress();
  const { data, loading, error } = useMeQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (loading) return;

    if (error || !data?.me) {
      router.replace('/login');
      return;
    }

    const user = data.me;
    const isVerified = user.isVerified;

    const isAdmin = user.Role?.some((role) => role.name === 'ADMIN');
    const isDriver = user.Role?.some((role) => role.name === 'DRIVER');
    const isUser = user.Role?.some((role) => role.name === 'USER');

    startProgress();

    let redirectPath = '/login';

    if (isVerified) {
      if (isAdmin) {
        redirectPath = '/admin/dashboard';
      } else if (isDriver) {
        redirectPath = '/driver/dashboard';
      } else if (isUser) {
        redirectPath = '/user/dashboard';
      }
    } else {
      if (isDriver) {
        redirectPath = '/driver/register/welcome';
      } else if (isUser) {
        redirectPath = '/user/form/name/bjr';
      }
    }

    router.replace(redirectPath);
  }, [data, loading, error, router, startProgress]);

  return <LoadingScreen />;
}

export default RedirectHandler;
