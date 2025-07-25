import React from 'react';

interface StepProps {
  steps: {
    label: string;
    status: 'inactive' | 'active' | 'done';
    number: number;
  }[];
}

const StepIndicator: React.FC<StepProps> = ({ steps }) => {
  return (
    <div className="flex items-center justify-center gap-6">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            {/* Outer filled white circle */}
            <div className="w-10 h-10 rounded-full bg-white relative flex items-center justify-center">
              {/* Inner colored circle with number */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white absolute`}
                style={{
                  backgroundColor:
                    step.status === 'done'
                      ? '#16a34a' // green-600
                      : step.status === 'active'
                      ? '#000000' // black
                      : '#d1d5db', // gray-300 for inactive
                }}
              >
                {step.number}
              </div>
            </div>
            {/* Label */}
            <span className="text-xs text-white mt-2">{step.label}</span>
          </div>

          {/* Longer line between steps */}
          {index < steps.length - 1 && (
            <div className="w-12 h-0.5 bg-white" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export { StepIndicator }