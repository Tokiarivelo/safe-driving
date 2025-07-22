import React from 'react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

interface Props {
  steps: Step[];
}

export const StepListCard: React.FC<Props> = ({ steps }) => {
  return (
        <div className="h-full flex flex-col gap-2 p-2">
        {steps.map((step) => (
            <div
            key={step.id}
            className={cn( 
                'w-full flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-300 ease-in-out cursor-pointer',
                step.current
                ? 'border-white bg-white/10 text-white font-semibold shadow-lg scale-[1.03]'
                : 'border-white/40 text-white/80 hover:bg-white/10'
            )}
            >
            <div className="text-pink-100">{step.icon}</div>
            <span className="text-base font-medium">{step.title}</span>
            </div>
        ))}
        </div>

  );
};
