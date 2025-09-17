import React from 'react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface Props {
  steps: Step[];
  currentStepId: string;
}

export const StepListCard: React.FC<Props> = ({ steps, currentStepId }) => {
  return (
    <div className="h-full flex flex-col gap-2 p-2">
      {steps.map((step, index) => {
        const currentIndex = steps.findIndex(s => s.id === currentStepId);
        const isCurrent = step.id === currentStepId;
        const isCompleted = index < currentIndex;

        return (
          <div
            key={step.id}
            className={cn(
              'w-full flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-300 ease-in-out cursor-pointer',
              isCurrent
                ? 'border-white bg-white/10 text-white font-semibold shadow-lg scale-[1.03]'
                : isCompleted
                  ? 'border-white/60 text-white'
                  : 'border-white/40 text-white/80 hover:bg-white/10'
            )}
          >
            <div className="text-pink-100">{step.icon}</div>
            <span className="text-base font-medium">{step.title}</span>
          </div>
        );
      })}
    </div>
  );
};
