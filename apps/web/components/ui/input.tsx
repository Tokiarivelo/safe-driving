import * as React from 'react';

import { cn } from '@/lib/utils';

function ShadcnInput({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(className)} {...props} />;
}

type CustomProps = {
  startOrnerIcon?: React.ReactNode;
  endOrnerIcon?: React.ReactNode;
  inputClassname?: string;
};

type ShadcnInputProps = React.ComponentProps<'input'> & CustomProps;

const Input = ({
  className = 'mb-1 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5',
  inputClassname,
  startOrnerIcon,
  endOrnerIcon,
  ...props
}: ShadcnInputProps) => {
  return (
    <div className={cn(className, 'px-12 relative')}>
      {/* Icon component */}
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {startOrnerIcon}
      </span>
      {/* Shadcn Input component */}
      <ShadcnInput
        {...props}
        className={cn(inputClassname, 'outline-none focus:outline-none focus:ring-0 ring-0')}
      />

      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {endOrnerIcon}
      </span>
    </div>
  );
};

export { Input };
