'use client';

import NextLink, { LinkProps } from 'next/link';
import { useProgress } from 'react-transition-progress';
import { ReactNode, useCallback, startTransition } from 'react';

interface ProgressLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export function ProgressLink({ children, className, ...props }: ProgressLinkProps) {
  const startProgress = useProgress();

  const handleClick = useCallback(() => {
    startTransition(() => {
      startProgress();
    });
  }, [startProgress]);

  return (
    <NextLink {...props} className={className} onClick={handleClick}>
      {children}
    </NextLink>
  );
}

export default ProgressLink;
